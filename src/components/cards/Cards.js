import "./Cards.scss";

import React from "react";
import visaImg from "../../resurse/visa.png";
import masterCardImg from "../../resurse/master_card.png";

import { useSelector, useDispatch } from "react-redux";
import { selectCards, delCard, setBalance } from "../../store/storeSlice";

import { useState, useEffect } from "react";

function Card({ card, delHandler }) {
  const dispatch = useDispatch();
  dispatch(setBalance());

  let paymentSystemRender = null;
  if (card.paymentSystem === "visa") {
    paymentSystemRender = React.createElement("img", {
      src: visaImg,
    });
  } else if (card.paymentSystem === "mastercard") {
    paymentSystemRender = React.createElement("img", {
      src: masterCardImg,
    });
  } else paymentSystemRender = card.paymentSystem;

  const [hiddenCard, setHiddenCard] = useState(true);

  const hiddenNumber = `${card.number.slice(
    0,
    4
  )} **** **** ${card.number.slice(12, 16)}`;

  const numberHandler = () => {
    setHiddenCard(() => !hiddenCard);
  };

  return (
    <div className="cards__card-wrapper">
      <ul className="cards__card card">
        <li className="card__bank">{card.bank}</li>
        <li className="card__payment-system">{paymentSystemRender}</li>
        <li className="card__balance">
          {`${card.balance}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
          {card.currency}
        </li>
        <li className="card__type">{card.type}</li>
        <li className="card__number" onClick={numberHandler}>
          {hiddenCard
            ? hiddenNumber.replace(/\B(?=(\d{4})+(?!\d))/g, " ")
            : card.number.replace(/\B(?=(\d{4})+(?!\d))/g, " ")}
        </li>
        <li
          className="card__number-copy-btn"
          onClick={() => {
            navigator.clipboard.writeText(card.number);
          }}
        >
          copy
        </li>
        <li className="card__date">{card.date}</li>
      </ul>
      <button
        className="btn btn--remove"
        onClick={() => {
          delHandler(card.number);
          dispatch(setBalance());
        }}
      >
        Видалити
      </button>
    </div>
  );
}

function Cards({ setModalActive, setCreateNewCard, setModalFor }) {
  const dispatch = useDispatch();
  const cardsArr = useSelector(selectCards);

  const [cards, setCards] = useState(useSelector(selectCards));

  useEffect(() => {
    setCards(cardsArr);
  }, [cardsArr]);

  const delHandler = (id) => {
    dispatch(delCard(id));
  };

  return (
    <div className="cards">
      <div className="cards__btns-wrapper">
        <button className="btn btn--add" onClick={() => setCreateNewCard(true)}>
          Додати картку
        </button>
        <button
          className="btn btn--add"
          onClick={() => {
            setModalActive(true);
            setModalFor("cash");
          }}
        >
          Додати готiвку
        </button>
      </div>
      {cards.map((el) => (
        <Card key={el.number} card={el} delHandler={delHandler} />
      ))}
    </div>
  );
}

export default Cards;
