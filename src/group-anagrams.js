/**
 * @param {string[]} strs
 * @return {string[][]}
 */
const groupAnagrams = function (strs) {
    const anagramsMap = groupAnagramsByWord(strs);
    return Object.values(anagramsMap).map(anagrams => anagrams);
};

/**
 * @param {string[]} strs
 * @return {{}}
 */
const groupAnagramsByWord = function (strs) {

    // Group the anagrams together
    return strs.reduce((anagramsMap, currentString) => {

        const originalWordAnagramWord = isAnAnagramInWordList(currentString, Object.keys(anagramsMap));

        if (originalWordAnagramWord || originalWordAnagramWord === '') {
            anagramsMap[originalWordAnagramWord] = [...anagramsMap[originalWordAnagramWord], currentString]
        } else {
            anagramsMap[currentString] = [currentString]
        }

        return anagramsMap;

    }, {});

};

/**
 *
 * @param {string}stringToCheck
 * @param {string[]} wordList
 */
function isAnAnagramInWordList(stringToCheck, wordList) {
    return wordList.find(word => isAnagram(word, stringToCheck))
}

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

    return [...word].reduce((charMap, char) => {
        (charMap[char]) ? charMap[char]++ : charMap[char] = 1; // if the char already exists increase the count
        return charMap
    }, {});

}

const everyEntryHasSameValue = (sFreqMap, tFreqMap) => {
    return Object.keys(sFreqMap).every(key => {
        return sFreqMap[key] === tFreqMap[key]
    })
};

let case1 = ["eat", "tea", "tan", "ate", "nat", "bat"];
let case2 = ["", ""];
console.log(groupAnagramsByWord(case2));


