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

function MS(value: string): number;
function MS(value: number, { fullDuration, compactDuration }?: { fullDuration?: boolean, compactDuration?: boolean }): string;
/**
 * Convert seconds, minutes, hours, days and weeks to milliseconds and vice versa
 * @param {string | number} value - string time support: second, minute, hour, day, week.
 * @param {boolean} [fullDuration] - Display the full duration
 * @param {boolean} [compactDuration] - Write the duration format in short 
 * @returns {string | number | undefined}
 * @example MS('2 days')  //Output: 172800000
 * MS('1d')      //Output: 86400000
 * MS('10h')     //Output: 36000000
 * MS('2.5 hrs') //Output: 9000000
 * MS('2h')      //Output: 7200000
 * MS('1m')      //Output: 60000
 * MS('5s')      //Output: 5000
 * MS('1y')      //Output: 31557600000
 * MS('100')     //Output: 100
 * MS('-3 days') //Output: -259200000
 * MS('-1h')     //Output: -3600000
 * MS('-200')    //Output: -200
 *
 *  //Convert from Milliseconds
 *
 * MS(86400000, { compact: true });  //Output: 1d
 * MS(86400000);                     //Output: 1 day
 * MS(172800000, { compact: true }); //Output: 2d
 * MS(172800000);
 */
function MS(value: string | number, { fullDuration, compactDuration }: { fullDuration?: boolean, compactDuration?: boolean } = {}): string | number | undefined {
    try {
        if(typeof value === 'string') return /^\d+$/.test(value) ? Number(value) : value.split(/(?<=\d+\s*?[smhdwy]).*?(?=\d+\s*?[smhdwy])/gi).reduce((a, b) => a + toMS(b), 0);
        if(typeof value === 'number') return toDuration(value, { fullDuration, compactDuration });
    } catch(error) {
        throw new Error(error);
    };
};
/**
 * Convert Durations to milliseconds
 * @param {string} string - Duration to convert
 * @returns {number}
 */
function toMS(value: string): number {
    if(!/^-?\s*?\d*\.?\d+\s*?(years?|yrs?|weeks?|days?|hours?|hrs?|minutes?|mins?|seconds?|secs?|milliseconds?|msecs?|ms|[smhdwy])\s*?$/i.test(value)) return;
    const number = Number(value.replace(/[^-.0-9]+/g, ''));
    value = value.replace(/\s+/g, '');
    if(/\d+(?=ms|milliseconds?)/i.test(value)) return number;
    else if(/\d+(?=s)/i.test(value)) return number * 1000;
    else if(/\d+(?=m)/i.test(value)) return number * 60000;
    else if(/\d+(?=h)/i.test(value)) return number * 3.6e+6;
    else if(/\d+(?=d)/i.test(value)) return number * 8.64e+7;
    else if(/\d+(?=w)/i.test(value)) return number * 6.048e+8;
    else if(/\d+(?=y)/i.test(value)) return number * 3.154e+10;
};

/**
 * Convert milliseconds to durations
 * @param {number} value - Millisecond to convert
 * @param {boolean} [fullDuration] - Display the full duration
 * @param {boolean} [compactDuration] - Write the duration format in short 
 * @returns {string}
 */
function toDuration(value: number, { fullDuration, compactDuration }: { fullDuration?: boolean, compactDuration?: boolean } = {}): string {
    const absMs = Math.abs(value);
    const duration = [
        { short: 'd', long: 'day', ms: Math.floor(absMs / 8.64e+7) },
        { short: 'h', long: 'hour', ms: Math.floor(absMs / 3.6e+6) % 24 },
        { short: 'm', long: 'minute', ms: Math.floor(absMs / 60000) % 60 },
        { short: 's', long: 'second', ms: Math.floor(absMs / 1000) % 60 },
        { short: 'ms', long: 'millisecond', ms: Math.floor(absMs) % 1000 },
    ];
    const mappedDuration = duration
        .filter(obj => obj.ms !== 0)
        .map(obj => `${Math.sign(value) === -1 ? '-' : ''}${compactDuration ? `${obj.ms}${obj.short}` : `${obj.ms} ${obj.long}${obj.ms === 1 ? '' : 's'}`}`);
    return fullDuration ? mappedDuration.join(compactDuration ? ' ' : ', ') : mappedDuration[0];
};

function compareString(firstStr: string, secondStr: string): number {
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
    let bestMatchIndex = 0;

    for(let i = 0; i < targetArray.length; i++) {
        const currentBest = compareString(mainString, targetArray[i]);
        bestSoFar.push({target: targetArray[i], rating: currentBest});
        if(currentBest > bestSoFar[bestMatchIndex ? bestMatchIndex : 0].rating) bestMatchIndex = i;
    };
    return bestMatchIndex;
};

export { snowflake, toBytes, trimArray, compressNumber, MS, compareString, bestStringMatch };