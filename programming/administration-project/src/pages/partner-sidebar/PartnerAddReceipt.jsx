import React from "react";

const PartnerAddReceipt = () => {
  const method = window.localStorage.getItem("method");

  if (method == "false") {
    localStorage.clear();
    window.location.pathname = "/";
  } else {
    return <div>PartnerAddReceipt</div>;
  }
};

export default PartnerAddReceipt;
