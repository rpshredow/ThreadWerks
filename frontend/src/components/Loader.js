import React from "react";
import { ProgressBar } from "react-loader-spinner";

const Loader = () => {
  return (
    <ProgressBar
      height="120"
      width="120"
      ariaLabel="progress-bar-loading"
      wrapperStyle={{ margin: "auto", display: "block" }}
      wrapperClass="progress-bar-wrapper"
      borderColor="#808080"
      barColor="#808080"
    />
  );
};

export default Loader;
