import React from 'react';
import { Grid, _ } from "gridjs-react";
import {printCAD, printDate, printTime, dirColor} from './scripts'
import './style.css';

function ListLogs(props) {

  if(!props.data) {
    return "Loading..."
  }

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
    const conversionTooltip =
     `from ${tran.from && (tran.from.amount + ' ' + tran.from.currency)}
      to ${tran.to && (tran.to.amount + ' ' + tran.to.currency)}`;

    const colDate = <span>{printDate(tran.createdAt)}  {tooltip('time', printTime(tran.createdAt), 'right')}</span>
    const colWorth = printCAD.format(tran.worthCAD)
    const colAmount = <span style={dirColor[tran.direction]}>{tran.amount + ' ' + tran.currency}</span>
    const colInfo = tran.direction
      ? <div>{tran.direction} {tooltip('details', tran.type, 'left')}</div>
      : <div>conversion {tooltip('details', conversionTooltip, 'left')}</div>

    return([ _(colDate), colWorth, _(colAmount), _(colInfo) ])
  }

  return(
    <Grid
      data={props.data.map(tran => row(tran))}
      columns={['date', 'worth', 'amount', 'details']}
      search={false}
      pagination={{enabled: true, limit: 20}}
    />
  )
}

export default ListLogs;
