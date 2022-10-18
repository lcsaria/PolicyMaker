import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Services from "../api/Services";
import Header from "../template/Header";
import Sidebar from "../template/Sidebar";

function AddCustomerAccount() {
  const navigate = useNavigate();

  const [acctNo, setAcctNo] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [save, setSave] = useState(false);
  const [isLoading, setLoading] = useState(false);

  async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const changeInput = (e) => {
    let value = e.target.value;

    if (e.target.name === "acctNo") {
      let result = value.replace(/\D/g, "");
      setAcctNo(result);
    } else if (e.target.name === "firstName") {
      setFirstName(value);
    } else if (e.target.name === "lastName") {
      setLastName(value);
    } else if (e.target.name === "address") {
      setAddress(value);
    }
  };

  const validateAccountNumber = async (e) => {
    e.preventDefault();
    let accountNumber = {
      accountNumber: acctNo,
    };
    if (accountNumber.accountNumber === "") {
      setLoading(true);
      await sleep(3000);
      setLoading(false);
      toast.error("Account number is empty.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      setLoading(true);
      await sleep(3000);
      setLoading(false);
      Services.searchAccountNumber(accountNumber)
        .then(() => {
          // if exists
          toast.error("Account number invalid.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        })
        .catch(() => {
          toast.success("Account number valid.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    }
  };

  const validate = async (e) => {
    e.preventDefault();
    setSave(true);
    await sleep(3000);
    if (
      acctNo === "" &&
      firstName === "" &&
      lastName === "" &&
      address === ""
    ) {
      toast.error("Kindly fill up all details.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      if (firstName === "" || lastName === "" || address === "") {
        toast.error("Fill up the blank details.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        setSave(false);
        handleSubmit(e);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let customerAccount = {
      accountNumber: acctNo,
      firstName: firstName,
      lastName: lastName,
      address: address,
    };
    console.log(JSON.stringify(customerAccount));

    Services.createCustomerAccount(customerAccount)
      .then(() => {
        navigate("/customer_account/create");
        toast.success("Account successfully created.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch(() => {
        toast.error("Something wrong.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
    setAcctNo("");
    setFirstName("");
    setLastName("");
    setAddress("");
    setSave(false);
  };

  const reset = (e) => {
    e.preventDefault();
    setAcctNo("");
    setFirstName("");
    setLastName("");
    setAddress("");
    setSave(false);
  };

  return (
    <div>
      <Header />
      <div id="outer-container">
        <ToastContainer />
        <div id="sidebar">
          <Sidebar />
        </div>
        <div id="content">
          <div className="container p-4 mt-8">
            <div className="row mt-32">
              <div className="col-md-8 offset-md-2">
                <h3 className="text-center mt-3 my-3 uppercase">
                  <b>Create Customer Account</b>
                </h3>
                <div className="card-body">
                  <div class="grid-cols-2 sm:grid gap-4">
                    <input
                      placeholder="Account Number"
                      name="acctNo"
                      value={acctNo}
                      onChange={changeInput}
                      maxLength={4}
                      class="w-full px-4 py-2 border-2 rounded-md border-gray-400 outline-none  focus:border-gray-400 mt-3"
                    />
                    {isLoading === false ? (
                      <button
                        className="w-full py-2 text-white bg-green-700 rounded-md  hover:bg-green-500  hover:-translate-y-1 transform transition focus:outline-none mt-3"
                        onClick={validateAccountNumber}
                      >
                        <i
                          className="fa-solid fa-square-check mr-3"
                          style={{ marginRight: "10px" }}
                        />
                        <span className="ml-3">Verify</span>
                      </button>
                    ) : (
                      <button
                        className="w-full py-2 text-white bg-green-300 rounded-md focus:outline-none mt-3"
                        onClick={validateAccountNumber}
                        disabled={true}
                      >
                        <div
                          class="animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-white rounded-full dark:text-gray-800"
                          role="status"
                          aria-label="loading"
                        >
                          <span class="sr-only">Loading...</span>
                        </div>
                        <span className="ml-3">Verify</span>
                      </button>
                    )}
                  </div>
                  <div class="grid-cols-2 sm:grid sm:mt-0 gap-4">
                    <div className="form-group">
                      <input
                        placeholder="First Name"
                        name="firstName"
                        value={firstName}
                        onChange={changeInput}
                        className="w-full px-4 py-2 border-2 rounded-md border-gray-400 outline-none  focus:border-gray-400 mt-3"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        placeholder="Last Name"
                        name="lastName"
                        value={lastName}
                        onChange={changeInput}
                        className="w-full px-4 py-2 border-2 rounded-md border-gray-400 outline-none  focus:border-gray-400 mt-3"
                      />
                    </div>
                  </div>
                  <div class="grid-cols-1 sm:grid gap-2">
                    <div className="form-group">
                      <input
                        placeholder="Address"
                        name="address"
                        value={address}
                        onChange={changeInput}
                        className="w-full px-4 py-2 border-2 rounded-md border-gray-400 outline-none  focus:border-gray-400 mt-3"
                      />
                    </div>
                  </div>
                  <div class="grid-cols-2 sm:grid gap-4">
                    {save ? (
                      <button
                        className="w-full   py-2 text-white bg-green-700 focus:bg-green-500 rounded-md focus:outline-none mt-3"
                        onClick={validate}
                        disabled
                      >
                        <span className="text-white">
                          <Spinner
                            animation="border"
                            variant="light"
                            size="sm"
                            style={{
                              marginRight: "10px",
                            }}
                          />
                        </span>
                        <span className="ml-3">Save</span>
                      </button>
                    ) : (
                      <button
                        className="w-full   py-2 text-white bg-green-700 hover:bg-green-500  hover:-translate-y-0.5 transform transition rounded-md focus:outline-none mt-3"
                        onClick={validate}
                      >
                        <i
                          className="fa-solid fa-square-check mr-3"
                          style={{ marginRight: "10px" }}
                        />
                        <span className="ml-3">Save</span>
                      </button>
                    )}
                    <button
                      className="w-full py-2 text-white bg-red-700 hover:bg-red-500  hover:-translate-y-0.5 transform transition rounded-md focus:outline-none mt-3"
                      onClick={reset}
                    >
                      <i
                        className="fa-solid fa-rotate-right"
                        style={{ marginRight: "10px" }}
                      />
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCustomerAccount;
