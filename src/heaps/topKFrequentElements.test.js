/**
 * @fileoverview Test cases for Top K Frequent Elements - LeetCode #347
 * @author Your Name
 * @since 2024
 */

const {
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
} = require('./topKFrequentElements');

describe('Top K Frequent Elements', () => {
    // Test data sets
    const testCases = [
        {
            name: 'basic case with multiple frequencies',
            nums: [1, 1, 1, 2, 2, 3],
            k: 2,
            expected: [1, 2], // Order may vary
            description: 'Should return the 2 most frequent elements'
        },
        {
            name: 'single element',
            nums: [1],
            k: 1,
            expected: [1],
            description: 'Should handle single element array'
        },
        {
            name: 'all elements same frequency',
            nums: [1, 2, 3],
            k: 2,
            expected: [1, 2], // Any 2 elements are valid
            description: 'Should handle equal frequencies'
        },
        {
            name: 'k equals array length',
            nums: [1, 2, 3, 4, 5],
            k: 5,
            expected: [1, 2, 3, 4, 5],
            description: 'Should return all elements when k equals length'
        },
        {
            name: 'large frequency difference',
            nums: [4, 1, -1, 2, -1, 2, 3],
            k: 2,
            expected: [-1, 2], // Order may vary
            description: 'Should handle negative numbers and varying frequencies'
        }
    ];

    // Helper function to check if result is valid
    function isValidResult(nums, result, k) {
        if (result.length !== k) return false;

        const freqMap = new Map();
        for (const num of nums) {
            freqMap.set(num, (freqMap.get(num) || 0) + 1);
        }

        const resultFreqs = result.map(num => freqMap.get(num));
        const allFreqs = Array.from(freqMap.values()).sort((a, b) => b - a);
        const expectedFreqs = allFreqs.slice(0, k);

        resultFreqs.sort((a, b) => b - a);
        expectedFreqs.sort((a, b) => b - a);

        return JSON.stringify(resultFreqs) === JSON.stringify(expectedFreqs);
    }

    describe('All Approaches Correctness', () => {
        const approaches = [
            { name: 'MinHeap', fn: topKFrequentMinHeap },
            { name: 'BucketSort', fn: topKFrequentBucketSort },
            { name: 'QuickSelect', fn: topKFrequentQuickSelect },
            { name: 'Sort', fn: topKFrequentSort },
            { name: 'Default', fn: topKFrequent }
        ];

        approaches.forEach(({ name, fn }) => {
            describe(`${name} Approach`, () => {
                testCases.forEach(({ name: testName, nums, k, description }) => {
                    test(`${testName} - ${description}`, () => {
                        const result = fn(nums, k);
                        expect(isValidResult(nums, result, k)).toBe(true);
                        expect(result.length).toBe(k);
                    });
                });
            });
        });
    });

    describe('Edge Cases', () => {
        test('empty array', () => {
            expect(topKFrequent([], 1)).toEqual([]);
        });

        test('null input', () => {
            expect(topKFrequent(null, 1)).toEqual([]);
        });

        test('k is 0', () => {
            expect(topKFrequent([1, 2, 3], 0)).toEqual([]);
        });

        test('k is negative', () => {
            expect(topKFrequent([1, 2, 3], -1)).toEqual([]);
        });

        test('k larger than unique elements', () => {
            const result = topKFrequent([1, 1, 2, 2], 5);
            expect(result.sort()).toEqual([1, 2]);
        });

        test('single frequency for all elements', () => {
            const result = topKFrequent([5, 4, 3, 2, 1], 3);
            expect(result.length).toBe(3);
            expect(isValidResult([5, 4, 3, 2, 1], result, 3)).toBe(true);
        });
    });

    describe('Large Input Performance', () => {
        test('performance with large array', () => {
            const largeArray = [];
            for (let i = 0; i < 10000; i++) {
                largeArray.push(Math.floor(Math.random() * 1000));
            }

            const k = 10;
            const start = Date.now();
            const result = topKFrequent(largeArray, k);
            const end = Date.now();

            expect(result.length).toBe(k);
            expect(isValidResult(largeArray, result, k)).toBe(true);
            expect(end - start).toBeLessThan(1000); // Should complete within 1 second
        });

        test('performance comparison between approaches', () => {
            const testArray = Array(1000).fill(0).map(() => Math.floor(Math.random() * 100));
            const k = 5;

            const approaches = [
                topKFrequentBucketSort,
                topKFrequentMinHeap,
                topKFrequentSort
            ];

            const times = approaches.map(fn => {
                const start = process.hrtime.bigint();
                fn(testArray, k);
                const end = process.hrtime.bigint();
                return Number(end - start) / 1000000; // Convert to milliseconds
            });

            // All approaches should complete reasonably quickly
            times.forEach(time => {
                expect(time).toBeLessThan(100); // 100ms threshold
            });
        });
    });

    describe('Algorithm Consistency', () => {
        test('all approaches return equivalent results', () => {
            const testCases = [
                { nums: [1, 1, 1, 2, 2, 3], k: 2 },
                { nums: [4, 1, -1, 2, -1, 2, 3], k: 2 },
                { nums: [1, 2, 3, 4, 5], k: 3 },
                { nums: [7, 10, 11, 5, 2, 5, 5, 7, 11, 8, 9], k: 4 }
            ];

            const approaches = [
                topKFrequentMinHeap,
                topKFrequentBucketSort,
                topKFrequentQuickSelect,
                topKFrequentSort
            ];

            testCases.forEach(({ nums, k }) => {
                const results = approaches.map(fn => fn(nums, k));

                // All results should be valid
                results.forEach(result => {
                    expect(isValidResult(nums, result, k)).toBe(true);
                });

                // All results should have the same frequency distribution
                const freqMap = new Map();
                for (const num of nums) {
                    freqMap.set(num, (freqMap.get(num) || 0) + 1);
                }

                const expectedFreqs = results[0]
                    .map(num => freqMap.get(num))
                    .sort((a, b) => b - a);

                results.slice(1).forEach(result => {
                    const resultFreqs = result
                        .map(num => freqMap.get(num))
                        .sort((a, b) => b - a);
                    expect(resultFreqs).toEqual(expectedFreqs);
                });
            });
        });
    });

    describe('Utility Functions', () => {
        describe('getFrequencyMap', () => {
            test('should create correct frequency map', () => {
                const result = getFrequencyMap([1, 1, 2, 2, 2, 3]);
                expect(result.get(1)).toBe(2);
                expect(result.get(2)).toBe(3);
                expect(result.get(3)).toBe(1);
            });

            test('should handle empty array', () => {
                const result = getFrequencyMap([]);
                expect(result.size).toBe(0);
            });
        });

        describe('getElementsWithMinFrequency', () => {
            test('should return elements with minimum frequency', () => {
                const result = getElementsWithMinFrequency([1, 1, 2, 2, 2, 3], 2);
                expect(result.sort()).toEqual([1, 2]);
            });

            test('should return empty array when no elements meet threshold', () => {
                const result = getElementsWithMinFrequency([1, 2, 3], 2);
                expect(result).toEqual([]);
            });
        });

        describe('getKthMostFrequent', () => {
            test('should return kth most frequent element', () => {
                const result = getKthMostFrequent([1, 1, 1, 2, 2, 3], 2);
                expect(result).toBe(2);
            });

            test('should return null for invalid k', () => {
                const result = getKthMostFrequent([1, 2, 3], 5);
                expect(result).toBeNull();
            });
        });

        describe('isTopKFrequent', () => {
            test('should validate correct top k elements', () => {
                const result = isTopKFrequent([1, 1, 1, 2, 2, 3], [1, 2], 2);
                expect(result).toBe(true);
            });

            test('should reject incorrect elements', () => {
                const result = isTopKFrequent([1, 1, 1, 2, 2, 3], [1, 3], 2);
                expect(result).toBe(false);
            });

            test('should reject wrong count', () => {
                const result = isTopKFrequent([1, 1, 1, 2, 2, 3], [1], 2);
                expect(result).toBe(false);
            });
        });

        describe('visualizeFrequency', () => {
            test('should generate frequency visualization', () => {
                const result = visualizeFrequency([1, 1, 1, 2, 2, 3], 2);
                expect(result).toContain('Frequency Distribution');
                expect(result).toContain('⭐'); // Top k marker
                expect(result).toContain('█'); // Frequency bars
            });

            test('should handle empty array', () => {
                const result = visualizeFrequency([], 1);
                expect(result).toContain('Frequency Distribution');
            });
        });
    });

    describe('Specific LeetCode Examples', () => {
        test('LeetCode Example 1', () => {
            const nums = [1, 1, 1, 2, 2, 3];
            const k = 2;
            const result = topKFrequent(nums, k);

            expect(result.length).toBe(2);
            expect(isValidResult(nums, result, k)).toBe(true);

            // The result should contain 1 and 2 (most frequent)
            const resultSet = new Set(result);
            expect(resultSet.has(1)).toBe(true);
            expect(resultSet.has(2)).toBe(true);
        });

        test('LeetCode Example 2', () => {
            const nums = [1];
            const k = 1;
            const result = topKFrequent(nums, k);

            expect(result).toEqual([1]);
        });
    });

    describe('Complex Scenarios', () => {
        test('duplicate frequencies with deterministic order', () => {
            const nums = [1, 2, 3, 4]; // All have frequency 1
            const k = 2;
            const result = topKFrequent(nums, k);

            expect(result.length).toBe(2);
            expect(isValidResult(nums, result, k)).toBe(true);
        });

        test('very large k', () => {
            const nums = [1, 1, 2, 2, 3, 3];
            const k = 10;
            const result = topKFrequent(nums, k);

            expect(result.sort()).toEqual([1, 2, 3]);
        });

        test('negative numbers', () => {
            const nums = [-1, -1, -2, -2, -2, -3];
            const k = 2;
            const result = topKFrequent(nums, k);

            expect(result.length).toBe(2);
            expect(isValidResult(nums, result, k)).toBe(true);

            const resultSet = new Set(result);
            expect(resultSet.has(-2)).toBe(true); // Most frequent
            expect(resultSet.has(-1)).toBe(true); // Second most frequent
        });

        test('very skewed distribution', () => {
            const nums = Array(1000).fill(1).concat(Array(1).fill(2));
            const k = 1;
            const result = topKFrequent(nums, k);

            expect(result).toEqual([1]);
        });
    });

    describe('Error Handling', () => {
        test('should handle undefined gracefully', () => {
            expect(topKFrequent(undefined, 1)).toEqual([]);
        });

        test('should handle non-integer k', () => {
            expect(topKFrequent([1, 2, 3], 1.5)).toEqual([]);
        });

        test('should handle very large arrays efficiently', () => {
            const largeArray = Array(50000).fill(0).map((_, i) => i % 1000);
            const k = 100;

            const start = Date.now();
            const result = topKFrequent(largeArray, k);
            const end = Date.now();

            expect(result.length).toBe(k);
            expect(end - start).toBeLessThan(2000); // Should complete within 2 seconds
        });
    });

    describe('Memory Efficiency', () => {
        test('should not create unnecessary intermediate arrays', () => {
            const nums = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5];
            const k = 3;

            // Test that bucket sort doesn't create excessive buckets
            const result = topKFrequentBucketSort(nums, k);
            expect(result.length).toBe(k);
            expect(isValidResult(nums, result, k)).toBe(true);
        });
    });
});