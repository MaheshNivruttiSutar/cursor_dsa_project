/**
 * @fileoverview Binary Tree Level Order Traversal - LeetCode #102 (Medium)
 *
 * Problem Description:
 * Given the root of a binary tree, return the level order traversal of its nodes' values.
 * (i.e., from left to right, level by level).
 *
 * Examples:
 * Input: root = [3,9,20,null,null,15,7]
 * Output: [[3],[9,20],[15,7]]
 *
 * Input: root = [1]
 * Output: [[1]]
 *
 * Input: root = []
 * Output: []
 *
 * Constraints:
 * - The number of nodes in the tree is in the range [0, 2000].
 * - -1000 <= Node.val <= 1000
 *
 * @author Your Name
 * @since 2024
 */

// Import TreeNode from utils
const { TreeNode } = require('../utils/TreeNode');

/**
 * Approach 1: BFS with Queue (most intuitive)
 * Time Complexity: O(n) where n is the number of nodes
 * Space Complexity: O(w) where w is the maximum width of the tree
 *
 * Algorithm:
 * 1. Use a queue to store nodes level by level
 * 2. Process all nodes at current level before moving to next
 * 3. Track level size to separate levels
 *
 * @param {TreeNode} root - Root of the binary tree
 * @returns {number[][]} Level order traversal as 2D array
 */
function levelOrderBFS(root) {
    if (!root) return [];

    const result = [];
    const queue = [root];

    while (queue.length > 0) {
        const levelSize = queue.length;
        const currentLevel = [];

        // Process all nodes at current level
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            currentLevel.push(node.val);

            // Add children to queue for next level
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }

        result.push(currentLevel);
    }

    return result;
}

/**
 * Approach 2: DFS with Level Tracking
 * Time Complexity: O(n)
 * Space Complexity: O(h) where h is the height of the tree (recursion stack)
 *
 * Algorithm:
 * 1. Use DFS to traverse the tree
 * 2. Track current level and add nodes to appropriate level array
 * 3. Create new level arrays as needed
 *
 * @param {TreeNode} root - Root of the binary tree
 * @returns {number[][]} Level order traversal as 2D array
 */
function levelOrderDFS(root) {
    if (!root) return [];

    const result = [];

    /**
     * DFS helper function
     * @param {TreeNode} node - Current node
     * @param {number} level - Current level (0-indexed)
     */
    function dfs(node, level) {
        if (!node) return;

        // Create new level array if needed
        if (level >= result.length) {
            result.push([]);
        }

        // Add current node to its level
        result[level].push(node.val);

        // Recursively process children
        dfs(node.left, level + 1);
        dfs(node.right, level + 1);
    }

    dfs(root, 0);
    return result;
}

/**
 * Approach 3: Iterative with Two Queues
 * Time Complexity: O(n)
 * Space Complexity: O(w) where w is the maximum width
 *
 * Algorithm:
 * 1. Use two queues - current level and next level
 * 2. Alternate between queues for each level
 * 3. More memory efficient for very wide trees
 *
 * @param {TreeNode} root - Root of the binary tree
 * @returns {number[][]} Level order traversal as 2D array
 */
function levelOrderTwoQueues(root) {
    if (!root) return [];

    const result = [];
    let currentLevel = [root];

    while (currentLevel.length > 0) {
        const levelValues = [];
        const nextLevel = [];

        // Process all nodes in current level
        for (const node of currentLevel) {
            levelValues.push(node.val);

            if (node.left) nextLevel.push(node.left);
            if (node.right) nextLevel.push(node.right);
        }

        result.push(levelValues);
        currentLevel = nextLevel;
    }

    return result;
}

/**
 * Approach 4: BFS with Sentinel/Marker
 * Time Complexity: O(n)
 * Space Complexity: O(w)
 *
 * Algorithm:
 * 1. Use a single queue with null markers between levels
 * 2. When encountering null, current level is complete
 * 3. Add null marker after processing each level (except last)
 *
 * @param {TreeNode} root - Root of the binary tree
 * @returns {number[][]} Level order traversal as 2D array
 */
