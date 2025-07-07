/**
 * Valid Anagram
 * Given two strings s and t, return true if t is an anagram of s, and false otherwise.
 * An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase,
 * typically using all the original letters exactly once.
 *
 * Example 1:
 * Input: s = "anagram", t = "nagaram"
 * Output: true
 *
 * Example 2:
 * Input: s = "rat", t = "car"
 * Output: false
 *
 * Constraints:
 * - 1 <= s.length, t.length <= 5 * 10^4
 * - s and t consist of lowercase English letters.
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1) - fixed size character set
 *
 * @param {string} s - First string
 * @param {string} t - Second string
 * @return {boolean} - True if t is an anagram of s, false otherwise
 */
function isAnagram(s, t) {
    if (s.length !== t.length) {
        return false;
    }

    const charCount = {};

    // Count characters in first string
    for (const char of s) {
        charCount[char] = (charCount[char] || 0) + 1;
    }

    // Subtract characters from second string
    for (const char of t) {
        if (!charCount[char]) {
            return false;
        }
        charCount[char]--;
    }

    return true;
}

/**
 * Valid Anagram - Alternative approach using sorting
 *
 * Time Complexity: O(n log n)
 * Space Complexity: O(1) - not counting the space for sorting
 *
 * @param {string} s - First string
 * @param {string} t - Second string
 * @return {boolean} - True if t is an anagram of s, false otherwise
 */
function isAnagramSort(s, t) {
    if (s.length !== t.length) {
        return false;
    }

    return s.split('').sort().join('') === t.split('').sort().join('');
}

/**
 * Valid Anagram - Using character frequency array (for lowercase letters only)
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1) - fixed size array of 26
 *
 * @param {string} s - First string
 * @param {string} t - Second string
 * @return {boolean} - True if t is an anagram of s, false otherwise
 */
function isAnagramArray(s, t) {
    if (s.length !== t.length) {
        return false;
    }

    const charCount = new Array(26).fill(0);

    for (let i = 0; i < s.length; i++) {
        charCount[s.charCodeAt(i) - 'a'.charCodeAt(0)]++;
        charCount[t.charCodeAt(i) - 'a'.charCodeAt(0)]--;
    }

    return charCount.every(count => count === 0);
}

module.exports = {
    isAnagram,
    isAnagramSort,
    isAnagramArray
};