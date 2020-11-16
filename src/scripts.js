const ratesAtTime = (date, rates) => {
  const ethRates = rates.ETH.filter(
    rate => rate.createdAt <= date
  )
  const btcRates = rates.BTC.filter(
    rate => rate.createdAt <= date
  )
  const dayRates = {
    ETH: ethRates[ethRates.length-1] ? ethRates[ethRates.length-1].midMarketRate : null,
    BTC: btcRates[btcRates.length-1] ? btcRates[btcRates.length-1].midMarketRate : null,
    CAD: 1
  }
  return dayRates
}

const convertToCAD = (amount, direction, currency, rates) => {
  if(!direction)
    return null
  return amount * rates[currency] * (direction === 'credit' ? 1 : -1)
}

const balanceCAD = (rates, balances) => {
  const fromETH = balances.ETH >= 0 ? balances.ETH * rates.ETH : 0
  const fromBTC = balances.BTC >= 0 ? balances.BTC * rates.BTC : 0
  const fromCAD = balances.CAD >= 0 ? balances.CAD : 0
  return fromETH + fromBTC + fromCAD
}

const formatter = new Intl.NumberFormat('en-CA', {
  style: 'currency',
  currency: 'CAD',
});


export { ratesAtTime, formatter, balanceCAD, convertToCAD };
