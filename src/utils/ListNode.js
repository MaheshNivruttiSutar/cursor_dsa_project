/**
 * Definition for singly-linked list node
 */
class ListNode {
    constructor(val, next = null) {
        this.val = val;
        this.next = next;
    }
}

/**
 * Creates a linked list from an array of values
 * @param {number[]} values - Array of values
 * @return {ListNode} - Head of the linked list
 */
function createLinkedList(values) {
    if (!values || values.length === 0) return null;

    const head = new ListNode(values[0]);
    let current = head;

    for (let i = 1; i < values.length; i++) {
        current.next = new ListNode(values[i]);
        current = current.next;
    }

    return head;
}

/**
 * Converts a linked list to an array
 * @param {ListNode} head - Head of the linked list
 * @return {number[]} - Array of values
 */
function linkedListToArray(head) {
    const result = [];
    let current = head;

    while (current) {
        result.push(current.val);
        current = current.next;
    }

    return result;
}

/**
 * Prints a linked list in readable format
 * @param {ListNode} head - Head of the linked list
 * @return {string} - String representation of the linked list
 */
function printLinkedList(head) {
    const values = linkedListToArray(head);
    return values.join(' -> ') + ' -> null';
}

module.exports = {
    ListNode,
    createLinkedList,
    linkedListToArray,
    printLinkedList
};