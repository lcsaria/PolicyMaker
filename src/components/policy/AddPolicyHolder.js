import React, { useState, useEffect } from "react";

function AddPolicyHolder({ data }) {
  const [policy] = useState(data);

  const setPolicyHolderInfo = (e) => {
    if (policy.type === "Owner") {
      console.log("Owner");
    }
  };

  useEffect(() => {
    setPolicyHolderInfo();
  });

  return (
    <div>
      <h1>AddPolicyHolder</h1>
      {/* <p>{policy.id}</p> */}
    </div>
  );
}

export default AddPolicyHolder;
