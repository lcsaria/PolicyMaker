import React from "react";
import { ToastContainer } from "react-bootstrap";
import Sidebar from "../template/Sidebar";
import Header from "../template/Header";

function SearchPolicy() {
  const handleSubmit = () => {};
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
                  <b>Search Policy</b>
                </h3>
                <div className="card-body">
                  <div className="grid-cols-3 lg:grid">
                    <div className="w-full px-3">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-3">
                        Policy Number
                      </label>
                      <input
                        type="text"
                        className="appearance-none block w-full  border border-gray-400 rounded py-2 px-2 leading-tight outline-none focus:border-gray-500"
                        name="firstName"
                      />
                    </div>
                    <div className="w-full px-3">
                      <div className="mt-10"></div>
                      <button
                        className="appearance-none block w-full py-2 text-white bg-green-700 rounded-md  border  hover:-translate-y-1 transform transition hover:bg-green-500 focus:outline-none"
                        onClick={handleSubmit}
                      >
                        <i
                          className="fa-solid fa-magnifying-glass"
                          style={{ marginRight: "10px" }}
                        />
                        <span className="p-2">Search</span>
                      </button>
                    </div>
                    <div className="w-full px-3">
                      {/*RESET */}
                      <div className="mt-10"></div>
                      <button
                        className="appearance-none block w-full py-2 text-white bg-gray-700 rounded-md  border  hover:-translate-y-1 transform transition hover:bg-gray-500 focus:outline-none"
                        onClick={handleSubmit}
                      >
                        <i
                          className="fa-solid fa-rotate-right"
                          style={{ marginRight: "10px" }}
                        />
                        <span className="p-2">Reset</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card-body mt-10 border-1">
                  <h3 className="text-center mt-3 my-3 uppercase">
                    <b>Policy # 000000</b>
                  </h3>
                </div>
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
