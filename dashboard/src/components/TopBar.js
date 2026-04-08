import React from "react";

import Menu from "./Menu";

const TopBar = () => {
  return (
    <div className="topbar-container">
      <div className="indices-container">
        <div className="nifty">
          <p className="index">NIFTY 50</p>
          <p className="index-points">22,453.35</p>
          <p className="percent">+1.25%</p>
        </div>
        <div className="sensex">
          <p className="index">SENSEX</p>
          <p className="index-points">73,205.10</p>
          <p className="percent">+1.18%</p>
        </div>
      </div>

      <Menu />
    </div>
  );
};

export default TopBar;