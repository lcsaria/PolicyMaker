import moment from "moment";
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

  const [holder, setHolder] = useState({
    firstName: null,
    lastName: null,
    address: null,
    licenseNumber: null,
    dateIssued: null,
  });

  const [vehicle, setVehicle] = useState([
    {
      make: null,
      model: null,
      year: null,
      type: null,
      fuel: null,
      cost: null,
      color: null,
      premium: null,
    },
  ]);
  async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  const nextStep = async () => {
    if (step < 4) {
      if (step !== 0) {
        setLoading(true);
        await sleep(3000);
        setLoading(false);
      }

      if (step === 1) {
        console.log(policy);
        createVehicles();
      }
      if (step === 2) {
        console.log(holder);
      }
      setStep(step + 1);
    } else if (step === 4) {
      console.log("Done");
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);

      if (step === 3) {
        resetVehicles();
      }
    }
  };

  const resetVehicles = () => {
    setVehicle([
      {
        make: null,
        model: null,
        year: null,
        type: null,
        fuel: null,
        cost: null,
        color: null,
        premium: null,
      },
    ]);
    setPolicy({ ...policy, vehicles: 1 });
  };
  const createVehicles = () => {
    let length = policy.vehicles - 1;
    for (var count = 0; count < length; count++) {
      setVehicle((vehicle) => [
        ...vehicle,
        {
          make: null,
          model: null,
          year: null,
          type: null,
          fuel: null,
          cost: null,
          color: null,
          premium: null,
        },
      ]);
    }
    console.log(vehicle);
  };
  // const submitPolicy = () => {
  //   console.log("policy");
  //   Services.createPolicy(policy)
  //     .then((res) => {
  //       console.log(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const handleInput = (e) => {
    e.preventDefault();
    if (e.target.name === "accountNumber") {
      setAccountNumber(e.target.value);
    } else if (step === 1) {
      setPolicy({ ...policy, [e.target.name]: e.target.value });
    } else if (step === 2) {
      setHolder({ ...holder, [e.target.name]: e.target.value });
      console.log(vehicle);
    } else if (step === 3) {
      console.log(vehicle);
    }
  };

  const handleInputFromArray = (index) => (e) => {
    const newArray = vehicle.map((item, i) => {
      if (index === i) {
        return { ...item, [e.target.name]: e.target.value };
      } else {
        return item;
      }
    });
    setVehicle(newArray);
    console.log(vehicle);
  };

  const handleDateInput = (date) => {
    if (step === 1) {
      let parseDate =
        date === null ? null : moment(new Date(date)).format("MM-DD-YYYY");
      let expire = moment(new Date(date)).add(6, "M").format("MM-DD-YYYY");
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
          expirationDate: expire,
        });
      }
    } else if (step === 2) {
      let parseDate =
        date === null ? null : moment(new Date(date)).format("MM-DD-YYYY");

      console.log(parseDate);

      if (parseDate === null) {
        setHolder({
          ...holder,
          dateIssued: null,
        });
      } else {
        setHolder({
          ...holder,
          dateIssued: parseDate,
        });
      }
      console.log(holder);
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
    nextStep();
    setExist(true);
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
                              value={
                                policy.policyNumber === null
                                  ? ""
                                  : policy.policyNumber
                              }
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
                                policy.effectiveDate !== null
                                  ? new Date(policy.effectiveDate)
                                  : null
                              }
                              className="form-control"
                              name="effectiveDate"
                              value={
                                policy.effectiveDate === null
                                  ? ""
                                  : policy.effectiveDate
                              }
                              onChange={handleDateInput}
                              isClearable
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12 col-md-4 col-lg-3 mt-3">
                            <label className="mt-2">
                              Expiration Date [MM/DD/YYYY]
                            </label>
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
                              value={policy.type === null ? 0 : policy.type}
                              onChange={handleInput}
                            >
                              <option value="0">----</option>
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
                              value={
                                policy.vehicles === null ? "" : policy.vehicles
                              }
                              onChange={handleInput}
                              maxLength={2}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {step === 2 && (
                    <div>
                      <h3>POLICY HOLDER</h3>
                      <div className="form-group mt-2">
                        <div className="row">
                          <div className="col-12 col-md-4 col-lg-3 mt-3">
                            <label className="mt-2">First Name</label>
                          </div>
                          <div className="col-12 col-md-4 col-lg-4 mt-3">
                            <input
                              type="text"
                              className="form-control"
                              name="firstName"
                              value={
                                holder.firstName === null
                                  ? ""
                                  : holder.firstName
                              }
                              onChange={handleInput}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12 col-md-4 col-lg-3 mt-3">
                            <label className="mt-2">Last Name</label>
                          </div>
                          <div className="col-12 col-md-4 col-lg-4 mt-3">
                            <input
                              type="text"
                              className="form-control"
                              name="lastName"
                              value={
                                holder.lastName === null ? "" : holder.lastName
                              }
                              onChange={handleInput}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12 col-md-4 col-lg-3 mt-3">
                            <label className="mt-2">Address</label>
                          </div>
                          <div className="col-12 col-md-4 col-lg-4 mt-3">
                            <input
                              type="text"
                              className="form-control"
                              name="address"
                              value={
                                holder.address === null ? "" : holder.address
                              }
                              onChange={handleInput}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12 col-md-4 col-lg-3 mt-3">
                            <label className="mt-2">Driver License #</label>
                          </div>
                          <div className="col-12 col-md-4 col-lg-4 mt-3">
                            <input
                              type="text"
                              className="form-control"
                              name="licenseNumber"
                              value={
                                holder.licenseNumber === null
                                  ? ""
                                  : holder.licenseNumber
                              }
                              onChange={handleInput}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12 col-md-4 col-lg-3 mt-3">
                            <label className="mt-2">Date Issued</label>
                          </div>
                          <div className="col-12 col-md-4 col-lg-4 mt-3">
                            <DatePicker
                              closeOnScroll={true}
                              selected={
                                holder.dateIssued === null
                                  ? null
                                  : new Date(holder.dateIssued)
                              }
                              className="form-control"
                              name="dateIssued"
                              value={
                                holder.dateIssued === null
                                  ? ""
                                  : new Date(holder.dateIssued)
                              }
                              onChange={handleDateInput}
                              isClearable
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {step === 3 && (
                    <div>
                      <h3>VEHICLES</h3>
                      {vehicle.map((item, index) => (
                        <div>
                          <div className="mt-5">
                            <b>VEHICLE NO. {index + 1}</b>
                          </div>

                          <div className="row">
                            <div className="col-3 col-md-4 col-lg-2 mt-3">
                              <label className="mt-2 ml-5">Make</label>
                            </div>
                            <div className="col-9 col-md-8 col-lg-4 mt-3">
                              <input
                                type="text"
                                className="form-control"
                                key={index}
                                name="make"
                                value={item.make === null ? "" : item.make}
                                onChange={handleInputFromArray(index)}
                              ></input>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-3 col-md-4 col-lg-2 mt-3">
                              <label className="mt-2">Model</label>
                            </div>
                            <div className="col-9 col-md-8 col-lg-4 mt-3">
                              <input
                                type="text"
                                className="form-control"
                                key={index}
                                name="model"
                                value={item.model === null ? "" : item.model}
                                onChange={handleInputFromArray(index)}
                              ></input>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-3 col-md-4 col-lg-2 mt-3">
                              <label className="mt-2">Year</label>
                            </div>
                            <div className="col-9 col-md-8 col-lg-4 mt-3">
                              <input
                                type="text"
                                className="form-control"
                                key={index}
                                name="year"
                                value={item.year === null ? "" : item.year}
                                onChange={handleInputFromArray(index)}
                              ></input>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-3 col-md-4 col-lg-2 mt-3">
                              <label className="mt-2">Type</label>
                            </div>
                            <div className="col-9 col-md-8 col-lg-4 mt-3">
                              <input
                                type="text"
                                className="form-control"
                                key={index}
                                name="type"
                                value={item.type === null ? "" : item.type}
                                onChange={handleInputFromArray(index)}
                              ></input>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-3 col-md-4 col-lg-2 mt-3">
                              <label className="mt-2">Fuel</label>
                            </div>
                            <div className="col-9 col-md-8 col-lg-4 mt-3">
                              <input
                                type="text"
                                className="form-control"
                                key={index}
                                name="fuel"
                                value={item.fuel === null ? "" : item.fuel}
                                onChange={handleInputFromArray(index)}
                              ></input>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-3 col-md-4 col-lg-2 mt-3">
                              <label className="mt-2">Cost</label>
                            </div>
                            <div className="col-9 col-md-8 col-lg-4 mt-3">
                              <input
                                type="text"
                                className="form-control"
                                key={index}
                                name="cost"
                                value={item.cost === null ? "" : item.cost}
                                onChange={handleInputFromArray(index)}
                              ></input>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-3 col-md-4 col-lg-2 mt-3">
                              <label className="mt-2">Color</label>
                            </div>
                            <div className="col-9 col-md-8 col-lg-4 mt-3">
                              <input
                                type="text"
                                className="form-control"
                                key={index}
                                name="color"
                                value={item.color === null ? "" : item.color}
                                onChange={handleInputFromArray(index)}
                              ></input>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {step === 4 && (
                    <div>
                      <h3 className="mr-4">POLICY INFORMATION</h3>
                      <div className="container">
                        <div className="row"></div>
                        <div className="row mt-3">
                          <div className="col-3">Policy #</div>
                          <div className="col">{policy.policyNumber}</div>
                        </div>
                        <div className="row mt-3">
                          <div className="col-3">Effective Date</div>
                          <div className="col">{policy.effectiveDate}</div>
                        </div>
                        <div className="row mt-3">
                          <div className="col-3">Expiration Date</div>
                          <div className="col">{policy.expirationDate}</div>
                        </div>
                        <div className="row mt-3">
                          <div className="col-3">Type</div>
                          <div className="col">
                            {policy.type === 1 ? "Owner" : "Dependent"}
                          </div>
                        </div>
                        <div className="row mt-3">
                          <div className="col-3">No. Of Vehicles</div>
                          <div className="col">{policy.vehicles}</div>
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
