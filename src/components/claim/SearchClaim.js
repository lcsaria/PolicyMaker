import React from "react";
import Header from "../template/Header";
import Sidebar from "../template/Sidebar";

function SearchClaim() {
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

export default SearchClaim;
