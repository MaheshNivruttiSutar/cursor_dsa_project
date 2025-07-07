/**
 * Coin Change
 * You are given an integer array coins representing coins of different denominations
 * and an integer amount representing a total amount of money.
 * Return the fewest number of coins that you need to make up that amount.
 * If that amount of money cannot be made up by any combination of the coins, return -1.
 * You may assume that you have an infinite number of each kind of coin.
 *
 * Example 1:
 * Input: coins = [1,3,4], amount = 6
 * Output: 2
 * Explanation: 6 = 3 + 3
 *
 * Example 2:
 * Input: coins = [2], amount = 3
 * Output: -1
 *
 * Example 3:
 * Input: coins = [1], amount = 0
 * Output: 0
 *
 * Time Complexity: O(amount * coins.length)
 * Space Complexity: O(amount)
 *
 * @param {number[]} coins - Array of coin denominations
 * @param {number} amount - Target amount
 * @return {number} - Minimum number of coins needed, or -1 if impossible
 */
function coinChange(coins, amount) {
    if (amount === 0) return 0;
    if (!coins || coins.length === 0) return -1;

    // DP array where dp[i] represents minimum coins needed for amount i
    const dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0;

    for (let i = 1; i <= amount; i++) {
        for (const coin of coins) {
            if (coin <= i) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }

    return dp[amount] === Infinity ? -1 : dp[amount];
}

/**
 * Coin Change - BFS approach
 *
 * Time Complexity: O(amount * coins.length)
 * Space Complexity: O(amount)
 *
 * @param {number[]} coins - Array of coin denominations
 * @param {number} amount - Target amount
 * @return {number} - Minimum number of coins needed, or -1 if impossible
 */
function coinChangeBFS(coins, amount) {
    if (amount === 0) return 0;
    if (!coins || coins.length === 0) return -1;

    const visited = new Set();
    const queue = [amount];
    visited.add(amount);
    let level = 0;

    while (queue.length > 0) {
        const size = queue.length;
        level++;

        for (let i = 0; i < size; i++) {
            const currentAmount = queue.shift();

            for (const coin of coins) {
                const remaining = currentAmount - coin;

                if (remaining === 0) {
                    return level;
                }

                if (remaining > 0 && !visited.has(remaining)) {
                    visited.add(remaining);
                    queue.push(remaining);
                }
            }
        }
    }

    return -1;
}

/**
 * Coin Change - Recursive with memoization
 *
 * Time Complexity: O(amount * coins.length)
 * Space Complexity: O(amount)
 *
 * @param {number[]} coins - Array of coin denominations
 * @param {number} amount - Target amount
 * @return {number} - Minimum number of coins needed, or -1 if impossible
 */
function coinChangeMemo(coins, amount) {
    if (amount === 0) return 0;
    if (!coins || coins.length === 0) return -1;

    const memo = new Map();

    function helper(remaining) {
        if (remaining === 0) return 0;
        if (remaining < 0) return -1;

        if (memo.has(remaining)) {
            return memo.get(remaining);
        }

        let minCoins = Infinity;

        for (const coin of coins) {
            const result = helper(remaining - coin);
            if (result !== -1) {
                minCoins = Math.min(minCoins, result + 1);
            }
        }

        const finalResult = minCoins === Infinity ? -1 : minCoins;
        memo.set(remaining, finalResult);
        return finalResult;
    }

    return helper(amount);
}

/**
 * Coin Change - Greedy approach (works only for certain coin systems)
 * Note: This doesn't work for all coin systems, included for educational purposes
 *
 * Time Complexity: O(coins.length * log(coins.length))
 * Space Complexity: O(1)
 *
 * @param {number[]} coins - Array of coin denominations
 * @param {number} amount - Target amount
 * @return {number} - Minimum number of coins needed, or -1 if impossible
 */
function coinChangeGreedy(coins, amount) {
    if (amount === 0) return 0;
    if (!coins || coins.length === 0) return -1;

    // Sort coins in descending order
    const sortedCoins = [...coins].sort((a, b) => b - a);
    let remaining = amount;
    let coinCount = 0;

    for (const coin of sortedCoins) {
        const count = Math.floor(remaining / coin);
        coinCount += count;
        remaining -= count * coin;
    }

    return remaining === 0 ? coinCount : -1;
}

/**
 * Coin Change - Get the actual coins used (not just count)
 *
 * Time Complexity: O(amount * coins.length)
 * Space Complexity: O(amount)
 *
 * @param {number[]} coins - Array of coin denominations
 * @param {number} amount - Target amount
 * @return {object} - Object with minCoins count and actual coins used
 */
function coinChangeWithCoins(coins, amount) {
    if (amount === 0) return { minCoins: 0, coinsUsed: [] };
    if (!coins || coins.length === 0) return { minCoins: -1, coinsUsed: [] };

    const dp = new Array(amount + 1).fill(Infinity);
    const parent = new Array(amount + 1).fill(-1);
    dp[0] = 0;

    for (let i = 1; i <= amount; i++) {
        for (const coin of coins) {
            if (coin <= i && dp[i - coin] + 1 < dp[i]) {
                dp[i] = dp[i - coin] + 1;
                parent[i] = coin;
            }
        }
    }

    if (dp[amount] === Infinity) {
        return { minCoins: -1, coinsUsed: [] };
    }

    // Reconstruct the coins used
    const coinsUsed = [];
    let current = amount;
    while (current > 0) {
        const coin = parent[current];
        coinsUsed.push(coin);
        current -= coin;
    }

    return { minCoins: dp[amount], coinsUsed };
}

/**
 * Count all possible ways to make change
 *
 * Time Complexity: O(amount * coins.length)
 * Space Complexity: O(amount)
 *
 * @param {number[]} coins - Array of coin denominations
 * @param {number} amount - Target amount
 * @return {number} - Number of ways to make change
 */
function coinChangeWays(coins, amount) {
    if (amount === 0) return 1;
    if (!coins || coins.length === 0) return 0;

    const dp = new Array(amount + 1).fill(0);
    dp[0] = 1;

    for (const coin of coins) {
        for (let i = coin; i <= amount; i++) {
            dp[i] += dp[i - coin];
        }
    }

    return dp[amount];
}

/**
 * Helper function to validate coin system (check if greedy works)
 *
 * @param {number[]} coins - Array of coin denominations
 * @return {boolean} - True if greedy approach works for this coin system
 */
function isCanonicalCoinSystem(coins) {
    // A coin system is canonical if the greedy algorithm always produces optimal results
    // This is a simplified check - real implementation would be more complex
    const sorted = [...coins].sort((a, b) => a - b);

    // Check if each coin is less than twice the previous coin
    for (let i = 1; i < sorted.length; i++) {
        if (sorted[i] >= 2 * sorted[i - 1]) {
            continue;
        }
        return false;
    }

    return true;
}

/**
 * Get step-by-step solution explanation
 *
 * @param {number[]} coins - Array of coin denominations
 * @param {number} amount - Target amount
 * @return {object} - Detailed solution steps
 */
function coinChangeExplanation(coins, amount) {
    if (amount === 0) return { steps: ['Amount is 0, no coins needed'], result: 0 };
    if (!coins || coins.length === 0) return { steps: ['No coins available'], result: -1 };

    const dp = new Array(amount + 1).fill(Infinity);
    const steps = [];
    dp[0] = 0;

    steps.push(`Initial: dp[0] = 0 (0 coins needed for amount 0)`);

    for (let i = 1; i <= amount; i++) {
        const originalValue = dp[i];
        for (const coin of coins) {
            if (coin <= i) {
                const newValue = dp[i - coin] + 1;
                if (newValue < dp[i]) {
                    dp[i] = newValue;
                    steps.push(`dp[${i}] = min(${originalValue}, dp[${i - coin}] + 1) = ${dp[i]} (using coin ${coin})`);
                }
            }
        }
    }

    const result = dp[amount] === Infinity ? -1 : dp[amount];
    steps.push(`Final result: ${result} coins needed for amount ${amount}`);

    return { steps, result };
}

module.exports = {
    coinChange,
    coinChangeBFS,
    coinChangeMemo,
    coinChangeGreedy,
    coinChangeWithCoins,
    coinChangeWays,
    isCanonicalCoinSystem,
    coinChangeExplanation
};