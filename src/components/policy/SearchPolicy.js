import React from "react";
import { ToastContainer } from "react-bootstrap";
import Sidebar from "../template/Sidebar";
import Header from "../template/Header";

function SearchPolicy() {
  return (
    <div>
      <Header />
      <div id="outer-container">
        <div id="sidebar">
          <Sidebar />
        </div>
        <div id="content">
          <div className="container p-4 mt-8">
            <div className="row mt-32">
              <div className="col-md-8 offset-md-2">
                <h3 className="text-center mt-3 my-3 uppercase">
                  <b>Search Customer Account</b>
                </h3>
                <div className="card-body"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default SearchPolicy;
