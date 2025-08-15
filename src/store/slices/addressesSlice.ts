"use client";

import { Timestamp } from "firebase/firestore";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  writeBatch,
  serverTimestamp,
  getDocs,
  Unsubscribe,
} from "firebase/firestore";
import { db } from "@/firebases/firebase";
import { toMillis } from "../../components/utils/toMillis";
import type { AddressDoc, AddressCreate, AddressUpdate } from "../../components/types/address";

// ---------- 유틸: 안전한 에러 메시지 ----------
const toErrorMessage = (err: unknown): string => {
  // FirebaseError를 쓰신다면 여기에 instanceof FirebaseError 분기도 추가 가능
  if (err instanceof Error) return err.message;
  if (typeof err === "string") return err;
  return "알 수 없는 오류가 발생했습니다.";
};

// ---------- 상태 타입 ----------
type State = {
  items: AddressDoc[];
  loading: boolean;
  error: string | null;
  listeningUid: string | null;
};

const initialState: State = {
  items: [],
  loading: false,
  error: null,
  listeningUid: null,
};

// 모듈 스코프: 실시간 리스너 해제 핸들
let unsubscribe: Unsubscribe | null = null;

// ---------- Thunks ----------

/** 실시간 구독 시작 */
export const startAddressesListener = createAsyncThunk<
  void,
  { uid: string },
  { rejectValue: string }
>("addresses/startListener", async ({ uid }, { dispatch, rejectWithValue }) => {
  try {
    // 기존 리스너 해제
    if (unsubscribe) {
      unsubscribe();
      unsubscribe = null;
    }

    const colRef = collection(db, "users", uid, "addresses");
    const q = query(colRef, orderBy("createdAt", "desc"));

    unsubscribe = onSnapshot(
      q,
      (snap) => {
        const rows: AddressDoc[] = snap.docs.map((d) => {
          // d.data()는 DocumentData -> 런타임 구조 가정 하에 명시적 단언
          const data = d.data() as Record<string, unknown>;
          const createdAtMs = toMillis(data?.createdAt);

          const safeRow: AddressDoc = {
            id: d.id,
            label: (data.label as string | undefined) ?? undefined,
            receiverName: data.receiverName as string | undefined,
            phone: data.phone as string | undefined,
            zonecode: (data.zonecode as string | undefined) ?? undefined,
            address: (data.address as string) ?? "",
            detailAddress: (data.detailAddress as string | undefined) ?? undefined,
            memo: (data.memo as string | undefined) ?? undefined,
            isDefault: Boolean(data.isDefault),
            createdAt: createdAtMs, // ✅ 직렬화 안전
          };

          return safeRow;
        });
        dispatch(addressesSlice.actions.setItems(rows));
        dispatch(addressesSlice.actions.setListeningUid(uid));
      },
      (err) => {
        dispatch(addressesSlice.actions.setError(toErrorMessage(err)));
      }
    );
  } catch (err) {
    return rejectWithValue(toErrorMessage(err));
  }
});

/** 실시간 구독 해제 */
export const stopAddressesListener = createAsyncThunk("addresses/stopListener", async () => {
  if (unsubscribe) {
    unsubscribe();
    unsubscribe = null;
  }
});

/** 주소 추가 */
export const addAddress = createAsyncThunk<
  void,
  { uid: string; value: Omit<AddressDoc, "id" | "createdAt"> },
  { rejectValue: string }
>("addresses/add", async ({ uid, value }, { rejectWithValue }) => {
  try {
    const colRef = collection(db, "users", uid, "addresses");

    if (value.isDefault) {
      // 기본 배송지로 추가 → 기존 기본 해제 (배치)
      const snap = await getDocs(colRef);
      const batch = writeBatch(db);

      snap.forEach((d) => {
        const row = d.data() as Omit<AddressDoc, "id">;
        if (row.isDefault) {
          batch.update(doc(db, "users", uid, "addresses", d.id), { isDefault: false });
        }
      });

      // 새 문서 생성
      const createPayload: AddressCreate = { ...value, createdAt: serverTimestamp() };
      const newRef = doc(colRef);
      batch.set(newRef, createPayload);
      await batch.commit();
    } else {
      const createPayload: AddressCreate = { ...value, createdAt: serverTimestamp() };
      await addDoc(colRef, createPayload);
    }
  } catch (err) {
    return rejectWithValue(toErrorMessage(err));
  }
});

