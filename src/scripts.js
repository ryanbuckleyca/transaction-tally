const currencies = ['ETH', 'BTC', 'CAD']

const ratesAtTime = (date, rates) => {
  const currencyRates = {}
  currencies.forEach(currency => {
    if (currency === 'CAD') return currencyRates.CAD = 1
    const dayRate = rates[currency]
      .filter(rate => rate.createdAt <= date)
      .pop()
    currencyRates[currency] = dayRate ? dayRate.midMarketRate : null
  })
  return currencyRates
}

const convertToCAD = (amount, direction, currency, rates) => {
  if(!direction)
    return null
  return amount * rates[currency] * (direction === 'credit' ? 1 : -1)
}

const balanceCAD = (rates, balances) => {
  return currencies
    .map(i => (balances[i] >= 0) ? (balances[i] * rates[i]) : 0)
    .reduce((a, b) => a + b, 0)
}

const printCAD = new Intl.NumberFormat('en-CA', {
  style: 'currency',
  currency: 'CAD',
});


export { ratesAtTime, printCAD, balanceCAD, convertToCAD };
