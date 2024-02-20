import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CountState {
  number: number;
}

const initialState: CountState = {
  number: 0,
};

export const countSlice = createSlice({
  name: 'count',
  initialState,
  reducers: {
    increment: (state) => {
      state.number += 1;
    },
    decrement: (state) => {
      state.number -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.number += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = countSlice.actions;
export default countSlice.reducer;
