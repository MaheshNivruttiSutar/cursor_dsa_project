/**
 * Validate Binary Search Tree
 * Given the root of a binary tree, determine if it is a valid binary search tree (BST).
 * A valid BST is defined as follows:
 * - The left subtree of a node contains only nodes with keys less than the node's key.
 * - The right subtree of a node contains only nodes with keys greater than the node's key.
 * - Both the left and right subtrees must also be binary search trees.
 *
 * Example 1:
 *     2
 *    / \
 *   1   3
 * Input: root = [2,1,3]
 * Output: true
 *
 * Example 2:
 *     5
 *    / \
 *   1   4
 *      / \
 *     3   6
 * Input: root = [5,1,4,null,null,3,6]
 * Output: false
 * Explanation: The root node's value is 5 but its right child's value is 4.
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n) for recursion stack
 *
 * @param {TreeNode} root - Root of the binary tree
 * @return {boolean} - True if the tree is a valid BST
 */
function isValidBST(root) {
    function validate(node, min, max) {
        if (node === null) {
            return true;
        }

        if (node.val <= min || node.val >= max) {
            return false;
        }

        return validate(node.left, min, node.val) && validate(node.right, node.val, max);
    }

    return validate(root, -Infinity, Infinity);
}

/**
 * Validate BST using in-order traversal
 * In-order traversal of a BST should yield values in ascending order
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n) for recursion stack
 *
 * @param {TreeNode} root - Root of the binary tree
 * @return {boolean} - True if the tree is a valid BST
 */
function isValidBSTInOrder(root) {
    let prev = null;

    function inOrder(node) {
        if (node === null) {
            return true;
        }

        if (!inOrder(node.left)) {
            return false;
        }

        if (prev !== null && node.val <= prev) {
            return false;
        }
        prev = node.val;

        return inOrder(node.right);
    }

    return inOrder(root);
}

/**
 * Validate BST using iterative in-order traversal
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n) for stack
 *
 * @param {TreeNode} root - Root of the binary tree
 * @return {boolean} - True if the tree is a valid BST
 */
function isValidBSTIterative(root) {
    if (root === null) {
        return true;
    }

    const stack = [];
    let prev = null;
    let current = root;

    while (current !== null || stack.length > 0) {
        while (current !== null) {
            stack.push(current);
            current = current.left;
        }

        current = stack.pop();

        if (prev !== null && current.val <= prev) {
            return false;
        }
        prev = current.val;

        current = current.right;
    }

    return true;
}

/**
 * Validate BST using array-based in-order traversal
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n) for array
 *
 * @param {TreeNode} root - Root of the binary tree
 * @return {boolean} - True if the tree is a valid BST
 */
function isValidBSTArray(root) {
    const values = [];

    function inOrder(node) {
        if (node === null) {
            return;
        }

        inOrder(node.left);
        values.push(node.val);
        inOrder(node.right);
    }

    inOrder(root);

    for (let i = 1; i < values.length; i++) {
        if (values[i] <= values[i - 1]) {
            return false;
        }
    }

    return true;
}

/**
 * Validate BST with detailed validation info
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 *
 * @param {TreeNode} root - Root of the binary tree
 * @return {object} - Object with validation result and details
 */
function validateBSTWithDetails(root) {
    const violations = [];

    function validate(node, min, max, path = []) {
        if (node === null) {
            return true;
        }

        const currentPath = [...path, node.val];
        let isValid = true;

        if (node.val <= min) {
            violations.push({
                node: node.val,
                path: currentPath,
                violation: `Value ${node.val} is not greater than minimum bound ${min}`
            });
            isValid = false;
        }

        if (node.val >= max) {
            violations.push({
                node: node.val,
                path: currentPath,
                violation: `Value ${node.val} is not less than maximum bound ${max}`
            });
            isValid = false;
        }

        const leftValid = validate(node.left, min, node.val, currentPath);
        const rightValid = validate(node.right, node.val, max, currentPath);

        return isValid && leftValid && rightValid;
    }

    const isValid = validate(root, -Infinity, Infinity);

    return {
        isValid,
        violations,
        message: isValid ? 'Valid BST' : `Invalid BST - ${violations.length} violations found`
    };
}

/**
 * Find the minimum and maximum values in a BST
 *
 * Time Complexity: O(h) where h is height of tree
 * Space Complexity: O(1)
 *
 * @param {TreeNode} root - Root of the binary tree
 * @return {object} - Object with min and max values
 */
function getBSTMinMax(root) {
    if (root === null) {
        return { min: null, max: null };
    }

    // Find minimum (leftmost node)
    let minNode = root;
    while (minNode.left !== null) {
        minNode = minNode.left;
    }

    // Find maximum (rightmost node)
    let maxNode = root;
    while (maxNode.right !== null) {
        maxNode = maxNode.right;
    }

    return { min: minNode.val, max: maxNode.val };
}

/**
 * Check if a tree is a valid BST and return its range
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 *
 * @param {TreeNode} root - Root of the binary tree
 * @return {object} - Object with validation result and range
 */
function validateBSTWithRange(root) {
    function validate(node) {
        if (node === null) {
            return { isValid: true, min: Infinity, max: -Infinity };
        }

        const left = validate(node.left);
        const right = validate(node.right);

        if (!left.isValid || !right.isValid) {
            return { isValid: false, min: null, max: null };
        }

        if ((node.left && node.val <= left.max) ||
            (node.right && node.val >= right.min)) {
            return { isValid: false, min: null, max: null };
        }

        return {
            isValid: true,
            min: node.left ? left.min : node.val,
            max: node.right ? right.max : node.val
        };
    }

    return validate(root);
}

/**
 * Count the number of valid BST nodes
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 *
 * @param {TreeNode} root - Root of the binary tree
 * @return {number} - Number of nodes that satisfy BST property locally
 */
function countValidBSTNodes(root) {
    if (root === null) {
        return 0;
    }

    let count = 0;

    function traverse(node) {
        if (node === null) {
            return;
        }

        let isValidNode = true;

        if (node.left && node.left.val >= node.val) {
            isValidNode = false;
        }

        if (node.right && node.right.val <= node.val) {
            isValidNode = false;
        }

        if (isValidNode) {
            count++;
        }

        traverse(node.left);
        traverse(node.right);
    }

    traverse(root);
    return count;
}

/**
 * Get in-order traversal of a tree
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 *
 * @param {TreeNode} root - Root of the binary tree
 * @return {number[]} - Array of values in in-order
 */
function getInOrderTraversal(root) {
    const result = [];

    function inOrder(node) {
        if (node === null) {
            return;
        }

        inOrder(node.left);
        result.push(node.val);
        inOrder(node.right);
    }

    inOrder(root);
    return result;
}

module.exports = {
    isValidBST,
    isValidBSTInOrder,
    isValidBSTIterative,
    isValidBSTArray,
    validateBSTWithDetails,
    getBSTMinMax,
    validateBSTWithRange,
    countValidBSTNodes,
    getInOrderTraversal
};