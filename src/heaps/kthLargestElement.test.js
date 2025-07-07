const {
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
} = require('./kthLargestElement');

describe('Kth Largest Element in an Array', () => {
    describe('MinHeap implementation', () => {
        test('should create empty heap', () => {
            const heap = new MinHeap();
            expect(heap.size()).toBe(0);
            expect(heap.peek()).toBeNull();
        });

        test('should insert and maintain heap property', () => {
            const heap = new MinHeap();
            heap.insert(5);
            heap.insert(3);
            heap.insert(7);
            heap.insert(1);

            expect(heap.size()).toBe(4);
            expect(heap.peek()).toBe(1);
        });

        test('should extract min correctly', () => {
            const heap = new MinHeap();
            const values = [5, 3, 7, 1, 9, 2];

            for (const val of values) {
                heap.insert(val);
            }

            const extracted = [];
            while (heap.size() > 0) {
                extracted.push(heap.extractMin());
            }

            expect(extracted).toEqual([1, 2, 3, 5, 7, 9]);
        });

        test('should handle single element', () => {
            const heap = new MinHeap();
            heap.insert(42);

            expect(heap.peek()).toBe(42);
            expect(heap.extractMin()).toBe(42);
            expect(heap.size()).toBe(0);
        });

        test('should handle duplicates', () => {
            const heap = new MinHeap();
            heap.insert(5);
            heap.insert(5);
            heap.insert(3);
            heap.insert(5);

            expect(heap.extractMin()).toBe(3);
            expect(heap.extractMin()).toBe(5);
            expect(heap.extractMin()).toBe(5);
            expect(heap.extractMin()).toBe(5);
        });
    });

    describe('findKthLargest (Min-Heap)', () => {
        test('should find kth largest in basic cases', () => {
            expect(findKthLargest([3, 2, 1, 5, 6, 4], 2)).toBe(5);
            expect(findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)).toBe(4);
        });

        test('should handle edge cases', () => {
            expect(findKthLargest([1], 1)).toBe(1);
            expect(findKthLargest([1, 2], 1)).toBe(2);
            expect(findKthLargest([1, 2], 2)).toBe(1);
        });

        test('should handle duplicates', () => {
            expect(findKthLargest([3, 3, 3, 3], 2)).toBe(3);
            expect(findKthLargest([1, 2, 2, 3], 3)).toBe(2);
            expect(findKthLargest([2, 2, 2, 1], 1)).toBe(2);
        });

        test('should handle negative numbers', () => {
            expect(findKthLargest([-1, -2, -3], 1)).toBe(-1);
            expect(findKthLargest([-1, 0, 1], 2)).toBe(0);
            expect(findKthLargest([-5, -1, -3, -2], 3)).toBe(-3);
        });

        test('should handle large arrays', () => {
            const nums = Array.from({length: 100}, (_, i) => i + 1);
            expect(findKthLargest(nums, 1)).toBe(100);
            expect(findKthLargest(nums, 50)).toBe(51);
            expect(findKthLargest(nums, 100)).toBe(1);
        });

        test('should handle mixed positive and negative', () => {
            expect(findKthLargest([-1, 2, 0], 1)).toBe(2);
            expect(findKthLargest([-1, 2, 0], 2)).toBe(0);
            expect(findKthLargest([-1, 2, 0], 3)).toBe(-1);
        });
    });

    describe('findKthLargestQuickSelect (QuickSelect)', () => {
        test('should find kth largest in basic cases', () => {
            expect(findKthLargestQuickSelect([3, 2, 1, 5, 6, 4], 2)).toBe(5);
            expect(findKthLargestQuickSelect([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)).toBe(4);
        });

        test('should handle edge cases', () => {
            expect(findKthLargestQuickSelect([1], 1)).toBe(1);
            expect(findKthLargestQuickSelect([1, 2], 1)).toBe(2);
            expect(findKthLargestQuickSelect([1, 2], 2)).toBe(1);
        });

        test('should handle duplicates', () => {
            expect(findKthLargestQuickSelect([3, 3, 3, 3], 2)).toBe(3);
            expect(findKthLargestQuickSelect([1, 2, 2, 3], 3)).toBe(2);
        });

        test('should handle negative numbers', () => {
            expect(findKthLargestQuickSelect([-1, -2, -3], 1)).toBe(-1);
            expect(findKthLargestQuickSelect([-1, 0, 1], 2)).toBe(0);
        });
    });

    describe('findKthLargestSort (Sorting)', () => {
        test('should find kth largest in basic cases', () => {
            expect(findKthLargestSort([3, 2, 1, 5, 6, 4], 2)).toBe(5);
            expect(findKthLargestSort([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)).toBe(4);
        });

        test('should handle edge cases', () => {
            expect(findKthLargestSort([1], 1)).toBe(1);
            expect(findKthLargestSort([1, 2], 1)).toBe(2);
            expect(findKthLargestSort([1, 2], 2)).toBe(1);
        });

        test('should handle duplicates', () => {
            expect(findKthLargestSort([3, 3, 3, 3], 2)).toBe(3);
            expect(findKthLargestSort([1, 2, 2, 3], 3)).toBe(2);
        });

        test('should handle negative numbers', () => {
            expect(findKthLargestSort([-1, -2, -3], 1)).toBe(-1);
            expect(findKthLargestSort([-1, 0, 1], 2)).toBe(0);
        });
    });

    describe('findKthLargestCountingSort (Counting Sort)', () => {
        test('should find kth largest for small ranges', () => {
            expect(findKthLargestCountingSort([3, 2, 1, 5, 6, 4], 2)).toBe(5);
            expect(findKthLargestCountingSort([1, 2, 3, 4, 5], 3)).toBe(3);
        });

        test('should handle edge cases', () => {
            expect(findKthLargestCountingSort([1], 1)).toBe(1);
            expect(findKthLargestCountingSort([1, 2], 1)).toBe(2);
            expect(findKthLargestCountingSort([1, 2], 2)).toBe(1);
        });

        test('should handle duplicates', () => {
            expect(findKthLargestCountingSort([3, 3, 3, 3], 2)).toBe(3);
            expect(findKthLargestCountingSort([1, 2, 2, 3], 3)).toBe(2);
        });

        test('should handle negative numbers', () => {
            expect(findKthLargestCountingSort([-1, -2, -3], 1)).toBe(-1);
            expect(findKthLargestCountingSort([-1, 0, 1], 2)).toBe(0);
        });

        test('should fall back to quickselect for large ranges', () => {
            const nums = [1, 1000000]; // Large range
            expect(findKthLargestCountingSort(nums, 1)).toBe(1000000);
        });
    });

    describe('findKthLargestBuiltIn (Built-in)', () => {
        test('should find kth largest in basic cases', () => {
            expect(findKthLargestBuiltIn([3, 2, 1, 5, 6, 4], 2)).toBe(5);
            expect(findKthLargestBuiltIn([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)).toBe(4);
        });

        test('should handle edge cases', () => {
            expect(findKthLargestBuiltIn([1], 1)).toBe(1);
            expect(findKthLargestBuiltIn([1, 2], 1)).toBe(2);
            expect(findKthLargestBuiltIn([1, 2], 2)).toBe(1);
        });

        test('should handle duplicates', () => {
            expect(findKthLargestBuiltIn([3, 3, 3, 3], 2)).toBe(3);
            expect(findKthLargestBuiltIn([1, 2, 2, 3], 3)).toBe(2);
        });

        test('should handle negative numbers', () => {
            expect(findKthLargestBuiltIn([-1, -2, -3], 1)).toBe(-1);
            expect(findKthLargestBuiltIn([-1, 0, 1], 2)).toBe(0);
        });
    });

    describe('findKLargestElements (K Largest Elements)', () => {
        test('should find k largest elements', () => {
            expect(findKLargestElements([3, 2, 1, 5, 6, 4], 2)).toEqual([6, 5]);
            expect(findKLargestElements([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)).toEqual([6, 5, 5, 4]);
        });

        test('should handle edge cases', () => {
            expect(findKLargestElements([1], 1)).toEqual([1]);
            expect(findKLargestElements([1, 2], 0)).toEqual([]);
            expect(findKLargestElements([1, 2], 3)).toEqual([]);
        });

        test('should handle duplicates', () => {
            expect(findKLargestElements([3, 3, 3, 3], 2)).toEqual([3, 3]);
            expect(findKLargestElements([1, 2, 2, 3], 3)).toEqual([3, 2, 2]);
        });

        test('should return elements in descending order', () => {
            const result = findKLargestElements([5, 1, 3, 9, 2], 3);
            expect(result).toEqual([9, 5, 3]);

            // Check that it's actually in descending order
            for (let i = 0; i < result.length - 1; i++) {
                expect(result[i]).toBeGreaterThanOrEqual(result[i + 1]);
            }
        });
    });

    describe('findKthSmallest (Kth Smallest)', () => {
        test('should find kth smallest element', () => {
            expect(findKthSmallest([3, 2, 1, 5, 6, 4], 2)).toBe(2);
            expect(findKthSmallest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)).toBe(3);
        });

        test('should handle edge cases', () => {
            expect(findKthSmallest([1], 1)).toBe(1);
            expect(findKthSmallest([1, 2], 1)).toBe(1);
            expect(findKthSmallest([1, 2], 2)).toBe(2);
        });

        test('should handle duplicates', () => {
            expect(findKthSmallest([3, 3, 3, 3], 2)).toBe(3);
            expect(findKthSmallest([1, 2, 2, 3], 3)).toBe(2);
        });

        test('should be consistent with kth largest', () => {
            const nums = [3, 2, 1, 5, 6, 4];
            const n = nums.length;

            for (let k = 1; k <= n; k++) {
                const kthLargest = findKthLargest(nums, k);
                const kthSmallest = findKthSmallest(nums, n - k + 1);
                expect(kthLargest).toBe(kthSmallest);
            }
        });
    });

    describe('analyzeArray (Array Analysis)', () => {
        test('should analyze array statistics', () => {
            const analysis = analyzeArray([1, 2, 3, 4, 5]);
            expect(analysis.length).toBe(5);
            expect(analysis.min).toBe(1);
            expect(analysis.max).toBe(5);
            expect(analysis.median).toBe(3);
            expect(analysis.mean).toBe(3);
            expect(analysis.range).toBe(4);
            expect(analysis.duplicates).toBe(false);
            expect(analysis.uniqueCount).toBe(5);
        });

        test('should handle empty array', () => {
            expect(analyzeArray([])).toBeNull();
            expect(analyzeArray(null)).toBeNull();
            expect(analyzeArray(undefined)).toBeNull();
        });

        test('should handle single element', () => {
            const analysis = analyzeArray([42]);
            expect(analysis.length).toBe(1);
            expect(analysis.min).toBe(42);
            expect(analysis.max).toBe(42);
            expect(analysis.median).toBe(42);
            expect(analysis.mean).toBe(42);
            expect(analysis.range).toBe(0);
            expect(analysis.duplicates).toBe(false);
            expect(analysis.uniqueCount).toBe(1);
        });

        test('should handle duplicates', () => {
            const analysis = analyzeArray([1, 2, 2, 3]);
            expect(analysis.length).toBe(4);
            expect(analysis.duplicates).toBe(true);
            expect(analysis.uniqueCount).toBe(3);
        });

        test('should handle even length array median', () => {
            const analysis = analyzeArray([1, 2, 3, 4]);
            expect(analysis.median).toBe(2.5);
        });

        test('should handle negative numbers', () => {
            const analysis = analyzeArray([-3, -1, 0, 2]);
            expect(analysis.min).toBe(-3);
            expect(analysis.max).toBe(2);
            expect(analysis.range).toBe(5);
            expect(analysis.mean).toBe(-0.5);
        });
    });

    describe('validateKthLargest (Validation)', () => {
        test('should validate correct results', () => {
            expect(validateKthLargest([3, 2, 1, 5, 6, 4], 2, 5)).toBe(true);
            expect(validateKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4, 4)).toBe(true);
        });

        test('should reject incorrect results', () => {
            expect(validateKthLargest([3, 2, 1, 5, 6, 4], 2, 4)).toBe(false);
            expect(validateKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4, 5)).toBe(false);
        });

        test('should handle invalid k values', () => {
            expect(validateKthLargest([1, 2, 3], 0, 1)).toBe(false);
            expect(validateKthLargest([1, 2, 3], 4, 1)).toBe(false);
            expect(validateKthLargest([1, 2, 3], -1, 1)).toBe(false);
        });
    });

    describe('generateTestCases (Test Generation)', () => {
        test('should generate valid test cases', () => {
            const testCases = generateTestCases();
            expect(testCases.length).toBeGreaterThan(0);

            for (const testCase of testCases) {
                expect(testCase).toHaveProperty('nums');
                expect(testCase).toHaveProperty('k');
                expect(testCase).toHaveProperty('expected');
                expect(Array.isArray(testCase.nums)).toBe(true);
                expect(typeof testCase.k).toBe('number');
                expect(typeof testCase.expected).toBe('number');
            }
        });

        test('should have correct expected values', () => {
            const testCases = generateTestCases();

            for (const testCase of testCases) {
                const result = findKthLargest(testCase.nums, testCase.k);
                expect(result).toBe(testCase.expected);
            }
        });
    });

    describe('Algorithm Consistency', () => {
        test('all algorithms should produce same results', () => {
            const testCases = [
                { nums: [3, 2, 1, 5, 6, 4], k: 2 },
                { nums: [3, 2, 3, 1, 2, 4, 5, 5, 6], k: 4 },
                { nums: [1], k: 1 },
                { nums: [1, 2], k: 1 },
                { nums: [1, 2], k: 2 },
                { nums: [3, 3, 3, 3], k: 2 },
                { nums: [1, 2, 2, 3], k: 3 },
                { nums: [-1, -2, -3], k: 1 },
                { nums: [-1, 0, 1], k: 2 },
                { nums: [7, 10, 4, 3, 20, 15], k: 3 },
                { nums: [2, 1, 3, 5, 6, 4], k: 2 }
            ];

            testCases.forEach(({ nums, k }) => {
                const result1 = findKthLargest([...nums], k);
                const result2 = findKthLargestQuickSelect([...nums], k);
                const result3 = findKthLargestSort([...nums], k);
                const result4 = findKthLargestCountingSort([...nums], k);
                const result5 = findKthLargestBuiltIn([...nums], k);

                expect(result1).toBe(result2);
                expect(result2).toBe(result3);
                expect(result3).toBe(result4);
                expect(result4).toBe(result5);
            });
        });
    });

    describe('Performance Tests', () => {
        test('should handle large arrays efficiently', () => {
            const largeArray = Array.from({length: 1000}, () => Math.floor(Math.random() * 1000));
            const k = 500;

            const startTime = Date.now();
            const result = findKthLargest(largeArray, k);
            const endTime = Date.now();

            expect(typeof result).toBe('number');
            expect(endTime - startTime).toBeLessThan(1000); // Should complete in less than 1 second
        });

        test('min-heap approach should be efficient for small k', () => {
            const largeArray = Array.from({length: 1000}, () => Math.floor(Math.random() * 1000));
            const k = 10;

            const startTime = Date.now();
            const result = findKthLargest(largeArray, k);
            const endTime = Date.now();

            expect(typeof result).toBe('number');
            expect(endTime - startTime).toBeLessThan(100); // Should be very fast for small k
        });
    });
});
