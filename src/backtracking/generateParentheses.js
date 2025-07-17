/**
 * @fileoverview Generate Parentheses - LeetCode #22 (Medium)
 *
 * Problem Description:
 * Given n pairs of parentheses, write a function to generate all combinations
 * of well-formed parentheses.
 *
 * Examples:
 * Input: n = 3
 * Output: ["((()))","(()())","(())()","()(())","()()()"]
 *
 * Input: n = 1
 * Output: ["()"]
 *
 * Constraints:
 * - 1 <= n <= 8
 *
 * @author Your Name
 * @since 2024
 */

/**
 * Approach 1: Backtracking with validation
 * Time Complexity: O(4^n / √n) - Catalan number bound
 * Space Complexity: O(4^n / √n) for result storage + O(n) for recursion stack
 *
 * Algorithm:
 * 1. Use backtracking to generate all possible combinations
 * 2. At each step, add either '(' or ')'
 * 3. Validate the current string and prune invalid branches
 *
 * @param {number} n - Number of pairs of parentheses
 * @returns {string[]} Array of all valid combinations
 */
function generateParenthesesBacktracking(n) {
    if (n <= 0) return [];
    if (n === 1) return ["()"];

    const result = [];

    /**
     * Validate if a parentheses string is valid so far
     * @param {string} s - Current string
     * @returns {boolean} True if valid prefix
     */
    function isValidPrefix(s) {
        let balance = 0;
        for (const char of s) {
            if (char === '(') balance++;
            else if (char === ')') balance--;
            if (balance < 0) return false;
        }
        return balance >= 0;
    }

    /**
     * Backtrack to generate all combinations
     * @param {string} current - Current parentheses string
     * @param {number} remaining - Remaining characters to place
     */
    function backtrack(current, remaining) {
        // Base case: if we've placed all characters
        if (remaining === 0) {
            if (isValidPrefix(current) &&
                current.split('(').length - 1 === current.split(')').length - 1) {
                result.push(current);
            }
            return;
        }

        // Try adding '('
        const withOpen = current + '(';
        if (isValidPrefix(withOpen) &&
            withOpen.split('(').length - 1 <= n) {
            backtrack(withOpen, remaining - 1);
        }

        // Try adding ')'
        const withClose = current + ')';
        if (isValidPrefix(withClose) &&
            withClose.split(')').length - 1 <= n) {
            backtrack(withClose, remaining - 1);
        }
    }

    backtrack('', 2 * n);
    return result;
}

/**
 * Approach 2: Optimized Backtracking with counters
 * Time Complexity: O(4^n / √n) - Catalan number
 * Space Complexity: O(4^n / √n) for result + O(n) for recursion
 *
 * Algorithm:
 * 1. Track the number of open and close parentheses used
 * 2. Only add '(' if we haven't used all n open parentheses
 * 3. Only add ')' if it won't make the string invalid
 *
 * @param {number} n - Number of pairs of parentheses
 * @returns {string[]} Array of all valid combinations
 */
function generateParenthesesOptimized(n) {
    if (n <= 0 || !Number.isInteger(n)) return [];
    if (n === 1) return ["()"];

    const result = [];

    /**
     * Generate parentheses using optimized backtracking
     * @param {string} current - Current string being built
     * @param {number} open - Number of open parentheses used
     * @param {number} close - Number of close parentheses used
     */
    function backtrack(current, open, close) {
        // Base case: we've used all n pairs
        if (current.length === 2 * n) {
            result.push(current);
            return;
        }

        // Add '(' if we haven't used all n open parentheses
        if (open < n) {
            backtrack(current + '(', open + 1, close);
        }

        // Add ')' if it won't make the string invalid
        if (close < open) {
            backtrack(current + ')', open, close + 1);
        }
    }

    backtrack('', 0, 0);
    return result;
}

