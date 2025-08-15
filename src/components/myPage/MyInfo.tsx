"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { updateDoc, doc } from "firebase/firestore";

import { RootState } from "@/store/store";
import { auth, db } from "@/firebases/firebase";
import { type UserState, type EmailUser, fetchUserProfile } from "@/store/slices/userSlice";

import Image from "next/image";
import Link from "next/link";

import MyPageSideNav from "./MyPageSideNav";
import { onAuthStateChanged } from "firebase/auth";
import { useAppDispatch } from "@/hooks/hooks";
import { useRouter } from "next/navigation";

import NameEditRow from "./profile/NameEditRow";
import PhoneEditRow from "./profile/PhoneEditRow";
import EmailEditRow from "./profile/EmailEditRow";
import BirthDateEditRow from "./profile/BirthDateEditRow";
import AddressEditRow from "./profile/AddressEditRow";

const MyInfo = () => {
  const [genderSelected, setGenderSelected] = useState<string>("non");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const [cancel, setCancel] = useState("");

  const router = useRouter();
  const dispatch = useAppDispatch();
  // const { user } = useSelector((state: RootState) => state.userReducer);
  const { user, initialized, isLoggedIn, loading } = useSelector((s: RootState) => s.userReducer);
  // console.log("마이인포 user정보: ", user);
  const uid = user?.uid ?? null;

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
          {isLoggedIn && user && (
            <table className=" mx-auto w-full mt-4">
              <colgroup>
                <col className="w-[180px]" />
                <col className="w-auto" />
              </colgroup>
              <tbody className="">
                <NameEditRow user={user} />

                <EmailEditRow user={user} />

                {!isSocialUser && (
                  <>
                    <tr className="border-b border-gray-300 ">
                      <th className="bg-peach-100 px-5 py-4 align-middle text-left whitespace-nowrap">
                        <label htmlFor="password1" className="head-cell">
                          <span className="text-red-400"></span>&nbsp;비밀번호
                        </label>
                      </th>
                      <td className="p-4 pb-0 align-middle">
                        <input
                          type="password"
                          className="outline-none border-b w-[200px] border-gray-300 hover:border-b-peach-600 focus:border-b-peach-600 p-2 text-base"
                          id="password1"
                          size={15}
                          maxLength={20}
                        />
                        <button
                          type="button"
                          className="ml-4 p-2 text-sm border border-gray-300  hover:border-peach-300 hover:text-gray-800 rounded"
                        >
                          재설정
                        </button>
                        <span className="block text-sm text-red-500 pb-2 pl-2">
                          비밀번호가 일치하지 않습니다.
                        </span>
                      </td>
                    </tr>
                  </>
                )}

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

                {/* <tr className="border-b border-gray-300 ">
                  <th className="bg-peach-100 px-5 py-4 align-middle text-left whitespace-nowrap">
                    <label htmlFor="address" className="">
                      <span className="text-red-400"></span>&nbsp;주소
                    </label>
                  </th>

                  <KakaoMap />
                </tr> */}

                <tr className="border-b border-gray-300 ">
                  <th className="bg-peach-100 px-5 py-4 align-middle text-left whitespace-nowrap">
                    <label className="" htmlFor="email1">
                      <span className="text-red-400"></span>&nbsp;배송지
                    </label>
                  </th>
                  <td className="pl-4 py-4 align-middle">
                    <AddressEditRow />
                    {/* <div className="relative p-2 m-2">
                      <button
                        type="button"
                        className="border border-gray-300 rounded p-2 w-[600px] mb-6"
                      >
                        <span className="before:content-['+'] before:mr-2">배송지 추가하기</span>
                      </button>

                      <h4 className="for-a11y hidden">배송지목록</h4>

                      <ul className="w-[500px]">
                        <button
                          type="button"
                          className="absolute top-17 right-2 mr-2 px-3 py-1 rounded border border-blue-600 text-sm text-blue-600 hover:underline"
                        >
                          수정
                        </button>
                        <li className="">
                          <div className="mb-4">
                            <span className="for-a11y hidden">배송지명</span>
                            <span></span>
                          </div>
                          <div className="inline">
                            <span className="hidden">수령인</span>
                            <span className="font-bold  mr-2"></span>
                            <span>&nbsp;|&nbsp; </span>
                          </div>
                          <div className="inline ml-2">
                            <span className="hidden">연락처</span>
                            <span className="font-bold "></span>
                          </div>
                          <div className="mt-2">
                            <span className="hidden">주소</span>
                            <span></span>
                          </div>
                        </li>
                      </ul>
                      <div className="flex justify-end ">
                        <button
                          type="button"
                          className="text-sm text-red-500 border border-red-500 mr-2 px-3 py-1 rounded hover:underline"
                        >
                          삭제
                        </button>
                      </div>
                    </div> */}
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

          <div>
            <span>
              <Link href="">회원탈퇴</Link>
            </span>
          </div>
        </div>

        {/* 소셜 연결 */}
        {/* <ul>
          <li>
            <dl>
              <dt>
                네이버
                <Image src="" alt="네이버" className="" />
              </dt>
              <dd>
                <Link href="">
                  <Image src="" alt="연결하기" className="" />
                </Link>
                <Link href="">
                  <Image src="" alt="연결끊기" className="" />
                </Link>
              </dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>
                카카오
                <Image src="" alt="카카오" className="" />
              </dt>
              <dd>
                <Link href="">
                  <Image src="" alt="연결하기" className="" />
                </Link>
                <Link href="">
                  <Image src="" alt="연결끊기" className="" />
                </Link>
              </dd>
            </dl>
          </li>
        </ul> */}

        {/* <div>
          <Link href="">취소</Link>
          <Link href="">수정</Link>
        </div> */}
      </section>
    </div>
  );
};

export default MyInfo;
