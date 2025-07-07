const {
    LRUCache,
    LRUCacheMap,
    LRUCacheArray,
    Node,
    simulateOperations,
    compareLRUPerformance,
    analyzeCacheHitRatio,
    visualizeCacheOperations,
    generateLRUTestCases
} = require('./lruCache');

describe('LRU Cache', () => {

    // Test all three implementations with the same test cases
    const implementations = [
        { name: 'HashMap + Doubly Linked List', class: LRUCache },
        { name: 'JavaScript Map', class: LRUCacheMap },
        { name: 'Array-based', class: LRUCacheArray }
    ];

    implementations.forEach(({ name, class: LRUCacheClass }) => {
        describe(`${name} Implementation`, () => {

            describe('Basic Operations', () => {
                test('should initialize cache with correct capacity', () => {
                    const cache = new LRUCacheClass(3);
                    expect(cache.size()).toBe(0);
                    expect(cache.capacity).toBe(3);
                });

                test('should put and get single item', () => {
                    const cache = new LRUCacheClass(2);
                    cache.put(1, 10);
                    expect(cache.get(1)).toBe(10);
                    expect(cache.size()).toBe(1);
                });

                test('should return -1 for non-existent key', () => {
                    const cache = new LRUCacheClass(2);
                    expect(cache.get(999)).toBe(-1);
                });

                test('should update existing key', () => {
                    const cache = new LRUCacheClass(2);
                    cache.put(1, 10);
                    cache.put(1, 20);
                    expect(cache.get(1)).toBe(20);
                    expect(cache.size()).toBe(1);
                });

                test('should handle capacity limit', () => {
                    const cache = new LRUCacheClass(2);
                    cache.put(1, 10);
                    cache.put(2, 20);
                    cache.put(3, 30); // Should evict key 1

                    expect(cache.get(1)).toBe(-1);
                    expect(cache.get(2)).toBe(20);
                    expect(cache.get(3)).toBe(30);
                    expect(cache.size()).toBe(2);
                });
            });

            describe('LRU Eviction Logic', () => {
                test('should evict least recently used item', () => {
                    const cache = new LRUCacheClass(2);
                    cache.put(1, 10);
                    cache.put(2, 20);
                    cache.get(1); // Make 1 recently used
                    cache.put(3, 30); // Should evict 2, not 1

                    expect(cache.get(1)).toBe(10);
                    expect(cache.get(2)).toBe(-1);
                    expect(cache.get(3)).toBe(30);
                });

                test('should update recency on get operation', () => {
                    const cache = new LRUCacheClass(3);
                    cache.put(1, 10);
                    cache.put(2, 20);
                    cache.put(3, 30);

                    cache.get(1); // Make 1 most recent
                    cache.put(4, 40); // Should evict 2

                    expect(cache.get(1)).toBe(10);
                    expect(cache.get(2)).toBe(-1);
                    expect(cache.get(3)).toBe(30);
                    expect(cache.get(4)).toBe(40);
                });

                test('should update recency on put operation for existing key', () => {
                    const cache = new LRUCacheClass(3);
                    cache.put(1, 10);
                    cache.put(2, 20);
                    cache.put(3, 30);

                    cache.put(1, 11); // Update existing key, make it most recent
                    cache.put(4, 40); // Should evict 2

                    expect(cache.get(1)).toBe(11);
                    expect(cache.get(2)).toBe(-1);
                    expect(cache.get(3)).toBe(30);
                    expect(cache.get(4)).toBe(40);
                });
            });

            describe('Edge Cases', () => {
                test('should handle capacity of 1', () => {
                    const cache = new LRUCacheClass(1);
                    cache.put(1, 10);
                    cache.put(2, 20);
                    expect(cache.get(1)).toBe(-1);
                    expect(cache.get(2)).toBe(20);
                });

                test('should handle large capacity', () => {
                    const cache = new LRUCacheClass(1000);
                    for (let i = 0; i < 500; i++) {
                        cache.put(i, i * 10);
                    }
                    expect(cache.size()).toBe(500);
                    expect(cache.get(0)).toBe(0);
                    expect(cache.get(499)).toBe(4990);
                });

                test('should handle negative keys and values', () => {
                    const cache = new LRUCacheClass(2);
                    cache.put(-1, -10);
                    cache.put(-2, -20);
                    expect(cache.get(-1)).toBe(-10);
                    expect(cache.get(-2)).toBe(-20);
                });

                test('should handle zero values', () => {
                    const cache = new LRUCacheClass(2);
                    cache.put(0, 0);
                    expect(cache.get(0)).toBe(0);
                });

                test('should clear cache correctly', () => {
                    const cache = new LRUCacheClass(3);
                    cache.put(1, 10);
                    cache.put(2, 20);
                    cache.clear();
                    expect(cache.size()).toBe(0);
                    expect(cache.get(1)).toBe(-1);
                    expect(cache.get(2)).toBe(-1);
                });
            });

            describe('Utility Methods', () => {
                test('should check if cache is empty', () => {
                    const cache = new LRUCacheClass(2);
                    expect(cache.isEmpty ? cache.isEmpty() : cache.size() === 0).toBe(true);

                    cache.put(1, 10);
                    expect(cache.isEmpty ? cache.isEmpty() : cache.size() === 0).toBe(false);
                });

                test('should check if cache is full', () => {
                    const cache = new LRUCacheClass(2);
                    expect(cache.isFull ? cache.isFull() : cache.size() >= cache.capacity).toBe(false);

                    cache.put(1, 10);
                    cache.put(2, 20);
                    expect(cache.isFull ? cache.isFull() : cache.size() >= cache.capacity).toBe(true);
                });

                test('should get keys in correct order', () => {
                    const cache = new LRUCacheClass(3);
                    cache.put(1, 10);
                    cache.put(2, 20);
                    cache.put(3, 30);
                    cache.get(1); // Make 1 most recent

                    const keys = cache.getKeys();
                    expect(keys[0]).toBe(1); // Most recent should be first
                });

                test('should get values in correct order', () => {
                    const cache = new LRUCacheClass(3);
                    cache.put(1, 10);
                    cache.put(2, 20);
                    cache.put(3, 30);
                    cache.get(1); // Make 1 most recent

                    const values = cache.getValues();
                    expect(values[0]).toBe(10); // Value of most recent key
                });

                                test('should convert to array correctly', () => {
                    const cache = new LRUCacheClass(2);
                    cache.put(1, 10);
                    cache.put(2, 20);

                    const array = cache.toArray();
                    expect(array).toEqual([[2, 20], [1, 10]]); // Most recent (2) should be first
                });
            });
        });
    });

    describe('LeetCode Example Test Cases', () => {
        test('should pass LeetCode example 1', () => {
            const cache = new LRUCache(2);

            cache.put(1, 1);
            cache.put(2, 2);
            expect(cache.get(1)).toBe(1);
            cache.put(3, 3); // evicts key 2
            expect(cache.get(2)).toBe(-1);
            cache.put(4, 4); // evicts key 1
            expect(cache.get(1)).toBe(-1);
            expect(cache.get(3)).toBe(3);
            expect(cache.get(4)).toBe(4);
        });

        test('should pass LeetCode example 2', () => {
            const cache = new LRUCache(2);

            expect(cache.get(2)).toBe(-1);
            cache.put(2, 6);
            expect(cache.get(1)).toBe(-1);
            cache.put(1, 5);
            cache.put(1, 2);
            expect(cache.get(1)).toBe(2);
            expect(cache.get(2)).toBe(6);
        });

        test('should handle complex operation sequence', () => {
            const cache = new LRUCache(3);

            cache.put(1, 1);
            cache.put(2, 2);
            cache.put(3, 3);
            cache.put(4, 4); // evicts 1
            expect(cache.get(4)).toBe(4);
            expect(cache.get(3)).toBe(3);
            expect(cache.get(2)).toBe(2);
            expect(cache.get(1)).toBe(-1);
            cache.put(5, 5); // evicts 4
            expect(cache.get(1)).toBe(-1);
            expect(cache.get(2)).toBe(2);
            expect(cache.get(3)).toBe(3);
            expect(cache.get(4)).toBe(-1);
            expect(cache.get(5)).toBe(5);
        });
    });

    describe('Node Class', () => {
        test('should create node with correct properties', () => {
            const node = new Node(1, 10);
            expect(node.key).toBe(1);
            expect(node.value).toBe(10);
            expect(node.prev).toBeNull();
            expect(node.next).toBeNull();
        });

        test('should allow linking nodes', () => {
            const node1 = new Node(1, 10);
            const node2 = new Node(2, 20);

            node1.next = node2;
            node2.prev = node1;

            expect(node1.next).toBe(node2);
            expect(node2.prev).toBe(node1);
        });
    });

    describe('Utility Functions', () => {
        describe('simulateOperations', () => {
            test('should simulate cache operations with logging', () => {
                const cache = new LRUCache(2);
                const operations = ['put', 'put', 'get', 'put', 'get', 'get'];
                const params = [[1, 1], [2, 2], [1], [3, 3], [2], [3]];

                const { results, log } = simulateOperations(cache, operations, params);

                expect(results).toEqual([null, null, 1, null, -1, 3]);
                expect(log).toHaveLength(6);
                expect(log[0]).toContain('put(1, 1)');
                expect(log[2]).toContain('get(1) = 1');
            });

            test('should handle empty operations', () => {
                const cache = new LRUCache(2);
                const { results, log } = simulateOperations(cache, [], []);

                expect(results).toEqual([]);
                expect(log).toEqual([]);
            });
        });

        describe('compareLRUPerformance', () => {
            test('should compare performance of different implementations', () => {
                const results = compareLRUPerformance(10, 100);

                expect(results).toHaveProperty('HashMap + Doubly Linked List');
                expect(results).toHaveProperty('JavaScript Map');
                expect(results).toHaveProperty('Array-based');

                Object.values(results).forEach(result => {
                    expect(result).toHaveProperty('time');
                    expect(result).toHaveProperty('finalSize');
                    expect(result.time).toBeGreaterThanOrEqual(0);
                    expect(result.finalSize).toBeGreaterThanOrEqual(0);
                });
            });
        });

        describe('analyzeCacheHitRatio', () => {
            test('should analyze cache hit/miss patterns', () => {
                const cache = new LRUCache(3);
                const accessPattern = [1, 2, 3, 1, 4, 2, 1, 3, 4];

                const analysis = analyzeCacheHitRatio(cache, accessPattern);

                expect(analysis).toHaveProperty('hits');
                expect(analysis).toHaveProperty('misses');
                expect(analysis).toHaveProperty('hitRatio');
                expect(analysis).toHaveProperty('hitPattern');

                expect(analysis.hits + analysis.misses).toBe(accessPattern.length);
                expect(analysis.hitRatio).toBeGreaterThanOrEqual(0);
                expect(analysis.hitRatio).toBeLessThanOrEqual(1);
                expect(analysis.hitPattern).toHaveLength(accessPattern.length);
            });

            test('should handle all misses', () => {
                const cache = new LRUCache(2);
                const accessPattern = [1, 2, 3, 4, 5];

                const analysis = analyzeCacheHitRatio(cache, accessPattern);

                expect(analysis.hits).toBe(0);
                expect(analysis.misses).toBe(5);
                expect(analysis.hitRatio).toBe(0);
            });

            test('should handle all hits after initial misses', () => {
                const cache = new LRUCache(3);
                // Pre-populate cache
                cache.put(1, 10);
                cache.put(2, 20);
                cache.put(3, 30);

                const accessPattern = [1, 2, 3, 1, 2, 3];
                const analysis = analyzeCacheHitRatio(cache, accessPattern);

                expect(analysis.hits).toBe(6);
                expect(analysis.misses).toBe(0);
                expect(analysis.hitRatio).toBe(1);
            });
        });

        describe('visualizeCacheOperations', () => {
            test('should create visualization of cache operations', () => {
                const cache = new LRUCache(2);
                const operations = ['put', 'put', 'get'];
                const params = [[1, 1], [2, 2], [1]];

                const visualization = visualizeCacheOperations(cache, operations, params);

                expect(visualization).toContain('LRU Cache Operation Visualization');
                expect(visualization).toContain('Step 1: put(1, 1)');
                expect(visualization).toContain('Step 2: put(2, 2)');
                expect(visualization).toContain('Step 3: get(1) → 1');
                expect(visualization).toContain('Size:');
            });

            test('should handle empty operations', () => {
                const cache = new LRUCache(2);
                const visualization = visualizeCacheOperations(cache, [], []);

                expect(visualization).toContain('LRU Cache Operation Visualization');
                expect(visualization).not.toContain('Step 1:');
            });
        });

        describe('generateLRUTestCases', () => {
            test('should generate test cases with correct structure', () => {
                const { operations, params } = generateLRUTestCases(3, 10);

                expect(operations).toHaveLength(10);
                expect(params).toHaveLength(10);

                operations.forEach((op, i) => {
                    expect(['get', 'put']).toContain(op);
                    if (op === 'get') {
                        expect(params[i]).toHaveLength(1);
                    } else {
                        expect(params[i]).toHaveLength(2);
                    }
                });
            });

            test('should generate operations within expected ratios', () => {
                const { operations } = generateLRUTestCases(5, 1000);

                const putCount = operations.filter(op => op === 'put').length;
                const getCount = operations.filter(op => op === 'get').length;

                // Should be roughly 60% put, 40% get (with some variance due to randomness)
                expect(putCount).toBeGreaterThan(500);
                expect(getCount).toBeGreaterThan(300);
                expect(putCount + getCount).toBe(1000);
            });

            test('should handle small number of operations', () => {
                const { operations, params } = generateLRUTestCases(2, 1);

                expect(operations).toHaveLength(1);
                expect(params).toHaveLength(1);
            });

            test('should generate keys within expected range', () => {
                const capacity = 5;
                const { operations, params } = generateLRUTestCases(capacity, 100);

                params.forEach(param => {
                    expect(param[0]).toBeGreaterThanOrEqual(0);
                    expect(param[0]).toBeLessThan(capacity * 2);
                });
            });
        });
    });

    describe('Stress Tests', () => {
                test('should handle large number of operations', () => {
            const cache = new LRUCache(100);

            // First, fill the cache with 100 unique items
            for (let i = 0; i < 100; i++) {
                cache.put(i, i * 10);
            }

            // Then perform mixed operations
            for (let i = 0; i < 1000; i++) {
                if (i % 3 === 0) {
                    cache.put(i % 150, i);
                } else {
                    cache.get(i % 150);
                }
            }

            expect(cache.size()).toBe(100);
        });

        test('should maintain LRU property under stress', () => {
            const cache = new LRUCache(50);

            // Fill cache
            for (let i = 0; i < 50; i++) {
                cache.put(i, i * 10);
            }

            // Access first 25 items to make them recent
            for (let i = 0; i < 25; i++) {
                cache.get(i);
            }

            // Add 25 more items, should evict items 25-49
            for (let i = 50; i < 75; i++) {
                cache.put(i, i * 10);
            }

            // First 25 should still exist, 25-49 should be evicted
            for (let i = 0; i < 25; i++) {
                expect(cache.get(i)).toBe(i * 10);
            }
            for (let i = 25; i < 50; i++) {
                expect(cache.get(i)).toBe(-1);
            }
            for (let i = 50; i < 75; i++) {
                expect(cache.get(i)).toBe(i * 10);
            }
        });

        test('should handle repeated operations on same keys', () => {
            const cache = new LRUCache(3);

            // Repeatedly access same keys
            for (let i = 0; i < 100; i++) {
                cache.put(1, i);
                cache.put(2, i * 2);
                expect(cache.get(1)).toBe(i);
                expect(cache.get(2)).toBe(i * 2);
            }

            expect(cache.size()).toBe(2);
        });
    });

    describe('Algorithm Consistency', () => {
        test('all implementations should produce same results for same operations', () => {
            const operations = ['put', 'put', 'get', 'put', 'get', 'put', 'get', 'get', 'get'];
            const params = [[1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]];

            const results = implementations.map(({ class: LRUCacheClass }) => {
                const cache = new LRUCacheClass(2);
                const results = [];

                for (let i = 0; i < operations.length; i++) {
                    if (operations[i] === 'get') {
                        results.push(cache.get(params[i][0]));
                    } else {
                        cache.put(params[i][0], params[i][1]);
                        results.push(null);
                    }
                }

                return results;
            });

            // All implementations should produce the same results
            for (let i = 1; i < results.length; i++) {
                expect(results[i]).toEqual(results[0]);
            }
        });

        test('should handle edge case operations consistently', () => {
            const testCases = [
                { capacity: 1, ops: [['put', [1, 1]], ['get', [1]]] },
                { capacity: 2, ops: [['put', [1, 1]], ['put', [1, 2]], ['get', [1]]] },
                { capacity: 3, ops: [['get', [1]], ['put', [1, 1]], ['get', [1]]] }
            ];

            testCases.forEach(({ capacity, ops }) => {
                const results = implementations.map(({ class: LRUCacheClass }) => {
                    const cache = new LRUCacheClass(capacity);
                    return ops.map(([operation, params]) => {
                        if (operation === 'get') {
                            return cache.get(params[0]);
                        } else {
                            cache.put(params[0], params[1]);
                            return null;
                        }
                    });
                });

                // All implementations should produce the same results
                for (let i = 1; i < results.length; i++) {
                    expect(results[i]).toEqual(results[0]);
                }
            });
        });
    });
});