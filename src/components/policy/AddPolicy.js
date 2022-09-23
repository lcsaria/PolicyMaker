import React, { useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import Stepper from "react-stepper-js";
import DatePicker from "react-datepicker";

import Services from "../api/Services";
import Header from "../template/Header";
import Sidebar from "../template/Sidebar";

import "react-stepper-js/dist/index.css";
import "react-datepicker/dist/react-datepicker.css";
import AddPolicyHolder from "./AddPolicyHolder";
import moment from "moment";

function AddPolicy() {
  const [step, setStep] = useState(0);
  const [accountNumber, setAccountNumber] = useState("");
  const [isExist, setExist] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [policy, setPolicy] = useState({
    policyNumber: null,
    effectiveDate: null,
    expirationDate: null,
    type: 0,
    vehicles: null,
  });

  async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  const nextStep = async () => {
    setLoading(true);
    await sleep(3000);
    setLoading(false);
    if (step < 4) {
      setStep(step + 1);
    } else if (step === 4) {
      console.log("Done");
    }
  };

  const submitPolicy = () => {
    console.log("policy");
    Services.createPolicy(policy)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
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
    } else if (step === 1) {
      setPolicy({ ...policy, [e.target.name]: e.target.value });
    }
  };

  const handleDateInput = (date) => {
    let parseDate =
      date === null ? null : moment(new Date(date)).format("MM/DD/YYYY");

    console.log(parseDate);
    if (parseDate === null) {
      setPolicy({
        ...policy,
        effectiveDate: null,
        expirationDate: null,
      });
    } else {
      setPolicy({
        ...policy,
        effectiveDate: parseDate,
        expirationDate: null,
      });
    }
    console.log(policy);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    let customerAccount = {
      accountNumber: accountNumber,
    };
    setLoading(true);
    await sleep(2000);
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
                  fontSize="16px"
                  fontColor="#000000"
                  steps={[
                    { label: "POLICY" },
                    { label: "HOLDER" },
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
                              value={policy.policyNumber}
                              onChange={handleInput}
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
                              selected={
                                policy.effectiveDate === null
                                  ? null
                                  : new Date(policy.effectiveDate)
                              }
                              className="form-control"
                              name="effectiveDate"
                              value={
                                policy.effectiveDate === null
                                  ? ""
                                  : new Date(policy.effectiveDate)
                              }
                              onChange={handleDateInput}
                              isClearable
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
                              disabled
                              value={
                                policy.expirationDate === null
                                  ? ""
                                  : policy.expirationDate
                              }
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
                            <select
                              className="form-control form-select"
                              name="type"
                              value={policy.type === 0 ? 0 : policy.type}
                              onChange={handleInput}
                            >
                              <option selected value="0">
                                ----
                              </option>
                              <option value="1">Owner</option>
                              <option value="2">Dependent</option>
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
                  {step !== 2 ? null : <AddPolicyHolder data={policy} />}
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
                        {isLoading === false ? (
                          <>
                            <span>Next</span>
                            <i
                              className="fa-solid fa-arrow-right"
                              style={{ marginLeft: "1em" }}
                            />
                          </>
                        ) : (
                          <>
                            <span>Next</span>
                            <span className="text-white">
                              <Spinner
                                animation="border"
                                variant="light"
                                size="sm"
                                style={{ marginLeft: "1em" }}
                              />
                            </span>
                          </>
                        )}
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
