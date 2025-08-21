/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

import { RootState } from "@/store/store";
import { db } from "@/firebases/firebase";
import { useAppDispatch } from "@/hooks/hooks";
import { setUser, type UserState, type EmailUser, type SocialUser } from "@/store/slices/userSlice";

import WithdrawButton from "@/components/account/WithdrawButton";
import MyPageSideNav from "./MyPageSideNav";

import NameEditRow from "./profile/NameEditRow";
import PhoneEditRow from "./profile/PhoneEditRow";
import EmailEditRow from "./profile/EmailEditRow";
import BirthDateEditRow from "./profile/BirthDateEditRow";
import AddressEditRow from "./profile/AddressEditRow";
import SocialLinks from "@/components/myPage/profile/SocialLinks";

/** Firestore에 업데이트할 수 있는 필드 스키마 */
type FirestoreUserUpdatable = {
  name?: string;
  phoneNumber?: string; // 숫자만 문자열
  birthDate?: string; // "YYMMDD"
  gender?: string; // "남자" | "여자" | ""
  nationality?: string; // "내국인" | "외국인" | ""
  zoneCode?: string;
  address?: string;
  detailAddress?: string;
  isAdmin?: boolean;
};

// 유틸: 타입 가드
const isEmailUser = (u: UserState | null | undefined): u is EmailUser => !!u && u.type === "email";
const isSocialUser = (u: UserState | null | undefined): u is SocialUser =>
  !!u && u.type === "social";

