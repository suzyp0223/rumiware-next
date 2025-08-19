/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { updateDoc, doc } from "firebase/firestore";

import { RootState } from "@/store/store";
import { auth, db } from "@/firebases/firebase";
import { type UserState, type EmailUser, fetchUserProfile } from "@/store/slices/userSlice";
import WithdrawButton from "@/components/account/WithdrawButton"; // 🔧 경로는 실제 위치에 맞게 조정

import MyPageSideNav from "./MyPageSideNav";
import { onAuthStateChanged } from "firebase/auth";
import { useAppDispatch } from "@/hooks/hooks";
import { useRouter } from "next/navigation";

import NameEditRow from "./profile/NameEditRow";
import PhoneEditRow from "./profile/PhoneEditRow";
import EmailEditRow from "./profile/EmailEditRow";
import BirthDateEditRow from "./profile/BirthDateEditRow";
import AddressEditRow from "./profile/AddressEditRow";
import SocialLinks from "./profile/SocialLinks";
import PasswordEditRow from "./profile/PasswordEditRow";

const MyInfo = () => {
  const [genderSelected, setGenderSelected] = useState<string>("non");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const [cancel, setCancel] = useState("");

  const [canEdit, setCanEdit] = useState(false); // 비번 검증 통과 여부
  const [isEditing, setIsEditing] = useState(false);

  const router = useRouter();
  const dispatch = useAppDispatch();
  // const { user } = useSelector((state: RootState) => state.userReducer);
  const { user, initialized, isLoggedIn, loading } = useSelector((s: RootState) => s.userReducer);
  // console.log("마이인포 user정보: ", user);

  const [displayEmail, setDisplayEmail] = useState<string>(() => user?.email ?? "");
  // ✅ 주소 상태 구독

  const isEmailUser = (user: UserState): user is EmailUser => {
    return "email" in user && "name" in user;
  };
  if (user && !isEmailUser(user)) {
    console.log("이 사용자는 소셜 로그인 유저입니다!");
  }

  useEffect(() => {
    setDisplayEmail(user?.email ?? "");
  }, [user]);

  // user 데이터가 있으면 초기값 세팅
  useEffect(() => {
    if (user && user.type === "email") {
      setName(user.name); // ★ 변경: 초기값 복사
    }
  }, [user]);

  useEffect(() => {
    // ✅ 로그인 여부 확인 + 프로필 로드
    const unsub = onAuthStateChanged(auth, async (fbUser) => {
      // ★ 변경
      if (!fbUser) {
        router.replace("/auth/login"); // ★ 변경: 미로그인 → 로그인 화면
        return;
      }
      // 이미 전역에 유저가 있으면 중복 호출 방지(선택)
      if (!user || user.uid !== fbUser.uid) {
        await dispatch(fetchUserProfile(fbUser.uid)); // ★ 변경: 저장된 정보 로드
      }
    });
    return () => unsub();
  }, [dispatch, router]);

  let genderValue = "";
  if (initialized && user && user.type === "email") {
    genderValue = user.gender;
  }
  // DB에서 genderValue가 도착하면 상태에 반영
  useEffect(() => {
    if (genderValue) {
      if (genderValue === "남자") {
        setGenderSelected("male");
      } else if (genderValue === "여자") {
        setGenderSelected("female");
      } else {
        setGenderSelected("non");
      }
    }
  }, [genderValue]);

  const isSocialUser = user && !isEmailUser(user);

  const handleUpdate = async () => {
    if (!user) return;

    if (!isSocialUser && password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        name,
        phoneNumber: phone,
        birthDate,
        ...(password && !isSocialUser ? { password } : {}),
      });
      alert("회원 정보가 수정되었습니다.");
    } catch (error) {
      console.error("회원정보 수정 실패:", error);
      alert("수정 중 오류가 발생했습니다.");
    }
  };

  if (!initialized || loading) return null; // 초기화 전/로딩 중엔 렌더 지연

  return (
    <div className="mt-12 w-full flex gap-6 justify-center px-[26px]">
      {/* 사이드 바 */}
      <aside className="w-1/5 min-w-[150px] max-w-[150px] m-4">
        <MyPageSideNav />
      </aside>

      {/* 회원 정보 */}
      <section className="w-full max-w-3xl m-2 mt-4 min-h-[800px]">
        <div className="tracking-widest border-b border-black px-4 pb-2 text-xl">
          <h3 className="font-medium text-lg">회원 정보</h3>
        </div>

        <div className="">
          <span className="w-full mx-auto text-sm px-2">변경할 부분만 수정해주세요</span>

          {/* 회원탈퇴 */}
          <div className="w-full flex justify-end items-center text-sm px-2">
            <WithdrawButton />
          </div>

          {isLoggedIn && user && (
            <table className=" mx-auto w-full mt-4">
              <colgroup>
                <col className="w-[180px]" />
                <col className="w-auto" />
              </colgroup>
              <tbody className="">
                <NameEditRow user={user} />

                <EmailEditRow user={user} />

                <PasswordEditRow
                  isSocialUser={!!isSocialUser} // 소셜 로그인 전용 계정이면 숨김
                  onVerified={() => setCanEdit(true)} // 검증 통과 시 부모 상태 변경
                  onEdit={() => setIsEditing(true)} // "수정" 눌렀을 때 편집 모드 진입
                  onCancel={() => {
                    // "취소" 눌렀을 때 원복
                    setIsEditing(false);
                    setCanEdit(false);
                  }}
                />

                <PhoneEditRow user={user} />
                <BirthDateEditRow user={user} />

                <tr className="border-b border-gray-300 ">
                  <th className="bg-peach-100 px-5 py-4 align-middle text-left whitespace-nowrap">
                    &nbsp;성별
                  </th>
                  <td className="p-4 align-middle">
                    {[
                      { label: "남", value: "male" },
                      { label: "여", value: "female" },
                    ].map(({ label, value }) => (
                      <label
                        key={value}
                        className={`inline-block  pr-6 whitespace-nowrap cursor-pointer ${
                          genderSelected === value ? "text-peach-600" : "text-black"
                        }`}
                      >
                        <input
                          type="radio"
                          name="gender"
                          value={value}
                          checked={genderSelected === value}
                          onChange={(e) => setGenderSelected(e.target.value)}
                          className="mr-1 accent-peach-600"
                        />
                        {label}
                      </label>
                    ))}
                  </td>
                </tr>

                {/*  <KakaoMap />  */}

                <tr className="border-b border-gray-300 ">
                  <th className="bg-peach-100 px-5 py-4 align-middle text-left whitespace-nowrap">
                    <label className="" htmlFor="email1">
                      <span className="text-red-400"></span>&nbsp;배송지
                    </label>
                  </th>
                  <td className="pl-4 py-4 align-middle">
                    <AddressEditRow />
                  </td>
                </tr>

                <tr>
                  <td colSpan={2} className="text-center py-4">
                    <div className="inline-flex mt-8 gap-8">
                      <button
                        onClick={handleUpdate}
                        className="items-center justify-center px-6 py-2 bg-peach-400 rounded border border-peach-400 hover:bg-white hover:border border-peach-400 whitespace-nowrap"
                      >
                        정보 수정
                      </button>
                      <button
                        onClick={() => {
                          setCancel("");
                        }}
                        className="items-center justify-center px-6 py-2 border border-peach-400 rounded hover:bg-peach-400 whitespace-nowrap"
                      >
                        취소
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          )}
        </div>

        {/* 소셜 연결 */}
        {isLoggedIn && user ? (
          <>
            {/* ...기존 섹션들... */}
            <h3 className="text-lg font-medium mt-8 mb-3">소셜 계정 연동</h3>
            <SocialLinks />
          </>
        ) : (
          <p className="text-sm text-gray-500">로그인 후 소셜 계정을 연동할 수 있습니다.</p>
        )}
      </section>
    </div>
  );
};

export default MyInfo;
