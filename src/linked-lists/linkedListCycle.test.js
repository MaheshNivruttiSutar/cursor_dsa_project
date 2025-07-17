const {
    hasCycle,
    hasCycleHashSet,
    hasCycleMarking,
    detectCycle,
    getCycleLength,
    getCycleInfo,
    createListWithCycle,
    listToArraySafe,
    removeCycle,
    visualizeList
} = require('./linkedListCycle');

const { ListNode } = require('../utils/ListNode');

describe('Linked List Cycle Detection', () => {

    // Test all main implementations with the same test cases
    const implementations = [
        { name: 'Floyd\'s Algorithm', func: hasCycle },
        { name: 'Hash Set', func: hasCycleHashSet },
        { name: 'Node Marking', func: hasCycleMarking }
    ];

    implementations.forEach(({ name, func }) => {
        describe(`${name} Implementation`, () => {

            describe('Basic Cycle Detection', () => {
                test('should detect cycle when present', () => {
                    const head = createListWithCycle([3, 2, 0, -4], 1);
                    expect(func(head)).toBe(true);
                });

                test('should detect cycle in two-node list', () => {
                    const head = createListWithCycle([1, 2], 0);
                    expect(func(head)).toBe(true);
                });

                test('should detect no cycle in linear list', () => {
                    const head = createListWithCycle([1, 2, 3, 4, 5], -1);
                    expect(func(head)).toBe(false);
                });

                test('should handle single node with self-cycle', () => {
                    const head = new ListNode(1);
                    head.next = head;
                    expect(func(head)).toBe(true);
                });

                test('should handle single node without cycle', () => {
                    const head = new ListNode(1);
                    expect(func(head)).toBe(false);
                });

                test('should handle empty list', () => {
                    expect(func(null)).toBe(false);
                });
            });

            describe('Various Cycle Positions', () => {
                test('should detect cycle at beginning', () => {
                    const head = createListWithCycle([1, 2, 3, 4], 0);
                    expect(func(head)).toBe(true);
                });

                test('should detect cycle in middle', () => {
                    const head = createListWithCycle([1, 2, 3, 4, 5], 2);
                    expect(func(head)).toBe(true);
                });

                test('should detect cycle at end', () => {
                    const head = createListWithCycle([1, 2, 3, 4], 3);
                    expect(func(head)).toBe(true);
                });

                test('should handle large cycles', () => {
                    const values = Array.from({ length: 100 }, (_, i) => i);
                    const head = createListWithCycle(values, 50);
                    expect(func(head)).toBe(true);
                });
            });

            describe('Edge Cases', () => {
                test('should handle two-node cycle', () => {
                    const node1 = new ListNode(1);
                    const node2 = new ListNode(2);
                    node1.next = node2;
                    node2.next = node1;
                    expect(func(node1)).toBe(true);
                });

                test('should handle list with duplicate values', () => {
                    const head = createListWithCycle([1, 1, 1, 1], 1);
                    expect(func(head)).toBe(true);
                });

                test('should handle negative values', () => {
                    const head = createListWithCycle([-1, -2, -3, -4], 2);
                    expect(func(head)).toBe(true);
                });
            });
        });
    });

    describe('Enhanced Cycle Detection Functions', () => {
        describe('detectCycle', () => {
            test('should find cycle start node', () => {
                const head = createListWithCycle([3, 2, 0, -4], 1);
                const cycleStart = detectCycle(head);
                expect(cycleStart).not.toBeNull();
                expect(cycleStart.val).toBe(2);
            });

            test('should return null when no cycle', () => {
                const head = createListWithCycle([1, 2, 3, 4], -1);
                expect(detectCycle(head)).toBeNull();
            });

            test('should handle self-cycle', () => {
                const head = new ListNode(1);
                head.next = head;
                const cycleStart = detectCycle(head);
                expect(cycleStart).toBe(head);
            });

            test('should handle empty list', () => {
                expect(detectCycle(null)).toBeNull();
            });
        });

        describe('getCycleLength', () => {
            test('should calculate cycle length correctly', () => {
                const head = createListWithCycle([3, 2, 0, -4], 1);
                expect(getCycleLength(head)).toBe(3);
            });

            test('should return 0 for no cycle', () => {
                const head = createListWithCycle([1, 2, 3], -1);
                expect(getCycleLength(head)).toBe(0);
            });

            test('should handle self-cycle', () => {
                const head = new ListNode(1);
                head.next = head;
                expect(getCycleLength(head)).toBe(1);
            });

            test('should handle two-node cycle', () => {
                const head = createListWithCycle([1, 2], 0);
                expect(getCycleLength(head)).toBe(2);
            });
        });

        describe('getCycleInfo', () => {
            test('should provide comprehensive cycle information', () => {
                const head = createListWithCycle([1, 2, 3, 4, 5], 2);
                const info = getCycleInfo(head);

                expect(info.hasCycle).toBe(true);
                expect(info.cycleStart.val).toBe(3);
                expect(info.cycleLength).toBe(3);
                expect(info.distanceToStart).toBe(2);
            });

            test('should handle no cycle case', () => {
                const head = createListWithCycle([1, 2, 3], -1);
                const info = getCycleInfo(head);

                expect(info.hasCycle).toBe(false);
                expect(info.cycleStart).toBeNull();
                expect(info.cycleLength).toBe(0);
                expect(info.distanceToStart).toBe(0);
            });

            test('should handle cycle at beginning', () => {
                const head = createListWithCycle([1, 2, 3], 0);
                const info = getCycleInfo(head);

                expect(info.hasCycle).toBe(true);
                expect(info.cycleStart.val).toBe(1);
                expect(info.distanceToStart).toBe(0);
            });
        });
    });

    describe('Utility Functions', () => {
        describe('createListWithCycle', () => {
            test('should create list without cycle', () => {
                const head = createListWithCycle([1, 2, 3], -1);
                expect(hasCycle(head)).toBe(false);
            });

            test('should create list with cycle', () => {
                const head = createListWithCycle([1, 2, 3], 1);
                expect(hasCycle(head)).toBe(true);
            });

            test('should handle empty array', () => {
                expect(createListWithCycle([])).toBeNull();
            });

            test('should handle invalid cycle position', () => {
                const head = createListWithCycle([1, 2, 3], 5);
                expect(hasCycle(head)).toBe(false);
            });
        });

        describe('listToArraySafe', () => {
            test('should convert linear list to array', () => {
                const head = createListWithCycle([1, 2, 3, 4], -1);
                const array = listToArraySafe(head);
                expect(array).toEqual([1, 2, 3, 4]);
            });

            test('should detect cycle in conversion', () => {
                const head = createListWithCycle([1, 2, 3], 1);
                const array = listToArraySafe(head, 10);
                expect(array).toContain('[CYCLE DETECTED at 2]');
            });

            test('should respect max length', () => {
                const head = createListWithCycle([1, 2, 3], 0);
                const array = listToArraySafe(head, 5);
                expect(array.length).toBeLessThanOrEqual(6); // Including cycle detection message
            });

            test('should handle empty list', () => {
                expect(listToArraySafe(null)).toEqual([]);
            });
        });

        describe('removeCycle', () => {
            test('should remove cycle from list', () => {
                const head = createListWithCycle([1, 2, 3, 4], 1);
                expect(hasCycle(head)).toBe(true);

                const modifiedHead = removeCycle(head);
                expect(hasCycle(modifiedHead)).toBe(false);
            });

            test('should not modify list without cycle', () => {
                const head = createListWithCycle([1, 2, 3, 4], -1);
                const originalArray = listToArraySafe(head);

                const modifiedHead = removeCycle(head);
                const modifiedArray = listToArraySafe(modifiedHead);

                expect(modifiedArray).toEqual(originalArray);
            });

            test('should handle self-cycle', () => {
                const head = new ListNode(1);
                head.next = head;

                const modifiedHead = removeCycle(head);
                expect(hasCycle(modifiedHead)).toBe(false);
                expect(modifiedHead.next).toBeNull();
            });
        });

        describe('visualizeList', () => {
            test('should visualize linear list', () => {
                const head = createListWithCycle([1, 2, 3], -1);
                const visualization = visualizeList(head);

                expect(visualization).toContain('1 -> 2 -> 3 -> null');
                expect(visualization).toContain('No cycle detected');
            });

            test('should visualize cyclic list', () => {
                const head = createListWithCycle([1, 2, 3], 1);
                const visualization = visualizeList(head);

                expect(visualization).toContain('Cycle detected');
                expect(visualization).toContain('Cycle starts at node with value: 2');
                expect(visualization).toContain('Cycle length: 2');
            });

            test('should handle empty list', () => {
                const visualization = visualizeList(null);
                expect(visualization).toBe('Empty list');
            });
        });
    });

    describe('Performance Tests', () => {
        test('should handle large lists efficiently', () => {
            const values = Array.from({ length: 10000 }, (_, i) => i);
            const head = createListWithCycle(values, 5000);

            const startTime = performance.now();
            const result = hasCycle(head);
            const endTime = performance.now();

            expect(result).toBe(true);
            expect(endTime - startTime).toBeLessThan(50); // Should be very fast
        });

        test('should handle worst-case linear search', () => {
            const values = Array.from({ length: 5000 }, (_, i) => i);
            const head = createListWithCycle(values, -1); // No cycle

            const startTime = performance.now();
            const result = hasCycle(head);
            const endTime = performance.now();

            expect(result).toBe(false);
            expect(endTime - startTime).toBeLessThan(25);
        });
    });

    describe('Algorithm Consistency', () => {
        test('all cycle detection methods should agree', () => {
            const testCases = [
                { values: [3, 2, 0, -4], cyclePos: 1 },
                { values: [1, 2], cyclePos: 0 },
                { values: [1], cyclePos: -1 },
                { values: [1, 2, 3, 4, 5], cyclePos: -1 },
                { values: [1, 2, 3, 4, 5], cyclePos: 2 }
            ];

            testCases.forEach(({ values, cyclePos }) => {
                const head1 = createListWithCycle([...values], cyclePos);
                const head2 = createListWithCycle([...values], cyclePos);
                const head3 = createListWithCycle([...values], cyclePos);

                const result1 = hasCycle(head1);
                const result2 = hasCycleHashSet(head2);
                const result3 = hasCycleMarking(head3);

                expect(result1).toBe(result2);
                expect(result2).toBe(result3);
            });
        });

        test('cycle start detection should be consistent', () => {
            const testCases = [
                { values: [1, 2, 3, 4, 5], cyclePos: 2 },
                { values: [1, 2, 3], cyclePos: 0 },
                { values: [1, 2, 3, 4], cyclePos: 1 }
            ];

            testCases.forEach(({ values, cyclePos }) => {
                const head = createListWithCycle(values, cyclePos);
                const cycleStart = detectCycle(head);
                const cycleInfo = getCycleInfo(head);

                if (cyclePos >= 0) {
                    expect(cycleStart).toBe(cycleInfo.cycleStart);
                    expect(cycleStart.val).toBe(values[cyclePos]);
                } else {
                    expect(cycleStart).toBeNull();
                    expect(cycleInfo.cycleStart).toBeNull();
                }
            });
        });
    });
});