import { createSlice } from "@reduxjs/toolkit";

export const storeSlice = createSlice({
  name: "store",
  initialState: {
    balance: {
      UAH: 0,
      USD: 0,
      EUR: 0,
    },
    cash: {
      UAH: 0,
      USD: 0,
      EUR: 0,
    },
    cards: [],
  },
  reducers: {
    setCash: (state, data) => {
      const [currency, amount] = data.payload;
      state.cash[currency] = +amount;
    },

    setBalance: (state) => {
      state.balance.UAH = +state.cash.UAH;
      state.balance.USD = +state.cash.USD;
      state.balance.EUR = +state.cash.EUR;

      state.cards.forEach((card) => {
        state.balance.UAH += card.currency === "UAH" ? +card.balance : 0;
        state.balance.USD += card.currency === "USD" ? +card.balance : 0;
        state.balance.EUR += card.currency === "EUR" ? +card.balance : 0;
      });
    },

    setCard: (state, data) => {
      let dublCard = false;
      state.cards.forEach((card) => {
        if (card.number === data.payload.number) {
          dublCard = true;
        }
      });
      if (!dublCard) state.cards.push(data.payload);
    },

    refactoringCard: (state, data) => {
      const [id, currency, balance] = data.payload;
      state.cards.forEach((card) => {
        if (card.number === id) {
          card.currency = currency;
          card.balance = balance;
        }
      });
    },

    delCard: (state, data) => {
      state.cards = state.cards.filter((el) => el.number !== data.payload);
    },
  },
});

export const { setBalance, setCash, setCard, refactoringCard, delCard } =
  storeSlice.actions;

export const selectBalance = (state) => state.store.balance;
export const selectCash = (state) => state.store.cash;
export const selectCards = (state) => state.store.cards;

export default storeSlice.reducer;
