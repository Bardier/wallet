import "./NewCard.scss";

import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setCard } from "../../store/storeSlice";

import { useState } from "react";

function NewCard() {
  const dispatch = useDispatch();

  const [cardNumber, setCardNumber] = useState("5168123412341234");
  const [cardDate, setCardDate] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [cardAmount, setCardAmount] = useState("");
  const [cardCurrency, setCardCurrency] = useState("currency");

  // * Form Errors
  const [numberError, setNumberError] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [cvcError, setCvcError] = useState(false);
  const [amountError, setAmountError] = useState(false);
  const [currencyError, setCurrencyError] = useState(false);

  const formHandler = (e) => {
    e.preventDefault();
    if (checkingForm()) return;

    console.log(getCardInfo());
  };

  const getCardInfo = async () => {
    const api =
      "https://api.bincodes.com/bin/?format=json&api_key=205495d5d0d24045cd4ce358d8521d6e/&bin=";

    const res = await fetch(`${api}${cardNumber.slice(0, 6)}`);

    return res.data;
  };

  // !Тут по хорошему, прикрутить какуе-то билиотеку для всех input
  // * Проверка полей формы на валидность
  const checkingForm = () => {
    if (cardNumber.match(/\D/) || cardNumber.length !== 16) {
      setNumberError(true);
      return true;
    } else setNumberError(false);

    if (cardDate.length > 5 || cardDate.length < 3) {
      setDateError(true);
      return true;
    } else setDateError(false);

    if (cardCvc.match(/\D/) || cardCvc.length !== 3) {
      setCvcError(true);
      return true;
    } else setCvcError(false);

    if (isNaN(cardAmount) || !cardAmount.length) {
      setAmountError(true);
      return true;
    } else setAmountError(false);

    if (cardCurrency === "currency") {
      setCurrencyError(true);
      return true;
    } else setCurrencyError(false);

    return false;
  };

  return (
    <div className="newCard">
      <h2 className="newCard__title">Додавання картки</h2>
      <form className="form" onSubmit={formHandler}>
        <input
          type="text"
          className={numberError ? "form__number error" : "form__number"}
          placeholder="card number"
          required
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value.replace(" ", ""))}
        />
        <input
          type="text"
          className={dateError ? "form__date error" : "form__date"}
          placeholder="exp date"
          required
          value={cardDate}
          onChange={(e) => setCardDate(e.target.value)}
        />
        <input
          type="text"
          className={cvcError ? "form__cvc error" : "form__cvc"}
          placeholder="cvc"
          required
          value={cardCvc}
          onChange={(e) => setCardCvc(e.target.value)}
        />
        <input
          type="text"
          className="form__holder"
          placeholder="card holder"
          value={cardHolder}
          onChange={(e) => setCardHolder(e.target.value)}
        />
        <input
          type="text"
          className={amountError ? "form__amount error" : "form__amount"}
          placeholder="amount"
          required
          value={cardAmount}
          onChange={(e) => setCardAmount(e.target.value)}
        />
        <select
          className={currencyError ? "form__currency error" : "form__currency"}
          value={cardCurrency}
          onChange={(e) => setCardCurrency(e.target.value)}
        >
          <option value="currency" disabled>
            currency
          </option>
          <option value="UAH">UAH</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>
        <div className="form__btns-wrapper">
          <button className="btn btn--add" type="submit">
            Додати картку
          </button>
          <Link to="/cards" className="btn btn--remove">
            Скасувати
          </Link>
        </div>
      </form>
    </div>
  );
}

export default NewCard;
