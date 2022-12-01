import moment from "moment";
import React, { useState } from "react";
import Services from "../api/Services";
import Header from "../template/Header";
import Sidebar from "../template/Sidebar";
import Stepper from "react-stepper-js";
import DatePicker from "react-datepicker";

import "react-stepper-js/dist/index.css";
import "react-datepicker/dist/react-datepicker.css";

function Claim() {
  let [policyNumber, setPolicyNumber] = useState("");
  let [loading, setLoading] = useState(false);
  let [isExist, changeExist] = useState(false);
  let [step, setStep] = useState(0);

  let [claim, setClaim] = useState({
    claimNumber: null,
    date: null,
  });
  async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const nextStep = () => {
    if (step < 1) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step === 1) {
      setStep(step - 1);
    }
  };
  const changeInput = (e) => {
    let value = e.target.value;

    if (e.target.name === "policyNumber") {
      let result = value.replace(/\D/g, "");
      setPolicyNumber(result);
    }
  };

  const handleSearch = async (e) => {
    // searching policy number
    let policy = { policyNumber: policyNumber };
    setLoading(true);
    await sleep(3000);
    setLoading(false);
    Services.searchPolicy(policy)
      .then(async (res) => {
        let dao = JSON.stringify(res.data);
        console.log(dao);
        changeExist(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const reset = () => {
    setPolicyNumber(null);
  };

  const handleInput = (e) => {
    e.preventDefault();
    if (step === 0) {
      setClaim({ ...claim, [e.target.name]: e.target.value });
    }
  };

  const handleDateInput = (date) => {
    let parseDate =
      date === null ? null : moment(new Date(date)).format("MM-DD-YYYY");
    if (parseDate === null) {
      setClaim({ ...claim, date: null });
    } else {
      setClaim({ ...claim, date: parseDate });
    }
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
                  <b>File Claim</b>
                </h3>

                {isExist === false ? (
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
                              className="animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-white rounded-full dark:text-gray-800"
                              role="status"
                              aria-label="loading"
                              style={{ marginRight: "10px" }}
                            >
                              <span className="sr-only">Loading...</span>
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
                  </div>
                ) : (
                  <div className="">
                    <Stepper
                      color="#212121"
                      fontSize="16px"
                      fontColor="#000000"
                      steps={[{ label: "FILE CLAIM" }, { label: "CONFIRM" }]}
                      currentStep={step}
                    />
                    {step === 0 && (
                      <div className="container p-5 -mx-10 mb-6">
                        <div className="grid-cols-2 lg:grid">
                          <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-3">
                              Claim #
                            </label>
                            <input
                              className="appearance-none block w-full  border border-gray-400 rounded py-3 px-2 leading-tight outline-none focus:border-gray-500"
                              type="text"
                              name="policyNumber"
                              id="policyNumber"
                              value={
                                claim.claimNumber === null
                                  ? ""
                                  : claim.claimNumber
                              }
                              onChange={handleInput}
                              maxLength={6}
                            />
                          </div>
                          <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-3">
                              Date Filed *
                            </label>
                            <DatePicker
                              closeOnScroll={true}
                              selected={
                                claim.date !== null
                                  ? new Date(claim.date)
                                  : null
                              }
                              className="appearance-none w-full border border-gray-400 rounded py-3 px-2 leading-tight outline-none focus:border-gray-500"
                              name="effectiveDate"
                              value={claim.date === null ? "" : claim.date}
                              onChange={handleDateInput}
                              isClearable
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="d-flex justify-content-around mt-5">
                      {step > 0 ? (
                        <button
                          className="w-25 py-2 text-black bg-white-700 hover:bg-gray-500 rounded-md border  hover:-translate-y-1 transform transition focus:outline-none mt-3"
                          onClick={prevStep}
                        >
                          <i
                            className="fa-solid fa-arrow-left"
                            style={{ marginRight: "1em" }}
                          />
                          Back
                        </button>
                      ) : null}
                      <button
                        className="w-25 py-2 text-white bg-gray-700 hover:bg-gray-500 hover:-translate-y-1 transform transition rounded-md focus:outline-none mt-3"
                        onClick={nextStep}
                      >
                        {step === 1 ? (
                          <>
                            {loading === false ? (
                              <>
                                <span>Submit</span>
                              </>
                            ) : (
                              <>
                                <span className="text-white">
                                  <div
                                    className="animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-white rounded-full dark:text-gray-800"
                                    role="status"
                                    aria-label="loading"
                                    style={{ marginRight: "10px" }}
                                  >
                                    <span className="sr-only">Loading...</span>
                                  </div>
                                </span>
                                <span>Submit</span>
                              </>
                            )}
                          </>
                        ) : (
                          <>
                            {loading === false ? (
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
                                  <div
                                    className="animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-white rounded-full dark:text-gray-800"
                                    role="status"
                                    aria-label="loading"
                                    style={{ marginRight: "10px" }}
                                  >
                                    <span className="sr-only">Loading...</span>
                                  </div>
                                </span>
                              </>
                            )}
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Claim;
