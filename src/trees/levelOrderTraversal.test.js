/**
 * @fileoverview Test cases for Binary Tree Level Order Traversal - LeetCode #102
 * @author Your Name
 * @since 2024
 */

const { TreeNode } = require('../utils/TreeNode');
const {
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
} = require('./levelOrderTraversal');

describe('Binary Tree Level Order Traversal', () => {
    // Helper function to create test trees
    function createTree1() {
        // Tree: [3,9,20,null,null,15,7]
        //       3
        //      / \
        //     9   20
        //        /  \
        //       15   7
        const root = new TreeNode(3);
        root.left = new TreeNode(9);
        root.right = new TreeNode(20);
        root.right.left = new TreeNode(15);
        root.right.right = new TreeNode(7);
        return root;
    }

    function createTree2() {
        // Tree: [1,2,3,4,5,6,7]
        //       1
        //      / \
        //     2   3
        //    / \ / \
        //   4  5 6  7
        const root = new TreeNode(1);
        root.left = new TreeNode(2);
        root.right = new TreeNode(3);
        root.left.left = new TreeNode(4);
        root.left.right = new TreeNode(5);
        root.right.left = new TreeNode(6);
        root.right.right = new TreeNode(7);
        return root;
    }

    // Test all approaches for correctness
    const approaches = [
        { name: 'BFS', fn: levelOrderBFS },
        { name: 'DFS', fn: levelOrderDFS },
        { name: 'TwoQueues', fn: levelOrderTwoQueues },
        { name: 'Sentinel', fn: levelOrderSentinel },
        { name: 'Default', fn: levelOrder }
    ];

    approaches.forEach(({ name, fn }) => {
        describe(`${name} Approach`, () => {
            test('LeetCode Example 1: [3,9,20,null,null,15,7]', () => {
                const root = createTree1();
                const result = fn(root);
                expect(result).toEqual([[3], [9, 20], [15, 7]]);
            });

            test('LeetCode Example 2: [1]', () => {
                const root = new TreeNode(42);
                const result = fn(root);
                expect(result).toEqual([[42]]);
            });

            test('LeetCode Example 3: []', () => {
                const result = fn(null);
                expect(result).toEqual([]);
            });

            test('complete binary tree', () => {
                const root = createTree2();
                const result = fn(root);
                expect(result).toEqual([[1], [2, 3], [4, 5, 6, 7]]);
            });
        });
    });

    describe('Edge Cases', () => {
        test('null root', () => {
            expect(levelOrder(null)).toEqual([]);
        });

        test('single node', () => {
            const root = new TreeNode(1);
            expect(levelOrder(root)).toEqual([[1]]);
        });

        test('only left children', () => {
            const root = new TreeNode(1);
            root.left = new TreeNode(2);
            root.left.left = new TreeNode(3);

            expect(levelOrder(root)).toEqual([[1], [2], [3]]);
        });

        test('negative values', () => {
            const root = new TreeNode(-1);
            root.left = new TreeNode(-2);
            root.right = new TreeNode(-3);

            expect(levelOrder(root)).toEqual([[-1], [-2, -3]]);
        });
    });

    describe('Utility Functions', () => {
        let tree1;

        beforeEach(() => {
            tree1 = createTree1();
        });

        test('rightSideView', () => {
            expect(rightSideView(tree1)).toEqual([3, 20, 7]);
        });

        test('leftSideView', () => {
            expect(leftSideView(tree1)).toEqual([3, 9, 15]);
        });

        test('largestValues', () => {
            const result = largestValues(tree1);
            expect(result).toEqual([3, 20, 15]);
        });

        test('getLevel', () => {
            expect(getLevel(tree1, 0)).toEqual([3]);
            expect(getLevel(tree1, 1)).toEqual([9, 20]);
            expect(getLevel(tree1, 2)).toEqual([15, 7]);
        });

        test('isComplete', () => {
            const complete = createTree2();
            expect(isComplete(complete)).toBe(true);
        });
    });
});
