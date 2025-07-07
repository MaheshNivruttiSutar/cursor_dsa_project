const { maxProfit, maxProfitBruteForce, maxProfitWithDays } = require('./bestTimeToBuyAndSellStock');

describe('Best Time to Buy and Sell Stock', () => {
    describe('maxProfit (Optimized)', () => {
        test('should return maximum profit from buying and selling stock', () => {
            const prices = [7, 1, 5, 3, 6, 4];
            const result = maxProfit(prices);

            expect(result).toBe(5); // Buy at 1, sell at 6
        });

        test('should return 0 when no profit can be made', () => {
            const prices = [7, 6, 4, 3, 1];
            const result = maxProfit(prices);

            expect(result).toBe(0);
        });

        test('should handle single element array', () => {
            const prices = [5];
            const result = maxProfit(prices);

            expect(result).toBe(0);
        });

        test('should handle empty array', () => {
            const prices = [];
            const result = maxProfit(prices);

            expect(result).toBe(0);
        });

        test('should handle two elements', () => {
            expect(maxProfit([1, 2])).toBe(1);
            expect(maxProfit([2, 1])).toBe(0);
        });

        test('should handle ascending prices', () => {
            const prices = [1, 2, 3, 4, 5];
            const result = maxProfit(prices);

            expect(result).toBe(4); // Buy at 1, sell at 5
        });

        test('should handle descending prices', () => {
            const prices = [5, 4, 3, 2, 1];
            const result = maxProfit(prices);

            expect(result).toBe(0);
        });

        test('should handle prices with multiple peaks', () => {
            const prices = [3, 2, 6, 5, 0, 3];
            const result = maxProfit(prices);

            expect(result).toBe(4); // Buy at 2, sell at 6
        });

        test('should handle large numbers', () => {
            const prices = [10000, 1, 50000, 25000, 60000];
            const result = maxProfit(prices);

            expect(result).toBe(59999); // Buy at 1, sell at 60000
        });
    });

    describe('maxProfitBruteForce', () => {
        test('should return maximum profit - brute force', () => {
            const prices = [7, 1, 5, 3, 6, 4];
            const result = maxProfitBruteForce(prices);

            expect(result).toBe(5);
        });

        test('should return 0 when no profit can be made - brute force', () => {
            const prices = [7, 6, 4, 3, 1];
            const result = maxProfitBruteForce(prices);

            expect(result).toBe(0);
        });

        test('should handle two elements - brute force', () => {
            expect(maxProfitBruteForce([1, 2])).toBe(1);
            expect(maxProfitBruteForce([2, 1])).toBe(0);
        });
    });

    describe('maxProfitWithDays', () => {
        test('should return profit with buy and sell days', () => {
            const prices = [7, 1, 5, 3, 6, 4];
            const result = maxProfitWithDays(prices);

            expect(result).toEqual({
                maxProfit: 5,
                buyDay: 1,
                sellDay: 4
            });
        });

        test('should return -1 for days when no profit', () => {
            const prices = [7, 6, 4, 3, 1];
            const result = maxProfitWithDays(prices);

            expect(result).toEqual({
                maxProfit: 0,
                buyDay: -1,
                sellDay: -1
            });
        });

        test('should handle single element', () => {
            const prices = [5];
            const result = maxProfitWithDays(prices);

            expect(result).toEqual({
                maxProfit: 0,
                buyDay: -1,
                sellDay: -1
            });
        });

        test('should find correct buy and sell days for multiple scenarios', () => {
            const prices = [3, 2, 6, 5, 0, 3];
            const result = maxProfitWithDays(prices);

            expect(result).toEqual({
                maxProfit: 4,
                buyDay: 1,
                sellDay: 2
            });
        });
    });

    describe('Comparison between approaches', () => {
        test('both approaches should give same results', () => {
            const testCases = [
                [7, 1, 5, 3, 6, 4],
                [7, 6, 4, 3, 1],
                [1, 2, 3, 4, 5],
                [5, 4, 3, 2, 1],
                [3, 2, 6, 5, 0, 3],
                [1, 2],
                [2, 1],
                [5]
            ];

            testCases.forEach(prices => {
                const optimized = maxProfit(prices);
                const bruteForce = maxProfitBruteForce(prices);
                const withDays = maxProfitWithDays(prices);

                expect(optimized).toBe(bruteForce);
                expect(optimized).toBe(withDays.maxProfit);
            });
        });
    });
});