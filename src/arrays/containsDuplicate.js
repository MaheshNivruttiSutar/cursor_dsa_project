/**
 * Contains Duplicate
 * Given an integer array nums, return true if any value appears at least twice in the array,
 * and return false if every element is distinct.
 *
 * Example 1:
 * Input: [1,2,3,1]
 * Output: true
 *
 * Example 2:
 * Input: [1,2,3,4]
 * Output: false
 *
 * Example 3:
 * Input: [1,1,1,3,3,4,3,2,4,2]
 * Output: true
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 *
 * @param {number[]} nums - Array of integers
 * @return {boolean} - True if duplicate exists, false otherwise
 */
function containsDuplicate(nums) {
    const seen = new Set();

    for (const num of nums) {
        if (seen.has(num)) {
            return true;
        }
        seen.add(num);
    }

    return false;
}

/**
 * Contains Duplicate - Alternative approach using sorting
 *
 * Time Complexity: O(n log n)
 * Space Complexity: O(1) - if we can modify the input array
 *
 * @param {number[]} nums - Array of integers
 * @return {boolean} - True if duplicate exists, false otherwise
 */
function containsDuplicateSort(nums) {
    nums.sort((a, b) => a - b);

    for (let i = 1; i < nums.length; i++) {
        if (nums[i] === nums[i - 1]) {
            return true;
        }
    }

    return false;
}

/**
 * Contains Duplicate - One-liner using Set
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 *
 * @param {number[]} nums - Array of integers
 * @return {boolean} - True if duplicate exists, false otherwise
 */
function containsDuplicateOneLiner(nums) {
    return new Set(nums).size !== nums.length;
}

module.exports = {
    containsDuplicate,
    containsDuplicateSort,
    containsDuplicateOneLiner
};