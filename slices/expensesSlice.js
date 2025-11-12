import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, addDoc, getDocs, query, where, Timestamp, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebaseConfig";

// Lấy expenses của user hiện tại
export const fetchExpenses = createAsyncThunk(
  "expenses/fetchExpenses",
  async () => {
    const q = query(
      collection(db, "expenses"),
      where("userId", "==", auth.currentUser.uid)
    );

    const snapshot = await getDocs(q);

    // Convert Firestore Timestamp -> milliseconds
    const expenses = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        amount: data.amount,
        date: data.date ? data.date.toMillis() : Date.now(),
        category: data.category || 'Khác', // Thêm category, mặc định là 'Khác'
        userId: data.userId,
      };
    });

    return expenses;
  }
);

// Thêm chi tiêu mới
export const addExpense = createAsyncThunk(
  "expenses/addExpense",
  async (expenseData) => {
    // Lưu vào Firestore
    const docRef = await addDoc(collection(db, "expenses"), {
      ...expenseData,
      userId: auth.currentUser.uid,
      date: Timestamp.now(), // Firestore Timestamp
    });

    // Trả về payload cho Redux: date là number
    return {
      id: docRef.id,
      ...expenseData,
      date: Date.now(), // milliseconds, serializable
      userId: auth.currentUser.uid,
    };
  }
);

// Xoá chi tiêu
export const deleteExpense = createAsyncThunk(
  "expenses/deleteExpense",
  async (expenseId) => {
    await deleteDoc(doc(db, "expenses", expenseId));
    return expenseId;
  }
);

// Cập nhật chi tiêu
export const updateExpense = createAsyncThunk(
  "expenses/updateExpense",
  async ({ id, ...expenseData }) => {
    await updateDoc(doc(db, "expenses", id), {
      ...expenseData,
      date: Timestamp.fromMillis(expenseData.date), // Giả sử expenseData.date là milliseconds, chuyển thành Firestore Timestamp
    });

    return { id, ...expenseData };
  }
);

const expensesSlice = createSlice({
  name: "expenses",
  initialState: {
    items: [],
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addExpense.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      })
      .addCase(updateExpense.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      });
  },
});

export default expensesSlice.reducer;