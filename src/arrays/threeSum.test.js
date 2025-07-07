const { threeSum, threeSumBruteForce } = require('./threeSum');

describe('3Sum', () => {
    describe('threeSum (Optimized)', () => {
        test('should find all triplets that sum to zero', () => {
            const nums = [-1, 0, 1, 2, -1, -4];
            const result = threeSum(nums);

            expect(result).toHaveLength(2);
            expect(result).toContainEqual([-1, -1, 2]);
            expect(result).toContainEqual([-1, 0, 1]);
        });

        test('should return empty array when no triplets sum to zero', () => {
            const nums = [0, 1, 1];
            const result = threeSum(nums);

            expect(result).toEqual([]);
        });

        test('should handle all zeros', () => {
            const nums = [0, 0, 0];
            const result = threeSum(nums);

            expect(result).toEqual([[0, 0, 0]]);
        });

        test('should handle array with less than 3 elements', () => {
            expect(threeSum([1, 2])).toEqual([]);
            expect(threeSum([1])).toEqual([]);
            expect(threeSum([])).toEqual([]);
        });

        test('should handle negative numbers', () => {
            const nums = [-2, 0, 1, 1, 2];
            const result = threeSum(nums);

            expect(result).toContainEqual([-2, 0, 2]);
            expect(result).toContainEqual([-2, 1, 1]);
        });

        test('should handle duplicates correctly', () => {
            const nums = [-1, 0, 1, 2, -1, -4, -2, -3, 3, 0, 4];
            const result = threeSum(nums);

            // Check that we don't have duplicate triplets
            const uniqueTriplets = new Set(result.map(triplet => triplet.sort().join(',')));
            expect(uniqueTriplets.size).toBe(result.length);
        });

        test('should handle large array', () => {
            const nums = Array.from({length: 1000}, (_, i) => i - 500);
            const result = threeSum(nums);

            expect(Array.isArray(result)).toBe(true);
            // Each result should be a triplet that sums to 0
            result.forEach(triplet => {
                expect(triplet.length).toBe(3);
                expect(triplet[0] + triplet[1] + triplet[2]).toBe(0);
            });
        });
    });

    describe('threeSumBruteForce', () => {
        test('should find all triplets that sum to zero - brute force', () => {
            const nums = [-1, 0, 1, 2, -1, -4];
            const result = threeSumBruteForce(nums);

            expect(result).toHaveLength(2);
            expect(result).toContainEqual([-1, -1, 2]);
            expect(result).toContainEqual([-1, 0, 1]);
        });

        test('should return empty array when no triplets sum to zero - brute force', () => {
            const nums = [0, 1, 1];
            const result = threeSumBruteForce(nums);

            expect(result).toEqual([]);
        });

        test('should handle all zeros - brute force', () => {
            const nums = [0, 0, 0];
            const result = threeSumBruteForce(nums);

            expect(result).toEqual([[0, 0, 0]]);
        });
    });

    describe('Comparison between approaches', () => {
        test('both approaches should give same results', () => {
            const testCases = [
                [-1, 0, 1, 2, -1, -4],
                [0, 1, 1],
                [0, 0, 0],
                [-2, 0, 1, 1, 2],
                [3, 0, -2, -1, 1, 2]
            ];

            testCases.forEach(nums => {
                const optimized = threeSum(nums);
                const bruteForce = threeSumBruteForce(nums);

                // Sort both results for comparison
                const sortedOptimized = optimized.map(triplet => triplet.sort()).sort();
                const sortedBruteForce = bruteForce.map(triplet => triplet.sort()).sort();

                expect(sortedOptimized).toEqual(sortedBruteForce);
            });
        });
    });
});