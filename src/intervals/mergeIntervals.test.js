const {
    merge,
    mergeWithStack,
    mergeWithoutSort,
    intervalsOverlap,
    mergeTwo,
    insertInterval,
    findMaxNonOverlapping,
    minIntervalsToRemove,
    getTotalCoverage,
    findGaps,
    isPointCovered,
    findOverlappingPairs,
    visualizeIntervals,
    getIntervalStats
} = require('./mergeIntervals');

describe('Merge Intervals', () => {

    // Test all main implementations with the same test cases
    const implementations = [
        { name: 'Sort and Merge', func: merge },
        { name: 'Stack-based', func: mergeWithStack },
        { name: 'Without Sort', func: mergeWithoutSort }
    ];

    // Helper function to sort intervals for comparison
    const sortIntervals = (intervals) => {
        return intervals.sort((a, b) => a[0] - b[0]);
    };

    implementations.forEach(({ name, func }) => {
        describe(`${name} Implementation`, () => {

            describe('Basic Functionality', () => {
                test('should merge overlapping intervals', () => {
                    const intervals = [[1, 3], [2, 6], [8, 10], [15, 18]];
                    const result = func(intervals);
                    expect(sortIntervals(result)).toEqual([[1, 6], [8, 10], [15, 18]]);
                });

                test('should merge adjacent intervals', () => {
                    const intervals = [[1, 4], [4, 5]];
                    const result = func(intervals);
                    expect(result).toEqual([[1, 5]]);
                });

                test('should handle single interval', () => {
                    const intervals = [[1, 4]];
                    const result = func(intervals);
                    expect(result).toEqual([[1, 4]]);
                });

                test('should handle no intervals', () => {
                    const result = func([]);
                    expect(result).toEqual([]);
                });

                test('should handle non-overlapping intervals', () => {
                    const intervals = [[1, 2], [3, 4], [5, 6]];
                    const result = func(intervals);
                    expect(sortIntervals(result)).toEqual([[1, 2], [3, 4], [5, 6]]);
                });

                test('should merge multiple overlapping intervals', () => {
                    const intervals = [[1, 3], [2, 6], [5, 8], [7, 10]];
                    const result = func(intervals);
                    expect(result).toEqual([[1, 10]]);
                });
            });

            describe('Edge Cases', () => {
                test('should handle null input', () => {
                    const result = func(null);
                    expect(result).toEqual([]);
                });

                test('should handle undefined input', () => {
                    const result = func(undefined);
                    expect(result).toEqual([]);
                });

                test('should handle intervals with same start and end', () => {
                    const intervals = [[1, 1], [2, 2], [3, 3]];
                    const result = func(intervals);
                    expect(sortIntervals(result)).toEqual([[1, 1], [2, 2], [3, 3]]);
                });

                test('should handle overlapping point intervals', () => {
                    const intervals = [[1, 1], [1, 1], [1, 1]];
                    const result = func(intervals);
                    expect(result).toEqual([[1, 1]]);
                });

                test('should handle negative intervals', () => {
                    const intervals = [[-5, -2], [-3, 0], [1, 3]];
                    const result = func(intervals);
                    expect(sortIntervals(result)).toEqual([[-5, 0], [1, 3]]);
                });

                test('should handle unsorted input', () => {
                    const intervals = [[15, 18], [1, 3], [8, 10], [2, 6]];
                    const result = func(intervals);
                    expect(sortIntervals(result)).toEqual([[1, 6], [8, 10], [15, 18]]);
                });
            });

            describe('Complex Scenarios', () => {
                test('should handle completely overlapping intervals', () => {
                    const intervals = [[1, 10], [2, 6], [3, 5], [4, 7]];
                    const result = func(intervals);
                    expect(result).toEqual([[1, 10]]);
                });

                test('should handle many small overlaps', () => {
                    const intervals = [[1, 2], [2, 3], [3, 4], [4, 5], [5, 6]];
                    const result = func(intervals);
                    expect(result).toEqual([[1, 6]]);
                });

                test('should handle alternating overlaps', () => {
                    const intervals = [[1, 3], [5, 7], [2, 4], [6, 8]];
                    const result = func(intervals);
                    expect(sortIntervals(result)).toEqual([[1, 4], [5, 8]]);
                });

                test('should handle large ranges', () => {
                    const intervals = [[1, 1000000], [999999, 2000000]];
                    const result = func(intervals);
                    expect(result).toEqual([[1, 2000000]]);
                });
            });
        });
    });

    describe('Utility Functions', () => {
        describe('intervalsOverlap', () => {
            test('should detect overlapping intervals', () => {
                expect(intervalsOverlap([1, 3], [2, 4])).toBe(true);
                expect(intervalsOverlap([1, 4], [2, 3])).toBe(true);
                expect(intervalsOverlap([1, 2], [2, 3])).toBe(true);
            });

            test('should detect non-overlapping intervals', () => {
                expect(intervalsOverlap([1, 2], [3, 4])).toBe(false);
                expect(intervalsOverlap([1, 1], [2, 2])).toBe(false);
            });
        });

        describe('mergeTwo', () => {
            test('should merge two overlapping intervals', () => {
                expect(mergeTwo([1, 3], [2, 4])).toEqual([1, 4]);
                expect(mergeTwo([1, 5], [2, 3])).toEqual([1, 5]);
                expect(mergeTwo([2, 3], [1, 5])).toEqual([1, 5]);
            });
        });

        describe('insertInterval', () => {
            test('should insert non-overlapping interval', () => {
                const intervals = [[1, 3], [6, 9]];
                const result = insertInterval(intervals, [4, 5]);
                expect(result).toEqual([[1, 3], [4, 5], [6, 9]]);
            });

            test('should insert and merge overlapping interval', () => {
                const intervals = [[1, 3], [6, 9]];
                const result = insertInterval(intervals, [2, 5]);
                expect(result).toEqual([[1, 5], [6, 9]]);
            });

            test('should insert interval that merges multiple existing', () => {
                const intervals = [[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]];
                const result = insertInterval(intervals, [4, 8]);
                expect(result).toEqual([[1, 2], [3, 10], [12, 16]]);
            });

            test('should handle empty intervals', () => {
                const result = insertInterval([], [1, 3]);
                expect(result).toEqual([[1, 3]]);
            });

            test('should handle null new interval', () => {
                const intervals = [[1, 3], [6, 9]];
                const result = insertInterval(intervals, null);
                expect(result).toEqual([[1, 3], [6, 9]]);
            });
        });

        describe('findMaxNonOverlapping', () => {
            test('should find maximum non-overlapping intervals', () => {
                expect(findMaxNonOverlapping([[1, 3], [2, 4], [5, 7]])).toBe(2);
                expect(findMaxNonOverlapping([[1, 2], [3, 4], [5, 6]])).toBe(3);
                expect(findMaxNonOverlapping([[1, 10], [2, 3], [4, 5]])).toBe(2); // [2,3] and [4,5] don't overlap
            });

            test('should handle edge cases', () => {
                expect(findMaxNonOverlapping([])).toBe(0);
                expect(findMaxNonOverlapping([[1, 2]])).toBe(1);
            });
        });

        describe('minIntervalsToRemove', () => {
            test('should calculate minimum intervals to remove', () => {
                expect(minIntervalsToRemove([[1, 3], [2, 4], [5, 7]])).toBe(1);
                expect(minIntervalsToRemove([[1, 2], [3, 4], [5, 6]])).toBe(0);
                expect(minIntervalsToRemove([[1, 10], [2, 3], [4, 5]])).toBe(1); // Can keep [2,3] and [4,5]
            });

            test('should handle edge cases', () => {
                expect(minIntervalsToRemove([])).toBe(0);
                expect(minIntervalsToRemove([[1, 2]])).toBe(0);
            });
        });

        describe('getTotalCoverage', () => {
            test('should calculate total coverage', () => {
                expect(getTotalCoverage([[1, 3], [2, 6], [8, 10]])).toBe(7); // [1,6] + [8,10] = 5 + 2
                expect(getTotalCoverage([[1, 2], [3, 4], [5, 6]])).toBe(3);
                expect(getTotalCoverage([[1, 10]])).toBe(9);
            });

            test('should handle edge cases', () => {
                expect(getTotalCoverage([])).toBe(0);
                expect(getTotalCoverage([[1, 1]])).toBe(0);
            });
        });

        describe('findGaps', () => {
            test('should find gaps between intervals', () => {
                const gaps = findGaps([[1, 3], [5, 7], [9, 10]]);
                expect(gaps).toEqual([[3, 5], [7, 9]]);
            });

            test('should handle no gaps', () => {
                const gaps = findGaps([[1, 3], [3, 5], [5, 7]]);
                expect(gaps).toEqual([]);
            });

            test('should handle single interval', () => {
                const gaps = findGaps([[1, 3]]);
                expect(gaps).toEqual([]);
            });

            test('should handle empty input', () => {
                expect(findGaps([])).toEqual([]);
            });
        });

        describe('isPointCovered', () => {
            test('should detect covered points', () => {
                const intervals = [[1, 3], [5, 7], [9, 10]];
                expect(isPointCovered(intervals, 2)).toBe(true);
                expect(isPointCovered(intervals, 6)).toBe(true);
                expect(isPointCovered(intervals, 1)).toBe(true);
                expect(isPointCovered(intervals, 3)).toBe(true);
            });

            test('should detect uncovered points', () => {
                const intervals = [[1, 3], [5, 7], [9, 10]];
                expect(isPointCovered(intervals, 4)).toBe(false);
                expect(isPointCovered(intervals, 8)).toBe(false);
                expect(isPointCovered(intervals, 0)).toBe(false);
                expect(isPointCovered(intervals, 11)).toBe(false);
            });
        });

        describe('findOverlappingPairs', () => {
            test('should find overlapping pairs', () => {
                const intervals = [[1, 3], [2, 4], [5, 7]];
                const pairs = findOverlappingPairs(intervals);
                expect(pairs).toEqual([[[1, 3], [2, 4]]]);
            });

            test('should handle no overlaps', () => {
                const intervals = [[1, 2], [3, 4], [5, 6]];
                const pairs = findOverlappingPairs(intervals);
                expect(pairs).toEqual([]);
            });

            test('should handle multiple overlaps', () => {
                const intervals = [[1, 5], [2, 3], [4, 6]];
                const pairs = findOverlappingPairs(intervals);
                expect(pairs.length).toBe(2); // [1,5] overlaps with [2,3] and [4,6], but [2,3] and [4,6] don't overlap
            });

            test('should handle edge cases', () => {
                expect(findOverlappingPairs([])).toEqual([]);
                expect(findOverlappingPairs([[1, 2]])).toEqual([]);
            });
        });

        describe('visualizeIntervals', () => {
            test('should create visualization', () => {
                const intervals = [[1, 3], [2, 4], [6, 8]];
                const visualization = visualizeIntervals(intervals, 20);

                expect(visualization).toContain('Interval Timeline');
                expect(visualization).toContain('Range:');
                expect(visualization).toContain('After merging:');
            });

            test('should handle empty intervals', () => {
                const visualization = visualizeIntervals([]);
                expect(visualization).toBe('No intervals to visualize');
            });

            test('should handle same point intervals', () => {
                const intervals = [[1, 1], [1, 1]];
                const visualization = visualizeIntervals(intervals);
                expect(visualization).toBe('All intervals are at the same point');
            });
        });

        describe('getIntervalStats', () => {
            test('should provide comprehensive statistics', () => {
                const intervals = [[1, 3], [2, 6], [8, 10], [15, 18]];
                const stats = getIntervalStats(intervals);

                expect(stats.totalIntervals).toBe(4);
                expect(stats.mergedIntervals).toBe(3);
                expect(stats.totalCoverage).toBe(10); // [1,6] + [8,10] + [15,18] = 5+2+3
                expect(stats.overlappingPairs).toBe(1);
                expect(stats.gaps).toBe(2);
                expect(stats.reductionRatio).toBe('25.0%');
            });

            test('should handle empty input', () => {
                const stats = getIntervalStats([]);
                expect(stats.totalIntervals).toBe(0);
                expect(stats.mergedIntervals).toBe(0);
                expect(stats.totalCoverage).toBe(0);
                expect(stats.overlappingPairs).toBe(0);
                expect(stats.gaps).toBe(0);
            });

            test('should handle single interval', () => {
                const stats = getIntervalStats([[1, 5]]);
                expect(stats.totalIntervals).toBe(1);
                expect(stats.mergedIntervals).toBe(1);
                expect(stats.totalCoverage).toBe(4);
                expect(stats.overlappingPairs).toBe(0);
                expect(stats.gaps).toBe(0);
                expect(stats.reductionRatio).toBe('0.0%');
            });
        });
    });

    describe('Performance Tests', () => {
        test('should handle large number of intervals efficiently', () => {
            // Generate many non-overlapping intervals
            const intervals = [];
            for (let i = 0; i < 1000; i++) {
                intervals.push([i * 2, i * 2 + 1]);
            }

            const startTime = performance.now();
            const result = merge(intervals);
            const endTime = performance.now();

            expect(endTime - startTime).toBeLessThan(100); // Should be fast
            expect(result.length).toBe(1000); // No merging should occur
        });

        test('should handle worst-case overlapping scenarios', () => {
            // All intervals overlap with each other
            const intervals = [];
            for (let i = 0; i < 500; i++) {
                intervals.push([0, 1000]);
            }

            const startTime = performance.now();
            const result = merge(intervals);
            const endTime = performance.now();

            expect(endTime - startTime).toBeLessThan(50);
            expect(result).toEqual([[0, 1000]]); // Should merge to single interval
        });

        test('should handle many small overlapping intervals', () => {
            // Create chain of overlapping intervals
            const intervals = [];
            for (let i = 0; i < 1000; i++) {
                intervals.push([i, i + 2]);
            }

            const startTime = performance.now();
            const result = merge(intervals);
            const endTime = performance.now();

            expect(endTime - startTime).toBeLessThan(100);
            expect(result).toEqual([[0, 1001]]); // Should merge to single interval
        });
    });

    describe('Algorithm Consistency', () => {
        test('all merge implementations should produce equivalent results', () => {
            const testCases = [
                [[1, 3], [2, 6], [8, 10], [15, 18]],
                [[1, 4], [4, 5]],
                [[1, 2], [3, 4], [5, 6]],
                [[1, 3], [2, 6], [5, 8], [7, 10]],
                [],
                [[1, 4]]
            ];

            testCases.forEach(testCase => {
                const results = implementations.map(({ func }) => {
                    const result = func([...testCase]); // Deep copy to avoid mutations
                    return sortIntervals(result);
                });

                // All implementations should agree
                const firstResult = results[0];
                expect(results.every(result =>
                    JSON.stringify(result) === JSON.stringify(firstResult)
                )).toBe(true);
            });
        });

        test('insert and merge operations should be consistent', () => {
            const testCases = [
                { intervals: [[1, 3], [6, 9]], newInterval: [2, 5] },
                { intervals: [[1, 2], [3, 5], [6, 7], [8, 10]], newInterval: [4, 8] },
                { intervals: [], newInterval: [1, 3] }
            ];

            testCases.forEach(({ intervals, newInterval }) => {
                // Insert using insertInterval function
                const insertResult = insertInterval([...intervals], newInterval);

                // Insert by adding to array and merging
                const mergeResult = merge([...intervals, newInterval]);

                expect(sortIntervals(insertResult)).toEqual(sortIntervals(mergeResult));
            });
        });
    });
});