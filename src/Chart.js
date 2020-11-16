import React, { Component } from 'react';
import '../node_modules/react-vis/dist/style.css';
import {XYPlot, VerticalBarSeries, FlexibleWidthXYPlot} from 'react-vis';

class Chart extends Component {

  render() {

    const data = this.props.logs.map((tran, i) => {
      return ({ x: i, y: tran.worthCAD })
    })

    return (
      <div className="App">
        <FlexibleWidthXYPlot height={300}>
          <VerticalBarSeries data={data} />
        </FlexibleWidthXYPlot>
      </div>
    );
  }
}

export default Chart;
