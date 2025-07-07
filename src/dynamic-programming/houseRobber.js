/**
 * House Robber (LeetCode #198)
 * Difficulty: Medium
 *
 * Problem: You are a professional robber planning to rob houses along a street.
 * Each house has a certain amount of money stashed, the only constraint stopping you
 * from robbing each of them is that adjacent houses have security systems connected
 * and it will automatically contact the police if two adjacent houses were broken
 * into on the same night.
 *
 * Given an integer array nums representing the amount of money of each house,
 * return the maximum amount of money you can rob tonight without alerting the police.
 *
 * Company: Amazon, Microsoft, Google, Facebook, Apple
 * Topics: Dynamic Programming, Array
 */

/**
 * Approach 1: Dynamic Programming (Bottom-up)
 * Time: O(n)
 * Space: O(n)
 */
function rob(nums) {
    if (!nums || nums.length === 0) return 0;
    if (nums.length === 1) return nums[0];

    const dp = Array(nums.length);
    dp[0] = nums[0];
    dp[1] = Math.max(nums[0], nums[1]);

    for (let i = 2; i < nums.length; i++) {
        dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
    }

    return dp[nums.length - 1];
}

/**
 * Approach 2: Optimized Space Complexity
 * Time: O(n)
 * Space: O(1)
 */
function robOptimized(nums) {
    if (!nums || nums.length === 0) return 0;
    if (nums.length === 1) return nums[0];

    let prev2 = nums[0];
    let prev1 = Math.max(nums[0], nums[1]);

    for (let i = 2; i < nums.length; i++) {
        const current = Math.max(prev1, prev2 + nums[i]);
        prev2 = prev1;
        prev1 = current;
    }

    return prev1;
}

/**
 * Approach 3: Recursive with Memoization (Top-down)
 * Time: O(n)
 * Space: O(n)
 */
function robRecursive(nums) {
    if (!nums || nums.length === 0) return 0;

    const memo = {};

    function helper(index) {
        if (index >= nums.length) return 0;
        if (index in memo) return memo[index];

        // Either rob current house + skip next, or skip current house
        const robCurrent = nums[index] + helper(index + 2);
        const skipCurrent = helper(index + 1);

        memo[index] = Math.max(robCurrent, skipCurrent);
        return memo[index];
    }

    return helper(0);
}

/**
 * Approach 4: Bottom-up with explicit decision tracking
 * Time: O(n)
 * Space: O(n)
 */
function robWithDecisions(nums) {
    if (!nums || nums.length === 0) return { maxAmount: 0, decisions: [] };
    if (nums.length === 1) return { maxAmount: nums[0], decisions: [0] };

    const dp = Array(nums.length);
    const decisions = Array(nums.length).fill(null).map(() => []);

    dp[0] = nums[0];
    decisions[0] = [0];

    if (nums[0] > nums[1]) {
        dp[1] = nums[0];
        decisions[1] = [0];
    } else {
        dp[1] = nums[1];
        decisions[1] = [1];
    }

    for (let i = 2; i < nums.length; i++) {
        const robCurrent = dp[i - 2] + nums[i];
        const skipCurrent = dp[i - 1];

        if (robCurrent > skipCurrent) {
            dp[i] = robCurrent;
            decisions[i] = [...decisions[i - 2], i];
        } else {
            dp[i] = skipCurrent;
            decisions[i] = [...decisions[i - 1]];
        }
    }

    return {
        maxAmount: dp[nums.length - 1],
        decisions: decisions[nums.length - 1]
    };
}

/**
 * Utility: Validate if a robbery plan is valid (no adjacent houses)
 */
function isValidRobberyPlan(houses, plan) {
    if (!plan || plan.length === 0) return true;

    // Check if all indices are valid
    for (const index of plan) {
        if (index < 0 || index >= houses.length) return false;
    }

    // Check if any adjacent houses are robbed
    const sortedPlan = [...plan].sort((a, b) => a - b);
    for (let i = 1; i < sortedPlan.length; i++) {
        if (sortedPlan[i] - sortedPlan[i - 1] === 1) return false;
    }

    return true;
}

/**
 * Utility: Calculate total money from a robbery plan
 */
function calculateRobberyAmount(houses, plan) {
    if (!plan || plan.length === 0) return 0;
    return plan.reduce((total, index) => total + houses[index], 0);
}

/**
 * Utility: Find all possible valid robbery plans (for small inputs)
 */
function findAllValidPlans(houses) {
    if (!houses || houses.length === 0) return [[]];

    const result = [];

    function backtrack(index, currentPlan) {
        if (index >= houses.length) {
            result.push([...currentPlan]);
            return;
        }

        // Option 1: Don't rob current house
        backtrack(index + 1, currentPlan);

        // Option 2: Rob current house (skip next house)
        currentPlan.push(index);
        backtrack(index + 2, currentPlan);
        currentPlan.pop();
    }

    backtrack(0, []);
    return result;
}

/**
 * Utility: Analyze robbery patterns
 */
function analyzeRobberyPatterns(houses) {
    if (!houses || houses.length === 0) {
        return {
            totalValidPlans: 1,
            bestPlan: { plan: [], amount: 0, houseCount: 0, efficiency: 0 },
            worstPlan: { plan: [], amount: 0, houseCount: 0, efficiency: 0 },
            averageAmount: 0,
            averageHouseCount: 0,
            maxEfficiency: 0,
            minEfficiency: 0
        };
    }

    const allPlans = findAllValidPlans(houses);
    const planAnalysis = allPlans.map(plan => ({
        plan,
        amount: calculateRobberyAmount(houses, plan),
        houseCount: plan.length,
        efficiency: plan.length > 0 ? calculateRobberyAmount(houses, plan) / plan.length : 0
    }));

    planAnalysis.sort((a, b) => b.amount - a.amount);

    return {
        totalValidPlans: allPlans.length,
        bestPlan: planAnalysis[0],
        worstPlan: planAnalysis[planAnalysis.length - 1],
        averageAmount: planAnalysis.reduce((sum, p) => sum + p.amount, 0) / planAnalysis.length,
        averageHouseCount: planAnalysis.reduce((sum, p) => sum + p.houseCount, 0) / planAnalysis.length,
        maxEfficiency: Math.max(...planAnalysis.map(p => p.efficiency)),
        minEfficiency: Math.min(...planAnalysis.map(p => p.efficiency))
    };
}

/**
 * Utility: Visualize robbery decision process
 */
function visualizeRobberyDecision(houses) {
    if (!houses || houses.length === 0) return "No houses to rob";
    if (houses.length === 1) return `Rob house 0: $${houses[0]}`;

    const result = robWithDecisions(houses);
    const robbedHouses = new Set(result.decisions);

    let visualization = "Houses: ";
    for (let i = 0; i < houses.length; i++) {
        if (robbedHouses.has(i)) {
            visualization += `[${houses[i]}] `;
        } else {
            visualization += `${houses[i]} `;
        }
    }

    visualization += `\nTotal robbed: $${result.maxAmount}`;
    visualization += `\nHouses robbed: ${result.decisions.join(', ')}`;

    return visualization;
}

module.exports = {
    rob,
    robOptimized,
    robRecursive,
    robWithDecisions,
    isValidRobberyPlan,
    calculateRobberyAmount,
    findAllValidPlans,
    analyzeRobberyPatterns,
    visualizeRobberyDecision
};