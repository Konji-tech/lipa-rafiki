import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// JSX << javascript with XML
// CRA (create react app) - scaffolds a Single Page Application (SPA)

//                            ╭────────────────────╮
//                            │ What does a SPA do │
//                            ╰────────────────────╯
//
// SPA has only one html file (index.html)
// 1. Injects markup to the <div id="root" />
//
// React creates a virtual DOM, similar to the browser DOM where it can update the UI when the component data changes
//
// 2. Updates the DOM when the browser changes
// 3. Handles routing (pretends that your website has multiple pages)
//

//               ╭──────────────────────────────────────────────╮
//               │ Single Page Applications  are DEAD (sort of) │
//               ╰──────────────────────────────────────────────╯

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
