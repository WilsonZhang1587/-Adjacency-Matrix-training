import React, { Component } from "react";
import { ShopAdjoin } from "./Test";

export class App2 extends Component {
  state = {
    array: Array.from({ length: this.props.commoditySpecs.length }),
    sendValue: {}
  };

  handleClick = (bool, text, index) => {
    const { array } = this.state;
    if (array[index] !== text && !bool) return;
    array[index] = array[index] === text ? "" : text;
    this.setState({ array: array.slice() });
  };

  render() {
    const { data, commoditySpecs } = this.props;
    const { array, sendValue } = this.state;

    const shopAdjoin = new ShopAdjoin(commoditySpecs, data);
    const optionSpecs = shopAdjoin.querySpecsOptions(array);

    return (
      <div className="container">
        {commoditySpecs.map(({ title, list }, index) => {
          return (
            <div key={index}>
              <h1>{title}</h1>
              <select
                onChange={e => {
                  this.handleClick(
                    optionSpecs.indexOf(e.target.value) > -1,
                    e.target.value,
                    index
                  );
                  // this.setState({
                  //   sendValue: {
                  //     ...sendValue,
                  //     ["value" + index]: e.target.value
                  //   }
                  // });
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
}

export default App2;
