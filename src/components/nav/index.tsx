import React from "react";
import "./nav.css";

export default function Index() {
  /* Set the width of the side navigation to 250px */
  function openNav() {
    if (document.getElementById("mySidenav")) {
      document.getElementById("mySidenav")!.style.width = "100vw";
    }
  }

  function closeNav() {
    if (document.getElementById("mySidenav"))
      document.getElementById("mySidenav")!.style.width = "0";
  }

  return (
    <div>
      <div className="menu-btn-container">
        <div className="menu-btn" onClick={() => openNav()}>
          <div className="menu-line"></div>
          <div className="menu-line"></div>
          <div className="menu-line"></div>
        </div>
      </div>

      <div id="mySidenav" className="sidenav">
        <div className="closebtn" onClick={closeNav}>
          &times;
        </div>
        <a href="/">Home</a>
        <a href="/about">Our Story</a>
        <a href="/mint">Mint</a>
        <a href="/meta-tutorial">Meta Tutorial</a>
      </div>
    </div>
  );
}
