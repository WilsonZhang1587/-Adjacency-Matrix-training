import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import App2 from "./App2";
import * as serviceWorker from "./serviceWorker";

const data = [
  { id: "1", specs: ["紫色", "套餐一", "64G"] },
  { id: "2", specs: ["紫色", "套餐一", "128G"] },
  { id: "3", specs: ["紫色", "套餐二", "128G"] },
  { id: "4", specs: ["黑色", "套餐三", "256G"] },
  { id: "5", specs: ["黑色", "套餐一", "128G"], quan: 5 }
];
const commoditySpecs = [
  { title: "颜色", list: ["红色", "紫色", "白色", "黑色"] },
  { title: "套餐", list: ["套餐一", "套餐二", "套餐三", "套餐四"] },
  { title: "内存", list: ["64G", "128G", "256G"] }
];

ReactDOM.render(
  <App data={data} commoditySpecs={commoditySpecs} />,
  // <App2 />,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
