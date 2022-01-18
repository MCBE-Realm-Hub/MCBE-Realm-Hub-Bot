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

function trimString(string: string, maxLength: number): string {
    return string.length > maxLength ? `${string.substring(0, maxLength)}...` : string;
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

function escapeToUnicode(value: string) {
    for(var newString = '', i = 0, unicode: number; !isNaN(unicode = value.charCodeAt(i++));)
        newString += '\\u' + `0000${unicode.toString(16)}`.slice(-4);
    return newString;
};

export {
    snowflake,
    toBytes,
    trimString,
    trimArray,
    compressNumber,
    escapeToUnicode
};