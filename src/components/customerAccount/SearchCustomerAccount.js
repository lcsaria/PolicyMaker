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
          <div className="container p-4 mt-8">
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
                        className="w-full py-2 text-white bg-gray-900 hover:bg-gray-500  hover:-translate-y-0.5 transform transition rounded-md focus:outline-none"
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
                  <div className="p-3 mt-4">
                    <div className="block w-full overflow-auto scrolling-touch text-center">
                      <table className="w-full max-w-full mb-4 bg-transparent">
                        <thead>
                          <tr>
                            <th scope="col">Account #</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Address</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">{result[0].accountNumber}</th>
                            <td>{result[0].firstName}</td>
                            <td>{result[0].lastName}</td>
                            <td>{result[0].address}</td>
                          </tr>
                        </tbody>
                      </table>
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
