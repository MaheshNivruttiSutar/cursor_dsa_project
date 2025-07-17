/**
 * @fileoverview Top K Frequent Elements - LeetCode #347 (Medium)
 *
 * Problem Description:
 * Given an integer array nums and an integer k, return the k most frequent elements.
 * You may return the answer in any order.
 *
 * Examples:
 * Input: nums = [1,1,1,2,2,3], k = 2
 * Output: [1,2]
 *
 * Input: nums = [1], k = 1
 * Output: [1]
 *
 * Constraints:
 * - 1 <= nums.length <= 10^5
 * - k is in the range [1, the number of unique elements in the array]
 * - It's guaranteed that the answer is unique
 *
 * @author Your Name
 * @since 2024
 */

/**
 * Approach 1: Min Heap (Priority Queue)
 * Time Complexity: O(n log k) where n is the length of nums
 * Space Complexity: O(n + k) for the frequency map and heap
 *
 * Algorithm:
 * 1. Build frequency map
 * 2. Use min heap to keep track of top k elements
 * 3. For each element, if heap size < k, add it
 * 4. If frequency > heap.min, remove min and add current
 *
 * @param {number[]} nums - Array of integers
 * @param {number} k - Number of most frequent elements to return
 * @returns {number[]} Array of k most frequent elements
 */
function topKFrequentMinHeap(nums, k) {
    if (!nums || nums.length === 0 || k <= 0) return [];
    if (k >= new Set(nums).size) return [...new Set(nums)];

    // Build frequency map
    const freqMap = new Map();
    for (const num of nums) {
        freqMap.set(num, (freqMap.get(num) || 0) + 1);
    }

    // Min heap implementation using array
    class MinHeap {
        constructor() {
            this.heap = [];
        }

        size() {
            return this.heap.length;
        }

        peek() {
            return this.heap[0];
        }

        push(item) {
            this.heap.push(item);
            this.bubbleUp();
        }

        pop() {
            if (this.heap.length === 0) return null;
            if (this.heap.length === 1) return this.heap.pop();

            const min = this.heap[0];
            this.heap[0] = this.heap.pop();
            this.bubbleDown();
            return min;
        }

        bubbleUp() {
            let index = this.heap.length - 1;
            while (index > 0) {
                const parentIndex = Math.floor((index - 1) / 2);
                if (this.heap[index].freq >= this.heap[parentIndex].freq) break;

                [this.heap[index], this.heap[parentIndex]] =
                [this.heap[parentIndex], this.heap[index]];
                index = parentIndex;
            }
        }

        bubbleDown() {
            let index = 0;
            while (this.getLeftChild(index) !== null) {
                const smallerChildIndex = this.getSmallerChildIndex(index);
                if (this.heap[index].freq <= this.heap[smallerChildIndex].freq) break;

                [this.heap[index], this.heap[smallerChildIndex]] =
                [this.heap[smallerChildIndex], this.heap[index]];
                index = smallerChildIndex;
            }
        }

        getLeftChild(index) {
            const leftIndex = 2 * index + 1;
            return leftIndex < this.heap.length ? this.heap[leftIndex] : null;
        }

        getRightChild(index) {
            const rightIndex = 2 * index + 2;
            return rightIndex < this.heap.length ? this.heap[rightIndex] : null;
        }

        getSmallerChildIndex(index) {
            const leftChild = this.getLeftChild(index);
            const rightChild = this.getRightChild(index);

            if (!rightChild) return 2 * index + 1;

            return leftChild.freq <= rightChild.freq ?
                   2 * index + 1 : 2 * index + 2;
        }
    }

    const heap = new MinHeap();

    // Process each unique element
    for (const [num, freq] of freqMap) {
        if (heap.size() < k) {
            heap.push({ num, freq });
        } else if (freq > heap.peek().freq) {
            heap.pop();
            heap.push({ num, freq });
        }
    }

    // Extract results
    const result = [];
    while (heap.size() > 0) {
        result.push(heap.pop().num);
    }

    return result;
}

/**
 * Approach 2: Bucket Sort
 * Time Complexity: O(n) where n is the length of nums
 * Space Complexity: O(n) for the frequency map and buckets
 *
 * Algorithm:
 * 1. Build frequency map
 * 2. Create buckets where index represents frequency
 * 3. Place elements in buckets based on their frequency
 * 4. Traverse buckets from high to low frequency
 *
 * @param {number[]} nums - Array of integers
 * @param {number} k - Number of most frequent elements to return
 * @returns {number[]} Array of k most frequent elements
 */
function topKFrequentBucketSort(nums, k) {
    if (!nums || nums.length === 0 || k <= 0 || !Number.isInteger(k)) return [];
    if (k >= new Set(nums).size) return [...new Set(nums)];

    // Build frequency map
    const freqMap = new Map();
    for (const num of nums) {
        freqMap.set(num, (freqMap.get(num) || 0) + 1);
    }

    // Create buckets - index represents frequency
    const buckets = Array(nums.length + 1).fill(null).map(() => []);

    // Place elements in buckets
    for (const [num, freq] of freqMap) {
        buckets[freq].push(num);
    }

    // Collect results from high frequency to low
    const result = [];
    for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
        if (buckets[i].length > 0) {
            for (const num of buckets[i]) {
                if (result.length === k) break;
                result.push(num);
            }
        }
    }

    return result;
}

/**
 * Approach 3: Quickselect Algorithm
 * Time Complexity: O(n) average case, O(n²) worst case
 * Space Complexity: O(n) for the frequency map and unique elements array
 *
 * Algorithm:
 * 1. Build frequency map
 * 2. Use quickselect to find kth largest frequency
 * 3. Return all elements with frequency >= kth largest
 *
 * @param {number[]} nums - Array of integers
 * @param {number} k - Number of most frequent elements to return
 * @returns {number[]} Array of k most frequent elements
 */
