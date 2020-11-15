import React, {useEffect, useState} from 'react';
import './App.css';

function App() {

  const url = 'https://shakepay.github.io/programming-exercise/web/transaction_history.json'

  const rates = {
    BTC: 20872.26,
    ETH: 602.91,
    CAD: 1
  }

  const onlyBalances = (logs) => {
    const inOut = ['credit', 'debit']
    return logs.filter(log => inOut.includes(log.direction))
  }

  const amtsCAD = (amts) => {
    return amts.map(amts => {
      const x = amts.direction === 'debit' ? -1 : 1
      return amts.amount * rates[amts.currency] * x
    })
  }

  const sumAmts = (amts) => {
    return amts.reduce((a,b) => a+b, 0);
  }

  const evaluateWorth = (data) => {
    const balances = onlyBalances(data)
    const amounts = amtsCAD(balances)
    const total = sumAmts(amounts)
    return amounts[0] + total
  }

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'CAD',
  });

  const [netWorth, setNetWorth] = useState();

  useEffect(()=>{
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setNetWorth(evaluateWorth(data))
      })
  },[])

  return (
    <div className="App">
      <h1>
      Transaction Tallier:
      </h1>
      <div>
      Your total worth is {formatter.format(netWorth)}!
      </div>
    </div>
  );
}

export default App;