function levelOrderSentinel(root) {
    if (!root) return [];

    const result = [];
    const queue = [root, null]; // null marks end of level
    let currentLevel = [];

    while (queue.length > 1) { // Continue until only null remains
        const node = queue.shift();

        if (node === null) {
            // End of current level
            result.push([...currentLevel]);
            currentLevel = [];
            queue.push(null); // Mark end of next level
        } else {
            currentLevel.push(node.val);

            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }

    // Add last level if exists
    if (currentLevel.length > 0) {
        result.push(currentLevel);
    }

    return result;
}

// Default export uses BFS approach
const levelOrder = levelOrderBFS;

// Enhanced Utility Functions

/**
 * Level order traversal with node information
 * @param {TreeNode} root - Root of the binary tree
 * @returns {object[]} Array of objects with value, level, and position info
 */
function levelOrderWithInfo(root) {
    if (!root) return [];

    const result = [];
    const queue = [{ node: root, level: 0, position: 0 }];

    while (queue.length > 0) {
        const { node, level, position } = queue.shift();

        result.push({
            value: node.val,
            level: level,
            position: position,
            isLeftChild: position % 2 === 0 && level > 0,
            isRightChild: position % 2 === 1 && level > 0
        });

        if (node.left) {
            queue.push({
                node: node.left,
                level: level + 1,
                position: position * 2
            });
        }

        if (node.right) {
            queue.push({
                node: node.right,
                level: level + 1,
                position: position * 2 + 1
            });
        }
    }

    return result;
}

/**
 * Reverse level order traversal (bottom-up)
 * @param {TreeNode} root - Root of the binary tree
 * @returns {number[][]} Bottom-up level order traversal
 */
function levelOrderBottom(root) {
    const levels = levelOrder(root);
    return levels.reverse();
}

/**
 * Right to left level order traversal
 * @param {TreeNode} root - Root of the binary tree
 * @returns {number[][]} Right to left level order traversal
 */
function levelOrderRightToLeft(root) {
    if (!root) return [];

    const result = [];
    const queue = [root];

    while (queue.length > 0) {
        const levelSize = queue.length;
        const currentLevel = [];

        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            currentLevel.push(node.val);

            // Add right child first for right-to-left order
            if (node.right) queue.push(node.right);
            if (node.left) queue.push(node.left);
        }

        result.push(currentLevel);
    }

    return result;
}

/**
 * Zigzag level order traversal (left-right alternating)
 * @param {TreeNode} root - Root of the binary tree
 * @returns {number[][]} Zigzag level order traversal
 */
function levelOrderZigzag(root) {
    if (!root) return [];

    const result = [];
    const queue = [root];
    let leftToRight = true;

    while (queue.length > 0) {
        const levelSize = queue.length;
        const currentLevel = [];

        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();

            if (leftToRight) {
                currentLevel.push(node.val);
            } else {
                currentLevel.unshift(node.val);
            }

            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }

        result.push(currentLevel);
        leftToRight = !leftToRight;
    }

    return result;
}

/**
 * Get specific level of tree
 * @param {TreeNode} root - Root of the binary tree
 * @param {number} targetLevel - Target level (0-indexed)
 * @returns {number[]} Values at the target level
 */
function getLevel(root, targetLevel) {
    if (!root || targetLevel < 0) return [];

    const queue = [root];
    let currentLevel = 0;

    while (queue.length > 0 && currentLevel <= targetLevel) {
        const levelSize = queue.length;
        const levelValues = [];

        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();

            if (currentLevel === targetLevel) {
                levelValues.push(node.val);
            }

            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }

        if (currentLevel === targetLevel) {
            return levelValues;
        }

        currentLevel++;
    }

    return [];
}

/**
 * Get maximum value at each level
 * @param {TreeNode} root - Root of the binary tree
 * @returns {number[]} Maximum values at each level
 */
function largestValues(root) {
    if (!root) return [];

    const levels = levelOrder(root);
    return levels.map(level => Math.max(...level));
}

