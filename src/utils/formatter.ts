import { StringValue, compactUnitAnyCase, durationInterface } from "./@types/ms";

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

function MS(value: StringValue): number;
function MS(value: number, { compactDuration, fullDuration }?: { compactDuration?: boolean, fullDuration?: boolean }): string;
function MS(value: number, { fullDuration, avoidDuration }?: { compactDuration?: boolean, fullDuration: boolean, avoidDuration: Array<compactUnitAnyCase> }): string;
function MS(value: StringValue | number, { compactDuration, fullDuration, avoidDuration }: { compactDuration?: boolean, fullDuration?: boolean, avoidDuration?: Array<compactUnitAnyCase> } = {}): string | number | undefined {
    try {
        if(typeof value === 'string') {
            if(/^\d+$/.test(value)) return Number(value);
            const durations = value.match(/-?\d*\.?\d+\s*?(years?|yrs?|weeks?|days?|hours?|hrs?|minutes?|mins?|seconds?|secs?|milliseconds?|msecs?|ms|[smhdwy])/gi);
            return durations ? durations.reduce((a, b) => a + toMS(b), 0) : null;
        };
        if(typeof value === 'number') return toDuration(value, { compactDuration, fullDuration, avoidDuration });
        throw new Error('Value is not a string or a number');
    } catch(err) {  
        const message = isError(err)
        ? `${err.message}. Value = ${JSON.stringify(value)}`
        : 'An unknown error has occured.';
        throw new Error(message);
    };
};
export default MS;

/**
 * Convert Durations to milliseconds
 */
function toMS(value: string): number | undefined {
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
 */
function toDuration(value: number, { compactDuration, fullDuration, avoidDuration }: { compactDuration?: boolean, fullDuration?: boolean, avoidDuration?: Array<compactUnitAnyCase> } = {}): string {
    const absMs = Math.abs(value);
    const duration: Array<durationInterface> = [
        { short: 'd', long: 'day', ms: absMs / 8.64e+7 },
        { short: 'h', long: 'hour', ms: absMs / 3.6e+6 % 24 },
        { short: 'm', long: 'minute', ms: absMs / 60000 % 60 },
        { short: 's', long: 'second', ms: absMs / 1000 % 60 },
        { short: 'ms', long: 'millisecond', ms: absMs % 1000 },
    ];
    const mappedDuration = duration
        .filter(obj => obj.ms !== 0 && avoidDuration ? fullDuration && !avoidDuration.map(v => v.toLowerCase()).includes(obj.short) : obj.ms)
        .map(obj => `${Math.sign(value) === -1 ? '-' : ''}${compactDuration ? `${Math.floor(obj.ms)}${obj.short}` : `${Math.floor(obj.ms)} ${obj.long}${obj.ms === 1 ? '' : 's'}`}`);
    return fullDuration ? mappedDuration.join(compactDuration ? ' ' : ', ') : mappedDuration[0];
};

/**
 * A type guard for errors.
 */
function isError(error: unknown): error is Error {
    return typeof error === 'object' && error !== null && 'message' in error;
};

export { snowflake, toBytes, trimArray, compressNumber, compareString, bestStringMatch, MS };