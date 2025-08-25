import React, { Profiler } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom"; 
import "./globals.css"

const rootEl = document.getElementById("root");
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <Profiler id="App">
          <div className="hfeed site">
             
              <App />
            
          </div>
        </Profiler>
      </BrowserRouter>
    </React.StrictMode>
  );
}
