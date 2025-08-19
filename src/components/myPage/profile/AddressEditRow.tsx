"use client";

import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/hooks/hooks";
import type { RootState } from "../../../store/store"; // ✅ 프로젝트 경로에 맞게 수정
import {
  startAddressesListener,
  stopAddressesListener,
  makeDefaultAddress,
  deleteAddressById,
  updateAddress,
  addAddress,
} from "@/store/slices/addressesSlice"; // ✅ clearAddresses도 함께 임포트
import { AddressDoc } from "@/components/types/address";
import { handleAddressSearch } from "@/hooks/useAddressSearch";

export type AddressFormValue = Omit<AddressDoc, "id" | "createdAt">;

type Props = {
  onChange?: (v: AddressFormValue | null) => void; // 부모에 임시 주소 전달
  showActions?: boolean; // 목록/수정/삭제/기본지정 같은 액션 노출 여부
};

export default function AddressEditRow({ onChange, showActions = true }: Props) {
  const dispatch = useAppDispatch();

  // ✅ 로그인 유저 uid 가져오기 (userReducer 이름은 프로젝트에 맞게)
  const { user, isLoggedIn } = useSelector((s: RootState) => s.userReducer);
  const uid = user?.uid ?? null;

  // ✅ 주소 상태 구독
  const { items, loading, error, listeningUid } = useSelector((s: RootState) => s.addressesReducer);

  const [isOpen, setIsOpen] = useState(false); // ✅ 변경
  const [mode, setMode] = useState<"add" | "edit">("add"); // ✅ 변경
  const [editingId, setEditingId] = useState<string | null>(null); // ✅ 변경
  const [form, setForm] = useState<AddressFormValue>({
    label: "",
    receiverName: "",
    phone: "",
    zonecode: "",
    address: "",
    detailAddress: "",
    memo: "",
    isDefault: false,
  });

  const detailRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!showActions) return; // 가입 폼에서 임시 주소만 받을 때는 구독 불필요

    // ✅ uid가 있고, 아직 해당 uid로 구독 중이 아닐 때만 시작
    if (uid && listeningUid !== uid) {
      // console.log("[addresses] start listener with uid:", uid);
      dispatch(startAddressesListener({ uid })); // TS에서 Thunk 타입 충돌 시 as any 임시 처리
    }
  }, [uid, listeningUid, dispatch, showActions]);

  // 2) 컴포넌트 언마운트 시에만 해제
  useEffect(() => {
    if (!showActions) return;
    // ✅ 언마운트/uid 변경 시 정리
    return () => {
      // console.log("[addresses] stop listener"); // 언마운트 때만
      dispatch(stopAddressesListener());
    };
  }, [dispatch, showActions]);

  // ✅ 기본배송지를 맨 위로 정렬 (UI 편의)
  // const sorted = [...items].sort((a, b) => (b.isDefault ? 1 : 0) - (a.isDefault ? 1 : 0));
  const sorted = [...items].sort((a, b) => {
    const byDefault = Number(b.isDefault) - Number(a.isDefault);
    if (byDefault !== 0) return byDefault;
    return (b.createdAt ?? 0) - (a.createdAt ?? 0);
  });

  if (showActions && (!isLoggedIn || !uid)) {
    return <p className="text-sm text-gray-500 px-4">로그인 후 배송지를 관리하실 수 있습니다.</p>;
  }

  if (showActions && !listeningUid && loading) {
    return <p className="text-sm text-gray-500 px-4">배송지 불러오는 중…</p>;
  }

  if (showActions && error) {
    return <p className="text-sm text-red-600 px-4">오류: {error}</p>;
  }

  const setFormAndNotify = (updater: (f: AddressFormValue) => AddressFormValue) => {
    setForm((prev) => {
      const next = updater(prev);
      onChange?.(next); // 부모(JoinForm)에 즉시 반영
      return next;
    });
  };

  // 🔶 모달 열기: 추가 / 수정
  const openAddModal = () => {
    setMode("add"); // ✅ 변경
    setEditingId(null); // ✅ 변경
    const initial: AddressFormValue = {
      label: "",
      receiverName: "",
      phone: "", // 🔧 가입 폼에서는 부모가 phone을 채워줄 예정이라 비워둠
      zonecode: "",
      address: "",
      detailAddress: "",
      memo: "",
      isDefault: items.length === 0,
    };
    setForm(initial);
    onChange?.(initial); // 🔧 변경: 초기값도 부모에 전달
    setIsOpen(true);
  };

  const openEditModal = (addr: AddressDoc) => {
    setMode("edit"); // ✅ 변경
    setEditingId(addr.id); // ✅ 변경
    const next: AddressFormValue = {
      label: addr.label ?? "",
      receiverName: addr.receiverName ?? "",
      phone: addr.phone ?? "",
      zonecode: addr.zonecode ?? "",
      address: addr.address,
      detailAddress: addr.detailAddress ?? "",
      memo: addr.memo ?? "",
      isDefault: !!addr.isDefault,
    };
    setForm(next);
    onChange?.(next);
    setIsOpen(true);
  };

  // 🔶 모달 onSubmit → 디스패치
  const handleSubmit = async () => {
    if (!uid) return;

    // 간단 유효성 (address 필수)
    if (!form.address.trim()) {
      alert("주소를 입력해 주세요.");
      return;
    }

    if (!showActions) {
      // 가입폼 모드: DB에 쓰지 않고 부모로만 전달
      onChange?.(form);
      setIsOpen(false);
      return;
    }

    // 관리 모드: Firestore에 반영
    if (!uid) return;

    if (mode === "add") {
      await dispatch(addAddress({ uid, value: form }));
    } else if (mode === "edit" && editingId) {
      await dispatch(updateAddress({ uid, id: editingId, value: form }));
    }
    setIsOpen(false);
  };

  // 🔶 기본지정/삭제
  const handleMakeDefault = (id: string) => {
    if (!showActions || !uid) return;
    dispatch(makeDefaultAddress({ uid, id }));
  };

  const handleDelete = (id: string) => {
    if (!showActions || !uid) return;
    dispatch(deleteAddressById({ uid, id }));
  };

  // 🔶 다음 주소검색
  const handleSearchAddress = () => {
    // detailRef로 포커스, zonecode/address는 setForm으로 갱신
    handleAddressSearch(
      detailRef, // ref 직접 전달
      (code) => setForm((f) => ({ ...f, zonecode: code })),
      (addr) => setForm((f) => ({ ...f, address: addr }))
    );
  };

  return (
    <>
      <div className="relative p-2 m-2">
        {/* 🔧 변경점: 버튼 핸들러 연결은 나중에 addAddress 디스패치로 연결 */}
        <button
          type="button"
          className="border border-gray-300 rounded p-2 w-[600px] mb-6"
          onClick={openAddModal}
        >
          <span className="before:content-['+'] before:mr-2">배송지 추가하기</span>
        </button>

        {showActions && (
          <>
            <h4 className="for-a11y hidden">배송지목록</h4>
            {sorted.length === 0 ? (
              <p className="text-sm text-gray-500">등록된 배송지가 없습니다. 추가해 주세요.</p>
            ) : (
              <ul className="w-[500px] space-y-4">
                {sorted.map((addr) => (
                  <li key={addr.id} className="border-b border-gray-200 pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{addr.label ?? "배송지"}</span>
                        {addr.isDefault && (
                          <span className="text-xs text-white bg-blue-600 rounded px-2 py-0.5">
                            기본
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          className="px-3 py-1 rounded border border-blue-600 text-sm text-blue-600 hover:underline"
                          onClick={() => openEditModal(addr)}
                        >
                          수정
                        </button>

                        {!addr.isDefault && (
                          <button
                            type="button"
                            className="text-sm text-green-600 border border-green-600 px-3 py-1 rounded hover:underline"
                            onClick={() => handleMakeDefault(addr.id)}
                          >
                            기본지정
                          </button>
                        )}

                        <button
                          type="button"
                          className="text-sm text-red-500 border border-red-500 px-3 py-1 rounded hover:underline"
                          onClick={() => handleDelete(addr.id)}
                        >
                          삭제
                        </button>
                      </div>
                    </div>

                    <div className="mt-2 text-sm">
                      <div>
                        <span className="font-bold mr-2">{addr.receiverName ?? ""}</span>
                        <span>&nbsp;|&nbsp;</span>
                        <span className="ml-2 font-bold">{addr.phone ?? ""}</span>
                      </div>
                      <div className="mt-1">
                        <span>
                          {addr.zonecode
                            ? `[${addr.zonecode}] ${addr.address} ${
                                addr.detailAddress ?? ""
                              }`.trim()
                            : `${addr.address} ${addr.detailAddress ?? ""}`.trim()}
                        </span>
                      </div>
                      {addr.memo && <div className="mt-1 text-gray-500">메모: {addr.memo}</div>}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}

        {/* ✅ 모달 (간단 예시) */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-[1000] flex items-center justify-center"
            role="dialog"
            aria-modal="true"
          >
            <div className="bg-white w-[560px] max-w-[95vw] rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-semibold mb-4">
                {mode === "add" ? "배송지 추가" : "배송지 수정"}
              </h3>

              <div className="grid grid-cols-1 gap-3">
                <div>
                  <label className="text-sm text-gray-600">배송지명</label>
                  <input
                    className="w-full border-b outline-none px-2 py-2"
                    value={form.label ?? ""}
                    onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm text-gray-600">수령인</label>
                    <input
                      className="w-full border-b outline-none px-2 py-2"
                      value={form.receiverName ?? ""}
                      onChange={(e) => setForm((f) => ({ ...f, receiverName: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">연락처</label>
                    <input
                      className="w-full border-b outline-none px-2 py-2"
                      value={form.phone ?? ""}
                      onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                      placeholder="010-0000-0000"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-[1fr_auto] gap-3 items-end">
                  <div>
                    <label className="text-sm text-gray-600">우편번호</label>
                    <input
                      className="w-full border-b outline-none px-2 py-2"
                      value={form.zonecode ?? ""}
                      onChange={(e) => setForm((f) => ({ ...f, zonecode: e.target.value }))}
                      placeholder="00000"
                    />
                  </div>
                  <button
                    type="button"
                    className="border px-3 py-2 rounded hover:bg-gray-50"
                    onClick={handleSearchAddress} // ✅ 변경: 다음 주소검색
                  >
                    주소검색
                  </button>
                </div>

                <div>
                  <label className="text-sm text-gray-600">주소</label>
                  <input
                    className="w-full border-b outline-none px-2 py-2"
                    value={form.address}
                    onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                    placeholder="도로명/지번 주소"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-600">상세주소</label>
                  <input
                    ref={detailRef}
                    className="w-full border-b outline-none px-2 py-2"
                    value={form.detailAddress ?? ""}
                    onChange={(e) => setForm((f) => ({ ...f, detailAddress: e.target.value }))}
                    placeholder="동/호수 등"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-600">메모</label>
                  <input
                    className="w-full border-b outline-none px-2 py-2"
                    value={form.memo ?? ""}
                    onChange={(e) => setForm((f) => ({ ...f, memo: e.target.value }))}
                    placeholder="부재 시 문 앞에 놓아주세요"
                  />
                </div>

                <label className="inline-flex items-center gap-2 mt-2">
                  <input
                    type="checkbox"
                    checked={!!form.isDefault}
                    onChange={(e) => setForm((f) => ({ ...f, isDefault: e.target.checked }))}
                  />
                  <span className="text-sm">기본 배송지로 설정</span>
                </label>
              </div>

              <div className="mt-6 flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 rounded border hover:bg-gray-50"
                  onClick={() => setIsOpen(false)}
                >
                  취소
                </button>
                <button
                  type="button"
                  className="px-4 py-2 rounded bg-peach-500 text-white hover:opacity-90"
                  onClick={handleSubmit} // ✅ 변경: 모달 onSubmit → 디스패치
                >
                  {mode === "add" ? "추가" : "수정"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
