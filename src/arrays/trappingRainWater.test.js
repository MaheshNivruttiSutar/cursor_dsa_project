const { trap, trapDP, trapStack, trapBruteForce, visualizeTrap, getTrappedWaterBreakdown } = require('./trappingRainWater');

describe('Trapping Rain Water', () => {
    describe('trap (Two Pointers - Optimal)', () => {
        test('should return 6 for [0,1,0,2,1,0,1,3,2,1,2,1]', () => {
            expect(trap([0,1,0,2,1,0,1,3,2,1,2,1])).toBe(6);
        });

        test('should return 9 for [4,2,0,3,2,5]', () => {
            expect(trap([4,2,0,3,2,5])).toBe(9);
        });

        test('should return 0 for empty array', () => {
            expect(trap([])).toBe(0);
            expect(trap(null)).toBe(0);
            expect(trap(undefined)).toBe(0);
        });

        test('should return 0 for array with less than 3 elements', () => {
            expect(trap([1])).toBe(0);
            expect(trap([1, 2])).toBe(0);
        });

        test('should return 0 for non-decreasing array', () => {
            expect(trap([1,2,3,4,5])).toBe(0);
        });

        test('should return 0 for non-increasing array', () => {
            expect(trap([5,4,3,2,1])).toBe(0);
        });

        test('should handle simple valley', () => {
            expect(trap([3,0,2])).toBe(2);
            expect(trap([2,0,3])).toBe(2);
        });

        test('should handle multiple valleys', () => {
            expect(trap([3,0,2,0,4])).toBe(7);
        });

        test('should handle flat bottom', () => {
            expect(trap([3,0,0,0,3])).toBe(9);
        });

        test('should handle single peak', () => {
            expect(trap([0,1,0])).toBe(0);
        });

        test('should handle complex case', () => {
            expect(trap([5,2,7,4,1,3,6,8])).toBe(17);
        });
    });

    describe('trapDP (Dynamic Programming)', () => {
        test('should return 6 for [0,1,0,2,1,0,1,3,2,1,2,1]', () => {
            expect(trapDP([0,1,0,2,1,0,1,3,2,1,2,1])).toBe(6);
        });

        test('should return 9 for [4,2,0,3,2,5]', () => {
            expect(trapDP([4,2,0,3,2,5])).toBe(9);
        });

        test('should handle edge cases', () => {
            expect(trapDP([])).toBe(0);
            expect(trapDP([1])).toBe(0);
            expect(trapDP([1,2])).toBe(0);
        });

        test('should handle valley patterns', () => {
            expect(trapDP([3,0,2])).toBe(2);
            expect(trapDP([3,0,0,0,3])).toBe(9);
        });

        test('should handle large arrays', () => {
            const largeArray = Array(1000).fill(0).map((_, i) => i % 10);
            expect(trapDP(largeArray)).toBeGreaterThanOrEqual(0);
        });
    });

    describe('trapStack (Stack-based)', () => {
        test('should return 6 for [0,1,0,2,1,0,1,3,2,1,2,1]', () => {
            expect(trapStack([0,1,0,2,1,0,1,3,2,1,2,1])).toBe(6);
        });

        test('should return 9 for [4,2,0,3,2,5]', () => {
            expect(trapStack([4,2,0,3,2,5])).toBe(9);
        });

        test('should handle edge cases', () => {
            expect(trapStack([])).toBe(0);
            expect(trapStack([1])).toBe(0);
            expect(trapStack([1,2])).toBe(0);
        });

        test('should handle step patterns', () => {
            expect(trapStack([1,2,3,2,1])).toBe(0);
            expect(trapStack([3,2,1,2,3])).toBe(4);
        });

        test('should handle alternating pattern', () => {
            expect(trapStack([1,0,1,0,1])).toBe(2);
        });
    });

    describe('trapBruteForce (Brute Force)', () => {
        test('should return 6 for [0,1,0,2,1,0,1,3,2,1,2,1]', () => {
            expect(trapBruteForce([0,1,0,2,1,0,1,3,2,1,2,1])).toBe(6);
        });

        test('should return 9 for [4,2,0,3,2,5]', () => {
            expect(trapBruteForce([4,2,0,3,2,5])).toBe(9);
        });

        test('should handle small arrays', () => {
            expect(trapBruteForce([3,0,2])).toBe(2);
            expect(trapBruteForce([2,0,3])).toBe(2);
        });

        test('should handle edge cases', () => {
            expect(trapBruteForce([])).toBe(0);
            expect(trapBruteForce([1])).toBe(0);
            expect(trapBruteForce([1,2])).toBe(0);
        });
    });

    describe('visualizeTrap (Visualization)', () => {
        test('should return empty string for empty array', () => {
            expect(visualizeTrap([])).toBe('');
        });

        test('should create ASCII visualization', () => {
            const result = visualizeTrap([3,0,2]);
            expect(result).toContain('█');
            expect(result.length).toBeGreaterThan(0);
        });

        test('should show water with ~ character', () => {
            const result = visualizeTrap([3,0,2]);
            expect(result).toContain('~');
        });

        test('should handle single element', () => {
            const result = visualizeTrap([5]);
            expect(result).toBe('█\n█\n█\n█\n█');
        });

        test('should handle flat array', () => {
            const result = visualizeTrap([2,2,2]);
            expect(result).toBe('███\n███');
        });
    });

    describe('getTrappedWaterBreakdown (Analysis)', () => {
        test('should return correct breakdown for [0,1,0,2,1,0,1,3,2,1,2,1]', () => {
            const result = getTrappedWaterBreakdown([0,1,0,2,1,0,1,3,2,1,2,1]);
            expect(result.total).toBe(6);
            expect(result.breakdown).toHaveLength(12);
            expect(result.waterAtPosition).toHaveLength(12);
        });

        test('should return correct breakdown for [4,2,0,3,2,5]', () => {
            const result = getTrappedWaterBreakdown([4,2,0,3,2,5]);
            expect(result.total).toBe(9);
            expect(result.breakdown).toHaveLength(6);
            expect(result.waterAtPosition).toEqual([0,2,4,1,2,0]);
        });

        test('should handle edge cases', () => {
            const result = getTrappedWaterBreakdown([]);
            expect(result.total).toBe(0);
            expect(result.breakdown).toHaveLength(0);
            expect(result.waterAtPosition).toHaveLength(0);
        });

        test('should provide detailed position analysis', () => {
            const result = getTrappedWaterBreakdown([3,0,2]);
            expect(result.breakdown[1]).toEqual({
                position: 1,
                height: 0,
                leftMax: 3,
                rightMax: 2,
                waterLevel: 2,
                trappedWater: 2
            });
        });

        test('should handle no trapped water case', () => {
            const result = getTrappedWaterBreakdown([1,2,3,4,5]);
            expect(result.total).toBe(0);
            expect(result.waterAtPosition.every(water => water === 0)).toBe(true);
        });
    });

    describe('All approaches comparison', () => {
        test('all approaches should give same result for various test cases', () => {
            const testCases = [
                [0,1,0,2,1,0,1,3,2,1,2,1],
                [4,2,0,3,2,5],
                [3,0,2],
                [2,0,3],
                [5,2,7,4,1,3,6,8],
                [1,2,3,4,5],
                [5,4,3,2,1],
                [3,0,0,0,3],
                [1,0,1,0,1],
                [0,0,0,0,0]
            ];

            testCases.forEach(testCase => {
                const result1 = trap(testCase.slice());
                const result2 = trapDP(testCase.slice());
                const result3 = trapStack(testCase.slice());
                const result4 = trapBruteForce(testCase.slice());

                expect(result1).toBe(result2);
                expect(result2).toBe(result3);
                expect(result3).toBe(result4);
            });
        });
    });

    describe('Performance and edge cases', () => {
        test('should handle very large arrays efficiently', () => {
            // Create a large array with pattern
            const largeArray = Array(10000).fill(0).map((_, i) => {
                if (i % 100 === 0) return 50;
                if (i % 50 === 0) return 25;
                return Math.floor(Math.random() * 10);
            });

            expect(() => trap(largeArray)).not.toThrow();
            expect(() => trapDP(largeArray)).not.toThrow();
            expect(() => trapStack(largeArray)).not.toThrow();
        });

        test('should handle maximum height values', () => {
            const maxHeights = [10000, 0, 10000];
            expect(trap(maxHeights)).toBe(10000);
            expect(trapDP(maxHeights)).toBe(10000);
            expect(trapStack(maxHeights)).toBe(10000);
        });

        test('should handle all zero array', () => {
            const zeros = Array(100).fill(0);
            expect(trap(zeros)).toBe(0);
            expect(trapDP(zeros)).toBe(0);
            expect(trapStack(zeros)).toBe(0);
        });

        test('should handle perfect bowl shape', () => {
            const bowl = [5,4,3,2,1,0,1,2,3,4,5];
            const result = trap(bowl);
            expect(result).toBe(25);
            expect(trapDP(bowl.slice())).toBe(result);
            expect(trapStack(bowl.slice())).toBe(result);
        });
    });
});