import { createSlice, type PayloadAction,  } from "@reduxjs/toolkit";
import type { ProductType, ShopCartType } from "../@types";

interface InitialStateType {
  data: ShopCartType[]; 
  wishlist: ProductType[];
  coupon: number; 
}



const getStoredData = <T>(key: string): T[] => {
  try {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : [];
  } catch (error) {
    console.log(error);
    
    return [];
  }
};


const initialState: InitialStateType = {
  data: getStoredData<ShopCartType>("shop"),
  wishlist: getStoredData<ProductType>("wishlist"),
  coupon: 0,
};

const shopSlice = createSlice({
  name: "shop-slice",
  initialState,
  reducers: {
    getData(state, action: PayloadAction<ProductType & { counter?: number }>) {
      const existingItem = state.data.find(
        (item) => item._id === action.payload._id
      );

      if (existingItem) {
        existingItem.counter += action.payload.counter || 1;
        existingItem.userPrice = existingItem.price * existingItem.counter;
      } else {
        const newItem: ShopCartType = {
          ...action.payload,
          counter: action.payload.counter || 1,
          userPrice: action.payload.price * (action.payload.counter || 1),
        };
        state.data.push(newItem);
      }
      localStorage.setItem("shop", JSON.stringify(state.data));
    },

    deleteData(state, action: PayloadAction<string>) {
      state.data = state.data.filter((item) => item._id !== action.payload);
      localStorage.setItem("shop", JSON.stringify(state.data));
    },

    increment(state, action: PayloadAction<string>) {
      const item = state.data.find((item) => item._id === action.payload);
      if (item) {
        item.counter += 1;
        item.userPrice = item.price * item.counter;
        localStorage.setItem("shop", JSON.stringify(state.data));
      }
    },

    decrement(state, action: PayloadAction<string>) {
      const item = state.data.find((item) => item._id === action.payload);
      if (item && item.counter > 1) {
        item.counter -= 1;
        item.userPrice = item.price * item.counter;
        localStorage.setItem("shop", JSON.stringify(state.data));
      }
    },

    toggleWishlist(state, action: PayloadAction<ProductType>) {
      const index = state.wishlist.findIndex((item) => item._id === action.payload._id);
      
      if (index !== -1) {
        state.wishlist.splice(index, 1);
      } else {
        state.wishlist.push(action.payload);
      }
      localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
    },

    getCoupon(state, action: PayloadAction<number>) {
      state.coupon = action.payload;
    },
  },
});

export const { 
  getData, 
  deleteData, 
  increment, 
  decrement, 
  getCoupon, 
  toggleWishlist 
} = shopSlice.actions;

export default shopSlice.reducer;