const { reverseList, reverseListRecursive } = require('./reverseLinkedList');
const { createLinkedList, linkedListToArray } = require('../utils/ListNode');

describe('Reverse Linked List', () => {
    describe('Iterative approach', () => {
        test('should reverse a linked list', () => {
            const head = createLinkedList([1, 2, 3, 4, 5]);
            const reversed = reverseList(head);
            expect(linkedListToArray(reversed)).toEqual([5, 4, 3, 2, 1]);
        });

        test('should handle single node', () => {
            const head = createLinkedList([1]);
            const reversed = reverseList(head);
            expect(linkedListToArray(reversed)).toEqual([1]);
        });

        test('should handle empty list', () => {
            const reversed = reverseList(null);
            expect(reversed).toBeNull();
        });

        test('should handle two nodes', () => {
            const head = createLinkedList([1, 2]);
            const reversed = reverseList(head);
            expect(linkedListToArray(reversed)).toEqual([2, 1]);
        });
    });

    describe('Recursive approach', () => {
        test('should reverse a linked list recursively', () => {
            const head = createLinkedList([1, 2, 3, 4, 5]);
            const reversed = reverseListRecursive(head);
            expect(linkedListToArray(reversed)).toEqual([5, 4, 3, 2, 1]);
        });

        test('should handle single node recursively', () => {
            const head = createLinkedList([1]);
            const reversed = reverseListRecursive(head);
            expect(linkedListToArray(reversed)).toEqual([1]);
        });

        test('should handle empty list recursively', () => {
            const reversed = reverseListRecursive(null);
            expect(reversed).toBeNull();
        });

        test('should handle two nodes recursively', () => {
            const head = createLinkedList([1, 2]);
            const reversed = reverseListRecursive(head);
            expect(linkedListToArray(reversed)).toEqual([2, 1]);
        });
    });
});