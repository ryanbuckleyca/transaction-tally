import React from 'react';
import {printCAD} from './scripts'
import './style.css';

function ListLogs(props) {

  const row = (tran) => {
    const tooltip =
      <div>conversion (
        <span className="tooltip">
          details
          <span className="tooltiptext">
          from: {tran.from && (tran.from.amount + ' ' + tran.from.currency)}<br />
          to: {tran.to && (tran.to.amount + ' ' + tran.to.currency)}
          </span>
        </span>)
      </div>

    const dirColor = {
      'credit': { color: 'green' },
      'debit' : { color: 'red' }
    }

    return(
      <tr key={tran.createdAt}>
        <td>{tran.createdAt}</td>
        <td>{printCAD.format(tran.worthCAD)}</td>
        <td>{tran.currency}</td>
        <td>{tran.type}</td>
        <td style={dirColor[tran.direction]}>{tran.amount + ' ' + tran.currency}</td>
        <td>{tran.direction || tooltip}</td>
      </tr>
    )
  }

  return(
    <table style={{width: '100%'}}>
      <thead>
        <tr style={{background: '#ececec'}}>
          <td>date</td>
          <td>worth</td>
          <td>currency</td>
          <td>type</td>
          <td>amount</td>
          <td>direction</td>
        </tr>
      </thead>
      <tbody>
        { props.logs.map(tran => row(tran)) }
      </tbody>
    </table>
  )
}

export default ListLogs;
