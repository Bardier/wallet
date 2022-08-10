import "./CashPopup.scss";

import { useSelector, useDispatch } from "react-redux";
import {
  selectCash,
  setCash,
  setBalance,
  refactoringCard,
} from "../../store/storeSlice";

import { useState } from "react";

function CashPopup({ active, setActive, modalFor, refactoringCardID }) {
  const [typeCurrency, setTypeCurrency] = useState("currency");
  const [amount, setAmount] = useState("");
  const [formError, setFormError] = useState(false);

  const dispatch = useDispatch();
  const currency = useSelector(selectCash);
  const currencyKeys = Object.keys(currency);

  const formHandler = (e) => {
    e.preventDefault();

    if (typeCurrency === "currency" || !amount.length || isNaN(amount)) {
      setFormError(true);
      return;
    }

    switch (modalFor) {
      case "cash":
        dispatch(setCash([typeCurrency, amount]));
        break;
      case "card":
        dispatch(refactoringCard([refactoringCardID, typeCurrency, amount]));
        break;
    }
    dispatch(setBalance());

    setTypeCurrency("currency");
    setAmount("");
    setActive(false);
    setFormError(false);
  };

  return (
    <div
      className={active ? "cash active" : "cash"}
      onClick={() => setActive(false)}
    >
      <div className="cash__content" onClick={(e) => e.stopPropagation()}>
        <form
          className={formError ? "form form--error" : "form"}
          onSubmit={(e) => formHandler(e)}
        >
          <input
            type="text"
            className="form__amount"
            placeholder="amount"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <select
            className="form__currency"
            value={typeCurrency}
            onChange={(e) => setTypeCurrency(e.target.value)}
          >
            <option value="currency" disabled>
              currency
            </option>
            {currencyKeys.map((el) => {
              return (
                <option value={el} key={el}>
                  {el}
                </option>
              );
            })}
          </select>
          <div className="form__btns-wrapper">
            <button className="btn btn--add" type="submit">
              Зберегти
            </button>
            <button
              type="button"
              className="btn btn--remove"
              onClick={() => setActive(false)}
            >
              Скасувати
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CashPopup;