export default function MyInfo() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, initialized, isLoggedIn, loading } = useSelector((s: RootState) => s.userReducer);

  // 부모가 제어하는 값들
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>(""); // 숫자만 저장: "01012345678"
  const [birthDate, setBirthDate] = useState<string>(""); // "YYMMDD"
  const [genderSelected, setGenderSelected] = useState<"male" | "female" | "non">("non");
  const [nationalitySelected, setNationalitySelected] = useState<"domestic" | "foreigner" | "non">(
    "non"
  );

  // 로그인 가드
  useEffect(() => {
    if (!initialized || loading) return;
    if (!isLoggedIn) router.replace("/login");
  }, [initialized, loading, isLoggedIn, router]);

  // 유저 변화 → 로컬 초기화
  useEffect(() => {
    setName(user?.name ?? "");
    setPhone(user?.phoneNumber ?? ""); // 두 타입 모두 속성 존재(소셜은 optional)
    setBirthDate(user?.birthDate ?? "");

    const g = (isEmailUser(user) ? user.gender : user?.gender) ?? "";
    setGenderSelected(
      g === "남자" || g === "male" ? "male" : g === "여자" || g === "female" ? "female" : "non"
    );

    const n = user?.nationality ?? "";
    setNationalitySelected(n === "내국인" ? "domestic" : n === "외국인" ? "foreigner" : "non");
  }, [user]);

  // 초기 로딩 가드
  if (!initialized || loading) {
    return <div className="p-6 text-center">불러오는 중...</div>;
  }
  if (!isLoggedIn || !user) return null;

  // 원본값 (유니온 안전 접근)
  const origName: string = user.name ?? "";
  const origPhone: string = user.phoneNumber ?? "";
  const origBirth: string = user.birthDate ?? "";

  const origGender: "male" | "female" | "non" = (() => {
    const g = (isEmailUser(user) ? user.gender : user.gender) ?? "";
    if (g === "남자" || g === "male") return "male";
    if (g === "여자" || g === "female") return "female";
    return "non";
  })();

  const origNationality: "domestic" | "foreigner" | "non" = (() => {
    const n = user.nationality ?? "";
    if (n === "내국인") return "domestic";
    if (n === "외국인") return "foreigner";
    return "non";
  })();

  // 변경 여부
  const hasDirty =
    name !== origName ||
    phone !== origPhone ||
    birthDate !== origBirth ||
    genderSelected !== origGender ||
    nationalitySelected !== origNationality;

  // 일괄 저장
  const handleUpdate = async () => {
    if (!user) return;

    const payload: Partial<FirestoreUserUpdatable> = {};

    if (name !== origName) payload.name = name;
    if (phone !== origPhone) payload.phoneNumber = phone;
    if (birthDate !== origBirth) payload.birthDate = birthDate;

    if (genderSelected !== origGender) {
      payload.gender =
        genderSelected === "male" ? "남자" : genderSelected === "female" ? "여자" : "";
    }

    if (nationalitySelected !== origNationality) {
      payload.nationality =
        nationalitySelected === "domestic"
          ? "내국인"
          : nationalitySelected === "foreigner"
          ? "외국인"
          : "";
    }

    if (Object.keys(payload).length === 0) {
      alert("변경된 내용이 없습니다.");
      return;
    }

    try {
      await updateDoc(doc(db, "users", user.uid), payload);
      // Redux 동기화
      const nextUser: UserState = {
        ...user,
        ...payload,
      } as UserState;
      dispatch(setUser(nextUser));
      alert("회원 정보가 수정되었습니다.");
    } catch (error) {
      console.error("회원정보 수정 실패:", error);
      alert("수정 중 오류가 발생했습니다.");
    }
  };

  // 모두 취소 → 원본으로 복원
  const handleCancelAll = () => {
    setName(origName);
    setPhone(origPhone);
    setBirthDate(origBirth);
    setGenderSelected(origGender);
    setNationalitySelected(origNationality);
  };

  return (
    <div className="mt-12 w-full flex gap-6 justify-center px-[26px]">
      <aside className="w-1/5 min-w-[150px] max-w-[150px] m-4">
        <MyPageSideNav />
      </aside>

      <section className="w-full max-w-3xl m-2 mt-4 min-h-[800px]">
        <div className="tracking-widest border-b border-black px-4 pb-2 text-xl">
          <h3 className="font-medium text-lg">회원 정보</h3>
        </div>

        <div>
          <span className="w-full mx-auto text-sm px-2">변경할 부분만 수정해주세요</span>

          <div className="w-full flex justify-end items-center text-sm px-2">
            <WithdrawButton />
          </div>

          <table className="mx-auto w-full mt-4">
            <colgroup>
              <col className="w-[180px]" />
              <col className="w-auto" />
            </colgroup>
            <tbody>
              <NameEditRow user={user} value={name} onChange={setName} />
              <EmailEditRow user={user} />
              <PhoneEditRow user={user} value={phone} onChange={setPhone} />
              <BirthDateEditRow user={user} value={birthDate} onChange={setBirthDate} />

              {/* 성별 */}
              <tr className="border-b border-gray-300 ">
                <th className="bg-peach-100 px-5 py-4 align-middle text-left whitespace-nowrap">
                  &nbsp;성별
                </th>
                <td className="p-4 align-middle">
                  {[
                    { label: "남", value: "male" as const },
                    { label: "여", value: "female" as const },
                  ].map(({ label, value }) => (
                    <label
                      key={value}
                      className={`inline-block pr-6 whitespace-nowrap cursor-pointer ${
                        genderSelected === value ? "text-peach-600" : "text-black"
                      }`}
                    >
                      <input
                        type="radio"
                        name="gender"
                        value={value}
                        checked={genderSelected === value}
                        onChange={(e) =>
                          setGenderSelected(e.target.value as "male" | "female" | "non")
                        }
                        className="mr-1 accent-peach-600"
                      />
                      {label}
                    </label>
                  ))}
                </td>
              </tr>

              {/* 내/외국인 */}
              <tr className="border-b border-gray-300 ">
                <th className="bg-peach-100 px-5 py-4 align-middle text-left whitespace-nowrap">
                  &nbsp;내/외국인
                </th>
                <td className="p-4 align-middle">
                  {[
                    { label: "내국인", value: "domestic" as const },
                    { label: "외국인", value: "foreigner" as const },
                  ].map(({ label, value }) => (
                    <label
                      key={value}
                      className={`inline-block pr-6 whitespace-nowrap cursor-pointer ${
                        nationalitySelected === value ? "text-peach-600" : "text-black"
                      }`}
                    >
                      <input
                        type="radio"
                        name="nationality"
                        value={value}
                        checked={nationalitySelected === value}
                        onChange={(e) =>
                          setNationalitySelected(e.target.value as "domestic" | "foreigner" | "non")
                        }
                        className="mr-1 accent-peach-600"
                      />
                      {label}
                    </label>
                  ))}
                </td>
              </tr>

              {/* 주소(필요 시 이 행도 부모 제어형으로 바꾸어 일괄 저장 대상에 넣을 수 있습니다) */}
              <tr className="border-b border-gray-300 ">
                <th className="bg-peach-100 px-5 py-4 align-middle text-left whitespace-nowrap">
                  <label htmlFor="email1">
                    <span className="text-red-400"></span>&nbsp;배송지
                  </label>
                </th>
                <td className="pl-4 py-4 align-middle">
                  <AddressEditRow />
                </td>
              </tr>

              {/* 하단 버튼 */}
              {hasDirty && (
                <tr>
                  <td colSpan={2} className="text-center py-4">
                    <div className="inline-flex mt-8 gap-8">
                      <button
                        onClick={handleUpdate}
                        className="items-center justify-center px-6 py-2 bg-peach-400 rounded border border-peach-400 hover:bg-white hover:border border-peach-400 whitespace-nowrap"
                      >
                        모든 변경 저장
                      </button>
                      <button
                        onClick={handleCancelAll}
                        className="items-center justify-center px-6 py-2 border border-peach-400 rounded hover:bg-peach-400 whitespace-nowrap"
                      >
                        모두 취소
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* 소셜 계정 연동 */}
          {isLoggedIn && user ? (
            <>
              <h3 className="text-lg font-medium mt-8 mb-3">소셜 계정 연동</h3>
              <SocialLinks />
            </>
          ) : (
            <p className="text-sm text-gray-500">로그인 후 소셜 계정을 연동할 수 있습니다.</p>
          )}
        </div>
      </section>
    </div>
  );
}
