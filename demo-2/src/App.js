import React, { useState, useMemo } from "react";
import { ShopAdjoin } from "./Test";
// import classnames from "classnames";
import "./App.css";

export default function App({ data, commoditySpecs }) {
  const [specsS, setSpecsS] = useState(
    Array.from({ length: commoditySpecs.length })
  );
  // 创建一个购物矩阵
  const shopAdjoin = useMemo(() => new ShopAdjoin(commoditySpecs, data), [
    commoditySpecs,
    data
  ]);
  // 获得可选项表
  const optionSpecs = shopAdjoin.querySpecsOptions(specsS);

  const handleClick = function(bool, text, index) {
    if (specsS[index] !== text && !bool) return;
    specsS[index] = specsS[index] === text ? "" : text;
    setSpecsS(specsS.slice());
  };

  return (
    <div className="container">
      {commoditySpecs.map(({ title, list }, index) => {
        return (
          <div key={index}>
            <h1>{title}</h1>
            <select
              onChange={e => {
                handleClick(
                  optionSpecs.indexOf(e.target.value) > -1,
                  e.target.value,
                  index
                );
              }}
            >
              {list.map((value, i) => {
                if (optionSpecs.indexOf(value) > -1) {
                  return <option key={i}>{value}</option>;
                }
              })}
            </select>
          </div>
        );
      })}
    </div>
  );
}
