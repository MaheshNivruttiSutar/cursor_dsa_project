const {
    exist,
    existOptimized,
    existIterative,
    findAllWordOccurrences,
    visualizeWordSearch,
    generateWordSearchTestCase,
    benchmarkWordSearch,
    countPossibleWords,
    findLongestWord
} = require('./wordSearch');

describe('Word Search', () => {

    // Test all three main implementations with the same test cases
    const implementations = [
        { name: 'DFS Backtracking', func: exist },
        { name: 'Optimized DFS', func: existOptimized },
        { name: 'Iterative DFS', func: existIterative }
    ];

    implementations.forEach(({ name, func }) => {
        describe(`${name} Implementation`, () => {

            describe('Basic Functionality', () => {
                test('should find word that exists horizontally', () => {
                    const board = [
                        ['A', 'B', 'C', 'E'],
                        ['S', 'F', 'C', 'S'],
                        ['A', 'D', 'E', 'E']
                    ];
                    expect(func(board, 'ABCCED')).toBe(true);
                });

                test('should find word that exists vertically', () => {
                    const board = [
                        ['A', 'B', 'C', 'E'],
                        ['S', 'F', 'C', 'S'],
                        ['A', 'D', 'E', 'E']
                    ];
                    expect(func(board, 'ASA')).toBe(true);
                });

                test('should find word with mixed directions', () => {
                    const board = [
                        ['A', 'B', 'C', 'E'],
                        ['S', 'F', 'C', 'S'],
                        ['A', 'D', 'E', 'E']
                    ];
                    expect(func(board, 'SEE')).toBe(true);
                });

                test('should return false for non-existent word', () => {
                    const board = [
                        ['A', 'B', 'C', 'E'],
                        ['S', 'F', 'C', 'S'],
                        ['A', 'D', 'E', 'E']
                    ];
                    expect(func(board, 'ABCB')).toBe(false);
                });

                test('should find single character word', () => {
                    const board = [['A']];
                    expect(func(board, 'A')).toBe(true);
                    expect(func(board, 'B')).toBe(false);
                });

                test('should handle word longer than available cells', () => {
                    const board = [['A', 'B']];
                    expect(func(board, 'ABC')).toBe(false);
                });
            });

            describe('Edge Cases', () => {
                test('should handle empty board', () => {
                    expect(func([], 'A')).toBe(false);
                    expect(func(null, 'A')).toBe(false);
                    expect(func(undefined, 'A')).toBe(false);
                });

                test('should handle empty word', () => {
                    const board = [['A', 'B'], ['C', 'D']];
                    expect(func(board, '')).toBe(false);
                    expect(func(board, null)).toBe(false);
                    expect(func(board, undefined)).toBe(false);
                });

                test('should handle single cell board', () => {
                    const board = [['A']];
                    expect(func(board, 'A')).toBe(true);
                    expect(func(board, 'B')).toBe(false);
                    expect(func(board, 'AA')).toBe(false);
                });

                test('should handle repeated characters', () => {
                    const board = [
                        ['A', 'A', 'A'],
                        ['A', 'A', 'A'],
                        ['A', 'A', 'A']
                    ];
                    expect(func(board, 'AAA')).toBe(true);
                    expect(func(board, 'AAAA')).toBe(true);
                    expect(func(board, 'AAAAAAAAAA')).toBe(false);
                });

                test('should not reuse the same cell', () => {
                    const board = [
                        ['A', 'B'],
                        ['C', 'D']
                    ];
                    expect(func(board, 'ABDC')).toBe(true);
                    expect(func(board, 'ABA')).toBe(false); // Cannot reuse A
                });

                test('should handle large board', () => {
                    const board = Array(100).fill().map(() =>
                        Array(100).fill().map(() => 'A')
                    );
                    expect(func(board, 'A')).toBe(true);
                    expect(func(board, 'AA')).toBe(true);
                    expect(func(board, 'B')).toBe(false);
                });
            });

            describe('LeetCode Examples', () => {
                test('should pass LeetCode example 1', () => {
                    const board = [
                        ['A', 'B', 'C', 'E'],
                        ['S', 'F', 'C', 'S'],
                        ['A', 'D', 'E', 'E']
                    ];
                    expect(func(board, 'ABCCED')).toBe(true);
                    expect(func(board, 'SEE')).toBe(true);
                    expect(func(board, 'ABCB')).toBe(false);
                });

                test('should pass LeetCode example 2', () => {
                    const board = [['a']];
                    expect(func(board, 'a')).toBe(true);
                });

                test('should handle complex path', () => {
                    const board = [
                        ['C', 'A', 'A'],
                        ['A', 'A', 'A'],
                        ['B', 'C', 'D']
                    ];
                    expect(func(board, 'AAB')).toBe(true);
                });
            });

            describe('Complex Patterns', () => {
                test('should find spiral pattern', () => {
                    const board = [
                        ['A', 'B', 'C'],
                        ['H', 'I', 'D'],
                        ['G', 'F', 'E']
                    ];
                    expect(func(board, 'ABCDEFGHI')).toBe(true);
                });

                test('should find zigzag pattern', () => {
                    const board = [
                        ['A', 'B', 'C'],
                        ['F', 'E', 'D'],
                        ['G', 'H', 'I']
                    ];
                    expect(func(board, 'ABCDEFGHI')).toBe(true);
                });

                test('should handle backtracking requirement', () => {
                    const board = [
                        ['A', 'B', 'C', 'E'],
                        ['S', 'F', 'E', 'S'],
                        ['A', 'D', 'E', 'E']
                    ];
                    expect(func(board, 'ABCESEEEFS')).toBe(true);
                });
            });
        });
    });

    describe('Additional Functions', () => {
        describe('findAllWordOccurrences', () => {
            test('should find all starting positions', () => {
                const board = [
                    ['A', 'B', 'A'],
                    ['B', 'A', 'B'],
                    ['A', 'B', 'A']
                ];
                const positions = findAllWordOccurrences(board, 'AB');
                expect(positions.length).toBeGreaterThan(0);
                expect(Array.isArray(positions)).toBe(true);

                // Each position should be a valid [row, col] pair
                positions.forEach(pos => {
                    expect(Array.isArray(pos)).toBe(true);
                    expect(pos).toHaveLength(2);
                    expect(typeof pos[0]).toBe('number');
                    expect(typeof pos[1]).toBe('number');
                });
            });

            test('should return empty array for non-existent word', () => {
                const board = [['A', 'B'], ['C', 'D']];
                const positions = findAllWordOccurrences(board, 'XYZ');
                expect(positions).toEqual([]);
            });

            test('should handle single character word', () => {
                const board = [
                    ['A', 'B'],
                    ['A', 'C']
                ];
                const positions = findAllWordOccurrences(board, 'A');
                expect(positions.length).toBe(2);
                expect(positions).toContainEqual([0, 0]);
                expect(positions).toContainEqual([1, 0]);
            });
        });

        describe('visualizeWordSearch', () => {
            test('should visualize successful search', () => {
                const board = [
                    ['A', 'B', 'C'],
                    ['D', 'E', 'F'],
                    ['G', 'H', 'I']
                ];
                const result = visualizeWordSearch(board, 'AEI');

                expect(result).toHaveProperty('found');
                expect(result).toHaveProperty('path');
                expect(result).toHaveProperty('word');
                expect(result).toHaveProperty('board');

                if (result.found) {
                    expect(result.path.length).toBe(3);
                    expect(result.word).toBe('AEI');
                }
            });

            test('should handle unsuccessful search', () => {
                const board = [['A', 'B'], ['C', 'D']];
                const result = visualizeWordSearch(board, 'XYZ');

                expect(result.found).toBe(false);
                expect(result.path).toEqual([]);
                expect(result.word).toBe('XYZ');
            });

            test('should handle empty inputs', () => {
                expect(visualizeWordSearch([], 'A')).toBeNull();
                expect(visualizeWordSearch([['A']], '')).toBeNull();
                expect(visualizeWordSearch(null, 'A')).toBeNull();
            });
        });

        describe('generateWordSearchTestCase', () => {
            test('should generate valid test case', () => {
                const testCase = generateWordSearchTestCase(3, 3);

                expect(testCase).toHaveProperty('board');
                expect(testCase).toHaveProperty('existingWords');
                expect(testCase).toHaveProperty('nonExistingWords');
                expect(testCase).toHaveProperty('dimensions');

                expect(testCase.board).toHaveLength(3);
                expect(testCase.board[0]).toHaveLength(3);
                expect(testCase.dimensions).toEqual({ rows: 3, cols: 3 });

                expect(Array.isArray(testCase.existingWords)).toBe(true);
                expect(Array.isArray(testCase.nonExistingWords)).toBe(true);
                expect(testCase.existingWords.length).toBeGreaterThan(0);
                expect(testCase.nonExistingWords.length).toBeGreaterThan(0);
            });

            test('should generate board with custom alphabet', () => {
                const testCase = generateWordSearchTestCase(2, 2, 'ABC');

                // All characters in board should be from custom alphabet
                for (let i = 0; i < testCase.board.length; i++) {
                    for (let j = 0; j < testCase.board[i].length; j++) {
                        expect('ABC').toContain(testCase.board[i][j]);
                    }
                }
            });

            test('should handle minimum board size', () => {
                const testCase = generateWordSearchTestCase(1, 1);
                expect(testCase.board).toHaveLength(1);
                expect(testCase.board[0]).toHaveLength(1);
            });
        });

        describe('benchmarkWordSearch', () => {
            test('should benchmark all approaches', () => {
                const board = [
                    ['A', 'B', 'C', 'E'],
                    ['S', 'F', 'C', 'S'],
                    ['A', 'D', 'E', 'E']
                ];
                const results = benchmarkWordSearch(board, 'ABCCED');

                expect(results).toHaveProperty('DFS Backtracking');
                expect(results).toHaveProperty('Optimized DFS');
                expect(results).toHaveProperty('Iterative DFS');

                Object.values(results).forEach(result => {
                    expect(result).toHaveProperty('result');
                    expect(result).toHaveProperty('time');
                    expect(result).toHaveProperty('found');
                    expect(typeof result.time).toBe('number');
                    expect(result.time).toBeGreaterThanOrEqual(0);
                });
            });

            test('should produce consistent results across approaches', () => {
                const board = [
                    ['A', 'B'],
                    ['C', 'D']
                ];
                const results = benchmarkWordSearch(board, 'AC');

                const resultValues = Object.values(results).map(r => r.result);
                const firstResult = resultValues[0];
                expect(resultValues.every(r => r === firstResult)).toBe(true);
            });
        });

        describe('countPossibleWords', () => {
            test('should count words in small board', () => {
                const board = [
                    ['A', 'B'],
                    ['C', 'D']
                ];
                const count = countPossibleWords(board, 3);
                expect(count).toBeGreaterThan(0);
                expect(typeof count).toBe('number');
            });

            test('should handle empty board', () => {
                expect(countPossibleWords([])).toBe(0);
                expect(countPossibleWords(null)).toBe(0);
            });

            test('should respect max length parameter', () => {
                const board = [['A', 'B'], ['C', 'D']];
                const count1 = countPossibleWords(board, 1);
                const count2 = countPossibleWords(board, 2);
                expect(count2).toBeGreaterThanOrEqual(count1);
            });

            test('should handle single cell board', () => {
                const board = [['A']];
                const count = countPossibleWords(board, 5);
                expect(count).toBe(1); // Only 'A'
            });
        });

        describe('findLongestWord', () => {
            test('should find longest word in board', () => {
                const board = [
                    ['A', 'B', 'C'],
                    ['D', 'E', 'F'],
                    ['G', 'H', 'I']
                ];
                const longest = findLongestWord(board);
                expect(typeof longest).toBe('string');
                expect(longest.length).toBeGreaterThan(0);
                expect(longest.length).toBeLessThanOrEqual(9); // Max possible in 3x3 board
            });

            test('should handle empty board', () => {
                expect(findLongestWord([])).toBe('');
                expect(findLongestWord(null)).toBe('');
            });

            test('should handle single cell board', () => {
                const board = [['X']];
                const longest = findLongestWord(board);
                expect(longest).toBe('X');
            });

            test('should find path that visits all cells', () => {
                const board = [
                    ['A', 'B'],
                    ['D', 'C']
                ];
                const longest = findLongestWord(board);
                expect(longest.length).toBe(4); // Should visit all 4 cells
            });
        });
    });

    describe('Performance Tests', () => {
        test('should handle medium-sized board efficiently', () => {
            const board = Array(10).fill().map(() =>
                Array(10).fill().map(() => 'A')
            );

            const startTime = performance.now();
            const result = exist(board, 'AAAA');
            const endTime = performance.now();

            expect(result).toBe(true);
            expect(endTime - startTime).toBeLessThan(1000); // Should complete within 1 second
        });

        test('should handle word not found efficiently', () => {
            const board = Array(5).fill().map(() =>
                Array(5).fill().map(() => 'A')
            );

            const startTime = performance.now();
            const result = exist(board, 'ABCDE');
            const endTime = performance.now();

            expect(result).toBe(false);
            expect(endTime - startTime).toBeLessThan(100); // Should complete quickly for non-existent word
        });
    });

    describe('Algorithm Consistency', () => {
        test('all implementations should produce same results for basic cases', () => {
            const testCases = [
                {
                    board: [
                        ['A', 'B', 'C', 'E'],
                        ['S', 'F', 'C', 'S'],
                        ['A', 'D', 'E', 'E']
                    ],
                    word: 'ABCCED',
                    expected: true
                },
                {
                    board: [
                        ['A', 'B', 'C', 'E'],
                        ['S', 'F', 'C', 'S'],
                        ['A', 'D', 'E', 'E']
                    ],
                    word: 'ABCB',
                    expected: false
                },
                {
                    board: [['a']],
                    word: 'a',
                    expected: true
                }
            ];

            testCases.forEach(({ board, word, expected }) => {
                const results = implementations.map(({ func }) =>
                    func(board.map(row => [...row]), word) // Deep copy to avoid mutation
                );

                results.forEach(result => {
                    expect(result).toBe(expected);
                });

                // All implementations should agree
                const firstResult = results[0];
                expect(results.every(r => r === firstResult)).toBe(true);
            });
        });

        test('should handle edge cases consistently', () => {
            const edgeCases = [
                { board: [], word: 'A' },
                { board: [['A']], word: '' },
                { board: [['A', 'B'], ['C', 'D']], word: 'ABDC' },
                { board: [['A', 'A'], ['A', 'A']], word: 'AAA' }
            ];

            edgeCases.forEach(({ board, word }) => {
                const results = implementations.map(({ func }) => {
                    try {
                        return func(board.map(row => [...row]), word);
                    } catch (error) {
                        return null; // Handle any potential errors consistently
                    }
                });

                // All implementations should produce the same result
                const firstResult = results[0];
                expect(results.every(r => r === firstResult)).toBe(true);
            });
        });
    });

    describe('Stress Tests', () => {
        test('should handle multiple searches on same board', () => {
            const board = [
                ['A', 'B', 'C', 'D'],
                ['E', 'F', 'G', 'H'],
                ['I', 'J', 'K', 'L'],
                ['M', 'N', 'O', 'P']
            ];

            const words = ['ABC', 'AEI', 'DHLP', 'ABCD', 'AEIM', 'XYZ'];

            words.forEach(word => {
                const result = exist(board, word);
                expect(typeof result).toBe('boolean');
            });
        });

        test('should handle repeated character patterns', () => {
            const board = [
                ['A', 'A', 'A', 'A'],
                ['A', 'B', 'B', 'A'],
                ['A', 'B', 'B', 'A'],
                ['A', 'A', 'A', 'A']
            ];

            expect(exist(board, 'AAAA')).toBe(true);
            expect(exist(board, 'ABB')).toBe(true);
            expect(exist(board, 'ABBA')).toBe(true);
            expect(exist(board, 'AABBAA')).toBe(true);
        });

        test('should handle worst-case backtracking scenario', () => {
            // Create a board where we need to explore many paths
            const board = [
                ['A', 'A', 'A', 'B'],
                ['A', 'A', 'A', 'A'],
                ['A', 'A', 'A', 'A'],
                ['A', 'A', 'A', 'A']
            ];

            const startTime = performance.now();
            const result = exist(board, 'AAAAAAAAAAAAB');
            const endTime = performance.now();

            expect(result).toBe(true);
            expect(endTime - startTime).toBeLessThan(5000); // Should complete within 5 seconds
        });
    });
});