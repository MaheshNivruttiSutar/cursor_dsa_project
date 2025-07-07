/**
 * Best Time to Buy and Sell Stock
 * You are given an array prices where prices[i] is the price of a given stock on the ith day.
 * You want to maximize your profit by choosing a single day to buy one stock and choosing
 * a different day in the future to sell that stock.
 * Return the maximum profit you can achieve from this transaction. If you cannot achieve
 * any profit, return 0.
 *
 * Example 1:
 * Input: prices = [7,1,5,3,6,4]
 * Output: 5
 * Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
 *
 * Example 2:
 * Input: prices = [7,6,4,3,1]
 * Output: 0
 * Explanation: In this case, no transactions are done and the max profit = 0.
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 *
 * @param {number[]} prices - Array of stock prices
 * @return {number} - Maximum profit
 */
function maxProfit(prices) {
    if (prices.length <= 1) return 0;

    let minPrice = prices[0];
    let maxProfit = 0;

    for (let i = 1; i < prices.length; i++) {
        // Update minimum price seen so far
        if (prices[i] < minPrice) {
            minPrice = prices[i];
        } else {
            // Calculate profit if we sell today
            const profit = prices[i] - minPrice;
            maxProfit = Math.max(maxProfit, profit);
        }
    }

    return maxProfit;
}

/**
 * Best Time to Buy and Sell Stock - Brute Force approach
 *
 * Time Complexity: O(n²)
 * Space Complexity: O(1)
 *
 * @param {number[]} prices - Array of stock prices
 * @return {number} - Maximum profit
 */
function maxProfitBruteForce(prices) {
    let maxProfit = 0;

    for (let i = 0; i < prices.length - 1; i++) {
        for (let j = i + 1; j < prices.length; j++) {
            const profit = prices[j] - prices[i];
            maxProfit = Math.max(maxProfit, profit);
        }
    }

    return maxProfit;
}

/**
 * Best Time to Buy and Sell Stock - With buy/sell days tracking
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 *
 * @param {number[]} prices - Array of stock prices
 * @return {Object} - Object with maxProfit, buyDay, and sellDay
 */
function maxProfitWithDays(prices) {
    if (prices.length <= 1) return { maxProfit: 0, buyDay: -1, sellDay: -1 };

    let minPrice = prices[0];
    let maxProfit = 0;
    let buyDay = 0;
    let sellDay = 0;
    let tempBuyDay = 0;

    for (let i = 1; i < prices.length; i++) {
        if (prices[i] < minPrice) {
            minPrice = prices[i];
            tempBuyDay = i;
        } else {
            const profit = prices[i] - minPrice;
            if (profit > maxProfit) {
                maxProfit = profit;
                buyDay = tempBuyDay;
                sellDay = i;
            }
        }
    }

    return {
        maxProfit,
        buyDay: maxProfit > 0 ? buyDay : -1,
        sellDay: maxProfit > 0 ? sellDay : -1
    };
}

module.exports = {
    maxProfit,
    maxProfitBruteForce,
    maxProfitWithDays
};