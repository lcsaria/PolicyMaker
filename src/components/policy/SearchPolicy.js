import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

import Sidebar from "../template/Sidebar";
import Header from "../template/Header";
import Services from "../api/Services";

function SearchPolicy() {
  const [policyNumber, setPolicyNumber] = useState("");
  const [isExist, setExist] = useState(false);
  const [result, setResult] = useState([
    {
      policy: null,
      holder: null,
    },
  ]);
  async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const changeInput = (e) => {
    let value = e.target.value;

    if (e.target.name === "policyNumber") {
      let result = value.replace(/\D/g, "");
      setPolicyNumber(result);
    }
  };

  const reset = (e) => {
    e.preventDefault();
    setPolicyNumber("");
    setExist(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    let policy = { policyNumber: policyNumber };
    Services.searchPolicy(policy)
      .then((res) => {
        let dao = JSON.stringify(res.data);
        if (dao) {
          setResult(JSON.parse(dao));
          setExist(true);
          console.log();
          toast.success("Customer account found.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          setResult(null);
          setExist(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setExist(false);
      });
  };

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
                        name="policyNumber"
                        value={policyNumber}
                        onChange={changeInput}
                        maxLength={6}
                      />
                    </div>
                    <div className="w-full px-3">
                      <div className="mt-10"></div>
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
                    </div>
                    <div className="w-full px-3">
                      <div className="mt-10"></div>
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
                <div className="card-body mt-10 border-1">
                  {/* {isExist === false
                    ? null
                    : result.map((item, index) => (
                        <div className="grid-cols-3 lg:grid">
                          <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-3">
                              Policy Number
                            </label>
                            <span key={index}>{item.policy.policyNumber}</span>
                          </div>
                        </div>
                      ))} */}
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
