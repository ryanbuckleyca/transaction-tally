import React, {useEffect, useState} from 'react';
import { amountsCAD, omitConvertions, sumAmts, formatter } from './scripts'

const transactionsURL = 'https://shakepay.github.io/programming-exercise/web/transaction_history.json'
const btcURL = 'https://shakepay.github.io/programming-exercise/web/rates_CAD_BTC.json'
const ethURL = 'https://shakepay.github.io/programming-exercise/web/rates_CAD_ETH.json'

function App() {
  const [allTransactions, setAllTransactions] = useState([]);
  const [rates, setRates] = useState({});

  const evalWorth = (data) => {
    const balances = omitConvertions(data)
    const amounts = amountsCAD(balances, rates)
    const total = sumAmts(amounts)
    return formatter.format(total)
  }

  useEffect(() => {
    const callAPI = (url) => fetch(url).then(res => res.json())
    const loadTransactions = () => callAPI(transactionsURL)
      .then(data => setAllTransactions(data))

    Promise.all([ callAPI(btcURL), callAPI(ethURL) ])
      .then(res => setRates({...rates, BTC: res[0], ETH: res[1]}))
      .catch(err => console.log('whoops: ', err))
      .finally(loadTransactions())
  }, [rates])

  if(!allTransactions || !rates.ETH || !rates.BTC)
    return "Loading..."

  return (
    <div className="App">
      <h1>
      Transaction Tallier:
      </h1>
      <div>
      Your total worth is {evalWorth(allTransactions)}!
      </div>
    </div>
  );
}

export default App;
