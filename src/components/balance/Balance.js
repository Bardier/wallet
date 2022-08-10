import "./Balance.scss";

import { useSelector, useDispatch } from "react-redux";
import {
  selectBalance,
  selectCash,
  selectCards,
  setBalance,
} from "../../store/storeSlice";

function BalanceView() {
  const balance = useSelector(selectBalance);
  const balanceKeys = Object.keys(balance);
  const balanceValues = Object.values(balance);

  let showBalance = false;
  balanceValues.forEach((el) => {
    if (el !== 0) {
      showBalance = true;
    }
  });

  return (
    <>
      <h2 className="balance__title">Баланс</h2>
      <ul className="balance__list">
        {showBalance ? (
          balanceKeys.map((el, i) => {
            if (balanceValues[i] === 0) return;
            return (
              <li className="balance__list-item" key={el}>
                <p className="balance__text">
                  -{" "}
                  {`${balanceValues[i]}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
                  {el}
                </p>
              </li>
            );
          })
        ) : (
          <p className="balance__text">Баланс 0</p>
        )}
      </ul>
    </>
  );
}

function CashView({ setModalActive, setModalFor }) {
  const currency = useSelector(selectCash);
  const currencyKeys = Object.keys(currency);
  const currencyValues = Object.values(currency);

  let showCurrency = false;
  currencyValues.forEach((el) => {
    if (el !== 0) {
      showCurrency = true;
    }
  });

  return (
    <>
      <h2 className="balance__title">Готiвка</h2>
      <div className="balance__cash-wrapper">
        <ul className="balance__list">
          {showCurrency ? (
            currencyKeys.map((el, i) => {
              if (currencyValues[i] === 0) return;
              return (
                <li className="balance__list-item" key={el}>
                  <p className="balance__text">
                    -{" "}
                    {`${currencyValues[i]}`.replace(
                      /\B(?=(\d{3})+(?!\d))/g,
                      " "
                    )}{" "}
                    {el}
                  </p>
                </li>
              );
            })
          ) : (
            <p className="balance__text">Нема готiвки</p>
          )}
        </ul>
        <button
          className="btn btn--edit"
          onClick={() => {
            setModalActive(true);
            setModalFor("cash");
          }}
        >
          редагувати
        </button>
      </div>
    </>
  );
}

function CardsView({ setModalActive, setModalFor, setRefactoringCardID }) {
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
                  - <span>{card.bank}</span>{" "}
                  {card.balance.replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
                  {card.currency}
                </p>
                <button
                  className="btn btn--edit"
                  onClick={() => {
                    setModalActive(true);
                    setModalFor("card");
                    setRefactoringCardID(card.number);
                  }}
                >
                  редагувати
                </button>
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </>
  );
}

function Balance({ setModalActive, setModalFor, setRefactoringCardID }) {
  const dispatch = useDispatch();
  dispatch(setBalance());
  return (
    <div className="balance">
      <div className="wrapper">
        <BalanceView />
        <CashView setModalActive={setModalActive} setModalFor={setModalFor} />
        <CardsView
          setModalActive={setModalActive}
          setModalFor={setModalFor}
          setRefactoringCardID={setRefactoringCardID}
        />
      </div>
    </div>
  );
}

export default Balance;
