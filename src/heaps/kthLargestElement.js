/**
 * Kth Largest Element in an Array (LeetCode #215)
 * Difficulty: Medium
 *
 * Problem: Given an integer array nums and an integer k, return the kth largest element in the array.
 * Note that it is the kth largest element in the sorted order, not the kth distinct element.
 * You must solve it in O(n) time complexity.
 *
 * Company: Amazon, Facebook, Microsoft, Google, Apple
 * Topics: Array, Divide and Conquer, Sorting, Heap (Priority Queue), Quickselect
 */

/**
 * Simple Min-Heap implementation for this problem
 */
class MinHeap {
    constructor() {
        this.heap = [];
    }

    parent(i) { return Math.floor((i - 1) / 2); }
    leftChild(i) { return 2 * i + 1; }
    rightChild(i) { return 2 * i + 2; }

    insert(val) {
        this.heap.push(val);
        this.heapifyUp(this.heap.length - 1);
    }

    extractMin() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();

        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown(0);
        return min;
    }

    peek() {
        return this.heap.length > 0 ? this.heap[0] : null;
    }

    size() {
        return this.heap.length;
    }

    heapifyUp(index) {
        while (index > 0 && this.heap[index] < this.heap[this.parent(index)]) {
            [this.heap[index], this.heap[this.parent(index)]] = [this.heap[this.parent(index)], this.heap[index]];
            index = this.parent(index);
        }
    }

    heapifyDown(index) {
        while (this.leftChild(index) < this.heap.length) {
            let minChildIndex = this.leftChild(index);

            if (this.rightChild(index) < this.heap.length &&
                this.heap[this.rightChild(index)] < this.heap[minChildIndex]) {
                minChildIndex = this.rightChild(index);
            }

            if (this.heap[index] <= this.heap[minChildIndex]) break;

            [this.heap[index], this.heap[minChildIndex]] = [this.heap[minChildIndex], this.heap[index]];
            index = minChildIndex;
        }
    }
}

/**
 * Approach 1: Min-Heap of size k
 * Time: O(n log k)
 * Space: O(k)
 */
function findKthLargest(nums, k) {
    const minHeap = new MinHeap();

    for (const num of nums) {
        if (minHeap.size() < k) {
            minHeap.insert(num);
        } else if (num > minHeap.peek()) {
            minHeap.extractMin();
            minHeap.insert(num);
        }
    }

    return minHeap.peek();
}

/**
 * Approach 2: QuickSelect (Average O(n), Worst O(n²))
 * Time: O(n) average, O(n²) worst case
 * Space: O(log n) for recursion stack
 */
function findKthLargestQuickSelect(nums, k) {
    const targetIndex = nums.length - k; // kth largest = (n-k)th smallest

    function quickSelect(left, right) {
        if (left === right) return nums[left];

        const pivotIndex = partition(left, right);

        if (pivotIndex === targetIndex) return nums[pivotIndex];
        else if (pivotIndex < targetIndex) return quickSelect(pivotIndex + 1, right);
        else return quickSelect(left, pivotIndex - 1);
    }

    function partition(left, right) {
        // Choose random pivot to avoid worst case
        const randomIndex = left + Math.floor(Math.random() * (right - left + 1));
        [nums[randomIndex], nums[right]] = [nums[right], nums[randomIndex]];

        const pivot = nums[right];
        let i = left;

        for (let j = left; j < right; j++) {
            if (nums[j] < pivot) {
                [nums[i], nums[j]] = [nums[j], nums[i]];
                i++;
            }
        }

        [nums[i], nums[right]] = [nums[right], nums[i]];
        return i;
    }

    return quickSelect(0, nums.length - 1);
}

/**
 * Approach 3: Sorting
 * Time: O(n log n)
 * Space: O(1) or O(n) depending on sort implementation
 */
function findKthLargestSort(nums, k) {
    nums.sort((a, b) => b - a); // Sort in descending order
    return nums[k - 1];
}

/**
 * Approach 4: Counting Sort (for limited range)
 * Time: O(n + range)
 * Space: O(range)
 */
function findKthLargestCountingSort(nums, k) {
    const min = Math.min(...nums);
    const max = Math.max(...nums);
    const range = max - min + 1;

    if (range > 100000) {
        // Too large range, fall back to other method
        return findKthLargestQuickSelect(nums, k);
    }

    const count = Array(range).fill(0);

    for (const num of nums) {
        count[num - min]++;
    }

    let remaining = k;
    for (let i = range - 1; i >= 0; i--) {
        remaining -= count[i];
        if (remaining <= 0) {
            return i + min;
        }
    }

    return -1; // Should never reach here
}

