import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

function Content() {
  return (
    <div>
      <Header />
      <div id="outer-container">
        <div id="sidebar">
          <Sidebar />
        </div>
        <div id="content"></div>
      </div>
    </div>
  );
}

export default Content;
