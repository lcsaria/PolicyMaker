import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

import Sidebar from "../template/Sidebar";
import Header from "../template/Header";
import Services from "../api/Services";

function SearchPolicy() {
  const [policyNumber, setPolicyNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [isExist, setExist] = useState(false);
  const [result, setResult] = useState([
    {
      policy: null,
      holder: null,
      vehicle: null,
    },
  ]);

  async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const changeInput = (e) => {
    let value = e.target.value;

    if (e.target.name === "policyNumber") {
      let result = value.replace(/\D/g, "");
      setPolicyNumber(result);
    }
  };

  const reset = (e) => {
    e.preventDefault();
    setPolicyNumber("");
    setExist(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    let policy = { policyNumber: policyNumber };
    Services.searchPolicy(policy)
      .then(async (res) => {
        let dao = JSON.stringify(res.data);
        if (dao) {
          setLoading(true);
          await sleep(3000);
          setLoading(false);
          setResult(JSON.parse(dao));
          setExist(true);
          console.log(result);
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
          setResult(null);
          setExist(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setExist(false);
        toast.error("Something is wrong.", {
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
              <div className="col-md-10 offset-md-1">
                <h3 className="text-center mt-3 my-3 uppercase">
                  <b>Search Policy</b>
                </h3>
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
                          className="appearance-none w-full py-2 text-white bg-gray-900 hover:bg-gray-500  hover:-translate-y-0.5 transform transition rounded-md focus:outline-none"
                          onClick={handleSearch}
                        >
                          <i
                            className="fa-solid fa-magnifying-glass"
                            style={{ marginRight: "10px" }}
                          />
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

                {isExist === false ? null : (
                  <div className="mt-10">
                    <div className="grid-cols-1 lg:grid mb-6">
                      <div className="w-full px-3">
                        <h3 className="font-bold text-center">
                          Policy # {result.policy.policyNumber}
                        </h3>
                      </div>
                    </div>
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
                                    Effective Date
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-6 py-2 text-left text-sm uppercase font-bold text-gray-900"
                                  >
                                    Expiration Date
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-6 py-2 text-left text-sm uppercase font-bold text-gray-900"
                                  >
                                    Type
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-6 py-2 text-left text-sm uppercase font-bold text-gray-900"
                                  >
                                    No. of Vehicles
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
                                    {result.policy.effectiveDate === null
                                      ? "N/A"
                                      : result.policy.effectiveDate}
                                  </td>
                                  <td className="whitespace-nowrap px-6 py-2 text-sm font-light text-gray-900">
                                    {result.policy.expirationDate === null
                                      ? "N/A"
                                      : result.policy.expirationDate}
                                  </td>
                                  <td className="whitespace-nowrap px-6 py-2 text-sm font-light text-gray-900">
                                    {result.policy.type === null ||
                                    result.policy.type === "0"
                                      ? "NONE"
                                      : result.policy.type}
                                  </td>
                                  <td className="whitespace-nowrap px-6 py-2 text-sm font-light text-gray-900">
                                    {result.policy.vehicles === null
                                      ? "XX"
                                      : result.policy.vehicles}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:mb-0 mb-6">
                      <h4 className="min-w-full py-2 hidden sm:px-6 lg:inline-block lg:px-8 font-bold">
                        POLICY HOLDER
                      </h4>
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
                                  >
                                    Driver License Number
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-6 py-2 text-left text-sm uppercase font-bold text-gray-900"
                                  >
                                    Date Issued
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="border-b">
                                  <td className="whitespace-nowrap px-6 py-2 text-sm font-light text-gray-900">
                                    {result.holder.firstName === null
                                      ? "N/A"
                                      : result.holder.firstName}
                                  </td>
                                  <td className="whitespace-nowrap px-6 py-2 text-sm font-light text-gray-900">
                                    {result.holder.lastName === null
                                      ? "N/A"
                                      : result.holder.lastName}
                                  </td>
                                  <td className="whitespace-nowrap px-6 py-2 text-sm font-light text-gray-900">
                                    {result.holder.address === null
                                      ? "N/A"
                                      : result.holder.address}
                                  </td>
                                  <td className="whitespace-nowrap px-6 py-2 text-sm font-light text-gray-900">
                                    {result.holder.licenseNumber === null
                                      ? "N/A"
                                      : result.holder.licenseNumber}
                                  </td>
                                  <td className="whitespace-nowrap px-6 py-2 text-sm font-light text-gray-900">
                                    {result.holder.dateIssued === null
                                      ? "N/A"
                                      : result.holder.dateIssued}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:mb-0 mb-6">
                      <h4 className="min-w-full py-2 hidden sm:px-6 lg:inline-block lg:px-8 font-bold">
                        {result.vehicle.length === 1 ? "VEHICLE" : "VEHICLES"}
                      </h4>
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
                                    Make
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-6 py-2 text-left text-sm uppercase font-bold text-gray-900"
                                  >
                                    Model
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-6 py-2 text-left text-sm uppercase font-bold text-gray-900"
                                  >
                                    Year
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-6 py-2 text-left text-sm uppercase font-bold text-gray-900"
                                  >
                                    Type
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-6 py-2 text-left text-sm uppercase font-bold text-gray-900"
                                  >
                                    Fuel
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-6 py-2 text-left text-sm uppercase font-bold text-gray-900"
                                  >
                                    Cost
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-6 py-2 text-left text-sm uppercase font-bold text-gray-900"
                                  >
                                    Color
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {result.vehicle === null
                                  ? null
                                  : result.vehicle.map((item, index) => (
                                      <tr className="border-b" key={index}>
                                        <td className="whitespace-nowrap px-6 py-2 text-sm font-light text-gray-900">
                                          {item.make === null
                                            ? "N/A"
                                            : item.make}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-2 text-sm font-light text-gray-900">
                                          {item.model === null
                                            ? "N/A"
                                            : item.model}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-2 text-sm font-light text-gray-900">
                                          {item.year === null
                                            ? "N/A"
                                            : item.year}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-2 text-sm font-light text-gray-900">
                                          {item.type === null
                                            ? "N/A"
                                            : item.type}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-2 text-sm font-light text-gray-900">
                                          {item.fuel === null
                                            ? "N/A"
                                            : item.fuel}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-2 text-sm font-light text-gray-900">
                                          $
                                          {item.cost === null
                                            ? "N/A"
                                            : item.cost}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-2 text-sm font-light text-gray-900">
                                          {item.color === null
                                            ? "N/A"
                                            : item.color}
                                        </td>
                                      </tr>
                                    ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-center lg:hidden mb-6">
                      <div className="block p-6 rounded-lg shadow-lg bg-white w-full ">
                        <div className="sm:grid grid-cols-2 mb-2">
                          <div className="font-bold">EFFECTIVE DATE</div>
                          <div>
                            <span className="">
                              {result.policy.effectiveDate === null
                                ? "N/A"
                                : result.policy.effectiveDate}
                            </span>
                          </div>
                        </div>
                        <div className="sm:grid  grid-cols-2 mb-2">
                          <div className="font-bold">EXPIRATION DATE</div>
                          <div>
                            <span className="">
                              {result.policy.expirationDate === null
                                ? "N/A"
                                : result.policy.expirationDate}
                            </span>
                          </div>
                        </div>
                        <div className="sm:grid grid-cols-2 mb-2">
                          <div className="font-bold">TYPE</div>
                          <div>
                            <span className="">
                              {result.policy.type === null ||
                              result.policy.type === "0"
                                ? "N/A"
                                : result.policy.type}
                            </span>
                          </div>
                        </div>
                        <div className="sm:grid grid-cols-2 mb-2">
                          <div className="font-bold">NO. OF VEHICLES</div>
                          <div>
                            <span className="">
                              {result.policy.vehicles === null
                                ? "N/A"
                                : result.policy.vehicles}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex lg:hidden mb-3">
                      <h4 className="font-bold">POLICY HOLDER</h4>
                    </div>
                    <div className="flex justify-center lg:hidden mb-6">
                      <div className="block p-6 rounded-lg shadow-lg bg-white w-full ">
                        <div className="sm:grid grid-cols-2 mb-2">
                          <div className="font-bold">FIRST NAME</div>
                          <div>
                            <span className="">
                              {result.holder.firstName === null
                                ? "N/A"
                                : result.holder.firstName}
                            </span>
                          </div>
                        </div>
                        <div className="sm:grid  grid-cols-2 mb-2">
                          <div className="font-bold">LAST NAME</div>
                          <div>
                            <span className="">
                              {result.holder.lastName === null
                                ? "N/A"
                                : result.holder.lastName}
                            </span>
                          </div>
                        </div>
                        <div className="sm:grid grid-cols-2 mb-2">
                          <div className="font-bold">ADDRESS</div>
                          <div>
                            <span className="">
                              {result.holder.address === null
                                ? "N/A"
                                : result.holder.address}
                            </span>
                          </div>
                        </div>
                        <div className="sm:grid grid-cols-2 mb-2">
                          <div className="font-bold">LICENSE NUMBER</div>
                          <div>
                            <span className="">
                              {result.holder.licenseNumber === null
                                ? "N/A"
                                : result.holder.licenseNumber}
                            </span>
                          </div>
                        </div>
                        <div className="sm:grid grid-cols-2 mb-2">
                          <div className="font-bold">DATE ISSUED</div>
                          <div>
                            <span className="">
                              {result.holder.dateIssued === null
                                ? "N/A"
                                : result.holder.dateIssued}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex lg:hidden mb-3">
                      <h4 className="font-bold">
                        {result.vehicle.length === 1 ? "VEHICLE" : "VEHICLES"}
                      </h4>
                    </div>
                    {result.vehicle === null
                      ? null
                      : result.vehicle.map((item, index) => (
                          <div
                            className="flex justify-center lg:hidden mb-6"
                            key={index}
                          >
                            <div className="block p-6 rounded-lg shadow-lg bg-white w-full ">
                              <div className="sm:grid grid-cols-2 mb-2">
                                <div className="font-bold">MAKE</div>
                                <div>
                                  <span className="">
                                    {item.make === null ? "N/A" : item.make}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
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

export default SearchPolicy;
