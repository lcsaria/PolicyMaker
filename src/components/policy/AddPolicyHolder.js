import React, { useState, useEffect } from "react";

function AddPolicyHolder({ data }) {
  const [policy] = useState(data);
  const [holder, setHolder] = useState({
    firstName: null,
    lastName: null,
    address: null,
    licenseNumber: null,
    dateIssued: null,
  });
  const setPolicyHolderInfo = (e) => {
    if (policy.type === "Owner") {
      console.log("Owner");
    }
  };

  const handleInput = (e) => {
    e.preventDefault();
    setHolder({ ...holder, [e.target.name]: e.target.value });
    console.log(holder);
  };

  useEffect(() => {
    setPolicyHolderInfo();
  });

  return (
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
              value={holder.firstName}
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
              value={holder.lastName}
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
              value={holder.address}
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
              value={holder.licenseNumber}
              onChange={handleInput}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-4 col-lg-3 mt-3">
            <label className="mt-2">Date Issued</label>
          </div>
          <div className="col-12 col-md-4 col-lg-4 mt-3">
            <input
              type="text"
              className="form-control"
              name="dateIssued"
              value={holder.dateIssued}
              onChange={handleInput}
            />
          </div>
        </div>
      </div>
      {/* <p>{policy.id}</p> */}
    </div>
  );
}

export default AddPolicyHolder;
