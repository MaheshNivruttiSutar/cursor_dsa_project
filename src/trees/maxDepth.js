const { TreeNode } = require('../utils/TreeNode');

/**
 * Maximum Depth of Binary Tree
 * Given the root of a binary tree, return its maximum depth.
 * A binary tree's maximum depth is the number of nodes along the longest path
 * from the root node down to the farthest leaf node.
 *
 * Example 1:
 * Input: root = [3,9,20,null,null,15,7]
 * Output: 3
 *
 * Example 2:
 * Input: root = [1,null,2]
 * Output: 2
 *
 * Time Complexity: O(n)
 * Space Complexity: O(h) where h is the height of the tree
 *
 * @param {TreeNode} root - Root of the binary tree
 * @return {number} - Maximum depth of the tree
 */
function maxDepth(root) {
    if (!root) {
        return 0;
    }

    const leftDepth = maxDepth(root.left);
    const rightDepth = maxDepth(root.right);

    return Math.max(leftDepth, rightDepth) + 1;
}

/**
 * Maximum Depth of Binary Tree - Iterative approach using BFS
 *
 * Time Complexity: O(n)
 * Space Complexity: O(w) where w is the maximum width of the tree
 *
 * @param {TreeNode} root - Root of the binary tree
 * @return {number} - Maximum depth of the tree
 */
function maxDepthIterative(root) {
    if (!root) {
        return 0;
    }

    const queue = [root];
    let depth = 0;

    while (queue.length > 0) {
        const levelSize = queue.length;
        depth++;

        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();

            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }

    return depth;
}

/**
 * Maximum Depth of Binary Tree - Iterative approach using DFS with stack
 *
 * Time Complexity: O(n)
 * Space Complexity: O(h) where h is the height of the tree
 *
 * @param {TreeNode} root - Root of the binary tree
 * @return {number} - Maximum depth of the tree
 */
function maxDepthDFS(root) {
    if (!root) {
        return 0;
    }

    const stack = [[root, 1]]; // [node, depth]
    let maxDepthSeen = 0;

    while (stack.length > 0) {
        const [node, depth] = stack.pop();
        maxDepthSeen = Math.max(maxDepthSeen, depth);

        if (node.left) stack.push([node.left, depth + 1]);
        if (node.right) stack.push([node.right, depth + 1]);
    }

    return maxDepthSeen;
}

module.exports = {
    maxDepth,
    maxDepthIterative,
    maxDepthDFS
};