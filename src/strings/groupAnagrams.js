/**
 * Group Anagrams Implementation
 *
 * LeetCode #49 - Given an array of strings strs, group the anagrams together.
 * You can return the answer in any order.
 *
 * An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase,
 * typically using all the original letters exactly once.
 *
 * Example 1:
 * Input: strs = ["eat","tea","tan","ate","nat","bat"]
 * Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
 *
 * Example 2:
 * Input: strs = [""]
 * Output: [[""]]
 *
 * Company Tags: Amazon, Facebook, Google, Microsoft, Apple, Bloomberg, Uber
 * Difficulty: Medium
 * Pattern: Hash Map, String Manipulation, Sorting
 */

/**
 * Approach 1: Sort Characters (Most Common Solution)
 *
 * Time Complexity: O(n * k log k) where n is number of strings, k is max string length
 * Space Complexity: O(n * k) for the hash map
 *
 * Algorithm:
 * 1. For each string, sort its characters to create a key
 * 2. Group strings with the same sorted key together
 * 3. Return all groups
 *
 * @param {string[]} strs - Array of strings
 * @return {string[][]} - Grouped anagrams
 */
function groupAnagrams(strs) {
    if (!strs || strs.length === 0) return [];

    const groups = new Map();

    for (const str of strs) {
        // Sort characters to create unique key for anagrams
        const key = str.split('').sort().join('');

        if (!groups.has(key)) {
            groups.set(key, []);
        }
        groups.get(key).push(str);
    }

    return Array.from(groups.values());
}

/**
 * Approach 2: Character Count (Optimal for long strings)
 *
 * Time Complexity: O(n * k) where n is number of strings, k is max string length
 * Space Complexity: O(n * k)
 *
 * @param {string[]} strs
 * @return {string[][]}
 */
function groupAnagramsCharCount(strs) {
    if (!strs || strs.length === 0) return [];

    const groups = new Map();

    for (const str of strs) {
        // Create character count signature
        const count = new Array(26).fill(0);
        for (const char of str) {
            count[char.charCodeAt(0) - 'a'.charCodeAt(0)]++;
        }

        // Use count array as key
        const key = count.join(',');

        if (!groups.has(key)) {
            groups.set(key, []);
        }
        groups.get(key).push(str);
    }

    return Array.from(groups.values());
}

/**
 * Approach 3: Prime Number Multiplication
 *
 * Time Complexity: O(n * k)
 * Space Complexity: O(n * k)
 *
 * Note: Risk of integer overflow for very long strings
 *
 * @param {string[]} strs
 * @return {string[][]}
 */
function groupAnagramsPrime(strs) {
    if (!strs || strs.length === 0) return [];

    // Prime numbers for each letter
    const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101];

    const groups = new Map();

    for (const str of strs) {
        let product = 1;
        for (const char of str) {
            product *= primes[char.charCodeAt(0) - 'a'.charCodeAt(0)];
        }

        if (!groups.has(product)) {
            groups.set(product, []);
        }
        groups.get(product).push(str);
    }

    return Array.from(groups.values());
}

/**
 * Approach 4: Using Built-in Locale Compare
 *
 * Time Complexity: O(n * k log k)
 * Space Complexity: O(n * k)
 *
 * @param {string[]} strs
 * @return {string[][]}
 */
function groupAnagramsLocale(strs) {
    if (!strs || strs.length === 0) return [];

    const groups = new Map();

    for (const str of strs) {
        const key = str.split('').sort((a, b) => a.localeCompare(b)).join('');

        if (!groups.has(key)) {
            groups.set(key, []);
        }
        groups.get(key).push(str);
    }

    return Array.from(groups.values());
}

/**
 * Utility: Check if two strings are anagrams
 *
 * @param {string} str1
 * @param {string} str2
 * @return {boolean}
 */
function areAnagrams(str1, str2) {
    if (str1 === null || str2 === null || str1 === undefined || str2 === undefined) return false;
    if (str1.length !== str2.length) return false;

    return str1.split('').sort().join('') === str2.split('').sort().join('');
}

/**
 * Utility: Find anagrams of a specific word in array
 *
 * @param {string[]} strs
 * @param {string} target
 * @return {string[]}
 */
function findAnagramsOf(strs, target) {
    if (!strs || !target) return [];

    const targetKey = target.split('').sort().join('');

    return strs.filter(str => {
        const strKey = str.split('').sort().join('');
        return strKey === targetKey;
    });
}

/**
 * Utility: Count total anagram groups
 *
 * @param {string[]} strs
 * @return {number}
 */
function countAnagramGroups(strs) {
    return groupAnagrams(strs).length;
}

/**
 * Utility: Find largest anagram group
 *
 * @param {string[]} strs
 * @return {string[]}
 */
function findLargestAnagramGroup(strs) {
    const groups = groupAnagrams(strs);

    if (groups.length === 0) return [];

    return groups.reduce((largest, current) =>
        current.length > largest.length ? current : largest
    );
}

/**
 * Utility: Get anagram statistics
 *
 * @param {string[]} strs
 * @return {object}
 */
function getAnagramStats(strs) {
    if (!strs || strs.length === 0) {
        return {
            totalStrings: 0,
            totalGroups: 0,
            largestGroupSize: 0,
            averageGroupSize: 0,
            singletonCount: 0
        };
    }

    const groups = groupAnagrams(strs);
    const groupSizes = groups.map(group => group.length);

    return {
        totalStrings: strs.length,
        totalGroups: groups.length,
        largestGroupSize: Math.max(...groupSizes),
        smallestGroupSize: Math.min(...groupSizes),
        averageGroupSize: (strs.length / groups.length).toFixed(2),
        singletonCount: groups.filter(group => group.length === 1).length,
        groupSizes: groupSizes.sort((a, b) => b - a)
    };
}

/**
 * Utility: Visualize anagram groups
 *
 * @param {string[]} strs
 * @return {string}
 */
function visualizeAnagramGroups(strs) {
    const groups = groupAnagrams(strs);
    let visualization = `Anagram Groups (${groups.length} total):\n`;
    visualization += '═'.repeat(40) + '\n';

    groups.forEach((group, index) => {
        visualization += `Group ${index + 1} (${group.length} words): `;
        visualization += group.map(word => `"${word}"`).join(', ') + '\n';

        if (group.length > 1) {
            const key = group[0].split('').sort().join('');
            visualization += `  Key: "${key}"\n`;
        }
        visualization += '\n';
    });

    return visualization;
}

module.exports = {
    groupAnagrams,
    groupAnagramsCharCount,
    groupAnagramsPrime,
    groupAnagramsLocale,
    areAnagrams,
    findAnagramsOf,
    countAnagramGroups,
    findLargestAnagramGroup,
    getAnagramStats,
    visualizeAnagramGroups
};