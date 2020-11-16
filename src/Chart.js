import React, { Component } from 'react';
import '../node_modules/react-vis/dist/style.css';
import {XYPlot, LineSeries, FlexibleWidthXYPlot} from 'react-vis';

class Chart extends Component {

  render() {

    const data = this.props.logs.map((tran, i) => {
      return ({ x: i, y: tran.worthCAD })
    })

    return (
      <div className="App">
        <FlexibleWidthXYPlot height={300}>
          <LineSeries curve={d3Shape.curveCatmullRom.alpha(0.5)} data={data} />
        </FlexibleWidthXYPlot>
      </div>
    );
  }
}

export default Chart;
