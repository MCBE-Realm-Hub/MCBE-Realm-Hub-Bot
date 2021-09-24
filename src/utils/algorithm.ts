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

export { compareString, bestStringMatch };