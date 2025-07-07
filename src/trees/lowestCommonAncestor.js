/**
 * Lowest Common Ancestor of a Binary Tree (LeetCode #236)
 * Difficulty: Medium
 *
 * Problem: Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.
 * According to the definition of LCA on Wikipedia: "The lowest common ancestor is defined between two nodes p and q
 * as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself)."
 *
 * Company: Amazon, Microsoft, Google, Facebook, Apple
 * Topics: Tree, Depth-First Search, Binary Tree
 */

const { TreeNode } = require('../utils/TreeNode');

/**
 * Approach 1: Recursive DFS
 * Time: O(n) where n is the number of nodes
 * Space: O(h) where h is the height of the tree (recursion stack)
 */
function lowestCommonAncestor(root, p, q) {
    if (!root) return null;

    // If current node is one of the target nodes
    if (root === p || root === q) return root;

    // Search in left and right subtrees
    const left = lowestCommonAncestor(root.left, p, q);
    const right = lowestCommonAncestor(root.right, p, q);

    // If both left and right are not null, current node is LCA
    if (left && right) return root;

    // Otherwise, return the non-null child
    return left || right;
}

/**
 * Approach 2: Iterative with Parent Tracking
 * Time: O(n)
 * Space: O(n) for parent map and visited set
 */
function lowestCommonAncestorIterative(root, p, q) {
    if (!root) return null;

    // Map to store parent of each node
    const parentMap = new Map();
    parentMap.set(root, null);

    // Stack for DFS traversal
    const stack = [root];

    // Build parent map until we find both p and q
    while ((!parentMap.has(p) || !parentMap.has(q)) && stack.length > 0) {
        const node = stack.pop();

        if (!node) continue;

        if (node.left) {
            parentMap.set(node.left, node);
            stack.push(node.left);
        }

        if (node.right) {
            parentMap.set(node.right, node);
            stack.push(node.right);
        }
    }

    // Get all ancestors of p
    const ancestors = new Set();
    let current = p;
    while (current) {
        ancestors.add(current);
        current = parentMap.get(current);
    }

    // Find first common ancestor starting from q
    current = q;
    while (current) {
        if (ancestors.has(current)) {
            return current;
        }
        current = parentMap.get(current);
    }

    return null;
}

/**
 * Approach 3: Path-based solution
 * Time: O(n)
 * Space: O(n) for paths
 */
function lowestCommonAncestorPath(root, p, q) {
    if (!root) return null;

    function findPath(node, target, path) {
        if (!node) return false;

        path.push(node);

        if (node === target) return true;

        if (findPath(node.left, target, path) || findPath(node.right, target, path)) {
            return true;
        }

        path.pop();
        return false;
    }

    const pathP = [];
    const pathQ = [];

    if (!findPath(root, p, pathP) || !findPath(root, q, pathQ)) {
        return null;
    }

    let lca = null;
    const minLength = Math.min(pathP.length, pathQ.length);

    for (let i = 0; i < minLength; i++) {
        if (pathP[i] === pathQ[i]) {
            lca = pathP[i];
        } else {
            break;
        }
    }

    return lca;
}

/**
 * Approach 4: Optimized recursive with early termination
 * Time: O(n)
 * Space: O(h)
 */
function lowestCommonAncestorOptimized(root, p, q) {
    let result = null;

    function dfs(node) {
        if (!node) return false;

        // Check if current node is one of the targets
        const mid = node === p || node === q ? 1 : 0;

        // Check left and right subtrees
        const left = dfs(node.left) ? 1 : 0;
        const right = dfs(node.right) ? 1 : 0;

        // If any two of the three flags are set, we found the LCA
        // Special case: if p === q, then mid alone is sufficient
        if (mid + left + right >= 2 || (p === q && mid === 1)) {
            result = node;
        }

        // Return true if any of the three flags is set
        return mid + left + right > 0;
    }

    dfs(root);
    return result;
}

