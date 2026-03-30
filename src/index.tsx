import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

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
    "%cBlog chia sẻ kiến thức, kinh nghiệm lập trình & cuộc sống\nMaster JavaScript/TypeScript Fullstack Development - Xây dựng ứng dụng web hiện đại, hiệu suất cao với NestJS Backend và React Frontend.\nhttps://khoahoc.tuanitpro.com\nTuấn: 0976060432",
    myStyles
  );

  root.render(
    <React.StrictMode>
      <div className="hfeed site">
        <App />
      </div>
    </React.StrictMode>
  );
}
