import moment from "moment";

export const toPeriodList = (timestamp = Date.now()) => {
    const date = new Date(timestamp);
    const year = date.getFullYear() - 1911;
    const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    const years = [year - 1, year, year + 1];
    return years.flatMap((year) => months.map((m) => year + m));
};

export const getPeriod = (yyyyMMdd) => {
    let period = parseInt((yyyyMMdd+"").substring(0, 6), 10) - 191100;
    if (period % 2 === 1) {
        period += 1;
    }
    return period;
};

export const getYYYYMMDD = (yyymmdd) => {
    let currentYear;
    if (yyymmdd) {
        currentYear = parseInt(yyymmdd) + 19110000;
    }
    return currentYear;
}

export function getCurrentPeriodMonth(mon) {
    let currentMonth = mon;
    if (mon % 2 !== 0) {
        currentMonth += 1;
    }
    return currentMonth;
}

export function getCurrentPeriodYear(year) {
    let currentYear;
    if (year) {
        currentYear = year - 1911;
    }
    return currentYear;
}

export function getCurrentPeriodYearWithMonth(yearMM) {
    let currentYear;
    if (yearMM) {
        currentYear = yearMM - 191100;
    }
    return currentYear;
}

function combineWithRepublicEra(y, m) {
    const year = getCurrentPeriodYear(y);
    const month = getCurrentPeriodMonth(m);
    const currentRepublicEraMon = String(month).padStart(2, '0');
    return String(year + currentRepublicEraMon);
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

export const convertUnixTimestamp = (date) => moment(date, 'YYYY MM DD').valueOf();