/**
 * Approach 3: Dynamic Programming
 * Time Complexity: O(4^n / √n) - same as others but with memoization
 * Space Complexity: O(4^n / √n) for result + O(n²) for DP table
 *
 * Algorithm:
 * 1. Build solutions bottom-up from n=1 to target n
 * 2. For each i, generate combinations by placing new pair around/within existing combinations
 *
 * @param {number} n - Number of pairs of parentheses
 * @returns {string[]} Array of all valid combinations
 */
function generateParenthesesDP(n) {
    if (n <= 0) return [];
    if (n === 1) return ["()"];

    // dp[i] stores all valid parentheses combinations for i pairs
    const dp = Array(n + 1).fill(null).map(() => []);
    dp[0] = [""]; // Base case: 0 pairs = empty string

    for (let i = 1; i <= n; i++) {
        for (let j = 0; j < i; j++) {
            // For each way to split i pairs into j and (i-1-j) pairs
            for (const left of dp[j]) {
                for (const right of dp[i - 1 - j]) {
                    dp[i].push(`(${left})${right}`);
                }
            }
        }
    }

    return dp[n];
}

/**
 * Approach 4: Closure-based generation
 * Time Complexity: O(4^n / √n)
 * Space Complexity: O(4^n / √n)
 *
 * Algorithm:
 * 1. Every valid parentheses string can be written as (A)B
 * 2. Where A and B are valid parentheses strings
 * 3. Recursively generate all such combinations
 *
 * @param {number} n - Number of pairs of parentheses
 * @returns {string[]} Array of all valid combinations
 */
function generateParenthesesClosure(n) {
    if (n <= 0) return [];
    if (n === 1) return ["()"];

    const memo = new Map();

    /**
     * Generate parentheses with memoization
     * @param {number} pairs - Number of pairs to generate
     * @returns {string[]} All valid combinations for this number of pairs
     */
    function generate(pairs) {
        if (pairs === 0) return [""];
        if (pairs === 1) return ["()"];
        if (memo.has(pairs)) return memo.get(pairs);

        const result = [];

        // Every valid string is of form (A)B where A and B are valid
        for (let i = 0; i < pairs; i++) {
            const leftCombos = generate(i);
            const rightCombos = generate(pairs - 1 - i);

            for (const left of leftCombos) {
                for (const right of rightCombos) {
                    result.push(`(${left})${right}`);
                }
            }
        }

        memo.set(pairs, result);
        return result;
    }

    return generate(n);
}

// Default export uses the optimized backtracking approach
const generateParentheses = generateParenthesesOptimized;

// Utility Functions

/**
 * Validate if a parentheses string is well-formed
 * @param {string} s - Parentheses string to validate
 * @returns {boolean} True if well-formed
 */
function isValidParentheses(s) {
    let balance = 0;
    for (const char of s) {
        if (char === '(') {
            balance++;
        } else if (char === ')') {
            balance--;
            if (balance < 0) return false;
        }
    }
    return balance === 0;
}

/**
 * Count the number of well-formed parentheses for n pairs (Catalan number)
 * @param {number} n - Number of pairs
 * @returns {number} Count of valid combinations
 */
function countValidParentheses(n) {
    if (n < 0) return 0;
    if (n === 0) return 1;
    if (n === 1) return 1;

    // Calculate nth Catalan number: C(n) = (2n)! / ((n+1)! * n!)
    // Or use recurrence: C(n) = sum(C(i) * C(n-1-i)) for i=0 to n-1

    const catalan = Array(n + 1).fill(0);
    catalan[0] = catalan[1] = 1;

    for (let i = 2; i <= n; i++) {
        for (let j = 0; j < i; j++) {
            catalan[i] += catalan[j] * catalan[i - 1 - j];
        }
    }

    return catalan[n];
}

/**
 * Generate parentheses with custom brackets
 * @param {number} n - Number of pairs
 * @param {string} open - Opening bracket
 * @param {string} close - Closing bracket
 * @returns {string[]} All valid combinations with custom brackets
 */
