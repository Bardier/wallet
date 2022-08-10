import "./NewCard.scss";

import { useSelector, useDispatch } from "react-redux";
import { setCard, selectCards } from "../../store/storeSlice";

import { useState } from "react";

function NewCard({ setCreateNewCard }) {
  const dispatch = useDispatch();
  const cardsArr = useSelector(selectCards);

  const [cardNumber, setCardNumber] = useState("");
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

  const formHandler = async (e) => {
    e.preventDefault();
    if (checkingForm()) return;

    await fetch(`https://lookup.binlist.net/${cardNumber}`)
      .then((res) => res.json())
      .then((data) => {
        let bank;

        try {
          bank = data.bank.name;
        } catch (e) {
          bank = "Unknown Bank";
        }

        const newCard = {
          number: cardNumber,
          bank: bank,
          paymentSystem: data.scheme,
          balance: cardAmount,
          currency: cardCurrency,
          type: data.type,
          date: cardDate,
        };

        dispatch(setCard(newCard));

        setCreateNewCard(false);
      })
      .catch(() => {
        console.log("Error!");
        setNumberError(true);
      });
  };

  const checkingForm = () => {
    // * Проверка на дубли карт в store
    let dublCard = false;
    cardsArr.forEach((card) => {
      if (card.number === cardNumber) dublCard = true;
    });
    if (dublCard) {
      setNumberError(true);
      return true;
    } else setNumberError(false);

    // !Тут по хорошему, прикрутить какуе-то билиотеку для всех input
    // * Проверка полей формы на валидность
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
          <button
            className="btn btn--remove"
            type="button"
            onClick={() => setCreateNewCard(false)}
          >
            Скасувати
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewCard;
