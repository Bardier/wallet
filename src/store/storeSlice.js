import { createSlice } from "@reduxjs/toolkit";

export const storeSlice = createSlice({
  name: "store",
  initialState: {
    balance: {
      UAH: "0",
      USD: 0,
      EUR: 0,
    },
    cash: {
      UAH: "0",
      USD: 0,
      EUR: 0,
    },
    cards: [
      {
        number: "5168 1234 1234 1234",
        bank: "Mono",
        paymentSystem: "VISA",
        balance: "287.5",
        currency: "UAH",
        type: "debit",
        date: "10/11",
      },
      {
        number: "5168 1234 1234 3211",
        bank: "Private",
        paymentSystem: "VISA",
        balance: "2287.5",
        currency: "UAH",
        type: "debit",
        date: "10/11",
      },
    ],
  },
  reducers: {
    setCash: (state, data) => {
      state.cash[data.payload[0]] = +data.payload[1];
    },

    setBalance: (state) => {},

    setCard: (state, data) => {
      console.log(data.payload);
    },

    delCard: (state, data) => {
      state.cards = state.cards.filter((el) => el.number !== data.payload);
    },
  },
});

export const { setBalance, setCash, setCard, delCard } = storeSlice.actions;

export const selectBalance = (state) => state.store.balance;
export const selectCash = (state) => state.store.cash;
export const selectCards = (state) => state.store.cards;

export default storeSlice.reducer;
