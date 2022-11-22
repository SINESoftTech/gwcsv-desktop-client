export const toPeriodList = (timestamp = Date.now()) => {
  const date = new Date(timestamp);
  const year = date.getFullYear() - 1911;
  const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  const years = [year - 1, year, year + 1];
  return years.flatMap((year) => months.map((m) => year + m));
};

export const getPeriod = (yyyyMMdd) => {
  console.log('getPeriod', yyyyMMdd);
  let period = parseInt(yyyyMMdd.substring(0, 6), 10) - 191100;
  if (period % 2 === 1) {
    period += 1;
  }
  return period;
};

function getCurrentPeriodMonth(mon) {
  let currentMonth = mon;
  if (mon % 2 !== 0) {
    currentMonth += 1;
  }
  return currentMonth;
}

function getCurrentPeriodYear(year) {
  let currentYear;
  if (year) {
    currentYear = year - 1911;
  }
  return currentYear;
}

function combineWithRepublicEra(y, m) {
  const yaer = getCurrentPeriodYear(y);
  const month = getCurrentPeriodMonth(m);
  const currentRepublicEraMon = String(month).padStart(2, '0');
  return String(yaer + currentRepublicEraMon);
}

export const getCurrentPeriod = () => {
  const sysMonth = new Date().getMonth() + 1;
  const sysYear = new Date().getFullYear();
  const period = {
    year: getCurrentPeriodYear(sysYear),
    month: getCurrentPeriodMonth(sysMonth),
    epublicEra: combineWithRepublicEra(sysYear, sysMonth),
  };
  return period.epublicEra;
}