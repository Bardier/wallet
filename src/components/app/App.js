import "./App.scss";

import { useState } from "react";

import Balance from "../balance/Balance";
import Cards from "../cards/Cards";
import NewCard from "../newCard/NewCard";
import CashPopup from "../cashPopup/CashPopup";

function App() {
  const [modalActive, setModalActive] = useState(false);
  const [modalFor, setModalFor] = useState();
  const [refactoringCardID, setRefactoringCardID] = useState();
  const [createNewCard, setCreateNewCard] = useState(true);

  return (
    <div className="app">
      <Balance
        setModalActive={setModalActive}
        setModalFor={setModalFor}
        setRefactoringCardID={setRefactoringCardID}
      />
      {createNewCard ? (
        <NewCard setCreateNewCard={setCreateNewCard} />
      ) : (
        <Cards
          setModalActive={setModalActive}
          setModalFor={setModalFor}
          setCreateNewCard={setCreateNewCard}
        />
      )}

      <CashPopup
        active={modalActive}
        setActive={setModalActive}
        modalFor={modalFor}
        refactoringCardID={refactoringCardID}
      />
    </div>
  );
}

export default App;
