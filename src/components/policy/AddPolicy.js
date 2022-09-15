import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Stepper from "react-stepper-js";
import "react-stepper-js/dist/index.css";
import { toast, ToastContainer } from "react-toastify";
import Services from "../api/Services";

import Header from "../template/Header";
import Sidebar from "../template/Sidebar";

function AddPolicy() {
  const [step, setStep] = useState(0);
  const [accountNumber, setAccountNumber] = useState("");
  const [isExist, setExist] = useState(false);

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else if (step === 3) {
      console.log("Done");
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleInput = (e) => {
    e.preventDefault();
    if (e.target.name === "accountNumber") {
      setAccountNumber(e.target.value);
      console.log(accountNumber);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    let customerAccount = {
      accountNumber: accountNumber,
    };
    Services.searchAccountNumber(customerAccount)
      .then((res) => {
        console.log(res.data);
        toast.success(
          "Account #" + customerAccount.accountNumber + " exists. ",
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
        nextStep();
        setExist(true);
      })
      .catch((err) => {
        toast.error("Not Exist. (" + err.response.status + ")", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
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
          <Container className="p-5">
            <div className="row">
              <div className="col-12 col-md-4 col-lg-3 mt-3">
                <h1 className="mb-5">Add Policy</h1>
              </div>
            </div>

            {step !== 0 ? null : (
              <div className="form-group mt-5">
                <div className="row">
                  <div className="col-12 col-md-4 col-lg-3 mt-2">
                    <label className="mt-2">Enter Account Number: </label>
                  </div>
                  <div className="col-12 col-md-4 col-lg-4 mt-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Account Number"
                      name="accountNumber"
                      value={accountNumber}
                      onChange={handleInput}
                      aria-label="Account Number"
                    />
                  </div>
                  <div className="col-12 col-md-4 col-lg-2 mt-3">
                    <button className="btn btn-primary" onClick={handleSearch}>
                      <i className="fa-solid fa-magnifying-glass" />
                      <span className="p-2">Search</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
            {isExist === false ? null : (
              <div>
                <h3 className="text-center mt-3 mb-3">
                  Account # {accountNumber}{" "}
                </h3>
                <Stepper
                  color="#23b561"
                  fontSize="20px"
                  fontColor="#000000"
                  steps={[
                    { label: "Step 1" },
                    { label: "Step 2" },
                    { label: "Step 3" },
                  ]}
                  currentStep={step}
                />
                <div className="container p-5 offset-md-2">
                  {step > 1 ? null : (
                    <div>
                      <h3>POLICY INFORMATION</h3>
                      <div className="form-group mt-2">
                        <div className="row">
                          <div className="col-12 col-md-4 col-lg-3 mt-3">
                            <label className="mt-2">Policy #</label>
                          </div>
                          <div className="col-12 col-md-4 col-lg-4 mt-3">
                            <input
                              type="text"
                              className="form-control"
                              name="policyNumber"
                              aria-label="Account Number"
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12 col-md-4 col-lg-3 mt-3">
                            <label className="mt-2">
                              Effective Date [MM/DD/YYYY]
                            </label>
                          </div>
                          <div className="col-12 col-md-4 col-lg-4 mt-3">
                            <input
                              type="text"
                              className="form-control"
                              name="effectiveDate"
                              aria-label="Account Number"
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12 col-md-4 col-lg-3 mt-3">
                            <label className="mt-2">Expiration Date</label>
                          </div>
                          <div className="col-12 col-md-4 col-lg-4 mt-3">
                            <input
                              type="text"
                              className="form-control"
                              name="expriationDate"
                              aria-label="Account Number"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="d-flex justify-content-around mt-5">
                  {step > 1 ? (
                    <button className="btn btn-warning" onClick={prevStep}>
                      <i
                        className="fa-solid fa-arrow-left"
                        style={{ marginRight: "1em" }}
                      />
                      Back
                    </button>
                  ) : null}
                  <button className="btn btn-warning" onClick={nextStep}>
                    {step === 3 ? (
                      "Submit"
                    ) : (
                      <>
                        <span>Next</span>
                        <i
                          className="fa-solid fa-arrow-right"
                          style={{ marginLeft: "1em" }}
                        />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </Container>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AddPolicy;
