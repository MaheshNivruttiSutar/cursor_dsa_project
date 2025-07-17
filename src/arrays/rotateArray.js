/**
 * Rotate Array Implementation
 *
 * LeetCode #189 - Given an integer array nums, rotate the array to the right by k steps,
 * where k is non-negative.
 *
 * Example 1:
 * Input: nums = [1,2,3,4,5,6,7], k = 3
 * Output: [5,6,7,1,2,3,4]
 * Explanation: rotate 1 step to the right: [7,1,2,3,4,5,6]
 *              rotate 2 steps to the right: [6,7,1,2,3,4,5]
 *              rotate 3 steps to the right: [5,6,7,1,2,3,4]
 *
 * Company Tags: Amazon, Microsoft, Google, Facebook, Apple, Bloomberg
 * Difficulty: Medium
 * Pattern: Array Manipulation, Two Pointers
 */

/**
 * Approach 1: Reverse Array (Optimal Solution)
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 *
 * Algorithm:
 * 1. Reverse the entire array
 * 2. Reverse the first k elements
 * 3. Reverse the remaining n-k elements
 *
 * @param {number[]} nums - Array to rotate
 * @param {number} k - Number of steps to rotate right
 * @return {void} - Modify nums in-place
 */
function rotate(nums, k) {
    if (!nums || nums.length <= 1) return;

    const n = nums.length;
    k = k % n; // Handle k > n

    if (k === 0) return;

    // Helper function to reverse array segment
    function reverse(start, end) {
        while (start < end) {
            [nums[start], nums[end]] = [nums[end], nums[start]];
            start++;
            end--;
        }
    }

    // Step 1: Reverse entire array
    reverse(0, n - 1);

    // Step 2: Reverse first k elements
    reverse(0, k - 1);

    // Step 3: Reverse remaining elements
    reverse(k, n - 1);
}

/**
 * Approach 2: Using Extra Array
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {void}
 */
function rotateWithExtraArray(nums, k) {
    if (!nums || nums.length <= 1) return;

    const n = nums.length;
    k = k % n;

    if (k === 0) return;

    const rotated = new Array(n);

    for (let i = 0; i < n; i++) {
        rotated[(i + k) % n] = nums[i];
    }

    for (let i = 0; i < n; i++) {
        nums[i] = rotated[i];
    }
}

/**
 * Approach 3: Cyclic Replacements
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {void}
 */
function rotateCyclic(nums, k) {
    if (!nums || nums.length <= 1) return;

    const n = nums.length;
    k = k % n;

    if (k === 0) return;

    let count = 0;

    for (let start = 0; count < n; start++) {
        let current = start;
        let prev = nums[start];

        do {
            let next = (current + k) % n;
            [nums[next], prev] = [prev, nums[next]];
            current = next;
            count++;
        } while (start !== current);
    }
}

/**
 * Approach 4: Brute Force (One by One)
 *
 * Time Complexity: O(n * k)
 * Space Complexity: O(1)
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {void}
 */
function rotateBruteForce(nums, k) {
    if (!nums || nums.length <= 1) return;

    const n = nums.length;
    k = k % n;

    for (let i = 0; i < k; i++) {
        let previous = nums[n - 1];
        for (let j = 0; j < n; j++) {
            [nums[j], previous] = [previous, nums[j]];
        }
    }
}

/**
 * Utility: Rotate array left by k steps
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {void}
 */
function rotateLeft(nums, k) {
    if (!nums || nums.length <= 1) return;

    const n = nums.length;
    k = k % n;

    // Rotating left by k is same as rotating right by n-k
    rotate(nums, n - k);
}

/**
 * Utility: Check if array is rotated version of another
 *
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {boolean}
 */
function isRotatedVersion(nums1, nums2) {
    if (!nums1 || !nums2 || nums1.length !== nums2.length) {
        return false;
    }

    const n = nums1.length;
    if (n === 0) return true;

    // Try all possible rotations
    for (let k = 0; k < n; k++) {
        let isMatch = true;
        for (let i = 0; i < n; i++) {
            if (nums1[i] !== nums2[(i + k) % n]) {
                isMatch = false;
                break;
            }
        }
        if (isMatch) return true;
    }

    return false;
}

/**
 * Utility: Find minimum rotation to sort array
 *
 * @param {number[]} nums
 * @return {number}
 */
function findMinRotationToSort(nums) {
    if (!nums || nums.length <= 1) return 0;

    const n = nums.length;
    let minRotations = 0;
    let minInversions = countInversions([...nums]);

    for (let k = 1; k < n; k++) {
        // Rotate by 1 step
        const temp = nums[0];
        for (let i = 0; i < n - 1; i++) {
            nums[i] = nums[i + 1];
        }
        nums[n - 1] = temp;

        const inversions = countInversions([...nums]);
        if (inversions < minInversions) {
            minInversions = inversions;
            minRotations = k;
        }
    }

    return minRotations;
}

function countInversions(arr) {
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] > arr[j]) count++;
        }
    }
    return count;
}

/**
 * Utility: Visualize rotation steps
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {string[]}
 */
function visualizeRotation(nums, k) {
    if (!nums || nums.length === 0) return [];

    const steps = [];
    const original = [...nums];
    steps.push(`Original: [${original.join(', ')}]`);

    const n = nums.length;
    k = k % n;

    if (k === 0) {
        steps.push('No rotation needed (k = 0)');
        return steps;
    }

    // Show the reverse method steps
    steps.push(`Step 1: Reverse entire array`);
    nums.reverse();
    steps.push(`        [${nums.join(', ')}]`);

    steps.push(`Step 2: Reverse first ${k} elements`);
    for (let i = 0; i < Math.floor(k / 2); i++) {
        [nums[i], nums[k - 1 - i]] = [nums[k - 1 - i], nums[i]];
    }
    steps.push(`        [${nums.join(', ')}]`);

    steps.push(`Step 3: Reverse remaining ${n - k} elements`);
    for (let i = k; i < k + Math.floor((n - k) / 2); i++) {
        [nums[i], nums[n - 1 - (i - k)]] = [nums[n - 1 - (i - k)], nums[i]];
    }
    steps.push(`Final:  [${nums.join(', ')}]`);

    return steps;
}

module.exports = {
    rotate,
    rotateWithExtraArray,
    rotateCyclic,
    rotateBruteForce,
    rotateLeft,
    isRotatedVersion,
    findMinRotationToSort,
    visualizeRotation
};