const { maxSubArray, maxSubArrayWithIndices } = require('./maxSubarray');

describe('Maximum Subarray', () => {
    describe('Basic maxSubArray function', () => {
        test('should find maximum subarray sum - example 1', () => {
            expect(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])).toBe(6);
        });

        test('should find maximum subarray sum - example 2', () => {
            expect(maxSubArray([1])).toBe(1);
        });

        test('should find maximum subarray sum - example 3', () => {
            expect(maxSubArray([5, 4, -1, 7, 8])).toBe(23);
        });

        test('should handle all negative numbers', () => {
            expect(maxSubArray([-2, -3, -1, -5])).toBe(-1);
        });

        test('should handle mixed positive and negative', () => {
            expect(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])).toBe(6);
        });

        test('should handle single negative number', () => {
            expect(maxSubArray([-1])).toBe(-1);
        });
    });

    describe('maxSubArrayWithIndices function', () => {
        test('should return correct sum and indices', () => {
            const result = maxSubArrayWithIndices([-2, 1, -3, 4, -1, 2, 1, -5, 4]);
            expect(result.maxSum).toBe(6);
            expect(result.start).toBe(3);
            expect(result.end).toBe(6);
            expect(result.subarray).toEqual([4, -1, 2, 1]);
        });

        test('should handle single element', () => {
            const result = maxSubArrayWithIndices([5]);
            expect(result.maxSum).toBe(5);
            expect(result.start).toBe(0);
            expect(result.end).toBe(0);
            expect(result.subarray).toEqual([5]);
        });

        test('should handle all positive numbers', () => {
            const result = maxSubArrayWithIndices([1, 2, 3, 4, 5]);
            expect(result.maxSum).toBe(15);
            expect(result.start).toBe(0);
            expect(result.end).toBe(4);
            expect(result.subarray).toEqual([1, 2, 3, 4, 5]);
        });
    });
});