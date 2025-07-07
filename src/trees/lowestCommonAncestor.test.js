const {
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
} = require('./lowestCommonAncestor');

const { TreeNode, createTree } = require('../utils/TreeNode');

describe('Lowest Common Ancestor of a Binary Tree', () => {
    let tree1, tree2, tree3, tree4;
    let nodes1 = {}, nodes2 = {}, nodes3 = {}, nodes4 = {};

    beforeEach(() => {
        // Tree 1: Standard binary tree
        //        3
        //       / \
        //      5   1
        //     / \ / \
        //    6  2 0  8
        //      / \
        //     7   4
        tree1 = new TreeNode(3);
        nodes1.root = tree1;
        nodes1.node5 = new TreeNode(5);
        nodes1.node1 = new TreeNode(1);
        nodes1.node6 = new TreeNode(6);
        nodes1.node2 = new TreeNode(2);
        nodes1.node0 = new TreeNode(0);
        nodes1.node8 = new TreeNode(8);
        nodes1.node7 = new TreeNode(7);
        nodes1.node4 = new TreeNode(4);

        tree1.left = nodes1.node5;
        tree1.right = nodes1.node1;
        nodes1.node5.left = nodes1.node6;
        nodes1.node5.right = nodes1.node2;
        nodes1.node1.left = nodes1.node0;
        nodes1.node1.right = nodes1.node8;
        nodes1.node2.left = nodes1.node7;
        nodes1.node2.right = nodes1.node4;

        // Tree 2: Simple tree
        //    1
        //   / \
        //  2   3
        tree2 = new TreeNode(1);
        nodes2.root = tree2;
        nodes2.node2 = new TreeNode(2);
        nodes2.node3 = new TreeNode(3);
        tree2.left = nodes2.node2;
        tree2.right = nodes2.node3;

        // Tree 3: Single node
        tree3 = new TreeNode(1);
        nodes3.root = tree3;

        // Tree 4: Linear tree (like a linked list)
        //   1
        //  /
        // 2
        ///
        //3
        tree4 = new TreeNode(1);
        nodes4.root = tree4;
        nodes4.node2 = new TreeNode(2);
        nodes4.node3 = new TreeNode(3);
        tree4.left = nodes4.node2;
        nodes4.node2.left = nodes4.node3;
    });

    describe('lowestCommonAncestor (Recursive)', () => {
        test('should find LCA for nodes in different subtrees', () => {
            const lca = lowestCommonAncestor(tree1, nodes1.node5, nodes1.node1);
            expect(lca).toBe(nodes1.root);
        });

        test('should find LCA when one node is ancestor of another', () => {
            const lca = lowestCommonAncestor(tree1, nodes1.node5, nodes1.node6);
            expect(lca).toBe(nodes1.node5);
        });

        test('should find LCA for nodes in same subtree', () => {
            const lca = lowestCommonAncestor(tree1, nodes1.node7, nodes1.node4);
            expect(lca).toBe(nodes1.node2);
        });

        test('should handle simple tree', () => {
            const lca = lowestCommonAncestor(tree2, nodes2.node2, nodes2.node3);
            expect(lca).toBe(nodes2.root);
        });

        test('should handle single node tree', () => {
            const lca = lowestCommonAncestor(tree3, nodes3.root, nodes3.root);
            expect(lca).toBe(nodes3.root);
        });

        test('should handle linear tree', () => {
            const lca = lowestCommonAncestor(tree4, nodes4.node2, nodes4.node3);
            expect(lca).toBe(nodes4.node2);
        });

        test('should return null for empty tree', () => {
            const lca = lowestCommonAncestor(null, nodes1.node5, nodes1.node1);
            expect(lca).toBeNull();
        });

        test('should handle when nodes are the same', () => {
            const lca = lowestCommonAncestor(tree1, nodes1.node5, nodes1.node5);
            expect(lca).toBe(nodes1.node5);
        });
    });

    describe('lowestCommonAncestorIterative (Iterative)', () => {
        test('should find LCA for nodes in different subtrees', () => {
            const lca = lowestCommonAncestorIterative(tree1, nodes1.node5, nodes1.node1);
            expect(lca).toBe(nodes1.root);
        });

        test('should find LCA when one node is ancestor of another', () => {
            const lca = lowestCommonAncestorIterative(tree1, nodes1.node5, nodes1.node6);
            expect(lca).toBe(nodes1.node5);
        });

        test('should find LCA for nodes in same subtree', () => {
            const lca = lowestCommonAncestorIterative(tree1, nodes1.node7, nodes1.node4);
            expect(lca).toBe(nodes1.node2);
        });

        test('should handle simple tree', () => {
            const lca = lowestCommonAncestorIterative(tree2, nodes2.node2, nodes2.node3);
            expect(lca).toBe(nodes2.root);
        });

        test('should handle single node tree', () => {
            const lca = lowestCommonAncestorIterative(tree3, nodes3.root, nodes3.root);
            expect(lca).toBe(nodes3.root);
        });

        test('should return null for empty tree', () => {
            const lca = lowestCommonAncestorIterative(null, nodes1.node5, nodes1.node1);
            expect(lca).toBeNull();
        });
    });

    describe('lowestCommonAncestorPath (Path-based)', () => {
        test('should find LCA for nodes in different subtrees', () => {
            const lca = lowestCommonAncestorPath(tree1, nodes1.node5, nodes1.node1);
            expect(lca).toBe(nodes1.root);
        });

        test('should find LCA when one node is ancestor of another', () => {
            const lca = lowestCommonAncestorPath(tree1, nodes1.node5, nodes1.node6);
            expect(lca).toBe(nodes1.node5);
        });

        test('should find LCA for nodes in same subtree', () => {
            const lca = lowestCommonAncestorPath(tree1, nodes1.node7, nodes1.node4);
            expect(lca).toBe(nodes1.node2);
        });

        test('should handle simple tree', () => {
            const lca = lowestCommonAncestorPath(tree2, nodes2.node2, nodes2.node3);
            expect(lca).toBe(nodes2.root);
        });

        test('should return null for empty tree', () => {
            const lca = lowestCommonAncestorPath(null, nodes1.node5, nodes1.node1);
            expect(lca).toBeNull();
        });
    });

    describe('lowestCommonAncestorOptimized (Optimized)', () => {
        test('should find LCA for nodes in different subtrees', () => {
            const lca = lowestCommonAncestorOptimized(tree1, nodes1.node5, nodes1.node1);
            expect(lca).toBe(nodes1.root);
        });

        test('should find LCA when one node is ancestor of another', () => {
            const lca = lowestCommonAncestorOptimized(tree1, nodes1.node5, nodes1.node6);
            expect(lca).toBe(nodes1.node5);
        });

        test('should find LCA for nodes in same subtree', () => {
            const lca = lowestCommonAncestorOptimized(tree1, nodes1.node7, nodes1.node4);
            expect(lca).toBe(nodes1.node2);
        });

        test('should handle simple tree', () => {
            const lca = lowestCommonAncestorOptimized(tree2, nodes2.node2, nodes2.node3);
            expect(lca).toBe(nodes2.root);
        });

        test('should handle single node tree', () => {
            const lca = lowestCommonAncestorOptimized(tree3, nodes3.root, nodes3.root);
            expect(lca).toBe(nodes3.root);
        });
    });

    describe('lowestCommonAncestorMultiple (Multiple Nodes)', () => {
        test('should find LCA for multiple nodes', () => {
            const lca = lowestCommonAncestorMultiple(tree1, [nodes1.node6, nodes1.node7, nodes1.node4]);
            expect(lca).toBe(nodes1.node5);
        });

        test('should handle single node', () => {
            const lca = lowestCommonAncestorMultiple(tree1, [nodes1.node5]);
            expect(lca).toBe(nodes1.node5);
        });

        test('should handle empty array', () => {
            const lca = lowestCommonAncestorMultiple(tree1, []);
            expect(lca).toBeNull();
        });

        test('should handle nodes spanning entire tree', () => {
            const lca = lowestCommonAncestorMultiple(tree1, [nodes1.node6, nodes1.node8]);
            expect(lca).toBe(nodes1.root);
        });

        test('should return null for empty tree', () => {
            const lca = lowestCommonAncestorMultiple(null, [nodes1.node5]);
            expect(lca).toBeNull();
        });
    });

    describe('findDistance (Distance Between Nodes)', () => {
        test('should find distance between nodes in different subtrees', () => {
            const distance = findDistance(tree1, nodes1.node6, nodes1.node8);
            expect(distance).toBe(4); // 6->5->3->1->8
        });

        test('should find distance when one node is ancestor of another', () => {
            const distance = findDistance(tree1, nodes1.node5, nodes1.node6);
            expect(distance).toBe(1);
        });

        test('should find distance for nodes in same subtree', () => {
            const distance = findDistance(tree1, nodes1.node7, nodes1.node4);
            expect(distance).toBe(2); // 7->2->4
        });

        test('should return 0 for same node', () => {
            const distance = findDistance(tree1, nodes1.node5, nodes1.node5);
            expect(distance).toBe(0);
        });

        test('should return -1 when LCA not found', () => {
            const distance = findDistance(null, nodes1.node5, nodes1.node6);
            expect(distance).toBe(-1);
        });

        test('should handle simple tree', () => {
            const distance = findDistance(tree2, nodes2.node2, nodes2.node3);
            expect(distance).toBe(2); // 2->1->3
        });
    });

    describe('findAncestors (Find All Ancestors)', () => {
        test('should find all ancestors of a node', () => {
            const ancestors = findAncestors(tree1, nodes1.node7);
            expect(ancestors.map(n => n.val)).toEqual([3, 5, 2]);
        });

        test('should find ancestors of root', () => {
            const ancestors = findAncestors(tree1, nodes1.root);
            expect(ancestors).toEqual([]);
        });

        test('should find ancestors in simple tree', () => {
            const ancestors = findAncestors(tree2, nodes2.node2);
            expect(ancestors.map(n => n.val)).toEqual([1]);
        });

        test('should handle node not in tree', () => {
            const otherNode = new TreeNode(99);
            const ancestors = findAncestors(tree1, otherNode);
            expect(ancestors).toEqual([]);
        });

        test('should handle empty tree', () => {
            const ancestors = findAncestors(null, nodes1.node5);
            expect(ancestors).toEqual([]);
        });

        test('should find ancestors in linear tree', () => {
            const ancestors = findAncestors(tree4, nodes4.node3);
            expect(ancestors.map(n => n.val)).toEqual([1, 2]);
        });
    });

    describe('isAncestor (Check Ancestor Relationship)', () => {
        test('should return true for valid ancestor-descendant pair', () => {
            expect(isAncestor(tree1, nodes1.node5, nodes1.node7)).toBe(true);
            expect(isAncestor(tree1, nodes1.root, nodes1.node4)).toBe(true);
        });

        test('should return false for non-ancestor pair', () => {
            expect(isAncestor(tree1, nodes1.node6, nodes1.node8)).toBe(false);
            expect(isAncestor(tree1, nodes1.node7, nodes1.node5)).toBe(false);
        });

        test('should return true for node being ancestor of itself', () => {
            expect(isAncestor(tree1, nodes1.node5, nodes1.node5)).toBe(true);
        });

        test('should handle empty tree', () => {
            expect(isAncestor(null, nodes1.node5, nodes1.node6)).toBe(false);
        });

        test('should handle null nodes', () => {
            expect(isAncestor(tree1, null, nodes1.node6)).toBe(false);
            expect(isAncestor(tree1, nodes1.node5, null)).toBe(false);
        });
    });

    describe('lowestCommonAncestorByValue (LCA by Values)', () => {
        test('should find LCA by node values', () => {
            const lca = lowestCommonAncestorByValue(tree1, 5, 1);
            expect(lca.val).toBe(3);
        });

        test('should find LCA when one value is ancestor of another', () => {
            const lca = lowestCommonAncestorByValue(tree1, 5, 6);
            expect(lca.val).toBe(5);
        });

        test('should return null when value not found', () => {
            const lca = lowestCommonAncestorByValue(tree1, 99, 1);
            expect(lca).toBeNull();
        });

        test('should handle same values', () => {
            const lca = lowestCommonAncestorByValue(tree1, 5, 5);
            expect(lca.val).toBe(5);
        });

        test('should handle empty tree', () => {
            const lca = lowestCommonAncestorByValue(null, 1, 2);
            expect(lca).toBeNull();
        });
    });

    describe('getPathFromRoot (Path from Root)', () => {
        test('should get path from root to node', () => {
            const path = getPathFromRoot(tree1, nodes1.node7);
            expect(path.map(n => n.val)).toEqual([3, 5, 2, 7]);
        });

        test('should get path to root', () => {
            const path = getPathFromRoot(tree1, nodes1.root);
            expect(path.map(n => n.val)).toEqual([3]);
        });

        test('should return empty path for node not in tree', () => {
            const otherNode = new TreeNode(99);
            const path = getPathFromRoot(tree1, otherNode);
            expect(path).toEqual([]);
        });

        test('should handle empty tree', () => {
            const path = getPathFromRoot(null, nodes1.node5);
            expect(path).toEqual([]);
        });

        test('should get path in simple tree', () => {
            const path = getPathFromRoot(tree2, nodes2.node2);
            expect(path.map(n => n.val)).toEqual([1, 2]);
        });
    });

    describe('visualizeLCA (LCA Visualization)', () => {
        test('should visualize LCA relationship', () => {
            const viz = visualizeLCA(tree1, nodes1.node7, nodes1.node4);
            expect(viz.lca).toBe(2);
            expect(viz.pathToP).toEqual([3, 5, 2, 7]);
            expect(viz.pathToQ).toEqual([3, 5, 2, 4]);
            expect(viz.distance).toBe(2);
            expect(viz.lcaDepth).toBe(2);
        });

        test('should visualize when one node is ancestor', () => {
            const viz = visualizeLCA(tree1, nodes1.node5, nodes1.node6);
            expect(viz.lca).toBe(5);
            expect(viz.pathToP).toEqual([3, 5]);
            expect(viz.pathToQ).toEqual([3, 5, 6]);
            expect(viz.distance).toBe(1);
            expect(viz.lcaDepth).toBe(1);
        });

        test('should handle no LCA found', () => {
            const viz = visualizeLCA(null, nodes1.node5, nodes1.node6);
            expect(viz).toBe("No LCA found");
        });

        test('should visualize root as LCA', () => {
            const viz = visualizeLCA(tree1, nodes1.node6, nodes1.node8);
            expect(viz.lca).toBe(3);
            expect(viz.pathToP).toEqual([3, 5, 6]);
            expect(viz.pathToQ).toEqual([3, 1, 8]);
            expect(viz.distance).toBe(4);
            expect(viz.lcaDepth).toBe(0);
        });
    });

    describe('Algorithm Consistency', () => {
        test('all LCA algorithms should produce same results', () => {
            const testCases = [
                [nodes1.node5, nodes1.node1],
                [nodes1.node5, nodes1.node6],
                [nodes1.node7, nodes1.node4],
                [nodes1.node6, nodes1.node8],
                [nodes1.node5, nodes1.node5],
                [nodes2.node2, nodes2.node3]
            ];

            testCases.forEach(([p, q]) => {
                const result1 = lowestCommonAncestor(tree1, p, q);
                const result2 = lowestCommonAncestorIterative(tree1, p, q);
                const result3 = lowestCommonAncestorPath(tree1, p, q);
                const result4 = lowestCommonAncestorOptimized(tree1, p, q);

                expect(result1).toBe(result2);
                expect(result2).toBe(result3);
                expect(result3).toBe(result4);
            });
        });

        test('should handle edge cases consistently', () => {
            const algorithms = [
                lowestCommonAncestor,
                lowestCommonAncestorIterative,
                lowestCommonAncestorPath,
                lowestCommonAncestorOptimized
            ];

            algorithms.forEach(algorithm => {
                expect(algorithm(null, nodes1.node5, nodes1.node6)).toBeNull();
                expect(algorithm(tree3, nodes3.root, nodes3.root)).toBe(nodes3.root);
            });
        });
    });

    describe('Performance and Edge Cases', () => {
        test('should handle deeply nested tree', () => {
            // Create a deep tree
            let root = new TreeNode(0);
            let current = root;
            const nodes = [root];

            for (let i = 1; i < 100; i++) {
                current.left = new TreeNode(i);
                nodes.push(current.left);
                current = current.left;
            }

            const lca = lowestCommonAncestor(root, nodes[50], nodes[75]);
            expect(lca).toBe(nodes[50]);
        });

        test('should handle wide tree', () => {
            // Create a wide tree (all children of root)
            const root = new TreeNode(0);
            let leftChild = new TreeNode(1);
            let rightChild = new TreeNode(2);
            root.left = leftChild;
            root.right = rightChild;

            for (let i = 3; i < 10; i++) {
                if (i % 2 === 1) {
                    leftChild.left = new TreeNode(i);
                    leftChild = leftChild.left;
                } else {
                    rightChild.right = new TreeNode(i);
                    rightChild = rightChild.right;
                }
            }

            const lca = lowestCommonAncestor(root, leftChild, rightChild);
            expect(lca).toBe(root);
        });

        test('should handle tree with duplicate values', () => {
            const root = new TreeNode(1);
            const left = new TreeNode(1);
            const right = new TreeNode(1);
            root.left = left;
            root.right = right;

            const lca = lowestCommonAncestor(root, left, right);
            expect(lca).toBe(root);
        });
    });
});