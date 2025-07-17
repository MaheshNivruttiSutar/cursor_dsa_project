const {
    rotate,
    rotateWithExtraArray,
    rotateCyclic,
    rotateBruteForce,
    rotateLeft,
    isRotatedVersion,
    findMinRotationToSort,
    visualizeRotation
} = require('./rotateArray');

describe('Rotate Array', () => {

    // Test all main implementations with the same test cases
    const implementations = [
        { name: 'Reverse Method', func: rotate },
        { name: 'Extra Array', func: rotateWithExtraArray },
        { name: 'Cyclic Replacements', func: rotateCyclic },
        { name: 'Brute Force', func: rotateBruteForce }
    ];

    implementations.forEach(({ name, func }) => {
        describe(`${name} Implementation`, () => {

            describe('Basic Functionality', () => {
                test('should rotate array right by k steps', () => {
                    const nums = [1, 2, 3, 4, 5, 6, 7];
                    func(nums, 3);
                    expect(nums).toEqual([5, 6, 7, 1, 2, 3, 4]);
                });

                test('should handle k = 1', () => {
                    const nums = [1, 2, 3, 4, 5];
                    func(nums, 1);
                    expect(nums).toEqual([5, 1, 2, 3, 4]);
                });

                test('should handle k = n', () => {
                    const nums = [1, 2, 3, 4];
                    func(nums, 4);
                    expect(nums).toEqual([1, 2, 3, 4]); // No change
                });

                test('should handle k > n', () => {
                    const nums = [1, 2, 3];
                    func(nums, 5); // 5 % 3 = 2
                    expect(nums).toEqual([2, 3, 1]);
                });

                test('should handle k = 0', () => {
                    const nums = [1, 2, 3, 4, 5];
                    func(nums, 0);
                    expect(nums).toEqual([1, 2, 3, 4, 5]); // No change
                });

                test('should handle two elements', () => {
                    const nums = [1, 2];
                    func(nums, 1);
                    expect(nums).toEqual([2, 1]);
                });

                test('should handle single element', () => {
                    const nums = [1];
                    func(nums, 3);
                    expect(nums).toEqual([1]); // No change
                });

                test('should handle negative numbers', () => {
                    const nums = [-1, -100, 3, 99];
                    func(nums, 2);
                    expect(nums).toEqual([3, 99, -1, -100]);
                });
            });

            describe('Edge Cases', () => {
                test('should handle empty array', () => {
                    const nums = [];
                    func(nums, 1);
                    expect(nums).toEqual([]);
                });

                test('should handle null array', () => {
                    expect(() => func(null, 1)).not.toThrow();
                });

                test('should handle undefined array', () => {
                    expect(() => func(undefined, 1)).not.toThrow();
                });

                test('should handle very large k', () => {
                    const nums = [1, 2, 3];
                    func(nums, 1000000);
                    expect(nums).toEqual([3, 1, 2]); // 1000000 % 3 = 1, rotate right by 1
                });
            });

            describe('Pattern Recognition', () => {
                test('should handle duplicate elements', () => {
                    const nums = [1, 1, 2, 2, 3, 3];
                    func(nums, 2);
                    expect(nums).toEqual([3, 3, 1, 1, 2, 2]);
                });

                test('should handle all same elements', () => {
                    const nums = [5, 5, 5, 5, 5];
                    func(nums, 3);
                    expect(nums).toEqual([5, 5, 5, 5, 5]);
                });

                test('should handle sorted array', () => {
                    const nums = [1, 2, 3, 4, 5];
                    func(nums, 2);
                    expect(nums).toEqual([4, 5, 1, 2, 3]);
                });

                test('should handle reverse sorted array', () => {
                    const nums = [5, 4, 3, 2, 1];
                    func(nums, 2);
                    expect(nums).toEqual([2, 1, 5, 4, 3]);
                });
            });
        });
    });

    describe('Additional Utility Functions', () => {
        describe('rotateLeft', () => {
            test('should rotate array left by k steps', () => {
                const nums = [1, 2, 3, 4, 5, 6, 7];
                rotateLeft(nums, 3);
                expect(nums).toEqual([4, 5, 6, 7, 1, 2, 3]);
            });

            test('should handle edge cases', () => {
                const nums1 = [1, 2, 3];
                rotateLeft(nums1, 0);
                expect(nums1).toEqual([1, 2, 3]);

                const nums2 = [1, 2, 3];
                rotateLeft(nums2, 3);
                expect(nums2).toEqual([1, 2, 3]);
            });
        });

        describe('isRotatedVersion', () => {
            test('should detect rotated versions', () => {
                expect(isRotatedVersion([1, 2, 3, 4, 5], [3, 4, 5, 1, 2])).toBe(true);
                expect(isRotatedVersion([1, 2, 3, 4, 5], [1, 2, 3, 4, 5])).toBe(true);
                expect(isRotatedVersion([1, 2, 3], [2, 3, 1])).toBe(true);
                expect(isRotatedVersion([1, 2, 3], [3, 1, 2])).toBe(true);
            });

            test('should detect non-rotated versions', () => {
                expect(isRotatedVersion([1, 2, 3, 4, 5], [1, 2, 4, 3, 5])).toBe(false);
                expect(isRotatedVersion([1, 2, 3], [1, 3, 2])).toBe(false);
                expect(isRotatedVersion([1, 2, 3, 4], [1, 2, 3])).toBe(false);
            });

            test('should handle edge cases', () => {
                expect(isRotatedVersion([], [])).toBe(true);
                expect(isRotatedVersion([1], [1])).toBe(true);
                expect(isRotatedVersion([1], [2])).toBe(false);
                expect(isRotatedVersion(null, null)).toBe(false);
            });
        });

        describe('findMinRotationToSort', () => {
            test('should find minimum rotations to sort', () => {
                expect(findMinRotationToSort([3, 4, 5, 1, 2])).toBe(3);
                expect(findMinRotationToSort([4, 5, 6, 7, 0, 1, 2])).toBe(4);
                expect(findMinRotationToSort([1, 2, 3, 4, 5])).toBe(0);
            });

            test('should handle edge cases', () => {
                expect(findMinRotationToSort([])).toBe(0);
                expect(findMinRotationToSort([1])).toBe(0);
                expect(findMinRotationToSort([2, 1])).toBe(1);
            });
        });

        describe('visualizeRotation', () => {
            test('should provide step-by-step visualization', () => {
                const steps = visualizeRotation([1, 2, 3, 4, 5], 2);
                expect(steps).toContain('Original: [1, 2, 3, 4, 5]');
                expect(steps).toContain('Final:  [4, 5, 1, 2, 3]');
                expect(steps.length).toBeGreaterThan(3);
            });

            test('should handle no rotation needed', () => {
                const steps = visualizeRotation([1, 2, 3], 0);
                expect(steps).toContain('No rotation needed (k = 0)');
            });

            test('should handle edge cases', () => {
                expect(visualizeRotation([], 1)).toEqual([]);
                expect(visualizeRotation(null, 1)).toEqual([]);
            });
        });
    });

    describe('Performance Tests', () => {
        test('should handle large arrays efficiently', () => {
            const largeArray = new Array(10000).fill(0).map((_, i) => i);
            const original = [...largeArray];

            const startTime = performance.now();
            rotate(largeArray, 1000);
            const endTime = performance.now();

            expect(endTime - startTime).toBeLessThan(100); // Should be fast
            expect(largeArray.length).toBe(original.length);
            expect(largeArray).not.toEqual(original);
        });

        test('should handle worst-case scenarios', () => {
            // Worst case: large k value
            const nums = new Array(1000).fill(0).map((_, i) => i);

            const startTime = performance.now();
            rotate(nums, 999999);
            const endTime = performance.now();

            expect(endTime - startTime).toBeLessThan(50);
        });
    });

    describe('Algorithm Consistency', () => {
        test('all implementations should produce same results', () => {
            const testCases = [
                { nums: [1, 2, 3, 4, 5, 6, 7], k: 3 },
                { nums: [1, 2], k: 1 },
                { nums: [1], k: 1 },
                { nums: [1, 2, 3], k: 4 },
                { nums: [-1, -100, 3, 99], k: 2 }
            ];

            testCases.forEach(({ nums, k }) => {
                const results = implementations.map(({ func }) => {
                    const copy = [...nums];
                    func(copy, k);
                    return copy;
                });

                // All implementations should agree
                const firstResult = results[0];
                expect(results.every(result =>
                    JSON.stringify(result) === JSON.stringify(firstResult)
                )).toBe(true);
            });
        });
    });
});