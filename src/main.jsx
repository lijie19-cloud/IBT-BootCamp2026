import React, { Profiler } from "react";

import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

import App from "./App";

import { AuthProvider } from "./context/AuthContext";

import { ThemeProvider } from "./context/ThemeContext";

import "./index.css";

function onRender(
  id,
  phase,
  actualDuration,
  baseDuration,
  startTime,
  commitTime,
) {
  console.log(`[Profiler] ${id}`, {
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime,
  });
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <Profiler id="AddisEatsApp" onRender={onRender}>
            <App />
          </Profiler>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
