const { maxDepth, maxDepthIterative, maxDepthDFS } = require('./maxDepth');
const { createBinaryTree } = require('../utils/TreeNode');

describe('Maximum Depth of Binary Tree', () => {
    const testCases = [
        {
            input: [3, 9, 20, null, null, 15, 7],
            expected: 3,
            description: 'balanced tree'
        },
        {
            input: [1, null, 2],
            expected: 2,
            description: 'right-skewed tree'
        },
        {
            input: [1, 2, null],
            expected: 2,
            description: 'left-skewed tree'
        },
        {
            input: [1],
            expected: 1,
            description: 'single node'
        },
        {
            input: [],
            expected: 0,
            description: 'empty tree'
        },
        {
            input: [1, 2, 3, 4, 5, 6, 7],
            expected: 3,
            description: 'complete binary tree'
        },
        {
            input: [1, 2, 3, 4, null, null, 7, 8],
            expected: 4,
            description: 'irregular tree'
        }
    ];

    describe('Recursive approach', () => {
        testCases.forEach(({ input, expected, description }) => {
            test(`should return ${expected} for ${description}`, () => {
                const root = createBinaryTree(input);
                expect(maxDepth(root)).toBe(expected);
            });
        });
    });

    describe('Iterative BFS approach', () => {
        testCases.forEach(({ input, expected, description }) => {
            test(`should return ${expected} for ${description}`, () => {
                const root = createBinaryTree(input);
                expect(maxDepthIterative(root)).toBe(expected);
            });
        });
    });

    describe('Iterative DFS approach', () => {
        testCases.forEach(({ input, expected, description }) => {
            test(`should return ${expected} for ${description}`, () => {
                const root = createBinaryTree(input);
                expect(maxDepthDFS(root)).toBe(expected);
            });
        });
    });
});