function generateCustomBrackets(n, open = '(', close = ')') {
    if (n <= 0) return [];

    const result = [];

    function backtrack(current, openCount, closeCount) {
        if (current.length === 2 * n) {
            result.push(current);
            return;
        }

        if (openCount < n) {
            backtrack(current + open, openCount + 1, closeCount);
        }

        if (closeCount < openCount) {
            backtrack(current + close, openCount, closeCount + 1);
        }
    }

    backtrack('', 0, 0);
    return result;
}

/**
 * Find the lexicographically kth valid parentheses string
 * @param {number} n - Number of pairs
 * @param {number} k - Target position (1-indexed)
 * @returns {string|null} The kth valid parentheses string
 */
function getKthParentheses(n, k) {
    const all = generateParentheses(n);
    all.sort(); // Sort lexicographically
    return k > 0 && k <= all.length ? all[k - 1] : null;
}

/**
 * Convert parentheses to tree structure visualization
 * @param {string} s - Valid parentheses string
 * @returns {string} Tree-like visualization
 */
function parenthesestoTree(s) {
    if (!isValidParentheses(s)) return "Invalid parentheses";

    let depth = 0;
    let result = "";

    for (const char of s) {
        if (char === '(') {
            result += '  '.repeat(depth) + '(\n';
            depth++;
        } else if (char === ')') {
            depth--;
            result += '  '.repeat(depth) + ')\n';
        }
    }

    return result.trim();
}

/**
 * Generate all unique parentheses patterns for multiple bracket types
 * @param {number} n - Number of pairs of each type
 * @param {string[]} brackets - Array of bracket pairs like ['()', '[]', '{}']
 * @returns {string[]} All valid multi-bracket combinations
 */
function generateMultiBrackets(n, brackets = ['()', '[]', '{}']) {
    if (n <= 0 || brackets.length === 0) return [];

    const result = [];
    const pairs = brackets.map(b => [b[0], b[1]]);
    const totalPairs = n * brackets.length;

    function backtrack(current, counts) {
        if (current.length === 2 * totalPairs) {
            result.push(current);
            return;
        }

        // Try adding opening bracket
        for (let i = 0; i < pairs.length; i++) {
            if (counts[i].open < n) {
                const newCounts = counts.map(c => ({ ...c }));
                newCounts[i].open++;
                backtrack(current + pairs[i][0], newCounts);
            }
        }

        // Try adding closing bracket
        for (let i = 0; i < pairs.length; i++) {
            if (counts[i].close < counts[i].open) {
                const newCounts = counts.map(c => ({ ...c }));
                newCounts[i].close++;
                backtrack(current + pairs[i][1], newCounts);
            }
        }
    }

    const initialCounts = pairs.map(() => ({ open: 0, close: 0 }));
    backtrack('', initialCounts);

    return result;
}

/**
 * Visualize the generation process
 * @param {number} n - Number of pairs
 * @returns {string} Visual representation of the generation tree
 */
function visualizeGeneration(n) {
    if (n <= 0) return "No valid parentheses for n <= 0";

    let result = `Generation Tree for n=${n}:\n`;
    result += '═'.repeat(30) + '\n';

    function buildTree(current, open, close, depth) {
        const indent = '  '.repeat(depth);
        result += `${indent}${current || '""'} (open: ${open}, close: ${close})\n`;

        if (current.length === 2 * n) {
            return;
        }

        if (open < n) {
            buildTree(current + '(', open + 1, close, depth + 1);
        }

        if (close < open) {
            buildTree(current + ')', open, close + 1, depth + 1);
        }
    }

    buildTree('', 0, 0, 0);
    return result;
}

module.exports = {
    generateParentheses,
    generateParenthesesBacktracking,
    generateParenthesesOptimized,
    generateParenthesesDP,
    generateParenthesesClosure,
    isValidParentheses,
    countValidParentheses,
    generateCustomBrackets,
    getKthParentheses,
    parenthesestoTree,
    generateMultiBrackets,
    visualizeGeneration
};