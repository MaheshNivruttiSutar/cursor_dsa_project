/**
 * Maximum Subarray (Kadane's Algorithm)
 * Given an integer array nums, find the subarray with the largest sum, and return its sum.
 *
 * Example 1:
 * Input: [-2,1,-3,4,-1,2,1,-5,4]
 * Output: 6
 * Explanation: The subarray [4,-1,2,1] has the largest sum = 6.
 *
 * Example 2:
 * Input: [1]
 * Output: 1
 *
 * Example 3:
 * Input: [5,4,-1,7,8]
 * Output: 23
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 *
 * @param {number[]} nums - Array of integers
 * @return {number} - Maximum sum of contiguous subarray
 */
function maxSubArray(nums) {
    let maxSum = nums[0];
    let currentSum = nums[0];

    for (let i = 1; i < nums.length; i++) {
        // Either extend the existing subarray or start a new one
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        maxSum = Math.max(maxSum, currentSum);
    }

    return maxSum;
}

/**
 * Maximum Subarray - Alternative approach with indices
 * Returns both the maximum sum and the indices of the subarray
 *
 * @param {number[]} nums - Array of integers
 * @return {object} - Object with maxSum, start, and end indices
 */
function maxSubArrayWithIndices(nums) {
    let maxSum = nums[0];
    let currentSum = nums[0];
    let start = 0;
    let end = 0;
    let tempStart = 0;

    for (let i = 1; i < nums.length; i++) {
        if (currentSum < 0) {
            currentSum = nums[i];
            tempStart = i;
        } else {
            currentSum += nums[i];
        }

        if (currentSum > maxSum) {
            maxSum = currentSum;
            start = tempStart;
            end = i;
        }
    }

    return {
        maxSum,
        start,
        end,
        subarray: nums.slice(start, end + 1)
    };
}

module.exports = {
    maxSubArray,
    maxSubArrayWithIndices
};