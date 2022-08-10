import "./Cards.scss";

import { useSelector, useDispatch } from "react-redux";
import { selectCards, delCard } from "../../store/storeSlice";

import { Link } from "react-router-dom";

import { useState } from "react";
import { useEffect } from "react";

function Card({ card, delHandler }) {
  return (
    <div className="cards__card-wrapper">
      <ul className="cards__card card">
        <li className="card__bank">{card.bank}</li>
        <li className="card__payment-system">{card.paymentSystem}</li>
        <li className="card__balance">
          {card.balance} {card.currency}
        </li>
        <li className="card__type">{card.type}</li>
        <li className="card__number">{card.number}</li>
        <li className="card__number-copy-btn">copy</li>
        <li className="card__date">{card.date}</li>
      </ul>
      <button
        className="btn btn--remove"
        onClick={() => delHandler(card.number)}
      >
        Видалити
      </button>
    </div>
  );
}

function Cards({ setModalActive }) {
  const dispatch = useDispatch();
  const cardsArr = useSelector(selectCards);

  const [cards, setCards] = useState(useSelector(selectCards));

  useEffect(() => {
    setCards(cardsArr);
  });

  const delHandler = (id) => {
    dispatch(delCard(id));
  };

  return (
    <div className="cards">
      <div className="cards__btns-wrapper">
        <Link to="/" className="btn btn--add">
          Додати картку
        </Link>
        <button className="btn btn--add" onClick={() => setModalActive(true)}>
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
