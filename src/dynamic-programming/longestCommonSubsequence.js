/**
 * Longest Common Subsequence (LeetCode #1143)
 * Difficulty: Medium
 *
 * Problem: Given two strings text1 and text2, return the length of their longest common subsequence.
 * If there is no common subsequence, return 0.
 *
 * A subsequence of a string is a new string generated from the original string with some characters
 * (can be none) deleted without changing the relative order of the remaining characters.
 *
 * Company: Amazon, Microsoft, Google, Facebook, Apple
 * Topics: String, Dynamic Programming
 */

/**
 * Approach 1: 2D Dynamic Programming
 * Time: O(m * n) where m and n are lengths of text1 and text2
 * Space: O(m * n) for the DP table
 */
function longestCommonSubsequence(text1, text2) {
    const m = text1.length;
    const n = text2.length;

    // Create DP table
    const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));

    // Fill the DP table
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    return dp[m][n];
}

/**
 * Approach 2: Space-Optimized DP (1D array)
 * Time: O(m * n)
 * Space: O(min(m, n))
 */
function longestCommonSubsequenceOptimized(text1, text2) {
    const m = text1.length;
    const n = text2.length;

    // Use only two rows for space optimization
    let prev = new Array(n + 1).fill(0);
    let curr = new Array(n + 1).fill(0);

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                curr[j] = prev[j - 1] + 1;
            } else {
                curr[j] = Math.max(prev[j], curr[j - 1]);
            }
        }
        // Swap rows - prev becomes curr, and create new empty curr
        [prev, curr] = [curr, new Array(n + 1).fill(0)];
    }

    return prev[n];
}

/**
 * Approach 3: Recursive with Memoization
 * Time: O(m * n)
 * Space: O(m * n) for memoization + O(m + n) for recursion stack
 */
function longestCommonSubsequenceRecursive(text1, text2) {
    const memo = new Map();

    function lcs(i, j) {
        if (i === text1.length || j === text2.length) {
            return 0;
        }

        const key = `${i},${j}`;
        if (memo.has(key)) {
            return memo.get(key);
        }

        let result;
        if (text1[i] === text2[j]) {
            result = 1 + lcs(i + 1, j + 1);
        } else {
            result = Math.max(lcs(i + 1, j), lcs(i, j + 1));
        }

        memo.set(key, result);
        return result;
    }

    return lcs(0, 0);
}

/**
 * Approach 4: Bottom-up DP with actual subsequence construction
 * Time: O(m * n)
 * Space: O(m * n)
 */
function longestCommonSubsequenceWithString(text1, text2) {
    const m = text1.length;
    const n = text2.length;

    const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));

    // Fill the DP table
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    // Reconstruct the LCS string
    let lcs = '';
    let i = m, j = n;

    while (i > 0 && j > 0) {
        if (text1[i - 1] === text2[j - 1]) {
            lcs = text1[i - 1] + lcs;
            i--;
            j--;
        } else if (dp[i - 1][j] > dp[i][j - 1]) {
            i--;
        } else {
            j--;
        }
    }

    return {
        length: dp[m][n],
        subsequence: lcs
    };
}

/**
 * Approach 5: All possible LCS strings
 * Time: O(m * n * 2^(m+n)) worst case
 * Space: O(m * n * 2^(m+n))
 */
function findAllLCS(text1, text2) {
    const m = text1.length;
    const n = text2.length;
    const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));

    // Build DP table
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    const result = new Set();

    function backtrack(i, j, lcs) {
        if (i === 0 || j === 0) {
            result.add(lcs);
            return;
        }

        if (text1[i - 1] === text2[j - 1]) {
            backtrack(i - 1, j - 1, text1[i - 1] + lcs);
        } else {
            if (dp[i - 1][j] === dp[i][j]) {
                backtrack(i - 1, j, lcs);
            }
            if (dp[i][j - 1] === dp[i][j]) {
                backtrack(i, j - 1, lcs);
            }
        }
    }

    backtrack(m, n, '');
    return Array.from(result);
}

/**
 * Utility: Print DP table for visualization
 */
