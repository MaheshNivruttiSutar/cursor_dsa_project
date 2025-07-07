/**
 * Climbing Stairs
 * You are climbing a staircase. It takes n steps to reach the top.
 * Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?
 *
 * Example 1:
 * Input: n = 2
 * Output: 2
 * Explanation: There are two ways to climb to the top.
 * 1. 1 step + 1 step
 * 2. 2 steps
 *
 * Example 2:
 * Input: n = 3
 * Output: 3
 * Explanation: There are three ways to climb to the top.
 * 1. 1 step + 1 step + 1 step
 * 2. 1 step + 2 steps
 * 3. 2 steps + 1 step
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 *
 * @param {number} n - Number of steps
 * @return {number} - Number of distinct ways to climb
 */
function climbStairs(n) {
    if (n <= 2) {
        return n;
    }

    let prev2 = 1; // ways to climb 1 step
    let prev1 = 2; // ways to climb 2 steps
    let current = 0;

    for (let i = 3; i <= n; i++) {
        current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }

    return current;
}

/**
 * Climbing Stairs - Dynamic Programming with memoization
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 *
 * @param {number} n - Number of steps
 * @return {number} - Number of distinct ways to climb
 */
function climbStairsDP(n) {
    if (n <= 2) {
        return n;
    }

    const dp = new Array(n + 1);
    dp[1] = 1;
    dp[2] = 2;

    for (let i = 3; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }

    return dp[n];
}

/**
 * Climbing Stairs - Recursive approach with memoization
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 *
 * @param {number} n - Number of steps
 * @return {number} - Number of distinct ways to climb
 */
function climbStairsRecursive(n) {
    const memo = {};

    function helper(steps) {
        if (steps <= 2) {
            return steps;
        }

        if (memo[steps] !== undefined) {
            return memo[steps];
        }

        memo[steps] = helper(steps - 1) + helper(steps - 2);
        return memo[steps];
    }

    return helper(n);
}

/**
 * Climbing Stairs - Naive recursive approach (exponential time - for educational purposes)
 *
 * Time Complexity: O(2^n)
 * Space Complexity: O(n)
 *
 * @param {number} n - Number of steps
 * @return {number} - Number of distinct ways to climb
 */
function climbStairsNaive(n) {
    if (n <= 2) {
        return n;
    }

    return climbStairsNaive(n - 1) + climbStairsNaive(n - 2);
}

module.exports = {
    climbStairs,
    climbStairsDP,
    climbStairsRecursive,
    climbStairsNaive
};