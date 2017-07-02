let dateFormat = /^\d{2}( )\d{2}( )\d{4}$/,
    dateValidation = /^(?:(?:31( )(?:0?[13578]|1[02]))\1|(?:(?:29|30)( )(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29( )0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])( )(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/,
    dateRange = [1900, 2010];

/**
 * Get Number Of Days
 * This function calculates the number of days between two dates.
 * @param {string} input
 * @param {boolean} includeEndDate
 * @param {boolean} joinOutput
 * @return {string} output
 */
function getNumberOfDays(input,includeEndDate = false, joinOutput = true) {
    if(typeof input !== "string") {
        throw new Error("Data provied with wrong type");
    }

    let arr = input.split(",");

    if (arr.length == 2) {
        
        let dates = arr.map((d,i) => validate(d.trim(),i)),
            output = calculate(sortDates(dates));
        
        output[2] = includeEndDate ? output[2] + 1 : output[2];

        return joinOutput ? output.join(", ") : output;
    } else {
        throw new Error("Invalid Format, You need to provide two dates");
    }
}

/**
 * Validate
 * Check if the provided value is a date and in the right format
 * @param {string} d
 * @param {number} i
 * @return {number[]} output
 */
function validate(d,i) {
    let arr = d.split(" ").map((d) => parseInt(d));

    if(!dateFormat.test(d)) {
        throw new Error("Invalid Date Format, on index "+i+", it should be 'DD MM YYYYY'");
    }

    if(!dateValidation.test(d)) {
        throw new Error("Invalid Date, on index "+i);
    }

    if(arr[2] < dateRange[0] || arr[2] > dateRange[1]) {
        throw new Error("Date not in range, on index "+i);
    }

    return arr;
}

/**
 * Sort Dates
 * Just to sort the dates
 * @param {number[]} d
 * @return {number[]} output
 */
function sortDates(d) {
    let d1 = d[0],
        d2 = d[1];

    if (d1[2] !== d2[2]) {
        if (d1[2] > d2[2]) {
            d1 = d[1];
            d2 = d[0];
        }
    } else {
        if (d1[1] === d2[1]) {
            if (d1[0] > d2[0]) {
                d1 = d[1];
                d2 = d[0];
            }
        } else if (d1[1] > d2[1]) {
            d1 = d[1];
            d2 = d[0];
        }
    }

    return [d1, d2];
}

/**
 * Calculate
 * This is where we actually calculate the number of days
 * @param {number[]} d
 * @return {[]} output
 */
function calculate(d) {
    let d1 = d[0],
        d2 = d[1],
        count = 0,
        v = 0;

    if (d1[2] !== d2[2]) {
        for (let i = d1[2]; i < d2[2]; i++) {
            count += isLeapYear(i) ? 366 : 365;
        }

        v = count - getDaysInYear(d1) + getDaysInYear(d2);
    } else {
        v = Math.abs(getDaysInYear(d1) - getDaysInYear(d2));
    }

    return [formatOutput(d1).join(' '), formatOutput(d2).join(' '), v];
}

/**
 * Format Output
 * Use this to format the date to 'DD MM YYYY'
 * @param {number[]} d
 * @return {[]} output
 */
function formatOutput(d) {
    d[0] = d[0] < 10 ? '0'+d[0] : d[0];
    d[1] = d[1] < 10 ? '0'+d[1] : d[1];

    return d;
}

/**
 * Is Leap Year
 * Check if year is a leap year
 * @param {number} y
 * @return {boolean} output
 */
function isLeapYear(y) {
    if (y % 4 != 0) {
        return false;
    } else if (y % 100 != 0) {
        return true;
    } else if (y % 400 != 0) {
        return false;
    } else {
        return true;
    }
}

/**
 * Get Days In Year
 * Get the number of days for the start and end year
 * @param {number[]} d
 * @return {number} output
 */
function getDaysInYear(d) {
    let ily = isLeapYear(d[2]),
        diy = ily ? 366 : 365,
        count = 0;

    for (let i = 1; i < d[1]; i++) {
        count += getDaysInMonth(i, ily);
    }

    return count + d[0];
}

/**
 * Get Days In Month
 * Get the number of days in each month
 * @param {number} m
 * @param {boolean} ily
 * @return {number} output
 */
function getDaysInMonth(m, ily) {
    switch (m) {
        case 2:
            return ily ? 29 : 28;
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            return 31;
        default:
            return 30;
    }
}

module.exports = getNumberOfDays;