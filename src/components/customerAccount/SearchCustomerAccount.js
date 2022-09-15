import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
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
          <Container className="p-5">
            <h1>Search Customer Account</h1>
            <form class="form-inline">
              <div className="row">
                <div className="col-12 col-md-4 col-lg-3 mt-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="First name"
                    name="firstName"
                    value={firstName}
                    onChange={changeInput}
                    aria-label="First name"
                  />
                </div>
                <div className="col-12 col-md-4 col-lg-3 mt-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Last name"
                    aria-label="Last name"
                    name="lastName"
                    value={lastName}
                    onChange={changeInput}
                  />
                </div>
                <div className="col-12 col-md-4 col-lg-2 mt-3">
                  <button className="btn btn-primary" onClick={handleSubmit}>
                    <i
                      className="fa-solid fa-magnifying-glass"
                      style={{ marginRight: "10px" }}
                    />
                    <span className="p-2">Search</span>
                  </button>
                </div>
              </div>
            </form>
            {result !== null ? (
              <div class="p-3 mt-4">
                <div class="table-responsive">
                  <table class="table">
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
          </Container>
        </div>
      </div>
      ;
      <ToastContainer />
    </div>
  );
}

export default SearchCustomerAccount;
