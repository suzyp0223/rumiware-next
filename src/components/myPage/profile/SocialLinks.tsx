"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { auth, db } from "@/firebases/firebase";
import {
  onAuthStateChanged,
  linkWithPopup,
  unlink,
  fetchSignInMethodsForEmail,
  type User,
  type UserInfo,
  type AuthError,
} from "firebase/auth";
import { doc, setDoc, updateDoc, arrayRemove, serverTimestamp } from "firebase/firestore";
import {
  PROVIDERS,
  PROVIDER_META,
  createProviderInstance,
} from "@/components/utils/socialProviders";

// ✅ 구글/카카오만 노출
const TARGETS = [PROVIDERS.google, PROVIDERS.kakao] as const;

type ProviderDetails = {
  linked: boolean;
  providerUid: string | null;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  linkedAt?: number;
};

/** Firestore에 현재 연결 상태를 병합 저장 */
async function syncProvidersToUserDoc(u: User) {
  const federatedIds = u.providerData.map((p) => p.providerId);

  let methods: string[] = [];
  if (u.email) {
    methods = await fetchSignInMethodsForEmail(auth, u.email);
  }
  const providerIds = Array.from(new Set([...federatedIds, ...methods]));

  const providers: Record<string, ProviderDetails> = {};
  u.providerData.forEach((p: UserInfo) => {
    providers[p.providerId] = {
      linked: true,
      providerUid: p.uid ?? null,
      email: p.email ?? null,
      displayName: p.displayName ?? null,
      photoURL: p.photoURL ?? null,
      linkedAt: Date.now(),
    };
  });

  await setDoc(
    doc(db, "users", u.uid),
    {
      email: u.email ?? null,
      displayName: u.displayName ?? null,
      photoURL: u.photoURL ?? null,
      providerIds,
      providers,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}

export default function SocialLinks() {
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const linked = useMemo(() => new Set(user?.providerData.map((p) => p.providerId) ?? []), [user]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        try {
          await syncProvidersToUserDoc(u);
        } catch {
          /* no-op */
        }
      }
    });
    return () => unsub();
  }, []);

  const handleConnect = async (providerId: string) => {
    if (!auth.currentUser) return alert("로그인이 필요합니다.");
    try {
      setLoadingId(providerId);
      const provider = createProviderInstance(providerId);

      // ✅ 가드 후 재참조(캐싱)로 타입 안정
      const current = auth.currentUser;
      if (!current) return alert("세션이 만료되었습니다. 다시 로그인해 주세요.");

      await linkWithPopup(current, provider); // 연결
      await syncProvidersToUserDoc(current); // Firestore 반영

      alert(`${PROVIDER_META[providerId].label} 연결이 완료되었습니다.`);
    } catch (e) {
      const err = e as AuthError;
      if (err.code === "auth/credential-already-in-use") {
        alert(
          "이미 다른 계정에 연결된 소셜 계정입니다.\n그 계정으로 로그인한 뒤, 여기 계정과 병합(서로 연결)해 주세요."
        );
      } else if (err.code === "auth/account-exists-with-different-credential") {
        alert(
          "같은 이메일이 다른 로그인 방식과 연결되어 있습니다.\n해당 방식으로 로그인한 뒤, 다시 연결해 주세요."
        );
      } else if (err.code === "auth/popup-closed-by-user") {
        alert("팝업이 닫혀 연결에 실패했습니다. 다시 시도해 주세요.");
      } else if (err.code === "auth/operation-not-allowed") {
        alert("Firebase 콘솔에서 해당 소셜 로그인을 활성화해 주세요.");
      } else {
        console.error(err);
        alert(`연결 중 오류: ${err.message}`);
      }
    } finally {
      setLoadingId(null);
    }
  };

  const handleDisconnect = async (providerId: string) => {
    if (!auth.currentUser) return alert("로그인이 필요합니다.");
    if (user && user.providerData.length <= 1) {
      return alert("마지막 로그인 수단은 해제할 수 없습니다. 다른 수단을 추가한 후 시도하세요.");
    }
    try {
      setLoadingId(providerId);

      // ✅ 가드 후 재참조(캐싱)
      const current = auth.currentUser;
      if (!current) return alert("세션이 만료되었습니다. 다시 로그인해 주세요.");

      await unlink(current, providerId); // 연결 해제

      await updateDoc(doc(db, "users", current.uid), {
        providerIds: arrayRemove(providerId),
        [`providers.${providerId}.linked`]: false,
        updatedAt: serverTimestamp(),
      });

      alert(`${PROVIDER_META[providerId].label} 연결을 해제했습니다.`);
    } catch (e) {
      const err = e as AuthError;
      if (err.code === "auth/no-such-provider") {
        alert("연결되어 있지 않은 공급자입니다.");
      } else {
        console.error(err);
        alert(`연결 해제 중 오류: ${err.message}`);
      }
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <ul className="space-y-4">
      {TARGETS.map((providerId) => {
        const { label, icon } = PROVIDER_META[providerId];
        const isLinked = linked.has(providerId);

        return (
          <li key={providerId} className="border rounded p-3">
            <dl className="flex items-center justify-between">
              <dt className="flex items-center gap-2">
                <Image src={icon} alt={label} width={20} height={20} />
                <span className="font-medium">{label}</span>

                {isLinked ? (
                  <>
                    <span className="text-xs text-green-600 ml-1">연결됨</span>
                    <button
                      type="button"
                      onClick={() => handleDisconnect(providerId)}
                      disabled={loadingId === providerId}
                      className="ml-2 px-2 py-1 border border-red-600 text-red-600 rounded text-xs hover:bg-red-50 disabled:opacity-50"
                      aria-label={`${label} 연결 끊기`}
                    >
                      {loadingId === providerId ? "해제 중..." : "연결끊기"}
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleConnect(providerId)}
                    disabled={loadingId === providerId}
                    className="ml-2 px-2 py-1 border border-blue-600 text-blue-600 rounded text-xs hover:bg-blue-50 disabled:opacity-50"
                    aria-label={`${label} 연결하기`}
                  >
                    {loadingId === providerId ? "연결 중..." : "연결하기"}
                  </button>
                )}
              </dt>
            </dl>
          </li>
        );
      })}
    </ul>
  );
}
