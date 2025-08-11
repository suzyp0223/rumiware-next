"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { updateDoc, doc } from "firebase/firestore";

import { RootState } from "@/store/store";
import { auth, db } from "@/firebases/firebase";
import {
  type UserState,
  type EmailUser,
  fetchUserProfile,
  setUser,
} from "@/store/slices/userSlice";

import Image from "next/image";
import Link from "next/link";

import KakaoMap from "../maps/KakaoMap";
import MyPageSideNav from "./MyPageSideNav";
import { onAuthStateChanged } from "firebase/auth";
import { useAppDispatch } from "@/hooks/hooks";
import { useRouter } from "next/navigation";

const MyInfo = () => {
  const [smsSelected, setSmsSelected] = useState<string>("yesSms");
  const [emailSelected, setEmailSelected] = useState<string>("yesEmail");
  const [genderSelected, setGenderSelected] = useState<string>("non");

  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false); // ✅ 저장 중 표시용

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [nationality, setNationality] = useState("");

  const [cancel, setCancel] = useState("");

  const router = useRouter();
  const dispatch = useAppDispatch();
  // const { user } = useSelector((state: RootState) => state.userReducer);
  const { user, initialized, isLoggedIn, loading } = useSelector((s: RootState) => s.userReducer);
  console.log("마이인포 user정보: ", user);

  const isEmailUser = (user: UserState): user is EmailUser => {
    return "email" in user && "name" in user;
  };
  if (user && !isEmailUser(user)) {
    console.log("이 사용자는 소셜 로그인 유저입니다!");
  }

  // useEffect(() => {
  //   if (user && isEmailUser(user)) {
  //     setName(user.name ?? "");
  //     setPhone(user.phoneNumber ?? "");
  //     setBirthDate(user.birthDate ?? "");
  //     setGender(user.gender ?? "");
  //     setNationality(user.nationality ?? "");
  //   } else if (user) {
  //     // 소셜(전화번호 로그인) 유저의 경우
  //     setPhone(user.provider ?? "");
  //   }
  // }, [user]);

  let phoneValue = "";
  let phone1 = "";
  let phone2 = "";
  let birth = "";
  let birthY = "";
  let birthM = "";
  let birthD = "";
  let genderValue = "";
  if (initialized && user && user.type === "email") {
    phone1 = user.phoneNumber.slice(3, 7);
    phone2 = user.phoneNumber.slice(7, 11);
    phoneValue = "010" + "-" + phone1 + "-" + phone2;
    console.log("phoneValue: ", phoneValue);

    birthY = user.birthDate.slice(0, 2);
    console.log("birthY: ", birthY);
    birthM = user.birthDate.slice(2, 4);
    console.log("birthM: ", birthM);
    birthD = user.birthDate.slice(4, 6);
    console.log("birthD: ", birthD);

    birth = user.birthDate;
    console.log("birth: ", birth);
    genderValue = user.gender;
  }

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

  const handleSaveName = async () => {
    if (!user || user.type !== "email") return;
    try {
      setSaving(true);
      const ref = doc(db, "users", user.uid);
      await updateDoc(ref, { name });

      dispatch(setUser({ ...user, name }));
    } catch (e) {
      console.error("이름 저장 오류:", e);
    } finally {
      setSaving(false); // ★ 변경
    }
  };

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
                <tr className="border-y border-gray-300 ">
                  <th className="bg-peach-100 px-5 py-4 align-middle text-left whitespace-nowrap">
                    <label htmlFor="hname" className="head-cell">
                      <span className="text-red-400 "></span>&nbsp;이름
                    </label>
                  </th>
                  <td className="pl-2 align-middle">
                    {user && user.type === "email" && (
                      <>
                        <input
                          type="text"
                          className="w-[200px] border-gray-300 outline-none px-4 py-2 border-b hover:border-b-peach-600 focus:border-b-peach-600"
                          id="hname"
                          size={15}
                          maxLength={30}
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                        <button
                          type="button"
                          onClick={handleSaveName} // ★ 변경: 저장
                          disabled={saving || name.trim() === ""}
                          className="ml-4 px-3 py-1 text-sm border border-gray-300 hover:border-peach-300 hover:text-gray-800 rounded"
                        >
                          {saving ? "저장중..." : "저장"}
                        </button>
                      </>
                    )}
                  </td>
                </tr>

                <tr className="border-b border-gray-300 ">
                  <th className="bg-peach-100 px-5 py-4 align-middle text-left whitespace-nowrap">
                    <label htmlFor="id" className="head-cell">
                      &nbsp;아이디
                      <br />
                      (이메일)
                    </label>
                  </th>
                  <td className="p-2 m-4 align-middle">
                    <span className="inline-block px-4 py-2">{user.email}</span>
                    <input type="hidden" className="p-4" id="id" value="suzy2020" />
                    <Link
                      href={""}
                      className="m-2 p-2 text-sm border border-gray-300 hover:border-peach-300 hover:text-gray-800 rounded"
                    >
                      이메일 변경
                    </Link>
                    <Link
                      href={""}
                      className="m-2 p-2 text-xs border border-gray-300 hover:border-peach-600 hover:text-gray-800 rounded hidden"
                    >
                      이메일 변경 취소
                    </Link>
                    <div className="p-2 w-[600px]">
                      <input
                        type="text"
                        className="w-[300px] border-gray-300 outline-none p-2 border-b hover:border-b-peach-600 focus:border-b-peach-600"
                      />

                      {/* 인증메일 전송 버튼 클릭시 이멜중복검사 통과시 인증메일 전송 */}
                      <button
                        type="submit"
                        className="ml-4 p-2 text-sm border border-gray-300 hover:border-peach-300 hover:text-gray-800 rounded"
                      >
                        인증메일 전송
                      </button>
                    </div>
                  </td>
                </tr>

                {!isSocialUser && (
                  <>
                    <tr className="border-b border-gray-300 ">
                      <th className="bg-peach-100 px-5 py-4 align-middle text-left whitespace-nowrap">
                        <label htmlFor="password1" className="head-cell">
                          <span className="text-red-400">*</span>&nbsp;비밀번호
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

                    {/* <tr className="border-b border-gray-300 ">
                    <th className="bg-peach-100 px-5 py-4 align-middle text-left">
                      <label htmlFor="password2" className="">
                        <span className="text-red-400">*</span>&nbsp;비밀번호 확인
                      </label>
                    </th>
                    <td className="p-4 pb-0">
                      <input
                        type="password"
                        className="outline-none border-b w-[200px] border-gray-300 hover:border-b-peach-600 focus:border-b-peach-600 p-2 text-base"
                        id="password2"
                      />
                      <span className="block text-sm text-red-500 pb-2 pl-2">
                        비밀번호가 일치하지 않습니다.
                      </span>
                    </td>
                  </tr> */}
                  </>
                )}

                <tr className="border-b border-gray-300 ">
                  <th className="bg-peach-100 px-5 py-4 align-middle text-left whitespace-nowrap">
                    <label className="head-cell">
                      <span className="text-red-400">*</span>&nbsp;휴대폰
                    </label>
                  </th>
                  <td className="p-4 align-middle">
                    <input
                      type="text"
                      className="outline-none w-[200px] mx-2 px-2 border-b border-gray-300 hover:border-b-peach-600 focus:border-b-peach-600"
                      id="etcphone"
                      size={11}
                      maxLength={11}
                      value={user && user.type === "email" ? user.phoneNumber : ""}
                    />
                    {/* <select className="outline-none border-b border-gray-300 hover:border-b-peach-600 focus:border-b-peach-600 p-1 mr-4">
                      <option value="">선택</option>
                      <option value="010">010</option>
                      <option value="011">011</option>
                      <option value="011">016</option>
                      <option value="011">017</option>
                      <option value="011">018</option>
                      <option value="011">019</option>
                    </select>
                    -
                    <input
                      type="text"
                      className="outline-none w-[80px] mx-2 px-2 border-b border-gray-300 hover:border-b-peach-600 focus:border-b-peach-600"
                      id="etcphone2"
                      size={4}
                      maxLength={4}
                    />
                    -
                    <input
                      type="text"
                      className="outline-none w-[80px] mx-2 px-2 border-b border-gray-300 hover:border-b-peach-600 focus:border-b-peach-600"
                      id="etcphone3"
                      size={4}
                      maxLength={4}
                    /> */}
                  </td>
                </tr>
                <tr className="border-b border-gray-300 ">
                  <th className="bg-peach-100 px-5 py-4 align-middle text-left whitespace-nowrap">
                    <label className="head-cell">
                      <span className="text-red-400">*</span>&nbsp;수신설정
                    </label>
                  </th>
                  <td className="p-4 align-middle">
                    <div className="p-2 mt-4">
                      <span className="text-sm">이메일 수신 여부</span>
                      <label
                        className={`inline-block  pr-6 whitespace-nowrap pl-6 ${
                          emailSelected === "yes" ? "text-peach-600" : "text-black"
                        }`}
                      >
                        <input
                          type="radio"
                          name="emailAdd"
                          value="yesEmail"
                          checked={emailSelected === "yesEmail"}
                          onChange={(e) => setEmailSelected(e.target.value)}
                          className="mr-1 accent-peach-600"
                        />
                        <span className="text-sm">수신함</span>
                      </label>
                      <label
                        className={`inline-block  pr-6 whitespace-nowrap ${
                          emailSelected === "no" ? "text-peach-600" : "text-black"
                        }`}
                      >
                        <input
                          type="radio"
                          name="emailAdd"
                          value="noEmail"
                          checked={emailSelected === "noEmail"}
                          onChange={(e) => setEmailSelected(e.target.value)}
                          className="mr-1 accent-peach-600"
                        />
                        <span className="text-sm">수신안함</span>
                      </label>
                    </div>
                    <div className="p-2 mt-4">
                      <span className="text-sm">문자 수신 여부</span>
                      <label
                        className={`inline-flex items-center px-6 cursor-pointer ${
                          smsSelected === "yes" ? "text-peach-600" : "text-black"
                        }`}
                      >
                        <input
                          type="radio"
                          name="sms"
                          value="yesSms"
                          checked={smsSelected === "yesSms"}
                          onChange={(e) => setSmsSelected(e.target.value)}
                          className="mr-1 accent-peach-600"
                        />
                        <span className="text-sm">수신함</span>
                      </label>
                      <label
                        className={`inline-flex items-center cursor-pointer ${
                          smsSelected === "no" ? "text-peach-600" : "text-black"
                        }`}
                      >
                        <input
                          type="radio"
                          name="sms"
                          value="noSms"
                          checked={smsSelected === "noSms"}
                          onChange={(e) => setSmsSelected(e.target.value)}
                          className="mr-1 accent-peach-600"
                        />
                        <span className="text-sm">수신안함</span>
                      </label>
                    </div>
                  </td>
                </tr>

                <tr className="border-b border-gray-300 ">
                  <th className="bg-peach-100 px-5 py-4 align-middle text-left whitespace-nowrap">
                    <label htmlFor="birthYear" className="">
                      &nbsp;생년월일
                    </label>
                  </th>
                  <td className="p-4 align-middle">
                    <span className="outline-none border-b border-gray-300 hover:border-b-peach-600 focus:border-b-peach-600 p-2 mr-2">
                      {birthY ? `${birthY} 년` : "-"}
                    </span>
                    <span className="outline-none border-b border-gray-300 hover:border-b-peach-600 focus:border-b-peach-600 p-2 mr-2">
                      {birthM ? `${birthM} 월` : "-"}
                    </span>
                    <span className="outline-none border-b border-gray-300 hover:border-b-peach-600 focus:border-b-peach-600 p-2 mr-2">
                      {birthD ? `${birthD} 일` : "-"}
                    </span>
                  </td>
                </tr>

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

                <tr className="border-b border-gray-300 ">
                  <th className="bg-peach-100 px-5 py-4 align-middle text-left whitespace-nowrap">
                    <label htmlFor="address" className="">
                      <span className="text-red-400">*</span>&nbsp;주소
                    </label>
                  </th>

                  <KakaoMap />
                </tr>

                {/* 0개 + 버튼만 2개이상은 1개만 보여주고 더보기 구현 */}
                <tr className="border-b border-gray-300 ">
                  <th className="bg-peach-100 px-5 py-4 align-middle text-left whitespace-nowrap">
                    <label className="" htmlFor="email1">
                      <span className="text-red-400">*</span>&nbsp;배송지
                    </label>
                  </th>
                  <td className="pl-4 py-4 align-middle">
                    <div className="relative p-2 m-2">
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
                            <span>집</span>
                          </div>
                          <div className="inline">
                            <span className="hidden">수령인</span>
                            <span className="font-bold  mr-2">박수지</span>
                            <span>&nbsp;|&nbsp; </span>
                          </div>
                          <div className="inline ml-2">
                            <span className="hidden">연락처</span>
                            <span className="font-bold ">010-1234-5678</span>
                          </div>
                          <div className="mt-2">
                            <span className="hidden">주소</span>
                            <span>
                              서울 중구 세종대로 110 서울특별시청 서울 중구 세종대로 110
                              서울특별시청{" "}
                            </span>
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
                    </div>
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
        <ul>
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
        </ul>

        <div>
          <Link href="">취소</Link>
          <Link href="">수정</Link>
        </div>
      </section>
    </div>
  );
};

export default MyInfo;