function printDPTable(text1, text2) {
    const m = text1.length;
    const n = text2.length;
    const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    // Create visualization
    const table = [];

    // Header row
    const header = ['', ''].concat(text2.split(''));
    table.push(header);

    // Data rows
    for (let i = 0; i <= m; i++) {
        const row = [];
        if (i === 0) {
            row.push('');
        } else {
            row.push(text1[i - 1]);
        }

        for (let j = 0; j <= n; j++) {
            row.push(dp[i][j]);
        }
        table.push(row);
    }

    return table;
}

/**
 * Utility: Longest Common Subsequence of multiple strings
 */
function longestCommonSubsequenceMultiple(strings) {
    if (strings.length === 0) return 0;
    if (strings.length === 1) return strings[0].length;

    let result = strings[0];

    for (let i = 1; i < strings.length; i++) {
        const lcsResult = longestCommonSubsequenceWithString(result, strings[i]);
        result = lcsResult.subsequence;
    }

    return result.length;
}

/**
 * Utility: Check if one string is subsequence of another
 */
function isSubsequence(s, t) {
    let i = 0;

    for (let j = 0; j < t.length && i < s.length; j++) {
        if (s[i] === t[j]) {
            i++;
        }
    }

    return i === s.length;
}

/**
 * Utility: Find LCS with indices
 */
function longestCommonSubsequenceWithIndices(text1, text2) {
    const m = text1.length;
    const n = text2.length;
    const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    // Reconstruct with indices
    const indices1 = [];
    const indices2 = [];
    let lcs = '';
    let i = m, j = n;

    while (i > 0 && j > 0) {
        if (text1[i - 1] === text2[j - 1]) {
            lcs = text1[i - 1] + lcs;
            indices1.unshift(i - 1);
            indices2.unshift(j - 1);
            i--;
            j--;
        } else if (dp[i - 1][j] > dp[i][j - 1]) {
            i--;
        } else {
            j--;
        }
    }

    return {
        length: dp[m][n],
        subsequence: lcs,
        indices1: indices1,
        indices2: indices2
    };
}

/**
 * Utility: Calculate similarity percentage
 */
function calculateSimilarity(text1, text2) {
    const lcsLength = longestCommonSubsequence(text1, text2);
    const maxLength = Math.max(text1.length, text2.length);

    if (maxLength === 0) return 100;

    return Math.round((lcsLength / maxLength) * 100);
}

/**
 * Utility: Find shortest common supersequence length
 */
function shortestCommonSupersequence(text1, text2) {
    const lcsLength = longestCommonSubsequence(text1, text2);
    return text1.length + text2.length - lcsLength;
}

/**
 * Utility: Generate test cases
 */
function generateTestCases() {
    return [
        { text1: "abcde", text2: "ace", expected: 3 },
        { text1: "abc", text2: "abc", expected: 3 },
        { text1: "abc", text2: "def", expected: 0 },
        { text1: "", text2: "abc", expected: 0 },
        { text1: "abc", text2: "", expected: 0 },
        { text1: "a", text2: "a", expected: 1 },
        { text1: "bl", text2: "yby", expected: 1 },
        { text1: "abcdgh", text2: "aedfhr", expected: 3 },
        { text1: "aggtab", text2: "gxtxayb", expected: 4 },
        { text1: "AAACCGTGAGTTATTCGTTCTAGAA", text2: "CACCCCTAAGGTACCTTTGGTTC", expected: 14 }
    ];
}

/**
 * Utility: Performance comparison
 */
function comparePerformance(text1, text2) {
    const approaches = [
        { name: '2D DP', func: longestCommonSubsequence },
        { name: 'Space Optimized', func: longestCommonSubsequenceOptimized },
        { name: 'Recursive Memo', func: longestCommonSubsequenceRecursive }
    ];

    const results = [];

    for (const approach of approaches) {
        const startTime = performance.now();
        const result = approach.func(text1, text2);
        const endTime = performance.now();

        results.push({
            approach: approach.name,
            result: result,
            time: endTime - startTime
        });
    }

    return results;
}

module.exports = {
    longestCommonSubsequence,
    longestCommonSubsequenceOptimized,
    longestCommonSubsequenceRecursive,
    longestCommonSubsequenceWithString,
    findAllLCS,
    printDPTable,
    longestCommonSubsequenceMultiple,
    isSubsequence,
    longestCommonSubsequenceWithIndices,
    calculateSimilarity,
    shortestCommonSupersequence,
    generateTestCases,
    comparePerformance
};