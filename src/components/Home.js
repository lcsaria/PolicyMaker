import React from "react";
import Header from "./template/Header";
import Sidebars from "./template/Sidebar";

function Home() {
  return (
    <div>
      <Header />
      <div id="outer-container">
        <div id="sidebar">
          <Sidebars />
        </div>
        <div id="content"></div>
      </div>
    </div>
  );
}

export default Home;