/**
 * Get minimum value at each level
 * @param {TreeNode} root - Root of the binary tree
 * @returns {number[]} Minimum values at each level
 */
function smallestValues(root) {
    if (!root) return [];

    const levels = levelOrder(root);
    return levels.map(level => Math.min(...level));
}

/**
 * Get average value at each level
 * @param {TreeNode} root - Root of the binary tree
 * @returns {number[]} Average values at each level
 */
function averageOfLevels(root) {
    if (!root) return [];

    const levels = levelOrder(root);
    return levels.map(level => {
        const sum = level.reduce((acc, val) => acc + val, 0);
        return sum / level.length;
    });
}

/**
 * Count nodes at each level
 * @param {TreeNode} root - Root of the binary tree
 * @returns {number[]} Number of nodes at each level
 */
function countNodesPerLevel(root) {
    if (!root) return [];

    const levels = levelOrder(root);
    return levels.map(level => level.length);
}

/**
 * Get rightmost nodes at each level (right side view)
 * @param {TreeNode} root - Root of the binary tree
 * @returns {number[]} Rightmost values at each level
 */
function rightSideView(root) {
    if (!root) return [];

    const levels = levelOrder(root);
    return levels.map(level => level[level.length - 1]);
}

/**
 * Get leftmost nodes at each level (left side view)
 * @param {TreeNode} root - Root of the binary tree
 * @returns {number[]} Leftmost values at each level
 */
function leftSideView(root) {
    if (!root) return [];

    const levels = levelOrder(root);
    return levels.map(level => level[0]);
}

/**
 * Find level of a target value
 * @param {TreeNode} root - Root of the binary tree
 * @param {number} target - Target value to find
 * @returns {number} Level of target value (-1 if not found)
 */
function findLevel(root, target) {
    if (!root) return -1;

    const queue = [{ node: root, level: 0 }];

    while (queue.length > 0) {
        const { node, level } = queue.shift();

        if (node.val === target) {
            return level;
        }

        if (node.left) queue.push({ node: node.left, level: level + 1 });
        if (node.right) queue.push({ node: node.right, level: level + 1 });
    }

    return -1;
}

/**
 * Visualize tree level by level
 * @param {TreeNode} root - Root of the binary tree
 * @returns {string} Visual representation of the tree
 */
function visualizeByLevels(root) {
    if (!root) return "Empty tree";

    const levels = levelOrder(root);
    let result = "Tree Level Order Visualization:\n";
    result += "─".repeat(40) + "\n";

    levels.forEach((level, index) => {
        const spacing = "  ".repeat(levels.length - index);
        result += `Level ${index}: ${spacing}[${level.join(", ")}]\n`;
    });

    return result;
}

/**
 * Check if tree is complete (all levels filled except possibly last)
 * @param {TreeNode} root - Root of the binary tree
 * @returns {boolean} True if tree is complete
 */
function isComplete(root) {
    if (!root) return true;

    const queue = [root];
    let nullFound = false;

    while (queue.length > 0) {
        const node = queue.shift();

        if (node === null) {
            nullFound = true;
        } else {
            if (nullFound) return false; // Non-null after null
            queue.push(node.left);
            queue.push(node.right);
        }
    }

    return true;
}

/**
 * Get tree width (maximum number of nodes at any level)
 * @param {TreeNode} root - Root of the binary tree
 * @returns {number} Maximum width of the tree
 */
function getTreeWidth(root) {
    if (!root) return 0;

    const counts = countNodesPerLevel(root);
    return Math.max(...counts);
}

module.exports = {
    levelOrder,
    levelOrderBFS,
    levelOrderDFS,
    levelOrderTwoQueues,
    levelOrderSentinel,
    levelOrderWithInfo,
    levelOrderBottom,
    levelOrderRightToLeft,
    levelOrderZigzag,
    getLevel,
    largestValues,
    smallestValues,
    averageOfLevels,
    countNodesPerLevel,
    rightSideView,
    leftSideView,
    findLevel,
    visualizeByLevels,
    isComplete,
    getTreeWidth
};