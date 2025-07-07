 const { ListNode } = require('../utils/ListNode');

/**
 * Merge k Sorted Lists
 * You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.
 * Merge all the linked-lists into one sorted linked-list and return it.
 *
 * Example 1:
 * Input: lists = [[1,4,5],[1,3,4],[2,6]]
 * Output: [1,1,2,3,4,4,5,6]
 *
 * Example 2:
 * Input: lists = []
 * Output: []
 *
 * Example 3:
 * Input: lists = [[]]
 * Output: []
 *
 * Time Complexity: O(N log k) where N is total number of nodes and k is number of lists
 * Space Complexity: O(log k) for recursion stack
 *
 * @param {ListNode[]} lists - Array of sorted linked lists
 * @return {ListNode} - Merged sorted linked list
 */
function mergeKLists(lists) {
    if (!lists || lists.length === 0) return null;

    // Divide and conquer approach
    while (lists.length > 1) {
        const mergedLists = [];

        // Merge pairs of lists
        for (let i = 0; i < lists.length; i += 2) {
            const list1 = lists[i];
            const list2 = i + 1 < lists.length ? lists[i + 1] : null;
            mergedLists.push(mergeTwoLists(list1, list2));
        }

        lists = mergedLists;
    }

    return lists[0];
}

/**
 * Merge k Sorted Lists - Using Priority Queue (Min Heap simulation)
 *
 * Time Complexity: O(N log k)
 * Space Complexity: O(k)
 *
 * @param {ListNode[]} lists - Array of sorted linked lists
 * @return {ListNode} - Merged sorted linked list
 */
function mergeKListsWithPriorityQueue(lists) {
    if (!lists || lists.length === 0) return null;

    // Priority queue simulation using array
    const pq = [];

    // Add first node of each list to priority queue
    for (const list of lists) {
        if (list) {
            pq.push(list);
        }
    }

    // Sort by value (min heap)
    pq.sort((a, b) => a.val - b.val);

    const dummy = new ListNode(0);
    let current = dummy;

    while (pq.length > 0) {
        // Get node with minimum value
        const minNode = pq.shift();
        current.next = minNode;
        current = current.next;

        // Add next node if exists
        if (minNode.next) {
            pq.push(minNode.next);
            pq.sort((a, b) => a.val - b.val);
        }
    }

    return dummy.next;
}

/**
 * Merge k Sorted Lists - Brute Force (merge one by one)
 *
 * Time Complexity: O(k²N) where N is average length of lists
 * Space Complexity: O(1)
 *
 * @param {ListNode[]} lists - Array of sorted linked lists
 * @return {ListNode} - Merged sorted linked list
 */
function mergeKListsBruteForce(lists) {
    if (!lists || lists.length === 0) return null;

    let result = null;

    for (const list of lists) {
        result = mergeTwoLists(result, list);
    }

    return result;
}

/**
 * Helper function to merge two sorted linked lists
 *
 * @param {ListNode} list1 - First sorted linked list
 * @param {ListNode} list2 - Second sorted linked list
 * @return {ListNode} - Merged sorted linked list
 */
function mergeTwoLists(list1, list2) {
    if (!list1) return list2;
    if (!list2) return list1;

    if (list1.val <= list2.val) {
        list1.next = mergeTwoLists(list1.next, list2);
        return list1;
    } else {
        list2.next = mergeTwoLists(list1, list2.next);
        return list2;
    }
}

/**
 * Helper function to merge two sorted linked lists iteratively
 *
 * @param {ListNode} list1 - First sorted linked list
 * @param {ListNode} list2 - Second sorted linked list
 * @return {ListNode} - Merged sorted linked list
 */
function mergeTwoListsIterative(list1, list2) {
    const dummy = new ListNode(0);
    let current = dummy;

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

    // Attach remaining nodes
    current.next = list1 || list2;

    return dummy.next;
}

/**
 * Merge k Sorted Lists - Using divide and conquer with explicit recursion
 *
 * Time Complexity: O(N log k)
 * Space Complexity: O(log k)
 *
 * @param {ListNode[]} lists - Array of sorted linked lists
 * @return {ListNode} - Merged sorted linked list
 */
function mergeKListsRecursive(lists) {
    if (!lists || lists.length === 0) return null;

    return mergeHelper(lists, 0, lists.length - 1);
}

/**
 * Helper function for recursive merge
 *
 * @param {ListNode[]} lists - Array of sorted linked lists
 * @param {number} left - Left index
 * @param {number} right - Right index
 * @return {ListNode} - Merged sorted linked list
 */
function mergeHelper(lists, left, right) {
    if (left === right) return lists[left];
    if (left > right) return null;

    const mid = Math.floor((left + right) / 2);
    const leftList = mergeHelper(lists, left, mid);
    const rightList = mergeHelper(lists, mid + 1, right);

    return mergeTwoLists(leftList, rightList);
}

module.exports = {
    mergeKLists,
    mergeKListsWithPriorityQueue,
    mergeKListsBruteForce,
    mergeKListsRecursive,
    mergeTwoLists,
    mergeTwoListsIterative,
    mergeHelper
};