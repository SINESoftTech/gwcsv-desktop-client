export const toPeriodTime = (timestamp = Date.now()) => {
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