/**
 * Definition for binary tree node
 */
class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

/**
 * Creates a binary tree from an array representation (level-order)
 * @param {(number|null)[]} values - Array of values in level-order, null for missing nodes
 * @return {TreeNode} - Root of the binary tree
 */
function createBinaryTree(values) {
    if (!values || values.length === 0 || values[0] === null) {
        return null;
    }

    const root = new TreeNode(values[0]);
    const queue = [root];
    let i = 1;

    while (queue.length > 0 && i < values.length) {
        const node = queue.shift();

        // Add left child
        if (i < values.length && values[i] !== null) {
            node.left = new TreeNode(values[i]);
            queue.push(node.left);
        }
        i++;

        // Add right child
        if (i < values.length && values[i] !== null) {
            node.right = new TreeNode(values[i]);
            queue.push(node.right);
        }
        i++;
    }

    return root;
}

/**
 * Converts a binary tree to array representation (level-order)
 * @param {TreeNode} root - Root of the binary tree
 * @return {(number|null)[]} - Array representation of the tree
 */
function binaryTreeToArray(root) {
    if (!root) return [];

    const result = [];
    const queue = [root];

    while (queue.length > 0) {
        const node = queue.shift();

        if (node) {
            result.push(node.val);
            queue.push(node.left);
            queue.push(node.right);
        } else {
            result.push(null);
        }
    }

    // Remove trailing nulls
    while (result.length > 0 && result[result.length - 1] === null) {
        result.pop();
    }

    return result;
}

/**
 * Inorder traversal of binary tree
 * @param {TreeNode} root - Root of the binary tree
 * @return {number[]} - Array of values in inorder
 */
function inorderTraversal(root) {
    const result = [];

    function traverse(node) {
        if (node) {
            traverse(node.left);
            result.push(node.val);
            traverse(node.right);
        }
    }

    traverse(root);
    return result;
}

/**
 * Preorder traversal of binary tree
 * @param {TreeNode} root - Root of the binary tree
 * @return {number[]} - Array of values in preorder
 */
function preorderTraversal(root) {
    const result = [];

    function traverse(node) {
        if (node) {
            result.push(node.val);
            traverse(node.left);
            traverse(node.right);
        }
    }

    traverse(root);
    return result;
}

/**
 * Postorder traversal of binary tree
 * @param {TreeNode} root - Root of the binary tree
 * @return {number[]} - Array of values in postorder
 */
function postorderTraversal(root) {
    const result = [];

    function traverse(node) {
        if (node) {
            traverse(node.left);
            traverse(node.right);
            result.push(node.val);
        }
    }

    traverse(root);
    return result;
}

/**
 * Level-order traversal of binary tree
 * @param {TreeNode} root - Root of the binary tree
 * @return {number[][]} - Array of arrays, each containing values at that level
 */
function levelOrder(root) {
    if (!root) return [];

    const result = [];
    const queue = [root];

    while (queue.length > 0) {
        const levelSize = queue.length;
        const currentLevel = [];

        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            currentLevel.push(node.val);

            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }

        result.push(currentLevel);
    }

    return result;
}

module.exports = {
    TreeNode,
    createBinaryTree,
    binaryTreeToArray,
    inorderTraversal,
    preorderTraversal,
    postorderTraversal,
    levelOrder
};