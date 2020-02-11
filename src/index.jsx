import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

//console.log("process.env :", process.env);

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <App />,
    document.body.appendChild(document.createElement("div"))
  );
});
