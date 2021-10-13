function escapeToUnicode(value: string) {
    for(var newString = '', i = 0, unicode: number; !isNaN(unicode = value.charCodeAt(i++));)
        newString += '\\u' + `0000${unicode.toString(16)}`.slice(-4);
    return newString;
};
function obfuscateJSON(json: string): any {
    const commentRegex = /\/\*[\s\S]*?\*\/|\/\/.*/g, stringRegex = /"(?:"|.)*?"/g;
    let jsonString = json.replace(commentRegex, '');
    try {
        jsonString = JSON.stringify(JSON.parse(jsonString));
    } catch(err) { return false };

    const syntaxArr = jsonString.split(stringRegex), stringArr = `"${jsonString}"`.split(stringRegex).slice(1, -1);
    
    let unicodeArr = [], jsonUnicode = '';
    stringArr.forEach(str => unicodeArr.push(`"${escapeToUnicode(str).replace(/\\u005c$/g, '\\')}"`));
    syntaxArr.map((value, index) => jsonUnicode += `${value}${unicodeArr[index] ? unicodeArr[index] : ''}`);

    return jsonUnicode;
};

export { obfuscateJSON };
