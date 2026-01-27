import { createSlice, type PayloadAction,  } from "@reduxjs/toolkit";
import type { ShopCartType } from "../@types";

interface InitialStateType {
  data: ShopCartType[];
}

const getStoredShop = (): ShopCartType[] => {
  const stored = localStorage.getItem("shop");
  return stored ? JSON.parse(stored) : [];
};

const initialState: InitialStateType = {
  data: getStoredShop(),
};

const shopSlice = createSlice({
  name: "shop-slice",
  initialState,
  reducers: {
    // Mahsulot qo'shish (Agar bor bo'lsa sonini oshiradi)
    getData(state, { payload }) {
  // Avval savatda bu mahsulot bor-yo'qligini tekshiramiz
  const existingProduct = state.data.find((item) => item._id === payload._id);

  if (existingProduct) {
    // Agar bor bo'lsa, sonini (counter) va umumiy narxini oshiramiz
    existingProduct.counter! += 1;
    existingProduct.userPrice = existingProduct.counter! * existingProduct.price;
  } else {
    // Agar yo'q bo'lsa, yangi mahsulot qilib qo'shamiz
    state.data.push({ 
      ...payload, 
      counter: 1, 
      userPrice: payload.price 
    });
  }
  // Har doim o'zgarishdan keyin LocalStorage-ni yangilaymiz
  localStorage.setItem("shop", JSON.stringify(state.data));
},

    // Mahsulotni o'chirish
    deleteProduct(state, { payload }: PayloadAction<string>) {
      state.data = state.data.filter((item) => item._id !== payload);
      localStorage.setItem("shop", JSON.stringify(state.data));
    },

    // Sonini oshirish (+)
    incrementCounter(state, { payload }: PayloadAction<string>) {
      const product = state.data.find((item) => item._id === payload);
      if (product) {
        product.counter! += 1;
        product.userPrice = product.counter! * product.price;
      }
      localStorage.setItem("shop", JSON.stringify(state.data));
    },

    // Sonini kamaytirish (-)
    decrementCounter(state, { payload }: PayloadAction<string>) {
      const product = state.data.find((item) => item._id === payload);
      if (product && product.counter! > 1) {
        product.counter! -= 1;
        product.userPrice = product.counter! * product.price;
      }
      localStorage.setItem("shop", JSON.stringify(state.data));
    },
  },
});

export const { getData, deleteProduct, incrementCounter, decrementCounter } = shopSlice.actions;
export default shopSlice.reducer;