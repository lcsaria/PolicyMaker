import React, { useState } from "react";
import Services from "../api/Services";
import Header from "../template/Header";
import Sidebar from "../template/Sidebar";

function CancelPolicy() {
  const [policyNumber, setPolicyNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [isExist, setExist] = useState(false);
  const [policy, setPolicy] = useState({
    policy: {
      policyNumber: null,
      effectiveDate: null,
      expirationDate: null,
    },
  });

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
    setPolicy("");
    setExist(false);
  };

  const handleSearch = async () => {
    let pol = { policyNumber: policyNumber };
    setLoading(true);
    await sleep(3000);
    setLoading(false);
    Services.searchPolicy(pol)
      .then(async (res) => {
        let dao = JSON.stringify(res.data);
        setPolicy(JSON.parse(dao));
        console.log(policy);
        setExist(true);
      })
      .catch((err) => {
        console.log(err);
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
              <div className="col-md-10 offset-md-1">
                <h3 className="text-center mt-3 my-3 uppercase">
                  <b>Cancel Policy</b>
                </h3>
                <div className="card-body">
                  <div className="grid-cols-3 gap-0 lg:grid">
                    <div className="w-full px-3 mb-2 ">
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
                            class="animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-white rounded-full dark:text-gray-800"
                            role="status"
                            aria-label="loading"
                            style={{ marginRight: "10px" }}
                          >
                            <span class="sr-only">Loading...</span>
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
                  {isExist === false ? null : (
                    <div className="card-body">
                      <div className="grid-cols-1 lg:grid mt-5 mb-6">
                        <div className="w-full px-3">
                          <h3 className="font-bold">Policy # {policyNumber}</h3>
                        </div>
                      </div>
                      <div className="grid-cols-3 lg:grid sm:mt-0 mt-5">
                        <div className="w-full px-3">
                          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-3">
                            Effective Date
                          </label>
                          <span>
                            {policy.policy.effectiveDate === null
                              ? "N/A"
                              : policy.policy.effectiveDate}
                          </span>
                        </div>
                        <div className="w-full px-3">
                          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-3">
                            Expiration Date
                          </label>
                          <span>
                            {policy.policy.expirationDate === null
                              ? "N/A"
                              : policy.policy.expirationDate}
                          </span>
                        </div>
                        <div className="w-full px-3">
                          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-3">
                            Status
                            
                          </label>
                          <span>
                            {policy.policy.status === 1
                              ? "ACTIVE"
                              : "NOT ACTIVE"}
                          </span>
                        </div>
                      </div>
                      <div className="mt-10">
                        {policy.policy.status === 1 ? (
                          <button className="appearance-none w-full py-2 text-white bg-gray-900 hover:bg-gray-500  hover:-translate-y-0.5 transform transition rounded-md focus:outline-none">
                            <i
                              className="fa-solid fa-xmark"
                              style={{ marginRight: "10px" }}
                            />
                            <span className="p-2">Cancel</span>
                          </button>
                        ) : null}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CancelPolicy;
