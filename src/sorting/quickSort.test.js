const { quickSort, quickSortCopy, quickSortRandom } = require('./quickSort');

describe('Quick Sort', () => {
    const testCases = [
        {
            input: [3, 6, 8, 10, 1, 2, 1],
            expected: [1, 1, 2, 3, 6, 8, 10],
            description: 'array with duplicates'
        },
        {
            input: [5, 2, 8, 1, 9],
            expected: [1, 2, 5, 8, 9],
            description: 'unsorted array'
        },
        {
            input: [1],
            expected: [1],
            description: 'single element'
        },
        {
            input: [],
            expected: [],
            description: 'empty array'
        },
        {
            input: [1, 2, 3, 4, 5],
            expected: [1, 2, 3, 4, 5],
            description: 'already sorted array'
        },
        {
            input: [5, 4, 3, 2, 1],
            expected: [1, 2, 3, 4, 5],
            description: 'reverse sorted array'
        },
        {
            input: [3, 3, 3, 3, 3],
            expected: [3, 3, 3, 3, 3],
            description: 'all same elements'
        },
        {
            input: [-5, -1, -3, -2, -4],
            expected: [-5, -4, -3, -2, -1],
            description: 'negative numbers'
        },
        {
            input: [-2, 5, -1, 3, 0, -4],
            expected: [-4, -2, -1, 0, 3, 5],
            description: 'mixed positive and negative'
        }
    ];

    describe('In-place Quick Sort', () => {
        testCases.forEach(({ input, expected, description }) => {
            test(`should sort ${description}`, () => {
                const arr = [...input]; // Create a copy to avoid modifying original
                quickSort(arr);
                expect(arr).toEqual(expected);
            });
        });
    });

    describe('Non-destructive Quick Sort', () => {
        testCases.forEach(({ input, expected, description }) => {
            test(`should sort ${description} without modifying original`, () => {
                const original = [...input];
                const sorted = quickSortCopy(input);
                expect(sorted).toEqual(expected);
                expect(input).toEqual(original); // Original should be unchanged
            });
        });
    });

    describe('Random pivot Quick Sort', () => {
        testCases.forEach(({ input, expected, description }) => {
            test(`should sort ${description} with random pivot`, () => {
                const arr = [...input];
                quickSortRandom(arr);
                expect(arr).toEqual(expected);
            });
        });
    });

    describe('Performance tests', () => {
        test('should handle large arrays efficiently', () => {
            const largeArray = Array.from({ length: 1000 }, () => Math.floor(Math.random() * 1000));
            const sortedArray = quickSortCopy(largeArray);

            // Check if array is sorted
            for (let i = 1; i < sortedArray.length; i++) {
                expect(sortedArray[i]).toBeGreaterThanOrEqual(sortedArray[i - 1]);
            }

            // Check if all elements are preserved
            expect(sortedArray.length).toBe(largeArray.length);
        });
    });
});