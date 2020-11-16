import React, {useState, useEffect} from 'react';
import {Line} from 'react-chartjs-2';

function Chart(props) {

  const [chart, setChart] = useState({
    data: {
      labels: [],
      datasets: [{
          label: 'worth in CAD',
          data: [],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
      }]
    },
    options: {
      maintainAspectRatio: false
    }
  })

  useEffect(()=>{
    const labels = []
    const data = []
    props.logs.forEach((tran, i) => {
      labels.push(tran.createdAt.substr(0, 10))
      data.push(tran.worthCAD.toFixed(2))
    })
    chart.data.labels = labels
    chart.data.datasets[0].data = data
    setChart({...chart})
  },[])


  return (
    <div className="Chart">
      <Line id="chart" data={chart.data} options={chart.options} />
    </div>
  );
}

export default Chart;
