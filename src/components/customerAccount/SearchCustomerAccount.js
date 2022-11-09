import React, { useEffect, useState } from "react";
import Header from "../template/Header";
import Services from "../api/Services";
import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../template/Sidebar";

function SearchCustomerAccount() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [result, getResult] = useState(null);

  const changeInput = (e) => {
    let value = e.target.value;
    e.target.name === "firstName" ? setFirstName(value) : setLastName(value);
    console.log(firstName + " -> " + lastName);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let customerAccount = { firstName: firstName, lastName: lastName };
    Services.searchCustomerAccount(customerAccount)
      .then((res) => {
        let dao = JSON.stringify(res.data);
        if (dao) {
          getResult(JSON.parse(dao));
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
          getResult("null");
        }
      })
      .catch((err) => {
        getResult(null);
        toast.error(
          "Customer account not found. (" + err.response.status + ")",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
      });
  };

  useEffect(() => {}, [result]);

  return (
    <div>
      <Header />
      <div id="outer-container">
        <div id="sidebar">
          <Sidebar />
        </div>
        <div id="content">
          <div className="container p-4 mt-8 mb-6">
            <div className="row mt-32">
              <div className="col-md-8 offset-md-2">
                <h3 className="text-center mt-3 my-3 uppercase">
                  <b>Search Customer Account</b>
                </h3>
                <div className="card-body">
                  <div className="grid-cols-3 lg:grid">
                    <div className="w-full px-3">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-3">
                        First Name
                      </label>
                      <input
                        type="text"
                        className="appearance-none block w-full  border border-gray-400 rounded py-2 px-2 leading-tight outline-none focus:border-gray-500"
                        name="firstName"
                        value={firstName}
                        onChange={changeInput}
                        aria-label="First name"
                      />
                    </div>
                    <div className="w-full px-3">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-3">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="appearance-none block w-full  border border-gray-400 rounded py-2 px-2 leading-tight outline-none focus:border-gray-500"
                        name="lastName"
                        value={lastName}
                        onChange={changeInput}
                      />
                    </div>
                    <div className="w-full px-3">
                      <div className="mt-10"></div>
                      <button
                        className="mb-6 w-full py-2 text-white bg-gray-900 hover:bg-gray-500  hover:-translate-y-0.5 transform transition rounded-md focus:outline-none"
                        onClick={handleSubmit}
                      >
                        <i
                          className="fa-solid fa-magnifying-glass"
                          style={{ marginRight: "10px" }}
                        />
                        <span className="p-2">Search</span>
                      </button>
                    </div>
                  </div>
                </div>
                {result !== null ? (
                  <div>
                    <div className="flex flex-col sm:mb-0 mb-6">
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
                                    Account Number
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-6 py-2 text-left text-sm uppercase font-bold text-gray-900"
                                  >
                                    First Name
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-6 py-2 text-left text-sm uppercase font-bold text-gray-900"
                                  >
                                    Last Name
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-6 py-2 text-left text-sm uppercase font-bold text-gray-900"
                                  >
                                    Address
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-6 py-2 text-left text-sm uppercase font-bold text-gray-900"
                                  ></th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="border-b">
                                  <td className="whitespace-nowrap px-6 py-2 text-sm font-light text-gray-900">
                                    {result[0].accountNumber === null
                                      ? "N/A"
                                      : result[0].accountNumber}
                                  </td>
                                  <td className="whitespace-nowrap px-6 py-2 text-sm font-light text-gray-900">
                                    {result[0].firstName === null
                                      ? "N/A"
                                      : result[0].firstName}
                                  </td>
                                  <td className="whitespace-nowrap px-6 py-2 text-sm font-light text-gray-900">
                                    {result[0].lastName === null
                                      ? "N/A"
                                      : result[0].lastName}
                                  </td>
                                  <td className="whitespace-nowrap px-6 py-2 text-sm font-light text-gray-900">
                                    {result[0].address === null
                                      ? "N/A"
                                      : result[0].address}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center lg:hidden mb-6">
                      <div className="block p-6 rounded-lg shadow-lg bg-white w-full ">
                        <div className="sm:grid grid-cols-2 mb-2">
                          <div className="font-bold">FIRST NAME</div>
                          <div>
                            <span className="">
                              {result[0].accountNumber === null
                                ? "N/A"
                                : result[0].accountNumber}
                            </span>
                          </div>
                        </div>
                        <div className="sm:grid  grid-cols-2 mb-2">
                          <div className="font-bold">LAST NAME</div>
                          <div>
                            <span className="">
                              {result[0].firstName === null
                                ? "N/A"
                                : result[0].firstName}
                            </span>
                          </div>
                        </div>
                        <div className="sm:grid grid-cols-2 mb-2">
                          <div className="font-bold">ADDRESS</div>
                          <div>
                            <span className="">
                              {result[0].lastName === null
                                ? "N/A"
                                : result[0].lastName}
                            </span>
                          </div>
                        </div>
                        <div className="sm:grid grid-cols-2 mb-2">
                          <div className="font-bold">LICENSE NUMBER</div>
                          <div>
                            <span className="">
                              {result[0].address === null
                                ? "N/A"
                                : result[0].address}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default SearchCustomerAccount;
