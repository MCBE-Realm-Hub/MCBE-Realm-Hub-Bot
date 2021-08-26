function getBinSlice(snowflake: string, start: number, end?: number) {
    return parseInt(parseInt(snowflake).toString(2).slice(start, end), 2);
};
function snowflake(snowflake: string) {
    return {
        timestamp: 1420070400000 + getBinSlice(snowflake, 0, -22),
        worker: getBinSlice(snowflake, -22, -17),
        process: getBinSlice(snowflake, -17, -12),
        increment: getBinSlice(snowflake, -12)
    };
};

function toBytes(bytes: number): string {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    if(bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
};

function trimArray(array: Array<any>, maxLength: number): Array<any> {
    if(array.length > maxLength) {
        const length = array.length - maxLength;
        array = array.slice(0, maxLength);
        array.push(`${length} more...`);
    };
    return array;
};

function compressNumber(number: number): string | number {
    const types = ["", "k", "M", "G", "T", "P", "E", "Z", "Y"];
    const selectType = Math.log10(number) / 3 | 0;
    if(selectType == 0) return number;
    let scaled = number / Math.pow(10, selectType * 3);
    return scaled.toFixed(1) + types[selectType];
};

/**
 * Convert seconds, minutes, hours, days and week to milliseconds and vice versa
 * @param value string time support: second, minute, hour, day, week.
 * @param compact Return time string in a compact format
 */
function MS(value: string | number, { compact }: { compact: boolean }): string | number {
    if(typeof value === 'string') return timeToMs(value);
    if(typeof value === 'number') return msToTime(value, compact ? true : false);
};

function timeToMs(value: string): number {
    if(!/^-?\s?\d*\.?\d*?\s?((years*?|yrs*?)|(weeks*?)|(days*?)|(hours*?|hrs*?)|(minutes*?|mins*?)|(seconds*?|secs*?)|(milliseconds*?|msecs*?|ms)|[smhdwy])$/.test(value)) return;
    const number = parseFloat(value.replace(/[^-.0-9]+/g, ''));
    if(/\d+(?=\s?(milliseconds?|msecs?|ms))/.test(value)) return number;
    else if(/\d+(?=\s?s)/.test(value)) return number * 1000;
    else if(/\d+(?=\s?m)/.test(value)) return number * 60000;
    else if(/\d+(?=\s?h)/.test(value)) return number * 3.6e+6;
    else if(/\d+(?=\s?d)/.test(value)) return number * 8.64e+7;
    else if(/\d+(?=\s?w)/.test(value)) return number * 6.048e+8;
    else if(/\d+(?=\s?y)/.test(value)) return number * 3.154e+10;
};
function msToTime(ms: number, compact: boolean): string {
    let absMs = Math.abs(ms);
    let seconds = absMs / 1000, minutes = absMs / 60000, hours = absMs / 3.6e+6, days = absMs / 8.64e+7, weeks = absMs / 6.048e+8;
    if(absMs < 1000) return compact ? `${absMs}ms` : plural(absMs, 'millisecond', ms);
    else if(seconds < 60) return compact ? `${seconds}s` : plural(seconds, 'second', ms);
    else if(minutes < 60) return compact ? `${minutes}m` : plural(minutes, 'minute', ms);
    else if(hours < 24) return compact ? `${hours}h` : plural(hours, 'hour', ms);
    else if(days < 7) return compact ? `${days}d` : plural(days, 'day', ms);
    else return compact ? `${weeks}w` : plural(weeks, 'week', ms);
};
function plural(time: number, type: string, ms: number): string {
    let negative = false;
    if(Math.sign(ms) === -1) negative = true;
    if(time > 1) return `${negative ? '-' : ''}${time} ${type}s`;
    else return `${negative ? '-' : ''}${time} ${type}`
};

function compareStrings(firstStr: string, secondStr: string): number {
    firstStr = firstStr.replace(/\s+/g, '');
    secondStr = secondStr.replace(/\s+/g, '');

    if(firstStr === secondStr) return 100;
    if(firstStr.length < 2 || secondStr.length < 2) return 0;

    let firstBigrams = new Map();
    for(let i = 0; i < firstStr.length - 1; i++) {
        const bigram = firstStr.substring(i, i + 2);
        const count = firstBigrams.has(bigram) ? firstBigrams.get(bigram) + 1 : 1;
        firstBigrams.set(bigram, count);
    };

    let intersectionSize = 0;
    for(let i = 0; i < secondStr.length - 1; i++) {
        const bigram = secondStr.substring(i, i + 2);
        const count = firstBigrams.has(bigram) ? firstBigrams.get(bigram) : 0;
        if(count > 0) {
            firstBigrams.set(bigram, count - 1);
            intersectionSize++;
        };
    };
    return Math.floor((2.0 * intersectionSize) / (firstStr.length + secondStr.length - 2) * 100);
};

function bestStringMatch(mainString: string, targetArray: Array<string>): number {
    const bestSoFar = [];
    let bestMatchIndex = null;

    for(let i = 0; i < targetArray.length; i++) {
        const currentBest = compareStrings(mainString, targetArray[i]);
        bestSoFar.push({target: targetArray[i], rating: currentBest});
        if(currentBest > bestSoFar[bestMatchIndex ? bestMatchIndex : 0].rating) bestMatchIndex = i;
    };
    return bestMatchIndex;
};

export { snowflake, toBytes, trimArray, compressNumber, MS, compareStrings, bestStringMatch };