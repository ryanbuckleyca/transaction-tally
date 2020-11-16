import React from 'react';
import { Grid } from "gridjs-react";
import {printCAD} from './scripts'
import './style.css';

function ListLogs(props) {

  const tooltip = (text, info, dir) => {
    const classDir = `tooltiptext tooltip tooltip${dir}`
    return (
      <span className="tooltip">
        ({text})
        <span className={classDir}>
          {info}
        </span>
      </span>
    )
  }

  const row = (tran) => {
    const dirColor = {
      'credit': { color: 'green' },
      'debit' : { color: 'red' }
    }
    const date = (string) => {
      const d = new Date(string)
      return d.toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
    }
    const time = (string) => {
      const t = new Date(string)
      return t.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true })
    }
    const conversionTooltip =
     `from ${tran.from && (tran.from.amount + ' ' + tran.from.currency)}
      to ${tran.to && (tran.to.amount + ' ' + tran.to.currency)}`;

    return(
      <tr key={tran.createdAt}>
        <td>{date(tran.createdAt)} {tooltip('time', time(tran.createdAt), 'right')}</td>
        <td>{printCAD.format(tran.worthCAD)}</td>
        <td style={dirColor[tran.direction]}>{tran.amount + ' ' + tran.currency}</td>
        <td>
        {
          tran.direction
          ? <div>{tran.direction} {tooltip('details', tran.type, 'left')}</div>
          : <div>conversion {tooltip('details', conversionTooltip, 'left')}</div>
        }
        </td>
      </tr>
    )
  }

  return(
    <table style={{width: '100%'}}>
      <thead>
        <tr style={{background: '#ececec'}}>
          <td>date</td>
          <td>worth</td>
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
