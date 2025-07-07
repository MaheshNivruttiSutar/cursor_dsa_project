const { numIslands, numIslandsBFS, numIslandsNonDestructive, deepCopyGrid } = require('./numberOfIslands');

describe('Number of Islands', () => {
    describe('numIslands (DFS)', () => {
        test('should return 1 for single island', () => {
            const grid = [
                ["1","1","1","1","0"],
                ["1","1","0","1","0"],
                ["1","1","0","0","0"],
                ["0","0","0","0","0"]
            ];
            expect(numIslands(grid)).toBe(1);
        });

        test('should return 3 for multiple islands', () => {
            const grid = [
                ["1","1","0","0","0"],
                ["1","1","0","0","0"],
                ["0","0","1","0","0"],
                ["0","0","0","1","1"]
            ];
            expect(numIslands(grid)).toBe(3);
        });

        test('should return 0 for empty grid', () => {
            expect(numIslands([])).toBe(0);
            expect(numIslands(null)).toBe(0);
            expect(numIslands(undefined)).toBe(0);
        });

        test('should return 0 for all water', () => {
            const grid = [
                ["0","0","0"],
                ["0","0","0"],
                ["0","0","0"]
            ];
            expect(numIslands(grid)).toBe(0);
        });

        test('should return 9 for all land', () => {
            const grid = [
                ["1","1","1"],
                ["1","1","1"],
                ["1","1","1"]
            ];
            expect(numIslands(grid)).toBe(1);
        });

        test('should handle single cell', () => {
            expect(numIslands([["1"]])).toBe(1);
            expect(numIslands([["0"]])).toBe(0);
        });

        test('should handle single row', () => {
            expect(numIslands([["1","0","1","0","1"]])).toBe(3);
        });

        test('should handle single column', () => {
            const grid = [["1"], ["0"], ["1"], ["0"], ["1"]];
            expect(numIslands(grid)).toBe(3);
        });

        test('should handle complex island shape', () => {
            const grid = [
                ["1","1","0","0","1"],
                ["1","0","0","1","1"],
                ["0","0","1","0","0"],
                ["0","1","0","0","1"],
                ["1","0","0","1","1"]
            ];
            expect(numIslands(grid)).toBe(6);
        });

        test('should handle L-shaped island', () => {
            const grid = [
                ["1","1","1"],
                ["0","0","1"],
                ["0","0","1"]
            ];
            expect(numIslands(grid)).toBe(1);
        });
    });

    describe('numIslandsBFS (BFS)', () => {
        test('should return 1 for single island', () => {
            const grid = [
                ["1","1","1","1","0"],
                ["1","1","0","1","0"],
                ["1","1","0","0","0"],
                ["0","0","0","0","0"]
            ];
            expect(numIslandsBFS(grid)).toBe(1);
        });

        test('should return 3 for multiple islands', () => {
            const grid = [
                ["1","1","0","0","0"],
                ["1","1","0","0","0"],
                ["0","0","1","0","0"],
                ["0","0","0","1","1"]
            ];
            expect(numIslandsBFS(grid)).toBe(3);
        });

        test('should return 0 for empty grid', () => {
            expect(numIslandsBFS([])).toBe(0);
            expect(numIslandsBFS(null)).toBe(0);
            expect(numIslandsBFS(undefined)).toBe(0);
        });

        test('should handle complex patterns', () => {
            const grid = [
                ["1","0","1","1","1"],
                ["1","0","1","0","1"],
                ["1","1","1","0","1"]
            ];
            expect(numIslandsBFS(grid)).toBe(1);
        });

        test('should handle diagonal islands (not connected)', () => {
            const grid = [
                ["1","0","1"],
                ["0","1","0"],
                ["1","0","1"]
            ];
            expect(numIslandsBFS(grid)).toBe(5);
        });
    });

    describe('numIslandsNonDestructive (preserves original grid)', () => {
        test('should return correct count and preserve original grid', () => {
            const originalGrid = [
                ["1","1","0","0","0"],
                ["1","1","0","0","0"],
                ["0","0","1","0","0"],
                ["0","0","0","1","1"]
            ];
            const gridCopy = deepCopyGrid(originalGrid);

            const result = numIslandsNonDestructive(gridCopy);

            expect(result).toBe(3);
            expect(gridCopy).toEqual(originalGrid); // Grid should be unchanged
        });

        test('should handle large grid efficiently', () => {
            const grid = Array(10).fill().map(() => Array(10).fill("1"));
            expect(numIslandsNonDestructive(grid)).toBe(1);
        });

        test('should handle alternating pattern', () => {
            const grid = [
                ["1","0","1","0","1"],
                ["0","1","0","1","0"],
                ["1","0","1","0","1"],
                ["0","1","0","1","0"]
            ];
            expect(numIslandsNonDestructive(grid)).toBe(10);
        });
    });

    describe('deepCopyGrid utility', () => {
        test('should create deep copy of grid', () => {
            const original = [
                ["1","0","1"],
                ["0","1","0"]
            ];
            const copy = deepCopyGrid(original);

            expect(copy).toEqual(original);
            expect(copy).not.toBe(original);
            expect(copy[0]).not.toBe(original[0]);
        });

        test('should handle empty grid', () => {
            expect(deepCopyGrid([])).toEqual([]);
        });

        test('should handle single cell', () => {
            const original = [["1"]];
            const copy = deepCopyGrid(original);

            copy[0][0] = "0";
            expect(original[0][0]).toBe("1");
            expect(copy[0][0]).toBe("0");
        });
    });

    describe('Edge cases and performance', () => {
        test('should handle very large single island', () => {
            const grid = Array(50).fill().map(() => Array(50).fill("1"));
            expect(numIslandsNonDestructive(deepCopyGrid(grid))).toBe(1);
        });

        test('should handle checkerboard pattern', () => {
            const grid = [
                ["1","0","1","0"],
                ["0","1","0","1"],
                ["1","0","1","0"],
                ["0","1","0","1"]
            ];
            expect(numIslandsNonDestructive(grid)).toBe(8);
        });

        test('should handle rectangular grid', () => {
            const grid = [
                ["1","1","1","1","1"],
                ["0","0","0","0","0"],
                ["1","1","1","1","1"]
            ];
            expect(numIslandsNonDestructive(grid)).toBe(2);
        });
    });

    describe('Comparison of all approaches', () => {
        test('all approaches should give same result', () => {
            const testCases = [
                [
                    ["1","1","1","1","0"],
                    ["1","1","0","1","0"],
                    ["1","1","0","0","0"],
                    ["0","0","0","0","0"]
                ],
                [
                    ["1","1","0","0","0"],
                    ["1","1","0","0","0"],
                    ["0","0","1","0","0"],
                    ["0","0","0","1","1"]
                ],
                [
                    ["1","0","1","0","1"],
                    ["0","1","0","1","0"],
                    ["1","0","1","0","1"]
                ]
            ];

            testCases.forEach(testCase => {
                const grid1 = deepCopyGrid(testCase);
                const grid2 = deepCopyGrid(testCase);
                const grid3 = deepCopyGrid(testCase);

                const result1 = numIslands(grid1);
                const result2 = numIslandsBFS(grid2);
                const result3 = numIslandsNonDestructive(grid3);

                expect(result1).toBe(result2);
                expect(result2).toBe(result3);
            });
        });
    });
});