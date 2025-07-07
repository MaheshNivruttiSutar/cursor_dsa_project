const twoSum = require('./twoSum');

describe('Two Sum', () => {
    test('should return indices of two numbers that add up to target', () => {
        expect(twoSum([2, 7, 11, 15], 9)).toEqual([0, 1]);
        expect(twoSum([3, 2, 4], 6)).toEqual([1, 2]);
        expect(twoSum([3, 3], 6)).toEqual([0, 1]);
    });

    test('should return empty array when no solution exists', () => {
        expect(twoSum([1, 2, 3], 10)).toEqual([]);
    });

    test('should handle negative numbers', () => {
        expect(twoSum([-1, -2, -3, -4, -5], -8)).toEqual([2, 4]);
    });

    test('should handle single element array', () => {
        expect(twoSum([5], 5)).toEqual([]);
    });

    test('should handle empty array', () => {
        expect(twoSum([], 0)).toEqual([]);
    });
});