const {
    mergeKLists,
    mergeKListsWithPriorityQueue,
    mergeKListsBruteForce,
    mergeKListsRecursive,
    mergeTwoLists,
    mergeTwoListsIterative
} = require('./mergeKSortedLists');
const { createLinkedList, linkedListToArray } = require('../utils/ListNode');

describe('Merge k Sorted Lists', () => {
    describe('mergeKLists (Divide and Conquer)', () => {
        test('should merge k sorted lists', () => {
            const lists = [
                createLinkedList([1, 4, 5]),
                createLinkedList([1, 3, 4]),
                createLinkedList([2, 6])
            ];

            const result = mergeKLists(lists);
            expect(linkedListToArray(result)).toEqual([1, 1, 2, 3, 4, 4, 5, 6]);
        });

        test('should handle empty array', () => {
            const result = mergeKLists([]);
            expect(result).toBeNull();
        });

        test('should handle array with empty lists', () => {
            const result = mergeKLists([null, null, null]);
            expect(result).toBeNull();
        });

        test('should handle single list', () => {
            const lists = [createLinkedList([1, 2, 3])];
            const result = mergeKLists(lists);
            expect(linkedListToArray(result)).toEqual([1, 2, 3]);
        });

        test('should handle two lists', () => {
            const lists = [
                createLinkedList([1, 3, 5]),
                createLinkedList([2, 4, 6])
            ];

            const result = mergeKLists(lists);
            expect(linkedListToArray(result)).toEqual([1, 2, 3, 4, 5, 6]);
        });

        test('should handle lists with different lengths', () => {
            const lists = [
                createLinkedList([1]),
                createLinkedList([2, 3, 4, 5, 6]),
                createLinkedList([7, 8])
            ];

            const result = mergeKLists(lists);
            expect(linkedListToArray(result)).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
        });

        test('should handle lists with duplicate values', () => {
            const lists = [
                createLinkedList([1, 1, 2]),
                createLinkedList([1, 1, 2]),
                createLinkedList([1, 2, 2])
            ];

            const result = mergeKLists(lists);
            expect(linkedListToArray(result)).toEqual([1, 1, 1, 1, 1, 2, 2, 2, 2]);
        });
    });

    describe('mergeKListsWithPriorityQueue', () => {
        test('should merge k sorted lists with priority queue', () => {
            const lists = [
                createLinkedList([1, 4, 5]),
                createLinkedList([1, 3, 4]),
                createLinkedList([2, 6])
            ];

            const result = mergeKListsWithPriorityQueue(lists);
            expect(linkedListToArray(result)).toEqual([1, 1, 2, 3, 4, 4, 5, 6]);
        });

        test('should handle empty array - priority queue', () => {
            const result = mergeKListsWithPriorityQueue([]);
            expect(result).toBeNull();
        });

        test('should handle single list - priority queue', () => {
            const lists = [createLinkedList([1, 2, 3])];
            const result = mergeKListsWithPriorityQueue(lists);
            expect(linkedListToArray(result)).toEqual([1, 2, 3]);
        });
    });

    describe('mergeKListsBruteForce', () => {
        test('should merge k sorted lists - brute force', () => {
            const lists = [
                createLinkedList([1, 4, 5]),
                createLinkedList([1, 3, 4]),
                createLinkedList([2, 6])
            ];

            const result = mergeKListsBruteForce(lists);
            expect(linkedListToArray(result)).toEqual([1, 1, 2, 3, 4, 4, 5, 6]);
        });

        test('should handle empty array - brute force', () => {
            const result = mergeKListsBruteForce([]);
            expect(result).toBeNull();
        });

        test('should handle single list - brute force', () => {
            const lists = [createLinkedList([1, 2, 3])];
            const result = mergeKListsBruteForce(lists);
            expect(linkedListToArray(result)).toEqual([1, 2, 3]);
        });
    });

    describe('mergeKListsRecursive', () => {
        test('should merge k sorted lists - recursive', () => {
            const lists = [
                createLinkedList([1, 4, 5]),
                createLinkedList([1, 3, 4]),
                createLinkedList([2, 6])
            ];

            const result = mergeKListsRecursive(lists);
            expect(linkedListToArray(result)).toEqual([1, 1, 2, 3, 4, 4, 5, 6]);
        });

        test('should handle empty array - recursive', () => {
            const result = mergeKListsRecursive([]);
            expect(result).toBeNull();
        });

        test('should handle single list - recursive', () => {
            const lists = [createLinkedList([1, 2, 3])];
            const result = mergeKListsRecursive(lists);
            expect(linkedListToArray(result)).toEqual([1, 2, 3]);
        });
    });

    describe('mergeTwoLists', () => {
        test('should merge two sorted lists', () => {
            const list1 = createLinkedList([1, 2, 4]);
            const list2 = createLinkedList([1, 3, 4]);

            const result = mergeTwoLists(list1, list2);
            expect(linkedListToArray(result)).toEqual([1, 1, 2, 3, 4, 4]);
        });

        test('should handle one empty list', () => {
            const list1 = createLinkedList([1, 2, 3]);
            const list2 = null;

            const result = mergeTwoLists(list1, list2);
            expect(linkedListToArray(result)).toEqual([1, 2, 3]);
        });

        test('should handle both empty lists', () => {
            const result = mergeTwoLists(null, null);
            expect(result).toBeNull();
        });
    });

    describe('mergeTwoListsIterative', () => {
        test('should merge two sorted lists iteratively', () => {
            const list1 = createLinkedList([1, 2, 4]);
            const list2 = createLinkedList([1, 3, 4]);

            const result = mergeTwoListsIterative(list1, list2);
            expect(linkedListToArray(result)).toEqual([1, 1, 2, 3, 4, 4]);
        });

        test('should handle one empty list - iterative', () => {
            const list1 = createLinkedList([1, 2, 3]);
            const list2 = null;

            const result = mergeTwoListsIterative(list1, list2);
            expect(linkedListToArray(result)).toEqual([1, 2, 3]);
        });

        test('should handle both empty lists - iterative', () => {
            const result = mergeTwoListsIterative(null, null);
            expect(result).toBeNull();
        });
    });

    describe('Comparison between approaches', () => {
        test('all approaches should give same results', () => {
            const testCases = [
                [
                    createLinkedList([1, 4, 5]),
                    createLinkedList([1, 3, 4]),
                    createLinkedList([2, 6])
                ],
                [
                    createLinkedList([1]),
                    createLinkedList([2, 3, 4]),
                    createLinkedList([5, 6])
                ],
                [
                    createLinkedList([1, 2, 3]),
                    createLinkedList([4, 5, 6])
                ],
                [createLinkedList([1, 2, 3])],
                []
            ];

            testCases.forEach(lists => {
                // Create separate copies for each approach since they modify the lists
                const lists1 = lists.map(list => {
                    if (!list) return null;
                    return createLinkedList(linkedListToArray(list));
                });
                const lists2 = lists.map(list => {
                    if (!list) return null;
                    return createLinkedList(linkedListToArray(list));
                });
                const lists3 = lists.map(list => {
                    if (!list) return null;
                    return createLinkedList(linkedListToArray(list));
                });
                const lists4 = lists.map(list => {
                    if (!list) return null;
                    return createLinkedList(linkedListToArray(list));
                });

                const result1 = mergeKLists(lists1);
                const result2 = mergeKListsWithPriorityQueue(lists2);
                const result3 = mergeKListsBruteForce(lists3);
                const result4 = mergeKListsRecursive(lists4);

                const array1 = linkedListToArray(result1);
                const array2 = linkedListToArray(result2);
                const array3 = linkedListToArray(result3);
                const array4 = linkedListToArray(result4);

                expect(array1).toEqual(array2);
                expect(array1).toEqual(array3);
                expect(array1).toEqual(array4);
            });
        });
    });

    describe('Edge cases', () => {
        test('should handle large number of lists', () => {
            const lists = [];
            for (let i = 0; i < 100; i++) {
                lists.push(createLinkedList([i, i + 100, i + 200]));
            }

            const result = mergeKLists(lists);
            expect(linkedListToArray(result)).toHaveLength(300);

            // Check if result is sorted
            const resultArray = linkedListToArray(result);
            for (let i = 1; i < resultArray.length; i++) {
                expect(resultArray[i]).toBeGreaterThanOrEqual(resultArray[i - 1]);
            }
        });

        test('should handle negative numbers', () => {
            const lists = [
                createLinkedList([-2, -1, 0]),
                createLinkedList([-3, -2, 1]),
                createLinkedList([-1, 0, 2])
            ];

            const result = mergeKLists(lists);
            expect(linkedListToArray(result)).toEqual([-3, -2, -2, -1, -1, 0, 0, 1, 2]);
        });

        test('should handle single element lists', () => {
            const lists = [
                createLinkedList([5]),
                createLinkedList([1]),
                createLinkedList([3]),
                createLinkedList([2])
            ];

            const result = mergeKLists(lists);
            expect(linkedListToArray(result)).toEqual([1, 2, 3, 5]);
        });
    });
});