/**
 * Approach 5: Using built-in JavaScript features
 * Time: O(n log n)
 * Space: O(n)
 */
function findKthLargestBuiltIn(nums, k) {
    return nums.sort((a, b) => b - a)[k - 1];
}

/**
 * Utility: Find all k largest elements
 */
function findKLargestElements(nums, k) {
    if (k <= 0 || k > nums.length) return [];

    const minHeap = new MinHeap();

    for (const num of nums) {
        if (minHeap.size() < k) {
            minHeap.insert(num);
        } else if (num > minHeap.peek()) {
            minHeap.extractMin();
            minHeap.insert(num);
        }
    }

    const result = [];
    while (minHeap.size() > 0) {
        result.push(minHeap.extractMin());
    }

    return result.reverse(); // Return in descending order
}

/**
 * Utility: Find kth smallest element
 */
function findKthSmallest(nums, k) {
    return findKthLargest(nums, nums.length - k + 1);
}

/**
 * Utility: Analyze array statistics
 */
function analyzeArray(nums) {
    if (!nums || nums.length === 0) return null;

    const sorted = [...nums].sort((a, b) => a - b);
    const n = nums.length;

    return {
        length: n,
        min: sorted[0],
        max: sorted[n - 1],
        median: n % 2 === 0 ? (sorted[n/2 - 1] + sorted[n/2]) / 2 : sorted[Math.floor(n/2)],
        mean: nums.reduce((sum, num) => sum + num, 0) / n,
        range: sorted[n - 1] - sorted[0],
        q1: sorted[Math.floor(n * 0.25)],
        q3: sorted[Math.floor(n * 0.75)],
        duplicates: nums.length !== new Set(nums).size,
        uniqueCount: new Set(nums).size
    };
}

/**
 * Utility: Performance comparison of different approaches
 */
function comparePerformance(nums, k) {
    const approaches = [
        { name: 'Min-Heap', func: findKthLargest },
        { name: 'QuickSelect', func: findKthLargestQuickSelect },
        { name: 'Sorting', func: findKthLargestSort },
        { name: 'Counting Sort', func: findKthLargestCountingSort },
        { name: 'Built-in', func: findKthLargestBuiltIn }
    ];

    const results = [];

    for (const approach of approaches) {
        const startTime = performance.now();
        const result = approach.func([...nums], k); // Create copy to avoid mutation
        const endTime = performance.now();

        results.push({
            approach: approach.name,
            result: result,
            time: endTime - startTime
        });
    }

    return results;
}

/**
 * Utility: Validate kth largest result
 */
function validateKthLargest(nums, k, result) {
    if (k <= 0 || k > nums.length) return false;

    const sorted = [...nums].sort((a, b) => b - a);
    const expected = sorted[k - 1];

    return result === expected;
}

/**
 * Utility: Generate test cases
 */
function generateTestCases() {
    const testCases = [];

    // Basic cases
    testCases.push({ nums: [3, 2, 1, 5, 6, 4], k: 2, expected: 5 });
    testCases.push({ nums: [3, 2, 3, 1, 2, 4, 5, 5, 6], k: 4, expected: 4 });

    // Edge cases
    testCases.push({ nums: [1], k: 1, expected: 1 });
    testCases.push({ nums: [1, 2], k: 1, expected: 2 });
    testCases.push({ nums: [1, 2], k: 2, expected: 1 });

    // Duplicates
    testCases.push({ nums: [3, 3, 3, 3], k: 2, expected: 3 });
    testCases.push({ nums: [1, 2, 2, 3], k: 3, expected: 2 });

    // Large values
    testCases.push({ nums: [1000000, 999999, 999998], k: 2, expected: 999999 });

    // Negative numbers
    testCases.push({ nums: [-1, -2, -3], k: 1, expected: -1 });
    testCases.push({ nums: [-1, 0, 1], k: 2, expected: 0 });

    return testCases;
}

module.exports = {
    findKthLargest,
    findKthLargestQuickSelect,
    findKthLargestSort,
    findKthLargestCountingSort,
    findKthLargestBuiltIn,
    findKLargestElements,
    findKthSmallest,
    analyzeArray,
    comparePerformance,
    validateKthLargest,
    generateTestCases,
    MinHeap
};