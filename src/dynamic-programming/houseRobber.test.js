const {
    rob,
    robOptimized,
    robRecursive,
    robWithDecisions,
    isValidRobberyPlan,
    calculateRobberyAmount,
    findAllValidPlans,
    analyzeRobberyPatterns,
    visualizeRobberyDecision
} = require('./houseRobber');

describe('House Robber', () => {
    describe('rob (Dynamic Programming)', () => {
        test('should handle empty array', () => {
            expect(rob([])).toBe(0);
            expect(rob(null)).toBe(0);
            expect(rob(undefined)).toBe(0);
        });

        test('should handle single house', () => {
            expect(rob([5])).toBe(5);
            expect(rob([100])).toBe(100);
        });

        test('should handle two houses', () => {
            expect(rob([2, 7])).toBe(7);
            expect(rob([5, 1])).toBe(5);
            expect(rob([1, 1])).toBe(1);
        });

        test('should handle classic examples', () => {
            expect(rob([1, 2, 3, 1])).toBe(4); // Rob house 0 and 2
            expect(rob([2, 7, 9, 3, 1])).toBe(12); // Rob house 0, 2, and 4
            expect(rob([2, 1, 1, 2])).toBe(4); // Rob house 0 and 3
        });

        test('should handle increasing sequences', () => {
            expect(rob([1, 2, 3, 4, 5])).toBe(9); // Rob house 1, 3 (2 + 4) or 0, 2, 4 (1 + 3 + 5)
            expect(rob([5, 4, 3, 2, 1])).toBe(9); // Rob house 0, 2, 4 (5 + 3 + 1)
        });

        test('should handle large amounts', () => {
            expect(rob([100, 50, 200, 75, 150])).toBe(450); // Rob house 0, 2, 4
            expect(rob([1000, 999, 1000, 999, 1000])).toBe(3000); // Rob house 0, 2, 4
        });

        test('should handle alternating pattern', () => {
            expect(rob([10, 5, 10, 5, 10])).toBe(30); // Rob all odd-indexed houses
            expect(rob([5, 10, 5, 10, 5])).toBe(20); // Rob all even-indexed houses
        });

        test('should handle zero values', () => {
            expect(rob([0, 0, 0])).toBe(0);
            expect(rob([1, 0, 3])).toBe(4);
            expect(rob([0, 2, 0, 4])).toBe(6);
        });
    });

    describe('robOptimized (Space Optimized)', () => {
        test('should produce same results as basic approach', () => {
            const testCases = [
                [],
                [5],
                [2, 7],
                [1, 2, 3, 1],
                [2, 7, 9, 3, 1],
                [2, 1, 1, 2],
                [1, 2, 3, 4, 5],
                [5, 4, 3, 2, 1],
                [100, 50, 200, 75, 150],
                [10, 5, 10, 5, 10],
                [0, 0, 0],
                [1, 0, 3]
            ];

            testCases.forEach(houses => {
                expect(robOptimized(houses)).toBe(rob(houses));
            });
        });

        test('should handle edge cases', () => {
            expect(robOptimized([])).toBe(0);
            expect(robOptimized([1])).toBe(1);
            expect(robOptimized([1, 2])).toBe(2);
        });
    });

    describe('robRecursive (Recursive with Memoization)', () => {
        test('should produce same results as basic approach', () => {
            const testCases = [
                [],
                [5],
                [2, 7],
                [1, 2, 3, 1],
                [2, 7, 9, 3, 1],
                [2, 1, 1, 2],
                [1, 2, 3, 4, 5],
                [5, 4, 3, 2, 1]
            ];

            testCases.forEach(houses => {
                expect(robRecursive(houses)).toBe(rob(houses));
            });
        });

        test('should handle edge cases', () => {
            expect(robRecursive([])).toBe(0);
            expect(robRecursive([1])).toBe(1);
            expect(robRecursive([1, 2])).toBe(2);
        });
    });

    describe('robWithDecisions (Decision Tracking)', () => {
        test('should return correct amount and decisions', () => {
            const result1 = robWithDecisions([1, 2, 3, 1]);
            expect(result1.maxAmount).toBe(4);
            expect(result1.decisions).toEqual([0, 2]);

            const result2 = robWithDecisions([2, 7, 9, 3, 1]);
            expect(result2.maxAmount).toBe(12);
            expect(result2.decisions).toEqual([0, 2, 4]);

            const result3 = robWithDecisions([2, 1, 1, 2]);
            expect(result3.maxAmount).toBe(4);
            expect(result3.decisions).toEqual([0, 3]);
        });

        test('should handle edge cases', () => {
            expect(robWithDecisions([])).toEqual({ maxAmount: 0, decisions: [] });
            expect(robWithDecisions([5])).toEqual({ maxAmount: 5, decisions: [0] });
            expect(robWithDecisions([2, 7])).toEqual({ maxAmount: 7, decisions: [1] });
            expect(robWithDecisions([7, 2])).toEqual({ maxAmount: 7, decisions: [0] });
        });

        test('should provide valid decisions', () => {
            const testCases = [
                [1, 2, 3, 1],
                [2, 7, 9, 3, 1],
                [5, 4, 3, 2, 1],
                [10, 5, 10, 5, 10]
            ];

            testCases.forEach(houses => {
                const result = robWithDecisions(houses);
                expect(isValidRobberyPlan(houses, result.decisions)).toBe(true);
                expect(calculateRobberyAmount(houses, result.decisions)).toBe(result.maxAmount);
            });
        });
    });

    describe('isValidRobberyPlan (Validation)', () => {
        test('should validate correct plans', () => {
            expect(isValidRobberyPlan([1, 2, 3, 4], [])).toBe(true);
            expect(isValidRobberyPlan([1, 2, 3, 4], [0])).toBe(true);
            expect(isValidRobberyPlan([1, 2, 3, 4], [0, 2])).toBe(true);
            expect(isValidRobberyPlan([1, 2, 3, 4], [1, 3])).toBe(true);
            expect(isValidRobberyPlan([1, 2, 3, 4, 5], [0, 2, 4])).toBe(true);
        });

        test('should reject invalid plans', () => {
            expect(isValidRobberyPlan([1, 2, 3, 4], [0, 1])).toBe(false);
            expect(isValidRobberyPlan([1, 2, 3, 4], [1, 2])).toBe(false);
            expect(isValidRobberyPlan([1, 2, 3, 4], [2, 3])).toBe(false);
            expect(isValidRobberyPlan([1, 2, 3, 4], [0, 1, 2])).toBe(false);
        });

        test('should handle out of bounds indices', () => {
            expect(isValidRobberyPlan([1, 2, 3], [0, 4])).toBe(false);
            expect(isValidRobberyPlan([1, 2, 3], [-1, 2])).toBe(false);
            expect(isValidRobberyPlan([1, 2, 3], [0, 1, 5])).toBe(false);
        });

        test('should handle unsorted plans', () => {
            expect(isValidRobberyPlan([1, 2, 3, 4, 5], [4, 2, 0])).toBe(true);
            expect(isValidRobberyPlan([1, 2, 3, 4, 5], [4, 3, 0])).toBe(false);
        });
    });

    describe('calculateRobberyAmount (Amount Calculation)', () => {
        test('should calculate correct amounts', () => {
            expect(calculateRobberyAmount([1, 2, 3, 4], [])).toBe(0);
            expect(calculateRobberyAmount([1, 2, 3, 4], [0])).toBe(1);
            expect(calculateRobberyAmount([1, 2, 3, 4], [0, 2])).toBe(4);
            expect(calculateRobberyAmount([1, 2, 3, 4], [1, 3])).toBe(6);
            expect(calculateRobberyAmount([5, 10, 15, 20], [0, 2])).toBe(20);
        });

        test('should handle edge cases', () => {
            expect(calculateRobberyAmount([], [])).toBe(0);
            expect(calculateRobberyAmount([5], [0])).toBe(5);
            expect(calculateRobberyAmount([1, 2], [1])).toBe(2);
        });
    });

    describe('findAllValidPlans (All Plans)', () => {
        test('should find all valid plans for small inputs', () => {
            const plans1 = findAllValidPlans([]);
            expect(plans1).toEqual([[]]);

            const plans2 = findAllValidPlans([5]);
            expect(plans2).toEqual([[], [0]]);

            const plans3 = findAllValidPlans([1, 2]);
            expect(plans3).toEqual([[], [1], [0]]);

            const plans4 = findAllValidPlans([1, 2, 3]);
            expect(plans4).toEqual([[], [2], [1], [0], [0, 2]]);
        });

        test('should generate only valid plans', () => {
            const houses = [1, 2, 3, 4, 5];
            const plans = findAllValidPlans(houses);

            for (const plan of plans) {
                expect(isValidRobberyPlan(houses, plan)).toBe(true);
            }
        });

        test('should include optimal plan', () => {
            const houses = [1, 2, 3, 1];
            const plans = findAllValidPlans(houses);
            const amounts = plans.map(plan => calculateRobberyAmount(houses, plan));
            const maxAmount = Math.max(...amounts);

            expect(maxAmount).toBe(rob(houses));
        });
    });

    describe('analyzeRobberyPatterns (Pattern Analysis)', () => {
        test('should analyze simple patterns', () => {
            const analysis = analyzeRobberyPatterns([1, 2, 3, 1]);
            expect(analysis.totalValidPlans).toBe(8);
            expect(analysis.bestPlan.amount).toBe(4);
            expect(analysis.bestPlan.plan).toEqual([0, 2]);
            expect(analysis.worstPlan.amount).toBe(0);
            expect(analysis.worstPlan.plan).toEqual([]);
        });

        test('should handle empty input', () => {
            const analysis = analyzeRobberyPatterns([]);
            expect(analysis.totalValidPlans).toBe(1);
            expect(analysis.bestPlan.amount).toBe(0);
            expect(analysis.worstPlan.amount).toBe(0);
        });

        test('should calculate averages correctly', () => {
            const analysis = analyzeRobberyPatterns([2, 2]);
            expect(analysis.totalValidPlans).toBe(3); // [], [0], [1]
            expect(analysis.averageAmount).toBe((0 + 2 + 2) / 3);
            expect(analysis.averageHouseCount).toBe((0 + 1 + 1) / 3);
        });

        test('should handle single house', () => {
            const analysis = analyzeRobberyPatterns([5]);
            expect(analysis.totalValidPlans).toBe(2);
            expect(analysis.bestPlan.amount).toBe(5);
            expect(analysis.worstPlan.amount).toBe(0);
        });
    });

    describe('visualizeRobberyDecision (Visualization)', () => {
        test('should create correct visualization', () => {
            const viz1 = visualizeRobberyDecision([1, 2, 3, 1]);
            expect(viz1).toContain('Houses: [1] 2 [3] 1');
            expect(viz1).toContain('Total robbed: $4');
            expect(viz1).toContain('Houses robbed: 0, 2');

            const viz2 = visualizeRobberyDecision([2, 7, 9, 3, 1]);
            expect(viz2).toContain('[2] 7 [9] 3 [1]');
            expect(viz2).toContain('Total robbed: $12');
            expect(viz2).toContain('Houses robbed: 0, 2, 4');
        });

        test('should handle edge cases', () => {
            expect(visualizeRobberyDecision([])).toBe('No houses to rob');
            expect(visualizeRobberyDecision([5])).toBe('Rob house 0: $5');
        });

        test('should handle two houses', () => {
            const viz1 = visualizeRobberyDecision([2, 7]);
            expect(viz1).toContain('2 [7]');
            expect(viz1).toContain('Total robbed: $7');
            expect(viz1).toContain('Houses robbed: 1');

            const viz2 = visualizeRobberyDecision([7, 2]);
            expect(viz2).toContain('[7] 2');
            expect(viz2).toContain('Total robbed: $7');
            expect(viz2).toContain('Houses robbed: 0');
        });
    });

    describe('Algorithm Consistency', () => {
        test('all algorithms should produce same results', () => {
            const testCases = [
                [1, 2, 3, 1],
                [2, 7, 9, 3, 1],
                [2, 1, 1, 2],
                [1, 2, 3, 4, 5],
                [5, 4, 3, 2, 1],
                [100, 50, 200, 75, 150],
                [10, 5, 10, 5, 10],
                [1, 3, 2, 4, 9],
                [5, 1, 3, 9, 4],
                [10, 20, 30, 40, 50]
            ];

            testCases.forEach(houses => {
                const result1 = rob(houses);
                const result2 = robOptimized(houses);
                const result3 = robRecursive(houses);
                const result4 = robWithDecisions(houses).maxAmount;

                expect(result1).toBe(result2);
                expect(result2).toBe(result3);
                expect(result3).toBe(result4);
            });
        });
    });
});