/** 주소 수정 */
export const updateAddress = createAsyncThunk<
  void,
  { uid: string; id: string; value: Omit<AddressDoc, "id" | "createdAt"> },
  { rejectValue: string }
>("addresses/update", async ({ uid, id, value }, { rejectWithValue }) => {
  try {
    const ref = doc(db, "users", uid, "addresses", id);

    if (value.isDefault) {
      // 기본 변경 → 기존 기본 해제 (배치)
      const colRef = collection(db, "users", uid, "addresses");
      const snap = await getDocs(colRef);
      const batch = writeBatch(db);

      snap.forEach((d) => {
        const row = d.data() as Omit<AddressDoc, "id">;
        if (row.isDefault && d.id !== id) {
          batch.update(doc(db, "users", uid, "addresses", d.id), { isDefault: false });
        }
      });

      const updatePayload: AddressUpdate = { ...value };
      batch.update(ref, updatePayload);
      await batch.commit();
    } else {
      const updatePayload: AddressUpdate = { ...value };
      await updateDoc(ref, updatePayload);
    }
  } catch (err) {
    return rejectWithValue(toErrorMessage(err));
  }
});

/** 주소 삭제 */
export const deleteAddressById = createAsyncThunk<
  void,
  { uid: string; id: string },
  { rejectValue: string }
>("addresses/delete", async ({ uid, id }, { rejectWithValue }) => {
  try {
    await deleteDoc(doc(db, "users", uid, "addresses", id));
  } catch (err) {
    return rejectWithValue(toErrorMessage(err));
  }
});

/** 기본 배송지로 지정 (원클릭) */
export const makeDefaultAddress = createAsyncThunk<
  void,
  { uid: string; id: string },
  { rejectValue: string }
>("addresses/makeDefault", async ({ uid, id }, { rejectWithValue }) => {
  try {
    const colRef = collection(db, "users", uid, "addresses");
    const snap = await getDocs(colRef);
    const batch = writeBatch(db);

    snap.forEach((d) => {
      batch.update(doc(db, "users", uid, "addresses", d.id), {
        isDefault: d.id === id,
      });
    });

    await batch.commit();
  } catch (err) {
    return rejectWithValue(toErrorMessage(err));
  }
});

// ---------- Slice ----------
const addressesSlice = createSlice({
  name: "addresses",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<AddressDoc[]>) {
      state.items = action.payload;
      state.loading = false;
      state.error = null;
    },
    setListeningUid(state, action: PayloadAction<string>) {
      state.listeningUid = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    clear(state) {
      state.items = [];
      state.listeningUid = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(startAddressesListener.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(startAddressesListener.rejected, (s, a) => {
        s.loading = false;
        s.error = (a.payload as string) ?? "구독 시작 실패";
      })
      .addCase(stopAddressesListener.fulfilled, (s) => {
        s.listeningUid = null;
      })
      .addCase(addAddress.rejected, (s, a) => {
        s.error = (a.payload as string) ?? "추가 실패";
      })
      .addCase(updateAddress.rejected, (s, a) => {
        s.error = (a.payload as string) ?? "수정 실패";
      })
      .addCase(deleteAddressById.rejected, (s, a) => {
        s.error = (a.payload as string) ?? "삭제 실패";
      })
      .addCase(makeDefaultAddress.rejected, (s, a) => {
        s.error = (a.payload as string) ?? "기본 설정 실패";
      });
  },
});

export const { clear: clearAddresses } = addressesSlice.actions;
export default addressesSlice.reducer;
