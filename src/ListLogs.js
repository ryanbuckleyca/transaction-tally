import React from 'react';

function ListLogs(props) {

  const row = (tran) => {
    return(
      <tr key={tran.createdAt}>
        <td>{tran.createdAt}</td>
        <td>{tran.amount}</td>
        <td>{tran.currency}</td>
        <td>{tran.type}</td>
        <td>{tran.direction}</td>
        <td>{tran.from && (tran.from.amount + ' ' + tran.from.currency)}</td>
        <td>{tran.to && (tran.to.amount + ' ' + tran.to.currency)}</td>
      </tr>
    )
  }

  return(
    <table style={{width: '100%'}}>
      <thead>
        <tr style={{background: '#ececec'}}>
          <td>createdAt</td>
          <td>amount</td>
          <td>currency</td>
          <td>type</td>
          <td>direction</td>
          <td>from: </td>
          <td>to: </td>
        </tr>
      </thead>
      <tbody>
        { props.logs.map(tran => row(tran)) }
      </tbody>
    </table>
  )
}

export default ListLogs;
