const { mergeTwoLists, mergeTwoListsRecursive } = require('./mergeTwoLists');
const { createLinkedList, linkedListToArray } = require('../utils/ListNode');

describe('Merge Two Sorted Lists', () => {
    const testCases = [
        {
            list1: [1, 2, 4],
            list2: [1, 3, 4],
            expected: [1, 1, 2, 3, 4, 4],
            description: 'two non-empty lists'
        },
        {
            list1: [],
            list2: [],
            expected: [],
            description: 'two empty lists'
        },
        {
            list1: [],
            list2: [0],
            expected: [0],
            description: 'one empty, one non-empty'
        },
        {
            list1: [1, 2, 3],
            list2: [4, 5, 6],
            expected: [1, 2, 3, 4, 5, 6],
            description: 'non-overlapping ranges'
        },
        {
            list1: [4, 5, 6],
            list2: [1, 2, 3],
            expected: [1, 2, 3, 4, 5, 6],
            description: 'non-overlapping ranges (reversed)'
        },
        {
            list1: [1],
            list2: [2],
            expected: [1, 2],
            description: 'single elements'
        },
        {
            list1: [1, 1, 1],
            list2: [2, 2, 2],
            expected: [1, 1, 1, 2, 2, 2],
            description: 'duplicate values'
        }
    ];

    describe('Iterative approach', () => {
        testCases.forEach(({ list1, list2, expected, description }) => {
            test(`should merge ${description}`, () => {
                const l1 = createLinkedList(list1);
                const l2 = createLinkedList(list2);
                const result = mergeTwoLists(l1, l2);
                expect(linkedListToArray(result)).toEqual(expected);
            });
        });
    });

    describe('Recursive approach', () => {
        testCases.forEach(({ list1, list2, expected, description }) => {
            test(`should merge ${description}`, () => {
                const l1 = createLinkedList(list1);
                const l2 = createLinkedList(list2);
                const result = mergeTwoListsRecursive(l1, l2);
                expect(linkedListToArray(result)).toEqual(expected);
            });
        });
    });
});