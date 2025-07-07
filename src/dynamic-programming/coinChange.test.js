const {
    coinChange,
    coinChangeBFS,
    coinChangeMemo,
    coinChangeGreedy,
    coinChangeWithCoins,
    coinChangeWays,
    isCanonicalCoinSystem,
    coinChangeExplanation
} = require('./coinChange');

describe('Coin Change', () => {
    describe('coinChange (Dynamic Programming)', () => {
        test('should return 2 for coins [1,3,4] and amount 6', () => {
            expect(coinChange([1,3,4], 6)).toBe(2);
        });

        test('should return -1 for coins [2] and amount 3', () => {
            expect(coinChange([2], 3)).toBe(-1);
        });

        test('should return 0 for amount 0', () => {
            expect(coinChange([1], 0)).toBe(0);
            expect(coinChange([1,2,5], 0)).toBe(0);
        });

        test('should return -1 for empty coins array', () => {
            expect(coinChange([], 5)).toBe(-1);
            expect(coinChange(null, 5)).toBe(-1);
        });

        test('should handle standard US coins', () => {
            expect(coinChange([1,5,10,25], 30)).toBe(2); // 25 + 5
            expect(coinChange([1,5,10,25], 67)).toBe(6); // 25+25+10+5+1+1
        });

        test('should handle large amounts', () => {
            expect(coinChange([1,5,10,25], 100)).toBe(4); // 25+25+25+25
        });

        test('should handle single coin', () => {
            expect(coinChange([1], 10)).toBe(10);
            expect(coinChange([5], 10)).toBe(2);
            expect(coinChange([3], 10)).toBe(-1);
        });

        test('should handle coins larger than amount', () => {
            expect(coinChange([5,10,25], 3)).toBe(-1);
        });

        test('should handle duplicate coins', () => {
            expect(coinChange([1,1,1], 3)).toBe(3);
        });
    });

    describe('coinChangeBFS (Breadth-First Search)', () => {
        test('should return 2 for coins [1,3,4] and amount 6', () => {
            expect(coinChangeBFS([1,3,4], 6)).toBe(2);
        });

        test('should return -1 for coins [2] and amount 3', () => {
            expect(coinChangeBFS([2], 3)).toBe(-1);
        });

        test('should return 0 for amount 0', () => {
            expect(coinChangeBFS([1], 0)).toBe(0);
        });

        test('should handle standard cases', () => {
            expect(coinChangeBFS([1,5,10,25], 30)).toBe(2);
            expect(coinChangeBFS([1,5,10,25], 67)).toBe(6);
        });

        test('should handle edge cases', () => {
            expect(coinChangeBFS([], 5)).toBe(-1);
            expect(coinChangeBFS([5], 3)).toBe(-1);
        });
    });

    describe('coinChangeMemo (Recursive with Memoization)', () => {
        test('should return 2 for coins [1,3,4] and amount 6', () => {
            expect(coinChangeMemo([1,3,4], 6)).toBe(2);
        });

        test('should return -1 for coins [2] and amount 3', () => {
            expect(coinChangeMemo([2], 3)).toBe(-1);
        });

        test('should return 0 for amount 0', () => {
            expect(coinChangeMemo([1], 0)).toBe(0);
        });

        test('should handle complex cases', () => {
            expect(coinChangeMemo([1,3,4], 6)).toBe(2);
            expect(coinChangeMemo([2,3,5], 9)).toBe(3);
        });

        test('should handle large amounts efficiently', () => {
            expect(coinChangeMemo([1,5,10,25], 100)).toBe(4);
        });
    });

    describe('coinChangeGreedy (Greedy - works for canonical coin systems)', () => {
        test('should work for standard US coins', () => {
            expect(coinChangeGreedy([1,5,10,25], 30)).toBe(2);
            expect(coinChangeGreedy([1,5,10,25], 67)).toBe(6);
        });

        test('should return 0 for amount 0', () => {
            expect(coinChangeGreedy([1,5,10,25], 0)).toBe(0);
        });

        test('should return -1 for impossible amounts', () => {
            expect(coinChangeGreedy([5,10], 3)).toBe(-1);
        });

        test('should fail for non-canonical coin systems', () => {
            // For coins [1,3,4] and amount 6, greedy would give 3 coins (4+1+1)
            // but optimal is 2 coins (3+3)
            expect(coinChangeGreedy([1,3,4], 6)).toBe(3); // suboptimal
        });
    });

    describe('coinChangeWithCoins (Returns actual coins used)', () => {
        test('should return coins and count for [1,3,4] and amount 6', () => {
            const result = coinChangeWithCoins([1,3,4], 6);
            expect(result.minCoins).toBe(2);
            expect(result.coinsUsed).toEqual([3,3]);
        });

        test('should return -1 and empty array for impossible case', () => {
            const result = coinChangeWithCoins([2], 3);
            expect(result.minCoins).toBe(-1);
            expect(result.coinsUsed).toEqual([]);
        });

        test('should return empty array for amount 0', () => {
            const result = coinChangeWithCoins([1,5,10,25], 0);
            expect(result.minCoins).toBe(0);
            expect(result.coinsUsed).toEqual([]);
        });

        test('should handle standard US coins', () => {
            const result = coinChangeWithCoins([1,5,10,25], 30);
            expect(result.minCoins).toBe(2);
            expect(result.coinsUsed.sort((a,b) => a - b)).toEqual([5,25]);
        });

        test('should handle single coin solutions', () => {
            const result = coinChangeWithCoins([1,5,10,25], 25);
            expect(result.minCoins).toBe(1);
            expect(result.coinsUsed).toEqual([25]);
        });
    });

    describe('coinChangeWays (Count all possible ways)', () => {
        test('should return 1 for amount 0', () => {
            expect(coinChangeWays([1,2,5], 0)).toBe(1);
        });

        test('should return 0 for empty coins', () => {
            expect(coinChangeWays([], 5)).toBe(0);
        });

        test('should count ways for [1,2,5] and amount 5', () => {
            expect(coinChangeWays([1,2,5], 5)).toBe(4);
            // Ways: [5], [2,2,1], [2,1,1,1], [1,1,1,1,1]
        });

        test('should count ways for [2,3,5] and amount 9', () => {
            expect(coinChangeWays([2,3,5], 9)).toBe(3);
            // Ways: [3,3,3], [2,2,2,3], [2,2,5]
        });

        test('should handle single coin', () => {
            expect(coinChangeWays([2], 4)).toBe(1);
            expect(coinChangeWays([2], 3)).toBe(0);
        });

        test('should handle large amounts', () => {
            expect(coinChangeWays([1,2,5], 10)).toBeGreaterThan(0);
        });
    });

    describe('isCanonicalCoinSystem (Check if greedy works)', () => {
        test('should return true for standard US coins', () => {
            expect(isCanonicalCoinSystem([1,5,10,25])).toBe(true);
        });

        test('should return false for non-canonical systems', () => {
            expect(isCanonicalCoinSystem([1,3,4])).toBe(false);
        });

        test('should handle single coin', () => {
            expect(isCanonicalCoinSystem([1])).toBe(true);
        });

        test('should handle empty array', () => {
            expect(isCanonicalCoinSystem([])).toBe(true);
        });
    });

    describe('coinChangeExplanation (Step-by-step solution)', () => {
        test('should provide steps for [1,3,4] and amount 6', () => {
            const result = coinChangeExplanation([1,3,4], 6);
            expect(result.result).toBe(2);
            expect(result.steps).toBeInstanceOf(Array);
            expect(result.steps.length).toBeGreaterThan(0);
        });

        test('should handle amount 0', () => {
            const result = coinChangeExplanation([1,2,5], 0);
            expect(result.result).toBe(0);
            expect(result.steps).toContain('Amount is 0, no coins needed');
        });

        test('should handle empty coins', () => {
            const result = coinChangeExplanation([], 5);
            expect(result.result).toBe(-1);
            expect(result.steps).toContain('No coins available');
        });

        test('should provide detailed steps', () => {
            const result = coinChangeExplanation([1,2], 3);
            expect(result.result).toBe(2);
            expect(result.steps.some(step => step.includes('dp['))).toBe(true);
        });
    });

    describe('All approaches comparison', () => {
        test('all approaches should give same result for basic cases', () => {
            const testCases = [
                { coins: [1,3,4], amount: 6 },
                { coins: [2], amount: 3 },
                { coins: [1], amount: 0 },
                { coins: [1,5,10,25], amount: 30 },
                { coins: [1,2,5], amount: 11 }
            ];

            testCases.forEach(({ coins, amount }) => {
                const result1 = coinChange(coins, amount);
                const result2 = coinChangeBFS(coins, amount);
                const result3 = coinChangeMemo(coins, amount);
                const result4 = coinChangeWithCoins(coins, amount).minCoins;

                expect(result1).toBe(result2);
                expect(result2).toBe(result3);
                expect(result3).toBe(result4);
            });
        });

        test('DP and BFS should match for complex cases', () => {
            const testCases = [
                { coins: [1,3,7,9], amount: 15 },
                { coins: [2,3,5,7], amount: 13 },
                { coins: [1,4,6,8], amount: 11 }
            ];

            testCases.forEach(({ coins, amount }) => {
                const dpResult = coinChange(coins, amount);
                const bfsResult = coinChangeBFS(coins, amount);
                const memoResult = coinChangeMemo(coins, amount);

                expect(dpResult).toBe(bfsResult);
                expect(bfsResult).toBe(memoResult);
            });
        });
    });

    describe('Performance and edge cases', () => {
        test('should handle large amounts efficiently', () => {
            const largeAmount = 1000;
            const coins = [1,5,10,25,50,100];

            expect(() => coinChange(coins, largeAmount)).not.toThrow();
            expect(() => coinChangeBFS(coins, largeAmount)).not.toThrow();
            expect(() => coinChangeMemo(coins, largeAmount)).not.toThrow();
        });

        test('should handle many coins efficiently', () => {
            const manyCoins = Array.from({length: 20}, (_, i) => i + 1);
            const amount = 50;

            expect(() => coinChange(manyCoins, amount)).not.toThrow();
            expect(() => coinChangeMemo(manyCoins, amount)).not.toThrow();
        });

        test('should handle duplicate coins correctly', () => {
            const duplicateCoins = [1,1,2,2,5,5];
            const amount = 8;

            const result1 = coinChange(duplicateCoins, amount);
            const result2 = coinChange([1,2,5], amount);

            expect(result1).toBe(result2);
        });

        test('should handle maximum coin value', () => {
            const maxCoins = [1, 1000000];
            const amount = 2000000;

            expect(coinChange(maxCoins, amount)).toBe(2);
        });

        test('should handle unsorted coins', () => {
            const unsortedCoins = [25,1,10,5];
            const amount = 30;

            expect(coinChange(unsortedCoins, amount)).toBe(2);
        });
    });
});