function topKFrequentQuickSelect(nums, k) {
    if (!nums || nums.length === 0 || k <= 0) return [];

    // Build frequency map
    const freqMap = new Map();
    for (const num of nums) {
        freqMap.set(num, (freqMap.get(num) || 0) + 1);
    }

    const unique = Array.from(freqMap.keys());
    if (k >= unique.length) return unique;

    /**
     * Partition function for quickselect
     * @param {number[]} arr - Array of unique numbers
     * @param {number} left - Left boundary
     * @param {number} right - Right boundary
     * @returns {number} Partition index
     */
    function partition(arr, left, right) {
        const pivotFreq = freqMap.get(arr[right]);
        let i = left;

        for (let j = left; j < right; j++) {
            if (freqMap.get(arr[j]) < pivotFreq) {
                [arr[i], arr[j]] = [arr[j], arr[i]];
                i++;
            }
        }
        [arr[i], arr[right]] = [arr[right], arr[i]];
        return i;
    }

    /**
     * Quickselect to find kth largest element
     * @param {number[]} arr - Array of unique numbers
     * @param {number} left - Left boundary
     * @param {number} right - Right boundary
     * @param {number} kSmallest - Position of kth smallest (0-indexed)
     */
    function quickSelect(arr, left, right, kSmallest) {
        if (left === right) return;

        const pivotIndex = partition(arr, left, right);

        if (kSmallest === pivotIndex) {
            return;
        } else if (kSmallest < pivotIndex) {
            quickSelect(arr, left, pivotIndex - 1, kSmallest);
        } else {
            quickSelect(arr, pivotIndex + 1, right, kSmallest);
        }
    }

    // Find kth largest (which is (n-k)th smallest in 0-indexed)
    const n = unique.length;
    quickSelect(unique, 0, n - 1, n - k);

    // Return top k elements
    return unique.slice(n - k);
}

/**
 * Approach 4: Built-in Sort
 * Time Complexity: O(n log n) where n is the number of unique elements
 * Space Complexity: O(n) for the frequency map and sorted array
 *
 * @param {number[]} nums - Array of integers
 * @param {number} k - Number of most frequent elements to return
 * @returns {number[]} Array of k most frequent elements
 */
function topKFrequentSort(nums, k) {
    if (!nums || nums.length === 0 || k <= 0) return [];

    // Build frequency map
    const freqMap = new Map();
    for (const num of nums) {
        freqMap.set(num, (freqMap.get(num) || 0) + 1);
    }

    // Sort by frequency (descending)
    const sorted = Array.from(freqMap.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, k)
        .map(([num]) => num);

    return sorted;
}

// Default export uses the optimal bucket sort approach
const topKFrequent = topKFrequentBucketSort;

// Utility Functions

/**
 * Get frequency map of array elements
 * @param {number[]} nums - Array of numbers
 * @returns {Map<number, number>} Frequency map
 */
function getFrequencyMap(nums) {
    const freqMap = new Map();
    for (const num of nums) {
        freqMap.set(num, (freqMap.get(num) || 0) + 1);
    }
    return freqMap;
}

/**
 * Find all elements with frequency >= threshold
 * @param {number[]} nums - Array of numbers
 * @param {number} threshold - Minimum frequency
 * @returns {number[]} Elements meeting threshold
 */
function getElementsWithMinFrequency(nums, threshold) {
    const freqMap = getFrequencyMap(nums);
    const result = [];

    for (const [num, freq] of freqMap) {
        if (freq >= threshold) {
            result.push(num);
        }
    }

    return result;
}

/**
 * Get the kth most frequent element
 * @param {number[]} nums - Array of numbers
 * @param {number} k - Position (1-indexed)
 * @returns {number|null} The kth most frequent element
 */
function getKthMostFrequent(nums, k) {
    const result = topKFrequent(nums, k);
    return result.length >= k ? result[k - 1] : null;
}

/**
 * Check if elements form the top k most frequent
 * @param {number[]} nums - Original array
 * @param {number[]} elements - Elements to check
 * @param {number} k - Expected count
 * @returns {boolean} True if elements are top k most frequent
 */
function isTopKFrequent(nums, elements, k) {
    if (elements.length !== k) return false;

    const actual = new Set(topKFrequent(nums, k));
    const provided = new Set(elements);

    return actual.size === provided.size &&
           [...actual].every(x => provided.has(x));
}

/**
 * Generate visualization of frequency distribution
 * @param {number[]} nums - Array of numbers
 * @param {number} k - Number of top elements to highlight
 * @returns {string} Visual representation
 */
function visualizeFrequency(nums, k) {
    const freqMap = getFrequencyMap(nums);
    const topK = new Set(topKFrequent(nums, k));

    const sorted = Array.from(freqMap.entries())
        .sort((a, b) => b[1] - a[1]);

    let result = `Frequency Distribution (Top ${k} highlighted):\n`;
    result += '─'.repeat(50) + '\n';

    for (const [num, freq] of sorted) {
        const isTopK = topK.has(num);
        const bar = '█'.repeat(Math.min(freq, 20));
        const marker = isTopK ? ' ⭐' : '';
        result += `${num.toString().padStart(3)}: ${bar} (${freq})${marker}\n`;
    }

    return result;
}

module.exports = {
    topKFrequent,
    topKFrequentMinHeap,
    topKFrequentBucketSort,
    topKFrequentQuickSelect,
    topKFrequentSort,
    getFrequencyMap,
    getElementsWithMinFrequency,
    getKthMostFrequent,
    isTopKFrequent,
    visualizeFrequency
};