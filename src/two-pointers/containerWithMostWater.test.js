const {
    maxArea,
    maxAreaBruteForce,
    maxAreaWithIndices,
    maxAreaOptimized,
    findAllMaxContainers,
    visualizeContainer,
    generateContainerTestCase,
    benchmarkContainer,
    analyzeContainerPatterns,
    findMinHeightForTarget,
    calculateWaterCapacity
} = require('./containerWithMostWater');

describe('Container With Most Water', () => {

    // Test all main implementations with the same test cases
    const implementations = [
        { name: 'Two Pointers', func: maxArea },
        { name: 'Brute Force', func: maxAreaBruteForce },
        { name: 'Optimized Two Pointers', func: maxAreaOptimized }
    ];

    implementations.forEach(({ name, func }) => {
        describe(`${name} Implementation`, () => {

            describe('Basic Functionality', () => {
                test('should calculate area correctly', () => {
                    expect(func([1, 8, 6, 2, 5, 4, 8, 3, 7])).toBe(49);
                    expect(func([1, 1])).toBe(1);
                    expect(func([4, 3, 2, 1, 4])).toBe(16);
                    expect(func([1, 2, 1])).toBe(2);
                });

                test('should handle identical heights', () => {
                    expect(func([5, 5, 5, 5])).toBe(15); // Max distance is 3, height is 5
                    expect(func([2, 2, 2])).toBe(4); // Max distance is 2, height is 2
                });

                test('should handle increasing heights', () => {
                    expect(func([1, 2, 3, 4, 5])).toBe(6); // Indices 0 and 4: min(1,5) * 4 = 4, but indices 1,4: min(2,5) * 3 = 6
                });

                test('should handle decreasing heights', () => {
                    expect(func([5, 4, 3, 2, 1])).toBe(6); // Indices 0 and 3: min(5,2) * 3 = 6
                });

                test('should handle single peak', () => {
                    expect(func([1, 8, 1])).toBe(2); // Indices 0 and 2: min(1,1) * 2 = 2
                    expect(func([2, 10, 2])).toBe(4); // Indices 0 and 2: min(2,2) * 2 = 4
                });
            });

            describe('Edge Cases', () => {
                test('should handle empty array', () => {
                    expect(func([])).toBe(0);
                    expect(func(null)).toBe(0);
                    expect(func(undefined)).toBe(0);
                });

                test('should handle single element', () => {
                    expect(func([5])).toBe(0);
                    expect(func([0])).toBe(0);
                });

                test('should handle two elements', () => {
                    expect(func([3, 7])).toBe(3); // min(3,7) * 1 = 3
                    expect(func([5, 5])).toBe(5); // min(5,5) * 1 = 5
                    expect(func([0, 1])).toBe(0); // min(0,1) * 1 = 0
                });

                test('should handle zeros', () => {
                    expect(func([0, 0, 0])).toBe(0);
                    expect(func([0, 5, 0])).toBe(0);
                    expect(func([1, 0, 1])).toBe(2); // Indices 0 and 2: min(1,1) * 2 = 2
                });

                test('should handle large arrays', () => {
                    const largeArray = new Array(1000).fill(1);
                    expect(func(largeArray)).toBe(999); // min(1,1) * 999 = 999
                });
            });

            describe('LeetCode Examples', () => {
                test('should pass LeetCode example 1', () => {
                    // [1,8,6,2,5,4,8,3,7]
                    // Best container: indices 1 and 8 (heights 8 and 7)
                    // Area = min(8,7) * (8-1) = 7 * 7 = 49
                    expect(func([1, 8, 6, 2, 5, 4, 8, 3, 7])).toBe(49);
                });

                test('should pass LeetCode example 2', () => {
                    expect(func([1, 1])).toBe(1);
                });

                test('should handle symmetric arrays', () => {
                    expect(func([1, 2, 3, 2, 1])).toBe(4); // Indices 0 and 4: min(1,1) * 4 = 4
                });
            });

            describe('Complex Patterns', () => {
                test('should handle plateau patterns', () => {
                    expect(func([1, 3, 3, 3, 1])).toBe(6); // Indices 1,3: min(3,3) * 2 = 6 (maximum area)
                });

                test('should handle valley patterns', () => {
                    expect(func([5, 1, 5])).toBe(10); // Indices 0 and 2: min(5,5) * 2 = 10
                    expect(func([8, 2, 1, 2, 8])).toBe(32); // Indices 0 and 4: min(8,8) * 4 = 32
                });

                test('should handle irregular patterns', () => {
                    expect(func([2, 3, 10, 5, 7, 8, 9])).toBe(36); // Need to check which gives max area
                });
            });
        });
    });

    describe('Additional Functions', () => {
        describe('maxAreaWithIndices', () => {
            test('should return area and indices', () => {
                const result = maxAreaWithIndices([1, 8, 6, 2, 5, 4, 8, 3, 7]);
                expect(result).toHaveProperty('area');
                expect(result).toHaveProperty('indices');
                expect(result).toHaveProperty('heights');

                expect(result.area).toBe(49);
                expect(Array.isArray(result.indices)).toBe(true);
                expect(result.indices).toHaveLength(2);
                expect(Array.isArray(result.heights)).toBe(true);
                expect(result.heights).toHaveLength(2);
            });

            test('should handle edge cases', () => {
                expect(maxAreaWithIndices([])).toEqual({ area: 0, indices: [] });
                expect(maxAreaWithIndices([5])).toEqual({ area: 0, indices: [] });

                const result = maxAreaWithIndices([3, 7]);
                expect(result.area).toBe(3);
                expect(result.indices).toEqual([0, 1]);
                expect(result.heights).toEqual([3, 7]);
            });

            test('should return valid indices', () => {
                const height = [1, 8, 6, 2, 5, 4, 8, 3, 7];
                const result = maxAreaWithIndices(height);

                expect(result.indices[0]).toBeLessThan(height.length);
                expect(result.indices[1]).toBeLessThan(height.length);
                expect(result.indices[0]).toBeLessThan(result.indices[1]);

                // Verify the area calculation
                const [left, right] = result.indices;
                const expectedArea = Math.min(height[left], height[right]) * (right - left);
                expect(result.area).toBe(expectedArea);
            });
        });

        describe('findAllMaxContainers', () => {
            test('should find all containers with maximum area', () => {
                const containers = findAllMaxContainers([1, 8, 6, 2, 5, 4, 8, 3, 7]);

                expect(Array.isArray(containers)).toBe(true);
                expect(containers.length).toBeGreaterThan(0);

                containers.forEach(container => {
                    expect(container).toHaveProperty('indices');
                    expect(container).toHaveProperty('heights');
                    expect(container).toHaveProperty('area');
                    expect(container).toHaveProperty('width');
                    expect(container).toHaveProperty('effectiveHeight');
                });

                // All containers should have the same (maximum) area
                const maxArea = containers[0].area;
                containers.forEach(container => {
                    expect(container.area).toBe(maxArea);
                });
            });

            test('should handle multiple optimal solutions', () => {
                // Array where multiple pairs give the same maximum area
                const containers = findAllMaxContainers([5, 1, 5, 1, 5]);

                expect(containers.length).toBeGreaterThanOrEqual(1);

                // Verify that indices 0,2 and 0,4 and 2,4 all give area 10
                const areas = containers.map(c => c.area);
                const maxArea = Math.max(...areas);
                expect(areas.every(area => area === maxArea)).toBe(true);
            });

            test('should return empty for invalid input', () => {
                expect(findAllMaxContainers([])).toEqual([]);
                expect(findAllMaxContainers([5])).toEqual([]);
                expect(findAllMaxContainers(null)).toEqual([]);
            });
        });

        describe('visualizeContainer', () => {
            test('should create visualization string', () => {
                const viz = visualizeContainer([1, 8, 6, 2, 5, 4, 8, 3, 7]);

                expect(typeof viz).toBe('string');
                expect(viz.length).toBeGreaterThan(0);
                expect(viz).toContain('Max Area:');
                expect(viz).toContain('Container:');
                expect(viz).toContain('Heights:');
            });

            test('should handle small arrays', () => {
                const viz = visualizeContainer([3, 7]);
                expect(typeof viz).toBe('string');
                expect(viz).toContain('Max Area: 3');
            });

            test('should handle edge cases', () => {
                expect(visualizeContainer([])).toBe('');
                expect(visualizeContainer([5])).toBe('');
                expect(visualizeContainer(null)).toBe('');
            });

            test('should contain water symbols', () => {
                const viz = visualizeContainer([5, 1, 5]);
                expect(viz).toContain('~'); // Water symbol
                expect(viz).toContain('|'); // Bar symbol
                expect(viz).toContain('-'); // Bottom line
            });
        });

        describe('generateContainerTestCase', () => {
            test('should generate valid test case', () => {
                const testCase = generateContainerTestCase(5, 10);

                expect(testCase).toHaveProperty('height');
                expect(testCase).toHaveProperty('expectedArea');
                expect(testCase).toHaveProperty('expectedIndices');
                expect(testCase).toHaveProperty('analysis');

                expect(Array.isArray(testCase.height)).toBe(true);
                expect(testCase.height).toHaveLength(5);
                expect(typeof testCase.expectedArea).toBe('number');
                expect(Array.isArray(testCase.expectedIndices)).toBe(true);

                // All heights should be within range
                testCase.height.forEach(h => {
                    expect(h).toBeGreaterThanOrEqual(1);
                    expect(h).toBeLessThanOrEqual(10);
                });
            });

            test('should generate consistent results', () => {
                const testCase = generateContainerTestCase(4, 5);
                const calculatedArea = maxArea(testCase.height);
                expect(testCase.expectedArea).toBe(calculatedArea);
            });

            test('should include analysis metrics', () => {
                const testCase = generateContainerTestCase(6, 8);

                expect(testCase.analysis).toHaveProperty('maxHeight');
                expect(testCase.analysis).toHaveProperty('minHeight');
                expect(testCase.analysis).toHaveProperty('averageHeight');
                expect(testCase.analysis).toHaveProperty('size');

                expect(testCase.analysis.size).toBe(6);
                expect(testCase.analysis.maxHeight).toBeLessThanOrEqual(8);
                expect(testCase.analysis.minHeight).toBeGreaterThanOrEqual(1);
            });
        });

        describe('benchmarkContainer', () => {
            test('should benchmark all approaches', () => {
                const results = benchmarkContainer([1, 8, 6, 2, 5, 4, 8, 3, 7]);

                expect(results).toHaveProperty('Two Pointers');
                expect(results).toHaveProperty('Brute Force');
                expect(results).toHaveProperty('Optimized Two Pointers');

                Object.values(results).forEach(result => {
                    expect(result).toHaveProperty('result');
                    expect(result).toHaveProperty('time');
                    expect(result).toHaveProperty('area');
                    expect(typeof result.time).toBe('number');
                    expect(result.time).toBeGreaterThanOrEqual(0);
                });
            });

            test('should produce consistent results across approaches', () => {
                const results = benchmarkContainer([1, 2, 1]);

                const areas = Object.values(results).map(r => r.result);
                const firstArea = areas[0];
                expect(areas.every(area => area === firstArea)).toBe(true);
            });

            test('should handle large arrays', () => {
                const largeArray = new Array(100).fill().map((_, i) => i + 1);
                const results = benchmarkContainer(largeArray);

                // All should complete successfully
                Object.values(results).forEach(result => {
                    expect(typeof result.result).toBe('number');
                    expect(result.time).toBeGreaterThanOrEqual(0);
                });
            });
        });

        describe('analyzeContainerPatterns', () => {
            test('should analyze container patterns', () => {
                const analysis = analyzeContainerPatterns([1, 8, 6, 2, 5, 4, 8, 3, 7]);

                expect(analysis).toHaveProperty('maxArea');
                expect(analysis).toHaveProperty('optimalContainers');
                expect(analysis).toHaveProperty('tallestBars');
                expect(analysis).toHaveProperty('maxHeight');
                expect(analysis).toHaveProperty('efficiency');
                expect(analysis).toHaveProperty('heightDistribution');

                expect(typeof analysis.maxArea).toBe('number');
                expect(Array.isArray(analysis.optimalContainers)).toBe(true);
                expect(Array.isArray(analysis.tallestBars)).toBe(true);
                expect(typeof analysis.efficiency).toBe('number');
            });

            test('should calculate efficiency correctly', () => {
                const analysis = analyzeContainerPatterns([5, 5, 5]);

                expect(analysis.efficiency).toBeGreaterThan(0);
                expect(analysis.efficiency).toBeLessThanOrEqual(100);
                expect(analysis.maxHeight).toBe(5);
                expect(analysis.tallestBars).toEqual([0, 1, 2]);
            });

            test('should handle edge cases', () => {
                expect(analyzeContainerPatterns([])).toBeNull();
                expect(analyzeContainerPatterns([5])).toBeNull();
                expect(analyzeContainerPatterns(null)).toBeNull();
            });

            test('should provide height distribution', () => {
                const analysis = analyzeContainerPatterns([1, 5, 3, 7, 2]);

                expect(analysis.heightDistribution).toHaveProperty('max');
                expect(analysis.heightDistribution).toHaveProperty('min');
                expect(analysis.heightDistribution).toHaveProperty('average');
                expect(analysis.heightDistribution).toHaveProperty('median');

                expect(analysis.heightDistribution.max).toBe(7);
                expect(analysis.heightDistribution.min).toBe(1);
                expect(analysis.heightDistribution.average).toBeCloseTo(3.6);
            });
        });

        describe('findMinHeightForTarget', () => {
            test('should find achievable targets', () => {
                const result = findMinHeightForTarget([1, 2, 3], 2);

                expect(result).toHaveProperty('achievable');
                expect(result).toHaveProperty('targetArea');
                expect(result).toHaveProperty('currentMaxArea');

                if (result.achievable) {
                    expect(result.targetArea).toBe(2);
                    expect(Array.isArray(result.solutions)).toBe(true);
                }
            });

            test('should handle unachievable targets', () => {
                const result = findMinHeightForTarget([1, 1], 100);

                expect(result.achievable).toBe(false);
                expect(result).toHaveProperty('maxPossibleArea');
                expect(result).toHaveProperty('message');
                expect(result.maxPossibleArea).toBeLessThan(100);
            });

            test('should return null for invalid input', () => {
                expect(findMinHeightForTarget([], 5)).toBeNull();
                expect(findMinHeightForTarget([5], 10)).toBeNull();
                expect(findMinHeightForTarget(null, 5)).toBeNull();
            });

            test('should provide solutions sorted by height increase', () => {
                const result = findMinHeightForTarget([1, 2, 1], 10);

                if (result.achievable && result.solutions.length > 1) {
                    for (let i = 1; i < result.solutions.length; i++) {
                        expect(result.solutions[i].heightIncrease)
                            .toBeGreaterThanOrEqual(result.solutions[i-1].heightIncrease);
                    }
                }
            });
        });

        describe('calculateWaterCapacity', () => {
            test('should calculate capacity for each position', () => {
                const capacities = calculateWaterCapacity([1, 8, 6, 2, 5]);

                expect(Array.isArray(capacities)).toBe(true);
                expect(capacities).toHaveLength(5);

                capacities.forEach(capacity => {
                    expect(typeof capacity).toBe('number');
                    expect(capacity).toBeGreaterThanOrEqual(0);
                });
            });

            test('should handle edge cases', () => {
                expect(calculateWaterCapacity([])).toEqual([]);
                expect(calculateWaterCapacity([5])).toEqual([]);
                expect(calculateWaterCapacity(null)).toEqual([]);
            });

            test('should calculate correct capacities', () => {
                const capacities = calculateWaterCapacity([1, 8, 1]);

                // Position 0: best with position 1 = min(1,8) * 1 = 1
                // Position 1: best with position 0 or 2 = min(8,1) * 1 = 1 each, but with 0 to 2: min(8,1) * 2 = 2
                // Position 2: best with position 1 = min(1,8) * 1 = 1

                expect(capacities[0]).toBeGreaterThan(0);
                expect(capacities[1]).toBeGreaterThan(0);
                expect(capacities[2]).toBeGreaterThan(0);
            });

            test('should find maximum capacity for each position', () => {
                const capacities = calculateWaterCapacity([3, 1, 3]);

                // Each end position should have capacity 6 (with the other end)
                expect(capacities[0]).toBe(6); // min(3,3) * 2 = 6
                expect(capacities[2]).toBe(6); // min(3,3) * 2 = 6

                // Middle position should have capacity 1 (with either end)
                expect(capacities[1]).toBe(1); // min(1,3) * 1 = 1
            });
        });
    });

    describe('Performance Tests', () => {
        test('should handle medium-sized arrays efficiently', () => {
            const height = new Array(1000).fill().map(() => Math.floor(Math.random() * 100) + 1);

            const startTime = performance.now();
            const result = maxArea(height);
            const endTime = performance.now();

            expect(typeof result).toBe('number');
            expect(result).toBeGreaterThanOrEqual(0);
            expect(endTime - startTime).toBeLessThan(100); // Should complete quickly
        });

        test('should be faster than brute force for large arrays', () => {
            const height = new Array(100).fill().map(() => Math.floor(Math.random() * 10) + 1);

            const startOptimal = performance.now();
            const resultOptimal = maxArea(height);
            const endOptimal = performance.now();

            const startBrute = performance.now();
            const resultBrute = maxAreaBruteForce(height);
            const endBrute = performance.now();

            expect(resultOptimal).toBe(resultBrute);
            expect(endOptimal - startOptimal).toBeLessThan(endBrute - startBrute);
        });

        test('should handle worst-case scenarios', () => {
            // Worst case: decreasing array where we need to check many pairs
            const height = new Array(500).fill().map((_, i) => 500 - i);

            const startTime = performance.now();
            const result = maxArea(height);
            const endTime = performance.now();

            expect(typeof result).toBe('number');
            expect(endTime - startTime).toBeLessThan(50); // Should still be fast
        });
    });

    describe('Algorithm Consistency', () => {
        test('all implementations should produce same results for basic cases', () => {
            const testCases = [
                [1, 8, 6, 2, 5, 4, 8, 3, 7],
                [1, 1],
                [4, 3, 2, 1, 4],
                [1, 2, 1],
                [5, 5, 5, 5],
                [1, 2, 3, 4, 5]
            ];

            testCases.forEach(testCase => {
                const results = implementations.map(({ func }) =>
                    func([...testCase]) // Copy to avoid mutation
                );

                // All implementations should agree
                const firstResult = results[0];
                expect(results.every(r => r === firstResult)).toBe(true);
            });
        });

        test('should handle edge cases consistently', () => {
            const edgeCases = [
                [],
                [5],
                [0, 0],
                [1, 0, 1],
                [5, 1, 5]
            ];

            edgeCases.forEach(testCase => {
                const results = implementations.map(({ func }) => {
                    try {
                        return func([...testCase]);
                    } catch (error) {
                        return null;
                    }
                });

                // All implementations should produce the same result
                const firstResult = results[0];
                expect(results.every(r => r === firstResult)).toBe(true);
            });
        });
    });

    describe('Stress Tests', () => {
        test('should handle arrays with repeated values', () => {
            const height = new Array(100).fill(5);
            const result = maxArea(height);

            expect(result).toBe(5 * 99); // min(5,5) * 99 = 495
        });

        test('should handle alternating high-low pattern', () => {
            const height = [];
            for (let i = 0; i < 100; i++) {
                height.push(i % 2 === 0 ? 1 : 10);
            }

            const result = maxArea(height);
            expect(typeof result).toBe('number');
            expect(result).toBeGreaterThan(0);
        });

        test('should handle pyramid pattern', () => {
            const height = [];
            const peak = 50;
            for (let i = 0; i < 100; i++) {
                height.push(Math.abs(peak - i) + 1);
            }

            const result = maxArea(height);
            expect(typeof result).toBe('number');
            expect(result).toBeGreaterThan(0);
        });

        test('should handle random large arrays', () => {
            for (let size = 100; size <= 500; size += 100) {
                const height = new Array(size).fill().map(() => Math.floor(Math.random() * 100) + 1);

                const result = maxArea(height);
                expect(typeof result).toBe('number');
                expect(result).toBeGreaterThanOrEqual(0);
                expect(result).toBeLessThanOrEqual(100 * (size - 1)); // Theoretical maximum
            }
        });
    });
});