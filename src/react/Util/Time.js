export const toPeriodList = (timestamp = Date.now()) => {
  const date = new Date(timestamp)
  const year = date.getFullYear() - 1911
  const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
  const years = [year - 1, year, year + 1]
  return years.flatMap(year => {
    return months.map(m => {
      return year + m
    })
  })
}

export const getPeriod = (yyyyMMdd) => {
  console.log('getPeriod', yyyyMMdd)
  let period = parseInt(yyyyMMdd.substring(0, 6)) - 191100
  if (period % 2 === 1) {
    period += 1
  }
  return period
}