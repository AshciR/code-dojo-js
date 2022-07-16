/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
const isAnagram = function (s, t) {

    if (s.length !== t.length) {
        return false;
    }

    const sFreqMap = convertToFreqMap(s);
    const tFreqMap = convertToFreqMap(t);

    return everyEntryHasSameValue(sFreqMap, tFreqMap);

};

const convertToFreqMap = (word) => {

    const freqMap = new Map();

    for (const char of word) {

        // 1st occurrence
        if (!freqMap[char]) {
            freqMap[char] = 1;
        }

        // Increase the count
        freqMap[char]++

    }

    return freqMap;
}

const everyEntryHasSameValue = (sFreqMap, tFreqMap) => {

    for (const key in sFreqMap) {
        if (tFreqMap[key] !== sFreqMap[key]) {
            return false;
        }
    }

    return true;
};

const wordPairs = [
    {
        firstWord: 'cat',
        secondWord: 'tac'
    },
    {
        firstWord: 'at',
        secondWord: 'tac'
    }
]

wordPairs.forEach(pair => console.log(isAnagram(pair.firstWord, pair.secondWord)));

