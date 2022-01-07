import React from "react";
import logo from "./cronies-logo.svg";
import Home from './main/home'
import Mint from './main/mint'
import About from './main/about'
import MetaTutorial from './components/meta-tutorial'
import { BrowserRouter as Router, Route, Link, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/mint" element={<Mint />} />
            <Route path="/about" element={<About />} />
            <Route path="meta-tutorial" element={<MetaTutorial />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
