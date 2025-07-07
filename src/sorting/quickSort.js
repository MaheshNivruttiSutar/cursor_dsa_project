/**
 * Quick Sort
 * Quick Sort is a divide-and-conquer algorithm that picks an element as a pivot
 * and partitions the given array around the picked pivot.
 *
 * Average Time Complexity: O(n log n)
 * Worst Time Complexity: O(n²)
 * Best Time Complexity: O(n log n)
 * Space Complexity: O(log n) - due to recursion stack
 *
 * @param {number[]} arr - Array to be sorted
 * @param {number} low - Starting index
 * @param {number} high - Ending index
 * @return {number[]} - Sorted array
 */
function quickSort(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        // Partition the array and get the pivot index
        const pivotIndex = partition(arr, low, high);

        // Recursively sort elements before and after partition
        quickSort(arr, low, pivotIndex - 1);
        quickSort(arr, pivotIndex + 1, high);
    }

    return arr;
}

/**
 * Partition function for Quick Sort
 * Places the pivot element at its correct position and arranges
 * smaller elements to the left and larger elements to the right
 *
 * @param {number[]} arr - Array to be partitioned
 * @param {number} low - Starting index
 * @param {number} high - Ending index
 * @return {number} - Index of the pivot element
 */
function partition(arr, low, high) {
    // Choose the rightmost element as pivot
    const pivot = arr[high];

    // Index of smaller element, indicates the right position of pivot
    let i = low - 1;

    for (let j = low; j < high; j++) {
        // If current element is smaller than or equal to pivot
        if (arr[j] <= pivot) {
            i++;
            swap(arr, i, j);
        }
    }

    // Place pivot at its correct position
    swap(arr, i + 1, high);
    return i + 1;
}

/**
 * Swap two elements in an array
 * @param {number[]} arr - Array
 * @param {number} i - First index
 * @param {number} j - Second index
 */
function swap(arr, i, j) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

/**
 * Quick Sort - Non-destructive version (doesn't modify original array)
 *
 * @param {number[]} arr - Array to be sorted
 * @return {number[]} - New sorted array
 */
function quickSortCopy(arr) {
    const arrCopy = [...arr];
    return quickSort(arrCopy);
}

/**
 * Quick Sort - Random pivot selection for better average case
 *
 * @param {number[]} arr - Array to be sorted
 * @param {number} low - Starting index
 * @param {number} high - Ending index
 * @return {number[]} - Sorted array
 */
function quickSortRandom(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        // Randomly choose pivot and swap with last element
        const randomIndex = Math.floor(Math.random() * (high - low + 1)) + low;
        swap(arr, randomIndex, high);

        const pivotIndex = partition(arr, low, high);

        quickSortRandom(arr, low, pivotIndex - 1);
        quickSortRandom(arr, pivotIndex + 1, high);
    }

    return arr;
}

module.exports = {
    quickSort,
    quickSortCopy,
    quickSortRandom,
    partition,
    swap
};