/**
 * Utility: Find LCA for multiple nodes
 */
function lowestCommonAncestorMultiple(root, nodes) {
    if (!root || !nodes || nodes.length === 0) return null;
    if (nodes.length === 1) return nodes[0];

    function dfs(node) {
        if (!node) return null;

        // If current node is one of the target nodes
        if (nodes.includes(node)) return node;

        const left = dfs(node.left);
        const right = dfs(node.right);

        // If both left and right are not null, current node is LCA
        if (left && right) return node;

        return left || right;
    }

    return dfs(root);
}

/**
 * Utility: Find distance between two nodes
 */
function findDistance(root, p, q) {
    const lca = lowestCommonAncestor(root, p, q);
    if (!lca) return -1;

    function findDepth(node, target, depth) {
        if (!node) return -1;
        if (node === target) return depth;

        const left = findDepth(node.left, target, depth + 1);
        if (left !== -1) return left;

        return findDepth(node.right, target, depth + 1);
    }

    const distP = findDepth(lca, p, 0);
    const distQ = findDepth(lca, q, 0);

    return distP + distQ;
}

/**
 * Utility: Find all ancestors of a node
 */
function findAncestors(root, target) {
    const ancestors = [];

    function dfs(node) {
        if (!node) return false;

        if (node === target) return true;

        if (dfs(node.left) || dfs(node.right)) {
            ancestors.push(node);
            return true;
        }

        return false;
    }

    dfs(root);
    return ancestors.reverse(); // Return from root to parent
}

/**
 * Utility: Check if one node is ancestor of another
 */
function isAncestor(root, ancestor, descendant) {
    if (!root || !ancestor || !descendant) return false;

    function dfs(node) {
        if (!node) return false;
        if (node === ancestor) {
            return findNode(node, descendant);
        }
        return dfs(node.left) || dfs(node.right);
    }

    function findNode(node, target) {
        if (!node) return false;
        if (node === target) return true;
        return findNode(node.left, target) || findNode(node.right, target);
    }

    return dfs(root);
}

/**
 * Utility: Find LCA by values (assuming unique values)
 */
function lowestCommonAncestorByValue(root, val1, val2) {
    if (!root) return null;

    // Find nodes with given values
    function findNode(node, val) {
        if (!node) return null;
        if (node.val === val) return node;

        const left = findNode(node.left, val);
        if (left) return left;

        return findNode(node.right, val);
    }

    const p = findNode(root, val1);
    const q = findNode(root, val2);

    if (!p || !q) return null;

    return lowestCommonAncestor(root, p, q);
}

/**
 * Utility: Get path from root to node
 */
function getPathFromRoot(root, target) {
    if (!root) return [];

    function findPath(node, target, path) {
        if (!node) return false;

        path.push(node);

        if (node === target) return true;

        if (findPath(node.left, target, path) || findPath(node.right, target, path)) {
            return true;
        }

        path.pop();
        return false;
    }

    const path = [];
    findPath(root, target, path);
    return path;
}

/**
 * Utility: Visualize LCA relationship
 */
function visualizeLCA(root, p, q) {
    const lca = lowestCommonAncestor(root, p, q);
    if (!lca) return "No LCA found";

    const pathP = getPathFromRoot(root, p);
    const pathQ = getPathFromRoot(root, q);

    const visualization = {
        lca: lca.val,
        pathToP: pathP.map(node => node.val),
        pathToQ: pathQ.map(node => node.val),
        distance: findDistance(root, p, q),
        lcaDepth: getPathFromRoot(root, lca).length - 1
    };

    return visualization;
}

module.exports = {
    lowestCommonAncestor,
    lowestCommonAncestorIterative,
    lowestCommonAncestorPath,
    lowestCommonAncestorOptimized,
    lowestCommonAncestorMultiple,
    findDistance,
    findAncestors,
    isAncestor,
    lowestCommonAncestorByValue,
    getPathFromRoot,
    visualizeLCA
};