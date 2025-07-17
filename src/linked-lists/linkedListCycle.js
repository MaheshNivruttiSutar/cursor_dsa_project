/**
 * Linked List Cycle Implementation
 *
 * LeetCode #141 - Given head, the head of a linked list, determine if the linked list has a cycle in it.
 * There is a cycle in a linked list if there is some node in the list that can be reached again
 * by continuously following the next pointer.
 *
 * Follow-up: Can you solve it using O(1) (constant) memory?
 *
 * Company Tags: Amazon, Microsoft, Google, Facebook, Apple, Bloomberg, Adobe
 * Difficulty: Easy
 * Pattern: Two Pointers (Floyd's Cycle Detection), Hash Set
 */

const { ListNode } = require('../utils/ListNode');

/**
 * Approach 1: Floyd's Cycle Detection (Two Pointers) - Optimal
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 *
 * Algorithm:
 * 1. Use two pointers: slow (moves 1 step) and fast (moves 2 steps)
 * 2. If there's no cycle, fast will reach null
 * 3. If there's a cycle, fast will eventually meet slow
 *
 * @param {ListNode} head - Head of the linked list
 * @return {boolean} - True if cycle exists
 */
function hasCycle(head) {
    if (!head || !head.next) return false;

    let slow = head;
    let fast = head;

    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;

        if (slow === fast) {
            return true;
        }
    }

    return false;
}

/**
 * Approach 2: Hash Set
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 *
 * @param {ListNode} head
 * @return {boolean}
 */
function hasCycleHashSet(head) {
    if (!head) return false;

    const visited = new Set();
    let current = head;

    while (current) {
        if (visited.has(current)) {
            return true;
        }
        visited.add(current);
        current = current.next;
    }

    return false;
}

/**
 * Approach 3: Marking Nodes (Modifies List)
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 *
 * Note: This approach modifies the original list
 *
 * @param {ListNode} head
 * @return {boolean}
 */
function hasCycleMarking(head) {
    if (!head) return false;

    const VISITED = Symbol('visited');
    let current = head;

    while (current) {
        if (current[VISITED]) {
            return true;
        }
        current[VISITED] = true;
        current = current.next;
    }

    return false;
}

/**
 * Enhanced: Detect Cycle and Find Cycle Start (LeetCode #142)
 *
 * @param {ListNode} head
 * @return {ListNode|null} - Returns the node where cycle begins, or null if no cycle
 */
function detectCycle(head) {
    if (!head || !head.next) return null;

    // Phase 1: Detect if cycle exists
    let slow = head;
    let fast = head;

    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;

        if (slow === fast) {
            // Phase 2: Find cycle start
            let start = head;
            while (start !== slow) {
                start = start.next;
                slow = slow.next;
            }
            return start;
        }
    }

    return null;
}

/**
 * Enhanced: Get Cycle Length
 *
 * @param {ListNode} head
 * @return {number} - Length of the cycle, or 0 if no cycle
 */
function getCycleLength(head) {
    if (!head || !head.next) return 0;

    let slow = head;
    let fast = head;

    // Detect cycle
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;

        if (slow === fast) {
            // Found cycle, now count length
            let length = 1;
            let current = slow.next;

            while (current !== slow) {
                current = current.next;
                length++;
            }

            return length;
        }
    }

    return 0;
}

/**
 * Enhanced: Get Cycle Information
 *
 * @param {ListNode} head
 * @return {object|null} - Cycle information or null if no cycle
 */
function getCycleInfo(head) {
    if (!head || !head.next) return null;

    let slow = head;
    let fast = head;

    // Phase 1: Detect cycle
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;

        if (slow === fast) {
            // Phase 2: Find cycle start
            let start = head;
            let distanceToStart = 0;

            while (start !== slow) {
                start = start.next;
                slow = slow.next;
                distanceToStart++;
            }

            // Phase 3: Find cycle length
            let length = 1;
            let current = start.next;

            while (current !== start) {
                current = current.next;
                length++;
            }

            return {
                hasCycle: true,
                cycleStart: start,
                cycleLength: length,
                distanceToStart: distanceToStart
            };
        }
    }

    return {
        hasCycle: false,
        cycleStart: null,
        cycleLength: 0,
        distanceToStart: 0
    };
}

/**
 * Utility: Create a linked list with cycle for testing
 *
 * @param {number[]} values - Array of values
 * @param {number} cyclePos - Position where cycle starts (-1 for no cycle)
 * @return {ListNode} - Head of the list
 */
function createListWithCycle(values, cyclePos = -1) {
    if (!values || values.length === 0) return null;

    const head = new ListNode(values[0]);
    let current = head;
    const nodes = [head];

    // Create the list
    for (let i = 1; i < values.length; i++) {
        current.next = new ListNode(values[i]);
        current = current.next;
        nodes.push(current);
    }

    // Create cycle if specified
    if (cyclePos >= 0 && cyclePos < values.length) {
        current.next = nodes[cyclePos];
    }

    return head;
}

/**
 * Utility: Convert linked list to array (handles cycles)
 *
 * @param {ListNode} head
 * @param {number} maxLength - Maximum length to prevent infinite loop
 * @return {any[]}
 */
function listToArraySafe(head, maxLength = 100) {
    const result = [];
    const visited = new Set();
    let current = head;
    let count = 0;

    while (current && count < maxLength) {
        if (visited.has(current)) {
            result.push(`[CYCLE DETECTED at ${current.val}]`);
            break;
        }

        visited.add(current);
        result.push(current.val);
        current = current.next;
        count++;
    }

    return result;
}

/**
 * Utility: Remove cycle from linked list
 *
 * @param {ListNode} head
 * @return {ListNode} - Head of the modified list
 */
function removeCycle(head) {
    if (!head || !head.next) return head;

    const cycleInfo = getCycleInfo(head);
    if (!cycleInfo.hasCycle) return head;

    // Find the node before cycle start
    let current = head;
    while (current.next !== cycleInfo.cycleStart) {
        current = current.next;
    }

    // Find the last node in the cycle
    let cycleEnd = cycleInfo.cycleStart;
    for (let i = 1; i < cycleInfo.cycleLength; i++) {
        cycleEnd = cycleEnd.next;
    }

    // Break the cycle
    cycleEnd.next = null;

    return head;
}

/**
 * Utility: Visualize linked list structure
 *
 * @param {ListNode} head
 * @return {string}
 */
function visualizeList(head) {
    if (!head) return 'Empty list';

    const cycleInfo = getCycleInfo(head);
    let visualization = 'List Structure:\n';

    if (!cycleInfo.hasCycle) {
        const values = listToArraySafe(head, 20);
        visualization += values.join(' -> ') + ' -> null\n';
        visualization += 'No cycle detected';
    } else {
        const values = listToArraySafe(head, 20);
        visualization += values.join(' -> ') + '\n';
        visualization += `Cycle detected!\n`;
        visualization += `- Cycle starts at node with value: ${cycleInfo.cycleStart.val}\n`;
        visualization += `- Cycle length: ${cycleInfo.cycleLength}\n`;
        visualization += `- Distance to cycle start: ${cycleInfo.distanceToStart}`;
    }

    return visualization;
}

module.exports = {
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
};