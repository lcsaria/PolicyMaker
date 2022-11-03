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
      vehicle: null,
    },
  ]);

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
          console.log(result);
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
              <div className="col-md-10 offset-md-1">
                <h3 className="text-center mt-3 my-3 uppercase">
                  <b>Search Policy</b>
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

                {isExist === false ? null : (
                  <div className="mt-10">
                    <div className="grid-cols-1 lg:grid">
                      <div className="w-full px-3">
                        <h1>Policy # {result.policy.policyNumber}</h1>
                      </div>
                    </div>
                    <div className="flex flex-col mt-6">
                      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className=" min-w-full py-2 hidden sm:px-6 lg:inline-block lg:px-8">
                          <div className="overflow-x-auto">
                            <table className="min-w-full">
                              <thead className="border-b text-bold">
                                <tr>
                                  <th
                                    scope="col"
                                    className="px-6 py-2 text-left text-sm uppercase font-bold text-gray-900"
                                  >
                                    Effective Date
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-6 py-2 text-left text-sm uppercase font-bold text-gray-900"
                                  >
                                    Expiration Date
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-6 py-2 text-left text-sm uppercase font-bold text-gray-900"
                                  >
                                    Type
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-6 py-2 text-left text-sm uppercase font-bold text-gray-900"
                                  >
                                    No. of Vehicles
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="border-b">
                                  <td className="whitespace-nowrap px-6 py-2 text-sm font-light text-gray-900">
                                    {result.policy.effectiveDate === null
                                      ? "N/A"
                                      : result.policy.effectiveDate}
                                  </td>
                                  <td className="whitespace-nowrap px-6 py-2 text-sm font-light text-gray-900">
                                    {result.policy.expirationDate === null
                                      ? "N/A"
                                      : result.policy.expirationDate}
                                  </td>
                                  <td className="whitespace-nowrap px-6 py-2 text-sm font-light text-gray-900">
                                    {result.policy.type === null ||
                                    result.policy.type === "0"
                                      ? "NONE"
                                      : result.policy.type}
                                  </td>
                                  <td className="whitespace-nowrap px-6 py-2 text-sm font-light text-gray-900">
                                    {result.policy.vehicles === null
                                      ? "XX"
                                      : result.policy.vehicles}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/*for mobile screen */}
                  </div>
                )}
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
