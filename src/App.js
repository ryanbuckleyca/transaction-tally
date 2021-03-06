import React, {useEffect, useState} from 'react';
import ListLogs from './ListLogs'
import Chart from './Chart'
import { ratesAtTime, printCAD, balanceCAD, convertToCAD } from './scripts'

const logsURL = 'https://shakepay.github.io/programming-exercise/web/transaction_history.json'
const btcURL = 'https://shakepay.github.io/programming-exercise/web/rates_CAD_BTC.json'
const ethURL = 'https://shakepay.github.io/programming-exercise/web/rates_CAD_ETH.json'

function App() {
  const [data, setData] = useState();

  const processLogs = (logs, rates) => {
    const balancedLogs = []

    for(let i = 0; i < logs.length; i++) {
      const { createdAt, amount, direction, currency, to, from } = logs[i]
      const prevBalances = i > 0 && balancedLogs[i-1].balances
      const addBal = (curr, amt, dir) => (prevBalances[curr] || 0) + amt * dir

      const getBalance = (curr, dir) => {
        const x = { 'debit': -1, 'credit': 1}
        if (i===0) return { [curr]: amount }
        if(dir) return {...prevBalances, [curr]: addBal(curr, amount, x[dir]) }
        return {
          ...prevBalances,
          [from.currency]: addBal(from.currency, from.amount, -1),
          [to.currency]: addBal(to.currency, to.amount, 1)
        }
      }

      const balances = getBalance(currency, direction)
      const dayRates = ratesAtTime(createdAt, rates)
      const amountCAD = convertToCAD(amount, direction, currency, dayRates)
      const worthCAD = balanceCAD(dayRates, balances)

      balancedLogs.push({ ...logs[i], amountCAD, dayRates, balances, worthCAD})
    }

    setData(balancedLogs)
  }

  useEffect(() => {
    const callAPI = (url) => fetch(url).then(res => res.json())

    Promise
      .all([ callAPI(btcURL), callAPI(ethURL), callAPI(logsURL) ])
      .then(res => {
        const rates = { BTC: res[0], ETH: res[1] }
        const data = res[2].reverse()
        processLogs(data, rates)
      })
      .catch(err => console.log('whoops: ', err))
  }, [])

  if(!data)
    return "Loading..."

  const total = data.pop().worthCAD

  return (
    <div className="App">
      <h1>
      Wealth Tracker:
      </h1>
      <div>
      Your total worth is {printCAD.format(total)}!
      </div>
      <Chart data={data} setData={setData} />
      <ListLogs data={data} setData={setData} />
    </div>
  );
}

export default App;
