const rateAtTime = (transaction, rates) => {
  const date = (obj) => new Date(obj.createdAt)
  const currency = transaction.currency
  const findRates = rates[currency].filter(
    rate => date(rate) <= date(transaction)
  )
  const prevRates = findRates.sort(
    (a, b) => date(b) - date(a)
  )
  return prevRates[0].midMarketRate
}

const amountsCAD = (transactions, rates) => {
  return transactions.map(t => {
    const x = t.direction === 'debit' ? -1 : 1
    const amtCADatTime = t.currency === 'CAD' ? 1 : rateAtTime(t, rates)
    return t.amount * amtCADatTime * x
  })
}

const omitConvertions = (logs) => {
  const trans = ['credit', 'debit']
  return logs.filter(log => trans.includes(log.direction))
}

const sumAmts = (amts) => amts.reduce((a,b) => a+b, 0);

const formatter = new Intl.NumberFormat('en-CA', {
  style: 'currency',
  currency: 'CAD',
});


export { amountsCAD, omitConvertions, sumAmts, formatter };
