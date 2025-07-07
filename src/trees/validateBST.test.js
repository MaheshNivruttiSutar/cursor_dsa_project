const { TreeNode } = require('../utils/TreeNode');
const {
    isValidBST,
    isValidBSTInOrder,
    isValidBSTIterative,
    isValidBSTArray,
    validateBSTWithDetails,
    getBSTMinMax,
    validateBSTWithRange,
    countValidBSTNodes,
    getInOrderTraversal
} = require('./validateBST');

describe('Validate Binary Search Tree', () => {
    describe('isValidBST (Bounds checking)', () => {
        test('should return true for valid BST [2,1,3]', () => {
            const root = new TreeNode(2);
            root.left = new TreeNode(1);
            root.right = new TreeNode(3);
            expect(isValidBST(root)).toBe(true);
        });

        test('should return false for invalid BST [5,1,4,null,null,3,6]', () => {
            const root = new TreeNode(5);
            root.left = new TreeNode(1);
            root.right = new TreeNode(4);
            root.right.left = new TreeNode(3);
            root.right.right = new TreeNode(6);
            expect(isValidBST(root)).toBe(false);
        });

        test('should return true for null tree', () => {
            expect(isValidBST(null)).toBe(true);
        });

        test('should return true for single node', () => {
            const root = new TreeNode(5);
            expect(isValidBST(root)).toBe(true);
        });

        test('should handle duplicate values correctly', () => {
            const root = new TreeNode(5);
            root.left = new TreeNode(5);
            expect(isValidBST(root)).toBe(false);
        });

        test('should handle large values', () => {
            const root = new TreeNode(2147483647);
            expect(isValidBST(root)).toBe(true);
        });

        test('should handle complex invalid case', () => {
            const root = new TreeNode(10);
            root.left = new TreeNode(5);
            root.right = new TreeNode(15);
            root.right.left = new TreeNode(6);
            root.right.right = new TreeNode(20);
            expect(isValidBST(root)).toBe(false);
        });
    });

    describe('isValidBSTInOrder (In-order traversal)', () => {
        test('should return true for valid BST', () => {
            const root = new TreeNode(2);
            root.left = new TreeNode(1);
            root.right = new TreeNode(3);
            expect(isValidBSTInOrder(root)).toBe(true);
        });

        test('should return false for invalid BST', () => {
            const root = new TreeNode(5);
            root.left = new TreeNode(1);
            root.right = new TreeNode(4);
            root.right.left = new TreeNode(3);
            root.right.right = new TreeNode(6);
            expect(isValidBSTInOrder(root)).toBe(false);
        });

        test('should handle null tree', () => {
            expect(isValidBSTInOrder(null)).toBe(true);
        });

        test('should handle duplicate values', () => {
            const root = new TreeNode(1);
            root.right = new TreeNode(1);
            expect(isValidBSTInOrder(root)).toBe(false);
        });
    });

    describe('isValidBSTIterative (Iterative in-order)', () => {
        test('should return true for valid BST', () => {
            const root = new TreeNode(2);
            root.left = new TreeNode(1);
            root.right = new TreeNode(3);
            expect(isValidBSTIterative(root)).toBe(true);
        });

        test('should return false for invalid BST', () => {
            const root = new TreeNode(5);
            root.left = new TreeNode(1);
            root.right = new TreeNode(4);
            root.right.left = new TreeNode(3);
            root.right.right = new TreeNode(6);
            expect(isValidBSTIterative(root)).toBe(false);
        });

        test('should handle null tree', () => {
            expect(isValidBSTIterative(null)).toBe(true);
        });
    });

    describe('isValidBSTArray (Array-based)', () => {
        test('should return true for valid BST', () => {
            const root = new TreeNode(2);
            root.left = new TreeNode(1);
            root.right = new TreeNode(3);
            expect(isValidBSTArray(root)).toBe(true);
        });

        test('should return false for invalid BST', () => {
            const root = new TreeNode(5);
            root.left = new TreeNode(1);
            root.right = new TreeNode(4);
            root.right.left = new TreeNode(3);
            root.right.right = new TreeNode(6);
            expect(isValidBSTArray(root)).toBe(false);
        });

        test('should handle null tree', () => {
            expect(isValidBSTArray(null)).toBe(true);
        });
    });

    describe('validateBSTWithDetails (Detailed validation)', () => {
        test('should provide details for valid BST', () => {
            const root = new TreeNode(2);
            root.left = new TreeNode(1);
            root.right = new TreeNode(3);

            const result = validateBSTWithDetails(root);
            expect(result.isValid).toBe(true);
            expect(result.violations).toHaveLength(0);
            expect(result.message).toBe('Valid BST');
        });

        test('should provide details for invalid BST', () => {
            const root = new TreeNode(5);
            root.left = new TreeNode(1);
            root.right = new TreeNode(4);
            root.right.left = new TreeNode(3);
            root.right.right = new TreeNode(6);

            const result = validateBSTWithDetails(root);
            expect(result.isValid).toBe(false);
            expect(result.violations.length).toBeGreaterThan(0);
            expect(result.message).toContain('Invalid BST');
        });

        test('should handle null tree', () => {
            const result = validateBSTWithDetails(null);
            expect(result.isValid).toBe(true);
            expect(result.violations).toHaveLength(0);
        });
    });

    describe('getBSTMinMax (Min/Max values)', () => {
        test('should find min and max in BST', () => {
            const root = new TreeNode(5);
            root.left = new TreeNode(3);
            root.right = new TreeNode(8);
            root.left.left = new TreeNode(1);
            root.right.right = new TreeNode(10);

            const result = getBSTMinMax(root);
            expect(result.min).toBe(1);
            expect(result.max).toBe(10);
        });

        test('should handle single node', () => {
            const root = new TreeNode(5);
            const result = getBSTMinMax(root);
            expect(result.min).toBe(5);
            expect(result.max).toBe(5);
        });

        test('should handle null tree', () => {
            const result = getBSTMinMax(null);
            expect(result.min).toBe(null);
            expect(result.max).toBe(null);
        });

        test('should handle left-skewed tree', () => {
            const root = new TreeNode(5);
            root.left = new TreeNode(3);
            root.left.left = new TreeNode(1);

            const result = getBSTMinMax(root);
            expect(result.min).toBe(1);
            expect(result.max).toBe(5);
        });

        test('should handle right-skewed tree', () => {
            const root = new TreeNode(5);
            root.right = new TreeNode(7);
            root.right.right = new TreeNode(9);

            const result = getBSTMinMax(root);
            expect(result.min).toBe(5);
            expect(result.max).toBe(9);
        });
    });

    describe('validateBSTWithRange (Range validation)', () => {
        test('should validate BST and return range', () => {
            const root = new TreeNode(5);
            root.left = new TreeNode(3);
            root.right = new TreeNode(8);

            const result = validateBSTWithRange(root);
            expect(result.isValid).toBe(true);
            expect(result.min).toBe(3);
            expect(result.max).toBe(8);
        });

        test('should detect invalid BST', () => {
            const root = new TreeNode(5);
            root.left = new TreeNode(1);
            root.right = new TreeNode(4);
            root.right.left = new TreeNode(3);
            root.right.right = new TreeNode(6);

            const result = validateBSTWithRange(root);
            expect(result.isValid).toBe(false);
        });

        test('should handle null tree', () => {
            const result = validateBSTWithRange(null);
            expect(result.isValid).toBe(true);
            expect(result.min).toBe(Infinity);
            expect(result.max).toBe(-Infinity);
        });
    });

    describe('countValidBSTNodes (Local validity)', () => {
        test('should count locally valid nodes in valid BST', () => {
            const root = new TreeNode(5);
            root.left = new TreeNode(3);
            root.right = new TreeNode(8);

            const count = countValidBSTNodes(root);
            expect(count).toBe(3);
        });

        test('should count locally valid nodes in mixed tree', () => {
            const root = new TreeNode(5);
            root.left = new TreeNode(3);
            root.right = new TreeNode(4); // Invalid: 4 < 5
            root.right.left = new TreeNode(3);
            root.right.right = new TreeNode(6);

            const count = countValidBSTNodes(root);
            expect(count).toBe(4); // Root invalid, but other nodes (3, 4, 3, 6) are locally valid
        });

        test('should handle null tree', () => {
            expect(countValidBSTNodes(null)).toBe(0);
        });

        test('should handle single node', () => {
            const root = new TreeNode(5);
            expect(countValidBSTNodes(root)).toBe(1);
        });
    });

    describe('getInOrderTraversal (Utility)', () => {
        test('should return in-order traversal', () => {
            const root = new TreeNode(5);
            root.left = new TreeNode(3);
            root.right = new TreeNode(8);
            root.left.left = new TreeNode(1);
            root.right.right = new TreeNode(10);

            const result = getInOrderTraversal(root);
            expect(result).toEqual([1, 3, 5, 8, 10]);
        });

        test('should handle null tree', () => {
            const result = getInOrderTraversal(null);
            expect(result).toEqual([]);
        });

        test('should handle single node', () => {
            const root = new TreeNode(5);
            const result = getInOrderTraversal(root);
            expect(result).toEqual([5]);
        });

        test('should handle unbalanced tree', () => {
            const root = new TreeNode(1);
            root.right = new TreeNode(2);
            root.right.right = new TreeNode(3);

            const result = getInOrderTraversal(root);
            expect(result).toEqual([1, 2, 3]);
        });
    });

    describe('All approaches comparison', () => {
        test('all approaches should give same result for various test cases', () => {
            const testCases = [
                // Valid BST
                (() => {
                    const root = new TreeNode(2);
                    root.left = new TreeNode(1);
                    root.right = new TreeNode(3);
                    return root;
                })(),
                // Invalid BST
                (() => {
                    const root = new TreeNode(5);
                    root.left = new TreeNode(1);
                    root.right = new TreeNode(4);
                    root.right.left = new TreeNode(3);
                    root.right.right = new TreeNode(6);
                    return root;
                })(),
                // Single node
                new TreeNode(1),
                // Null tree
                null
            ];

            testCases.forEach(testCase => {
                const result1 = isValidBST(testCase);
                const result2 = isValidBSTInOrder(testCase);
                const result3 = isValidBSTIterative(testCase);
                const result4 = isValidBSTArray(testCase);

                expect(result1).toBe(result2);
                expect(result2).toBe(result3);
                expect(result3).toBe(result4);
            });
        });
    });

    describe('Edge cases', () => {
        test('should handle tree with negative values', () => {
            const root = new TreeNode(0);
            root.left = new TreeNode(-1);
            root.right = new TreeNode(1);

            expect(isValidBST(root)).toBe(true);
        });

        test('should handle tree with large values', () => {
            const root = new TreeNode(2147483647);
            root.left = new TreeNode(2147483646);

            expect(isValidBST(root)).toBe(true);
        });

        test('should handle tree where subtree violates BST property', () => {
            const root = new TreeNode(10);
            root.left = new TreeNode(5);
            root.right = new TreeNode(15);
            root.right.left = new TreeNode(12);
            root.right.right = new TreeNode(20);
            root.right.left.left = new TreeNode(6); // This violates BST: 6 < 10 but in right subtree

            expect(isValidBST(root)).toBe(false);
        });

        test('should handle perfect BST', () => {
            const root = new TreeNode(8);
            root.left = new TreeNode(4);
            root.right = new TreeNode(12);
            root.left.left = new TreeNode(2);
            root.left.right = new TreeNode(6);
            root.right.left = new TreeNode(10);
            root.right.right = new TreeNode(14);

            expect(isValidBST(root)).toBe(true);
        });
    });
});