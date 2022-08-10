import "./Balance.scss";

import { useSelector } from "react-redux";
import { selectCash, selectCards } from "../../store/storeSlice";

function BalanceView() {
  return (
    <>
      <h2 className="balance__title">Баланс</h2>
      <ul className="balance__list">
        <li className="balance__list-item">
          <p className="balance__text">- 1 287.75 UAH</p>
        </li>
        <li className="balance__list-item">
          <p className="balance__text">- 500 USD</p>
        </li>
      </ul>
    </>
  );
}

function CashView({ setModalActive }) {
  const currency = useSelector(selectCash);
  const currencyKeys = Object.keys(currency);
  const currencyValues = Object.values(currency);

  return (
    <>
      <h2 className="balance__title">Готiвка</h2>
      <div className="balance__cash-wrapper">
        <ul className="balance__list">
          {currencyKeys.map((el, i) => {
            if (currencyValues[i] === 0) return;
            return (
              <li className="balance__list-item" key={el}>
                <p className="balance__text">
                  - {currencyValues[i]} {el}
                </p>
              </li>
            );
          })}
        </ul>
        <button className="btn btn--edit" onClick={() => setModalActive(true)}>
          редагувати
        </button>
      </div>
    </>
  );
}

function CardsView() {
  const cardsArr = useSelector(selectCards);

  return (
    <>
      {cardsArr.length ? (
        <>
          <h2 className="balance__title">Мої картки</h2>
          <ul className="balance__list">
            {cardsArr.map((card) => (
              <li className="balance__list-item" key={card.number}>
                <p className="balance__text">
                  - <span>{card.bank}</span> {card.balance} {card.currency}
                </p>
                <button className="btn btn--edit">редагувати</button>
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </>
  );
}

function Balance({ setModalActive }) {
  return (
    <div className="balance">
      <div className="wrapper">
        <BalanceView />
        <CashView setModalActive={setModalActive} />
        <CardsView />
      </div>
    </div>
  );
}

export default Balance;
