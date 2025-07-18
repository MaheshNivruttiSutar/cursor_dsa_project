const { ListNode } = require('../utils/ListNode');

/**
 * Merge Two Sorted Lists
 * You are given the heads of two sorted linked lists list1 and list2.
 * Merge the two lists into one sorted list. The list should be made by splicing together
 * the nodes of the first two lists.
 * Return the head of the merged linked list.
 *
 * Example 1:
 * Input: list1 = [1,2,4], list2 = [1,3,4]
 * Output: [1,1,2,3,4,4]
 *
 * Example 2:
 * Input: list1 = [], list2 = []
 * Output: []
 *
 * Example 3:
 * Input: list1 = [], list2 = [0]
 * Output: [0]
 *
 * Time Complexity: O(m + n)
 * Space Complexity: O(1)
 *
 * @param {ListNode} list1 - Head of first sorted linked list
 * @param {ListNode} list2 - Head of second sorted linked list
 * @return {ListNode} - Head of merged sorted linked list
 */
function mergeTwoLists(list1, list2) {
    // Create a dummy node to simplify edge cases
    const dummy = new ListNode(0);
    let current = dummy;

    // Merge the lists
    while (list1 && list2) {
        if (list1.val <= list2.val) {
            current.next = list1;
            list1 = list1.next;
        } else {
            current.next = list2;
            list2 = list2.next;
        }
        current = current.next;
    }

    // Append remaining nodes
    current.next = list1 || list2;

    return dummy.next;
}

/**
 * Merge Two Sorted Lists - Recursive approach
 *
 * Time Complexity: O(m + n)
 * Space Complexity: O(m + n) - due to recursion stack
 *
 * @param {ListNode} list1 - Head of first sorted linked list
 * @param {ListNode} list2 - Head of second sorted linked list
 * @return {ListNode} - Head of merged sorted linked list
 */
function mergeTwoListsRecursive(list1, list2) {
    // Base cases
    if (!list1) return list2;
    if (!list2) return list1;

    // Recursive case
    if (list1.val <= list2.val) {
        list1.next = mergeTwoListsRecursive(list1.next, list2);
        return list1;
    } else {
        list2.next = mergeTwoListsRecursive(list1, list2.next);
        return list2;
    }
}

module.exports = {
    mergeTwoLists,
    mergeTwoListsRecursive
};