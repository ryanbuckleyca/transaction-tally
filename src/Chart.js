import React, { Component } from 'react';
import '../node_modules/react-vis/dist/style.css';
import {XYPlot, LineSeries} from 'react-vis';

class Chart extends Component {

  render() {

    const data = this.props.logs.map((tran, i) => {
      return ({ x: i, y: tran.total })
    })

    return (
      <div className="App">
        <XYPlot height={300} width={300}>
          <LineSeries data={data} />
        </XYPlot>
      </div>
    );
  }
}

export default Chart;
