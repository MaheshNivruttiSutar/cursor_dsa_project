/**
 * Binary Search Problem
 * Given an array of integers nums which is sorted in ascending order, and an integer target,
 * write a function to search target in nums. If target exists, then return its index.
 * Otherwise, return -1.
 *
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 *
 * @param {number[]} nums - Sorted array of integers
 * @param {number} target - Target value to search for
 * @return {number} - Index of target if found, -1 otherwise
 */
function binarySearch(nums, target) {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (nums[mid] === target) {
            return mid;
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return -1; // Target not found
}

/**
 * Binary Search (Recursive approach)
 *
 * Time Complexity: O(log n)
 * Space Complexity: O(log n) - due to recursion stack
 *
 * @param {number[]} nums - Sorted array of integers
 * @param {number} target - Target value to search for
 * @param {number} left - Left boundary (optional)
 * @param {number} right - Right boundary (optional)
 * @return {number} - Index of target if found, -1 otherwise
 */
function binarySearchRecursive(nums, target, left = 0, right = nums.length - 1) {
    if (left > right) {
        return -1;
    }

    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) {
        return mid;
    } else if (nums[mid] < target) {
        return binarySearchRecursive(nums, target, mid + 1, right);
    } else {
        return binarySearchRecursive(nums, target, left, mid - 1);
    }
}

module.exports = {
    binarySearch,
    binarySearchRecursive
};