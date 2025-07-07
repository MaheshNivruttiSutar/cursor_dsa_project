const { binarySearch, binarySearchRecursive } = require('./binarySearch');

describe('Binary Search', () => {
    const sortedArray = [-1, 0, 3, 5, 9, 12];

    describe('Iterative approach', () => {
        test('should find target in the middle', () => {
            expect(binarySearch(sortedArray, 9)).toBe(4);
        });

        test('should find target at the beginning', () => {
            expect(binarySearch(sortedArray, -1)).toBe(0);
        });

        test('should find target at the end', () => {
            expect(binarySearch(sortedArray, 12)).toBe(5);
        });

        test('should return -1 when target not found', () => {
            expect(binarySearch(sortedArray, 2)).toBe(-1);
            expect(binarySearch(sortedArray, 13)).toBe(-1);
            expect(binarySearch(sortedArray, -5)).toBe(-1);
        });

        test('should handle single element array', () => {
            expect(binarySearch([5], 5)).toBe(0);
            expect(binarySearch([5], 3)).toBe(-1);
        });

        test('should handle empty array', () => {
            expect(binarySearch([], 5)).toBe(-1);
        });
    });

    describe('Recursive approach', () => {
        test('should find target in the middle recursively', () => {
            expect(binarySearchRecursive(sortedArray, 9)).toBe(4);
        });

        test('should find target at the beginning recursively', () => {
            expect(binarySearchRecursive(sortedArray, -1)).toBe(0);
        });

        test('should find target at the end recursively', () => {
            expect(binarySearchRecursive(sortedArray, 12)).toBe(5);
        });

        test('should return -1 when target not found recursively', () => {
            expect(binarySearchRecursive(sortedArray, 2)).toBe(-1);
            expect(binarySearchRecursive(sortedArray, 13)).toBe(-1);
            expect(binarySearchRecursive(sortedArray, -5)).toBe(-1);
        });

        test('should handle single element array recursively', () => {
            expect(binarySearchRecursive([5], 5)).toBe(0);
            expect(binarySearchRecursive([5], 3)).toBe(-1);
        });

        test('should handle empty array recursively', () => {
            expect(binarySearchRecursive([], 5)).toBe(-1);
        });
    });
});