import React, { useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import Stepper from "react-stepper-js";
import DatePicker from "react-datepicker";
import { parseISO, format, parse } from "date-fns";

import Services from "../api/Services";
import Header from "../template/Header";
import Sidebar from "../template/Sidebar";

import "react-stepper-js/dist/index.css";
import "react-datepicker/dist/react-datepicker.css";

function AddPolicy() {
  const [step, setStep] = useState(0);
  const [accountNumber, setAccountNumber] = useState("");
  const [isExist, setExist] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [policy, setPolicy] = useState({
    id: null,
    effectiveDate: null,
    expirationDate: null,
  });

  async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  const nextStep = () => {
    if (step < 4) {
      setStep(step + 1);
    } else if (step === 4) {
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
    } else if (e.target.name === "policyNumber") {
      setPolicy({ ...policy, id: e.target.value });
      console.log(policy);
    }
  };

  const handleDateInput = (date) => {
    let effective = format(new Date(date), "MM/dd/yyyy");
    let effectiveDate = parse(effective, "MM/dd/yyyy", new Date());
    setPolicy({
      ...policy,
      effectiveDate: effectiveDate,
      expirationDate: effectiveDate,
    });
    console.log(policy);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    let customerAccount = {
      accountNumber: accountNumber,
    };
    setLoading(true);
    await sleep(3000);
    setLoading(false);
    Services.searchAccountNumber(customerAccount)
      .then((res) => {
        console.log(res);
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
        console.log(err);
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
              <div className="col-12 col-md-4 col-lg-3 ">
                <h1>Add Policy</h1>
              </div>
            </div>

            {step !== 0 ? null : (
              <div className="form-group">
                <div className="row flex justify-center">
                  <div className="col-12 col-sm-12 col-md-4 col-lg-3">
                    <label className="mt-2">Enter Account Number: </label>
                  </div>
                  <div className="col-12 col-sm-12 col-md-4 col-lg-4">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Account Number"
                      name="accountNumber"
                      value={accountNumber}
                      maxLength={4}
                      onChange={handleInput}
                      aria-label="Account Number"
                    />
                  </div>
                  <div className="col-12 col-sm-12 col-md-4 col-lg-2">
                    {isLoading === true ? (
                      <button
                        className="btn btn-primary col-12"
                        onClick={handleSearch}
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
                        <span className="p-2">Search</span>
                      </button>
                    ) : (
                      <button
                        className="btn btn-primary col-12"
                        onClick={handleSearch}
                      >
                        <i className="fa-solid fa-magnifying-glass" />
                        <span className="p-2">Search</span>
                      </button>
                    )}
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
                    { label: "POLICY" },
                    { label: "POLICY HOLDER" },
                    { label: "VEHICLES" },
                    { label: "CONFIRM" },
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
                              value={policy.id}
                              onChange={handleInput}
                              aria-label="Account Number"
                              maxLength={6}
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
                            <DatePicker
                              closeOnScroll={true}
                              selected={policy.effectiveDate}
                              className="form-control"
                              name="effectiveDate"
                              value={policy.effectiveDate}
                              onChange={(e) => handleDateInput(e)}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12 col-md-4 col-lg-3 mt-3">
                            <label className="mt-2">Expiration Date</label>
                          </div>
                          <div className="col-12 col-md-4 col-lg-4 mt-3">
                            <input
                              className="form-control"
                              name="expriationDate"
                              value={format(
                                new Date(policy.expirationDate),
                                "MM/dd/yyyy"
                              )}
                              disabled
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12 col-md-4 col-lg-3 mt-3">
                            <label className="mt-2">
                              Type of Policy Holder
                            </label>
                          </div>
                          <div className="col-12 col-md-4 col-lg-4 mt-3">
                            <select class="form-control">
                              <option>----</option>
                              <option>Owner</option>
                              <option>Dependent</option>
                            </select>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12 col-md-4 col-lg-3 mt-3">
                            <label className="mt-2">No. of Vehicles</label>
                          </div>
                          <div className="col-12 col-md-4 col-lg-4 mt-3">
                            <input
                              type="text"
                              className="form-control"
                              name="vehicles"
                              value={policy.vehicles}
                              onChange={handleInput}
                              maxLength={2}
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
                    {step === 4 ? (
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
