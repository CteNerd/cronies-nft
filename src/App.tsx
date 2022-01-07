import React from "react";
import logo from "./cronies-logo.svg";
import MetaPayment from './components/meta-tutorial'
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Got a hard hat. Work is currently in progress.</p>
      </header>
      <MetaPayment />
    </div>
  );
}

export default App;
