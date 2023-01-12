import React, { useState } from "react";
import Header from "../template/Header";
import Sidebar from "../template/Sidebar";

function SearchClaim() {
  let [claimNumber, setClaimNumber] = useState("");
  let [loading, setLoading] = useState(false);
  let [isExist, changeExist] = useState(false);

  const changeInput = (e) => {
    let value = e.target.value;

    if (e.target.name === "claimNumber") {
      setClaimNumber(value);
      console.log(claimNumber);
    }
  };

  const handleSearch = async (e) => {};

  function reset() {
    setClaimNumber("");
  }

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
                  <b>Search Claim</b>
                </h3>

                {isExist === false ? (
                  <div className="card-body">
                    <div className="grid-cols-3 gap-0 lg:grid">
                      <div className="w-full px-3 mb-2 ">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-3">
                          Claim #
                        </label>
                        <input
                          type="text"
                          className="appearance-none block w-full  border border-gray-400 rounded py-2 px-2 leading-tight outline-none focus:border-gray-500"
                          name="claimNumber"
                          value={claimNumber}
                          onChange={changeInput}
                          maxLength={6}
                        />
                      </div>
                      <div className="w-full px-3  xl:mt-10 lg:mt-10 md:mt-3 sm:mt-3  mb-2">
                        {loading === false ? (
                          <button
                            className="appearance-none w-full py-2 text-white bg-gray-900 hover:bg-gray-500  hover:-translate-y-0.5 transform transition rounded-md focus:outline-none"
                            onClick={handleSearch}
                          >
                            <i
                              className="fa-solid fa-magnifying-glass"
                              style={{ marginRight: "10px" }}
                            />
                            <span className="p-2">Search</span>
                          </button>
                        ) : (
                          <button
                            className="appearance-none w-full py-2 text-white bg-gray-500  rounded-md focus:outline-none"
                            onClick={handleSearch}
                            disabled={true}
                          >
                            <div
                              className="animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-white rounded-full dark:text-gray-800"
                              role="status"
                              aria-label="loading"
                              style={{ marginRight: "10px" }}
                            >
                              <span className="sr-only">Loading...</span>
                            </div>
                            <span className="p-2">Search</span>
                          </button>
                        )}
                      </div>
                      <div className="w-full px-3  xl:mt-10 lg:mt-10 md:mt-3 sm:mt-3 ">
                        <button
                          className="appearance-none block w-full py-2 text-black bg-white-700 rounded-md  border  hover:-translate-y-1 transform transition hover:bg-gray-300 focus:outline-none"
                          onClick={reset}
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
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchClaim;
