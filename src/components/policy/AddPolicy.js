import moment from "moment";
import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
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
      policyNumber: null,
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
        await sleep(2000);
        setLoading(false);
      }

      if (step === 1) {
        console.log(policy);
        createVehicles();
      }
      if (step === 2) {
        console.log(holder);
      }
      if (step === 3) {
        console.log(vehicle);
      }
      setStep(step + 1);
    } else if (step === 4) {
      console.log("Done");
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);

      if (step === 2) {
        resetVehicles();
      }
    }
  };

  const resetVehicles = () => {
    setVehicle([
      {
        policyNumber: policy.policyNumber,
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
          policyNumber: policy.policyNumber,
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
  //   Services.createPolicy(policy)
  //     .then((res) => {
  //       console.log(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });

  //   const value = { ...holder, policyNumber: policy.policyNumber };
  //   Services.createPolicyHolder(value)
  //     .then((res) => {
  //       console.log(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //
  //   Services.createVehicles(vehicle)
  //        .then((res) => {
  //           console.log(res.data);
  //           toast.success("Vehicle successfully added", {
  //              position: "top-right",
  //             autoClose: 5000,
  //             hideProgressBar: false,
  //             closeOnClick: true,
  //             pauseOnHover: true,
  //             draggable: true,
  //             progress: undefined,
  //           });
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //         });
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

    Services.searchAccountNumber(customerAccount)
      .then((res) => {
        console.log(res);
        nextStep();
        setExist(true);
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
        setExist(false);
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
          <div className="container p-4 mt-8">
            <div className="row mt-32">
              <div className="col-md-8 offset-md-2 ">
                <h3 className="text-center mt-3 my-3 uppercase">
                  <b>Add Policy</b>
                </h3>
                {step === 0 && (
                  <div className="grid-cols-2 sm:grid gap-4">
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
                        className="btn btn-primary col-12  hover:-translate-y-0.5 transform transition hover:bg-indigo-500"
                        onClick={handleSearch}
                      >
                        <i className="fa-solid fa-magnifying-glass" />
                        <span className="p-2">Search</span>
                      </button>
                    )}
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
                    {step === 1 && (
                      <div className="container p-5 -mx-10 mb-6">
                        <div className="grid-cols-3 lg:grid">
                          <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-3">
                              Policy #
                            </label>
                            <input
                              className="appearance-none block w-full  border border-gray-400 rounded py-3 px-2 leading-tight outline-none focus:border-gray-500"
                              type="text"
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
                          <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-3">
                              Effective Date
                            </label>
                            <DatePicker
                              closeOnScroll={true}
                              selected={
                                policy.effectiveDate !== null
                                  ? new Date(policy.effectiveDate)
                                  : null
                              }
                              className="appearance-none w-full border border-gray-400 rounded py-3 px-2 leading-tight outline-none focus:border-gray-500"
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
                          <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-3">
                              Expriration Date
                            </label>
                            <input
                              className="appearance-none block w-full border border-gray-400 rounded py-3 px-2 leading-tight outline-none focus:border-gray-500"
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
                        <div className="grid-cols-2 lg:grid">
                          <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-3">
                              Type of Policy Holder
                            </label>
                            <select
                              className="appearance-none block w-full border border-gray-400 rounded py-3 px-2 leading-tight outline-none focus:border-gray-500 form-select"
                              name="type"
                              value={policy.type === null ? "" : policy.type}
                              onChange={handleInput}
                            >
                              <option value="0">----</option>
                              <option value="Owner">Owner</option>
                              <option value="Dependent">Dependent</option>
                            </select>
                          </div>
                          <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-3">
                              Number of Vehicles
                            </label>
                            <input
                              type="text"
                              className="appearance-none block w-full border border-gray-400 rounded py-3 px-2 leading-tight outline-none focus:border-gray-500"
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
                    )}
                    {step === 2 && (
                      <div className="container p-5 -mx-10 mb-6">
                        <div className="grid-cols-2 lg:grid">
                          <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-3">
                              First Name
                            </label>
                            <input
                              className="appearance-none block w-full  border border-gray-400 rounded py-3 px-2 leading-tight outline-none focus:border-gray-500"
                              type="text"
                              name="firstName"
                              value={
                                holder.firstName === null
                                  ? ""
                                  : holder.firstName
                              }
                              onChange={handleInput}
                            />
                          </div>
                          <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-3">
                              Last Name
                            </label>
                            <input
                              className="appearance-none block w-full  border border-gray-400 rounded py-3 px-2 leading-tight outline-none focus:border-gray-500"
                              type="text"
                              name="lastName"
                              value={
                                holder.lastName === null ? "" : holder.lastName
                              }
                              onChange={handleInput}
                            />
                          </div>
                        </div>
                        <div className="w-full px-3">
                          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-3">
                            Address
                          </label>
                          <input
                            className="appearance-none block w-full  border border-gray-400 rounded py-3 px-2 leading-tight outline-none focus:border-gray-500"
                            type="text"
                            name="address"
                            value={
                              holder.address === null ? "" : holder.address
                            }
                            onChange={handleInput}
                          />
                        </div>
                        <div className="grid-cols-2 lg:grid">
                          <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-3">
                              Driver License Number
                            </label>
                            <input
                              className="appearance-none block w-full  border border-gray-400 rounded py-3 px-2 leading-tight outline-none focus:border-gray-500"
                              type="text"
                              name="licenseNumber"
                              value={
                                holder.licenseNumber === null
                                  ? ""
                                  : holder.licenseNumber
                              }
                              onChange={handleInput}
                            />
                          </div>
                          <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-3">
                              Date Issued
                            </label>
                            <DatePicker
                              closeOnScroll={true}
                              selected={
                                holder.dateIssued === null
                                  ? null
                                  : new Date(holder.dateIssued)
                              }
                              className="appearance-none w-full border border-gray-400 rounded py-3 px-2 leading-tight outline-none focus:border-gray-500"
                              name="dateIssued"
                              value={
                                holder.dateIssued === null
                                  ? ""
                                  : holder.dateIssued
                              }
                              onChange={handleDateInput}
                              isClearable
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    {step === 3 && (
                      <div className="container p-5 -mx-10 mb-6">
                        {vehicle.map((item, index) => (
                          <div className="mt-5">
                            <b>VEHICLE NO. {index + 1}</b>

                            <div className="grid-cols-3 lg:grid">
                              <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-3">
                                  Make
                                </label>
                                <input
                                  className="appearance-none block w-full  border border-gray-400 rounded py-3 px-2 leading-tight outline-none focus:border-gray-500"
                                  type="text"
                                  key={index}
                                  name="make"
                                  value={item.make === null ? "" : item.make}
                                  onChange={handleInputFromArray(index)}
                                />
                              </div>
                              <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-3">
                                  Model
                                </label>
                                <input
                                  className="appearance-none block w-full  border border-gray-400 rounded py-3 px-2 leading-tight outline-none focus:border-gray-500"
                                  type="text"
                                  key={index}
                                  name="model"
                                  value={item.model === null ? "" : item.model}
                                  onChange={handleInputFromArray(index)}
                                />
                              </div>
                              <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-3">
                                  Year
                                </label>
                                <input
                                  className="appearance-none block w-full  border border-gray-400 rounded py-3 px-2 leading-tight outline-none focus:border-gray-500"
                                  type="text"
                                  key={index}
                                  name="year"
                                  maxLength={4}
                                  value={item.year === null ? "" : item.year}
                                  onChange={handleInputFromArray(index)}
                                />
                              </div>
                            </div>
                            <div className="grid-cols-2 lg:grid">
                              <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-3">
                                  Type
                                </label>
                                <select
                                  className="appearance-none block w-full border border-gray-400 rounded py-3 px-2 leading-tight outline-none focus:border-gray-500 form-select"
                                  name="type"
                                  key={index}
                                  value={item.type === null ? "" : item.type}
                                  onChange={handleInputFromArray(index)}
                                >
                                  <option value="0">----</option>
                                  <option value="4-door sedan">
                                    4-door sedan
                                  </option>
                                  <option value="2-door sports car">
                                    2-door sports car
                                  </option>
                                  <option value="SUV">SUV</option>
                                  <option value="truck">truck</option>
                                </select>
                              </div>
                              <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-3">
                                  Fuel
                                </label>
                                <select
                                  className="appearance-none block w-full border border-gray-400 rounded py-3 px-2 leading-tight outline-none focus:border-gray-500 form-select"
                                  name="fuel"
                                  key={index}
                                  value={item.fuel === null ? "" : item.fuel}
                                  onChange={handleInputFromArray(index)}
                                >
                                  <option value="0">----</option>
                                  <option value="Diesel">Diesel</option>
                                  <option value="Electric">Electric</option>
                                  <option value="Petrol">Petrol</option>
                                </select>
                              </div>
                            </div>
                            <div className="grid-cols-2 lg:grid">
                              <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-3">
                                  Cost
                                </label>
                                <input
                                  className="appearance-none block w-full  border border-gray-400 rounded py-3 px-2 leading-tight outline-none focus:border-gray-500"
                                  type="text"
                                  key={index}
                                  name="cost"
                                  value={item.cost === null ? "" : item.cost}
                                  onChange={handleInputFromArray(index)}
                                />
                              </div>
                              <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-3">
                                  Color
                                </label>
                                <input
                                  className="appearance-none block w-full  border border-gray-400 rounded py-3 px-2 leading-tight outline-none focus:border-gray-500"
                                  type="text"
                                  key={index}
                                  name="color"
                                  value={item.color === null ? "" : item.color}
                                  onChange={handleInputFromArray(index)}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    {step === 4 && (
                      <div className="container p-5 -mx-10 mb-6">
                        <div className="text-lg uppercase">
                          <h2>
                            Policy #
                            {policy.policyNumber === null
                              ? "XXXXXX"
                              : policy.policyNumber}
                          </h2>
                        </div>
                        <div className="grid-cols-2 lg:grid sm:mt-0 mt-5">
                          <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-3">
                              Effective Date
                            </label>
                            <span>
                              {policy.effectiveDate === null
                                ? "N/A"
                                : policy.effectiveDate}
                            </span>
                          </div>
                          <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-3">
                              Expiration Date
                            </label>
                            <span>
                              {policy.expirationDate === null
                                ? "N/A"
                                : policy.expirationDate}
                            </span>
                          </div>
                        </div>
                        <div className="grid-cols-2 lg:grid">
                          <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-3">
                              Type of Policy Holder
                            </label>
                            <span>
                              {policy.type === null || policy === "0"
                                ? "NONE"
                                : policy.type}
                            </span>
                          </div>

                          <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-3">
                              Number of Vehicles
                            </label>
                            <span>
                              {policy.vehicles === null
                                ? "XX"
                                : policy.vehicles}
                            </span>
                          </div>
                        </div>
                        <div className="text-lg uppercase mt-5">
                          <h4>Policy Holder</h4>
                        </div>
                        <div className="grid-cols-2 lg:grid">
                          <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-3">
                              First Name
                            </label>
                            <span>
                              {holder.firstName === null
                                ? "N/A"
                                : holder.firstName}
                            </span>
                          </div>
                          <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-3">
                              Last Name
                            </label>
                            <span>
                              {holder.lastName === null
                                ? "N/A"
                                : holder.lastName}
                            </span>
                          </div>
                        </div>
                        <div className="w-full px-3">
                          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-3">
                            Address
                          </label>
                          <span>
                            {holder.address === null ? "N/A" : holder.address}
                          </span>
                        </div>
                        <div className="grid-cols-2 lg:grid">
                          <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-3">
                              Driver License #
                            </label>
                            <span>
                              {holder.licenseNumber === null
                                ? "N/A"
                                : holder.licenseNumber}
                            </span>
                          </div>
                          <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-3">
                              Date Issued
                            </label>
                            <span>
                              {holder.dateIssued === null
                                ? "N/A"
                                : holder.dateIssued}
                            </span>
                          </div>
                        </div>
                        {vehicle.map((item, index) => (
                          <div className="mt-5" key={index}>
                            <b>VEHICLE NO. {index + 1}</b>
                            <div className="grid-cols-3 lg:grid">
                              <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-3">
                                  Make
                                </label>
                                <span>
                                  {item.make === null ? "N/A" : item.make}
                                </span>
                              </div>
                              <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-3">
                                  Model
                                </label>
                                <span>
                                  {item.model === null ? "N/A" : item.model}
                                </span>
                              </div>
                              <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-3">
                                  Year
                                </label>
                                <span>
                                  {item.year === null ? "N/A" : item.year}
                                </span>
                              </div>
                            </div>
                            <div className="grid-cols-2 lg:grid">
                              <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-3">
                                  Type
                                </label>
                                <span>
                                  {item.type === null ? "N/A" : item.type}
                                </span>
                              </div>
                              <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-3">
                                  Fuel
                                </label>
                                <span>
                                  {item.fuel === null ? "N/A" : item.fuel}
                                </span>
                              </div>
                            </div>
                            <div className="grid-cols-2 lg:grid">
                              <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-3">
                                  Cost
                                </label>
                                {item.cost === null ? "N/A" : "$" + item.cost}
                              </div>
                              <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-3">
                                  Color
                                </label>
                                {item.color === null ? "N/A" : item.color}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="d-flex justify-content-around mt-5">
                      {step > 1 ? (
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
                        className="w-25 py-2 text-white bg-green-700 hover:bg-green-500 hover:-translate-y-1 transform transition rounded-md focus:outline-none mt-3"
                        onClick={nextStep}
                      >
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
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AddPolicy;
