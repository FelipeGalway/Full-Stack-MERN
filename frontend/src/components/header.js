import React from "react";
import "./styles.css";

export default function Header() {
  return (
    <header>
      <div className="header-content">
        <img src="/img/Avatar.png" alt="Avatar" className="avatar" />
        <span>Felipe Ferreira &copy;</span>
      </div>
    </header>
  );
}
