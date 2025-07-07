const { climbStairs, climbStairsDP, climbStairsRecursive, climbStairsNaive } = require('./climbingStairs');

describe('Climbing Stairs', () => {
    const testCases = [
        { input: 1, expected: 1, description: 'one step' },
        { input: 2, expected: 2, description: 'two steps' },
        { input: 3, expected: 3, description: 'three steps' },
        { input: 4, expected: 5, description: 'four steps' },
        { input: 5, expected: 8, description: 'five steps' },
        { input: 6, expected: 13, description: 'six steps' },
        { input: 10, expected: 89, description: 'ten steps' },
        { input: 20, expected: 10946, description: 'twenty steps' }
    ];

    describe('Optimized iterative approach', () => {
        testCases.forEach(({ input, expected, description }) => {
            test(`should return ${expected} for ${description}`, () => {
                expect(climbStairs(input)).toBe(expected);
            });
        });
    });

    describe('Dynamic programming approach', () => {
        testCases.forEach(({ input, expected, description }) => {
            test(`should return ${expected} for ${description}`, () => {
                expect(climbStairsDP(input)).toBe(expected);
            });
        });
    });

    describe('Recursive with memoization approach', () => {
        testCases.forEach(({ input, expected, description }) => {
            test(`should return ${expected} for ${description}`, () => {
                expect(climbStairsRecursive(input)).toBe(expected);
            });
        });
    });

    describe('Naive recursive approach (small inputs only)', () => {
        const smallTestCases = testCases.filter(({ input }) => input <= 10);

        smallTestCases.forEach(({ input, expected, description }) => {
            test(`should return ${expected} for ${description}`, () => {
                expect(climbStairsNaive(input)).toBe(expected);
            });
        });
    });

    describe('Performance comparison', () => {
        test('all approaches should give same results for small inputs', () => {
            for (let n = 1; n <= 10; n++) {
                const result1 = climbStairs(n);
                const result2 = climbStairsDP(n);
                const result3 = climbStairsRecursive(n);
                const result4 = climbStairsNaive(n);

                expect(result1).toBe(result2);
                expect(result2).toBe(result3);
                expect(result3).toBe(result4);
            }
        });
    });
});