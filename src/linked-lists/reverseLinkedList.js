const { ListNode } = require('../utils/ListNode');

/**
 * Reverse Linked List Problem
 * Given the head of a singly linked list, reverse the list, and return the reversed list.
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 *
 * @param {ListNode} head - Head of the linked list
 * @return {ListNode} - Head of the reversed linked list
 */
function reverseList(head) {
    let prev = null;
    let current = head;

    while (current) {
        // Store the next node
        const nextNode = current.next;

        // Reverse the current node's pointer
        current.next = prev;

        // Move pointers one position ahead
        prev = current;
        current = nextNode;
    }

    return prev; // prev is now the new head
}

/**
 * Reverse Linked List (Recursive approach)
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n) - due to recursion stack
 *
 * @param {ListNode} head - Head of the linked list
 * @return {ListNode} - Head of the reversed linked list
 */
function reverseListRecursive(head) {
    // Base case
    if (!head || !head.next) {
        return head;
    }

    // Recursively reverse the rest of the list
    const newHead = reverseListRecursive(head.next);

    // Reverse the current connection
    head.next.next = head;
    head.next = null;

    return newHead;
}

module.exports = {
    reverseList,
    reverseListRecursive
};