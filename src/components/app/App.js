import "./App.scss";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Balance from "../balance/Balance";
import Cards from "../cards/Cards";
import NewCard from "../newCard/NewCard";
import CashPopup from "../cashPopup/CashPopup";

function App() {
  const [modalActive, setModalActive] = useState(false);

  return (
    <div className="app">
      <Router>
        <Balance setModalActive={setModalActive} />

        <Routes>
          <Route path="/" element={<NewCard />} />
          <Route
            path="/cards"
            element={<Cards setModalActive={setModalActive} />}
          />
          {/* <Route path="*" element={<Error />} /> */}
        </Routes>
      </Router>

      <CashPopup active={modalActive} setActive={setModalActive} />
    </div>
  );
}

export default App;
