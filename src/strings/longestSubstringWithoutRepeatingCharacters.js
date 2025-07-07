/**
 * Longest Substring Without Repeating Characters
 * Given a string s, find the length of the longest substring without repeating characters.
 *
 * Example 1:
 * Input: s = "abcabcbb"
 * Output: 3
 * Explanation: The answer is "abc", with the length of 3.
 *
 * Example 2:
 * Input: s = "bbbbb"
 * Output: 1
 * Explanation: The answer is "b", with the length of 1.
 *
 * Example 3:
 * Input: s = "pwwkew"
 * Output: 3
 * Explanation: The answer is "wke", with the length of 3.
 *
 * Time Complexity: O(n)
 * Space Complexity: O(min(m, n)) where m is the size of the charset
 *
 * @param {string} s - Input string
 * @return {number} - Length of longest substring without repeating characters
 */
function lengthOfLongestSubstring(s) {
    const charMap = new Map();
    let maxLength = 0;
    let left = 0;

    for (let right = 0; right < s.length; right++) {
        const char = s[right];

        // If character is already in current window, move left pointer
        if (charMap.has(char) && charMap.get(char) >= left) {
            left = charMap.get(char) + 1;
        }

        // Update character position
        charMap.set(char, right);

        // Update max length
        maxLength = Math.max(maxLength, right - left + 1);
    }

    return maxLength;
}

/**
 * Longest Substring Without Repeating Characters - Using Set
 *
 * Time Complexity: O(n)
 * Space Complexity: O(min(m, n))
 *
 * @param {string} s - Input string
 * @return {number} - Length of longest substring without repeating characters
 */
function lengthOfLongestSubstringSet(s) {
    const charSet = new Set();
    let maxLength = 0;
    let left = 0;

    for (let right = 0; right < s.length; right++) {
        const char = s[right];

        // Shrink window from left until no duplicates
        while (charSet.has(char)) {
            charSet.delete(s[left]);
            left++;
        }

        charSet.add(char);
        maxLength = Math.max(maxLength, right - left + 1);
    }

    return maxLength;
}

/**
 * Longest Substring Without Repeating Characters - With substring return
 *
 * Time Complexity: O(n)
 * Space Complexity: O(min(m, n))
 *
 * @param {string} s - Input string
 * @return {Object} - Object with length and the actual substring
 */
function lengthOfLongestSubstringWithString(s) {
    const charMap = new Map();
    let maxLength = 0;
    let left = 0;
    let maxLeft = 0;
    let maxRight = 0;

    for (let right = 0; right < s.length; right++) {
        const char = s[right];

        if (charMap.has(char) && charMap.get(char) >= left) {
            left = charMap.get(char) + 1;
        }

        charMap.set(char, right);

        if (right - left + 1 > maxLength) {
            maxLength = right - left + 1;
            maxLeft = left;
            maxRight = right;
        }
    }

    return {
        length: maxLength,
        substring: s.substring(maxLeft, maxRight + 1)
    };
}

/**
 * Longest Substring Without Repeating Characters - Brute Force
 *
 * Time Complexity: O(n³)
 * Space Complexity: O(min(m, n))
 *
 * @param {string} s - Input string
 * @return {number} - Length of longest substring without repeating characters
 */
function lengthOfLongestSubstringBruteForce(s) {
    let maxLength = 0;

    for (let i = 0; i < s.length; i++) {
        for (let j = i; j < s.length; j++) {
            const substring = s.substring(i, j + 1);

            if (hasUniqueCharacters(substring)) {
                maxLength = Math.max(maxLength, substring.length);
            } else {
                break;
            }
        }
    }

    return maxLength;
}

/**
 * Helper function to check if string has unique characters
 *
 * @param {string} str - Input string
 * @return {boolean} - Whether string has unique characters
 */
function hasUniqueCharacters(str) {
    const charSet = new Set();

    for (const char of str) {
        if (charSet.has(char)) {
            return false;
        }
        charSet.add(char);
    }

    return true;
}

module.exports = {
    lengthOfLongestSubstring,
    lengthOfLongestSubstringSet,
    lengthOfLongestSubstringWithString,
    lengthOfLongestSubstringBruteForce,
    hasUniqueCharacters
};