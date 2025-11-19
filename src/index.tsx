import React, { Profiler } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./globals.css";

const rootEl = document.getElementById("root");
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  const myStyles = [
    "color: green",
    "background: yellow",
    "font-size: 20px",
    "border: 1px solid blue",
    "padding: 5px",
  ].join(";");
  console.log(
    "%cBlog chia sẻ kiến thức, kinh nghiệm lập trình & cuộc sống\nMaster JavaScript/TypeScript Fullstack Development - Xây dựng ứng dụng web hiện đại, hiệu suất cao với NestJS Backend và React Frontend\nTuan: 0976060432",
    myStyles
  );

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
