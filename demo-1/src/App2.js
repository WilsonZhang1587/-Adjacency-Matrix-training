import React from "react";
import { Adjoin } from "./Test2";

function App2() {
  // 创建矩阵
  const demo = new Adjoin(["v0", "v1", "v2", "v3", "v4"]);

  // 注册邻接点
  demo.setAdjoinVertexs("v0", ["v2", "v3"]);
  demo.setAdjoinVertexs("v1", ["v3", "v4"]);
  demo.setAdjoinVertexs("v2", ["v0", "v3", "v4"]);
  demo.setAdjoinVertexs("v3", ["v0", "v1", "v2"]);
  demo.setAdjoinVertexs("v4", ["v1", "v2"]);

  // 打印
  console.log(demo.getAdjoinVertexs("v0"));
  // ['v2', 'v3']
  return <div></div>;
}

export default App2;
