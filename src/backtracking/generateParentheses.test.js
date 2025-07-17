/**
 * @fileoverview Test cases for Generate Parentheses - LeetCode #22
 * @author Your Name
 * @since 2024
 */

const {
    generateParentheses,
    generateParenthesesBacktracking,
    generateParenthesesOptimized,
    generateParenthesesDP,
    generateParenthesesClosure,
    isValidParentheses,
    countValidParentheses,
    generateCustomBrackets,
    getKthParentheses,
    parenthesestoTree,
    generateMultiBrackets,
    visualizeGeneration
} = require('./generateParentheses');

describe('Generate Parentheses', () => {
    // Expected results for different values of n
    const expectedResults = {
        1: ["()"],
        2: ["(())", "()()"],
        3: ["((()))", "(()())", "(())()", "()(())", "()()()"],
        4: [
            "(((())))", "((()()))", "((())())", "((()))()", "(()(()))",
            "(()()())", "(()())()", "(())(())", "(())()()", "()((()))",
            "()(()())", "()(())()", "()()(())", "()()()()"
        ]
    };

    // Catalan numbers for validation
    const catalanNumbers = [1, 1, 2, 5, 14, 42, 132, 429];

    describe('All Approaches Correctness', () => {
        const approaches = [
            { name: 'Backtracking', fn: generateParenthesesBacktracking },
            { name: 'Optimized', fn: generateParenthesesOptimized },
            { name: 'DP', fn: generateParenthesesDP },
            { name: 'Closure', fn: generateParenthesesClosure },
            { name: 'Default', fn: generateParentheses }
        ];

        approaches.forEach(({ name, fn }) => {
            describe(`${name} Approach`, () => {
                test('n = 1', () => {
                    const result = fn(1);
                    expect(result.sort()).toEqual(expectedResults[1].sort());
                });

                test('n = 2', () => {
                    const result = fn(2);
                    expect(result.sort()).toEqual(expectedResults[2].sort());
                });

                test('n = 3', () => {
                    const result = fn(3);
                    expect(result.sort()).toEqual(expectedResults[3].sort());
                });

                test('all results are valid parentheses', () => {
                    for (let n = 1; n <= 4; n++) {
                        const result = fn(n);
                        result.forEach(s => {
                            expect(isValidParentheses(s)).toBe(true);
                            expect(s.length).toBe(2 * n);
                        });
                    }
                });

                test('correct count matches Catalan numbers', () => {
                    for (let n = 1; n <= 7; n++) {
                        const result = fn(n);
                        expect(result.length).toBe(catalanNumbers[n]);
                    }
                });
            });
        });
    });

    describe('Edge Cases', () => {
        test('n = 0', () => {
            expect(generateParentheses(0)).toEqual([]);
        });

        test('negative n', () => {
            expect(generateParentheses(-1)).toEqual([]);
        });

        test('n = 1 base case', () => {
            expect(generateParentheses(1)).toEqual(["()"]);
        });

        test('large n (performance test)', () => {
            const result = generateParentheses(7);
            expect(result.length).toBe(catalanNumbers[7]);
            result.forEach(s => {
                expect(isValidParentheses(s)).toBe(true);
            });
        });
    });

    describe('Result Validation', () => {
        test('no duplicate results', () => {
            for (let n = 1; n <= 5; n++) {
                const result = generateParentheses(n);
                const uniqueSet = new Set(result);
                expect(uniqueSet.size).toBe(result.length);
            }
        });

        test('all results have correct length', () => {
            for (let n = 1; n <= 5; n++) {
                const result = generateParentheses(n);
                result.forEach(s => {
                    expect(s.length).toBe(2 * n);
                });
            }
        });

        test('all results are well-formed', () => {
            for (let n = 1; n <= 5; n++) {
                const result = generateParentheses(n);
                result.forEach(s => {
                    expect(isValidParentheses(s)).toBe(true);
                });
            }
        });

        test('correct balance of parentheses', () => {
            for (let n = 1; n <= 5; n++) {
                const result = generateParentheses(n);
                result.forEach(s => {
                    const openCount = (s.match(/\(/g) || []).length;
                    const closeCount = (s.match(/\)/g) || []).length;
                    expect(openCount).toBe(n);
                    expect(closeCount).toBe(n);
                });
            }
        });
    });

    describe('Algorithm Consistency', () => {
        test('all approaches return equivalent results', () => {
            const approaches = [
                generateParenthesesBacktracking,
                generateParenthesesOptimized,
                generateParenthesesDP,
                generateParenthesesClosure
            ];

            for (let n = 1; n <= 4; n++) {
                const results = approaches.map(fn => fn(n).sort());

                for (let i = 1; i < results.length; i++) {
                    expect(results[i]).toEqual(results[0]);
                }
            }
        });

        test('results match expected output exactly', () => {
            Object.entries(expectedResults).forEach(([n, expected]) => {
                const result = generateParentheses(parseInt(n));
                expect(result.sort()).toEqual(expected.sort());
            });
        });
    });

    describe('Performance Tests', () => {
        test('reasonable performance for n=6', () => {
            const start = Date.now();
            const result = generateParentheses(6);
            const end = Date.now();

            expect(result.length).toBe(catalanNumbers[6]);
            expect(end - start).toBeLessThan(100); // Should complete within 100ms
        });

        test('performance comparison between approaches', () => {
            const approaches = [
                { name: 'Optimized', fn: generateParenthesesOptimized },
                { name: 'DP', fn: generateParenthesesDP },
                { name: 'Closure', fn: generateParenthesesClosure }
            ];

            const n = 5;
            const times = [];

            approaches.forEach(({ name, fn }) => {
                const start = process.hrtime.bigint();
                fn(n);
                const end = process.hrtime.bigint();
                const timeMs = Number(end - start) / 1000000;
                times.push({ name, time: timeMs });
            });

            // All should complete quickly
            times.forEach(({ name, time }) => {
                expect(time).toBeLessThan(50); // 50ms threshold
            });
        });
    });

    describe('Utility Functions', () => {
        describe('isValidParentheses', () => {
            test('valid parentheses strings', () => {
                const validStrings = ["()", "(())", "()()", "((()))", "(()())", "(())()", "()(())", "()()()"];
                validStrings.forEach(s => {
                    expect(isValidParentheses(s)).toBe(true);
                });
            });

            test('invalid parentheses strings', () => {
                const invalidStrings = ["(", ")", ")(", "(()", "())", "((()"];
                invalidStrings.forEach(s => {
                    expect(isValidParentheses(s)).toBe(false);
                });
            });

            test('empty string', () => {
                expect(isValidParentheses("")).toBe(true);
            });

            test('non-parentheses characters', () => {
                expect(isValidParentheses("(a)")).toBe(true); // Should ignore non-parentheses
            });
        });

        describe('countValidParentheses', () => {
            test('correct Catalan numbers', () => {
                for (let n = 0; n < catalanNumbers.length; n++) {
                    expect(countValidParentheses(n)).toBe(catalanNumbers[n]);
                }
            });

            test('negative input', () => {
                expect(countValidParentheses(-1)).toBe(0);
            });
        });

        describe('generateCustomBrackets', () => {
            test('square brackets', () => {
                const result = generateCustomBrackets(2, '[', ']');
                expect(result.length).toBe(2);
                expect(result.sort()).toEqual(["[[]]", "[][]"]);
            });

            test('curly braces', () => {
                const result = generateCustomBrackets(1, '{', '}');
                expect(result).toEqual(["{}"]);
            });

            test('all results are valid with custom brackets', () => {
                const result = generateCustomBrackets(3, '<', '>');
                expect(result.length).toBe(5);
                result.forEach(s => {
                    // Validate custom bracket balance
                    let balance = 0;
                    for (const char of s) {
                        if (char === '<') balance++;
                        else if (char === '>') balance--;
                        expect(balance).toBeGreaterThanOrEqual(0);
                    }
                    expect(balance).toBe(0);
                });
            });
        });

        describe('getKthParentheses', () => {
            test('valid k values', () => {
                const all = generateParentheses(3).sort();
                for (let k = 1; k <= all.length; k++) {
                    expect(getKthParentheses(3, k)).toBe(all[k - 1]);
                }
            });

            test('invalid k values', () => {
                expect(getKthParentheses(2, 0)).toBeNull();
                expect(getKthParentheses(2, 10)).toBeNull();
                expect(getKthParentheses(2, -1)).toBeNull();
            });

            test('k = 1 should be lexicographically first', () => {
                expect(getKthParentheses(3, 1)).toBe("((()))");
            });
        });

        describe('parenthesestoTree', () => {
            test('simple parentheses', () => {
                const result = parenthesestoTree("()");
                expect(result).toContain("(");
                expect(result).toContain(")");
            });

            test('nested parentheses', () => {
                const result = parenthesestoTree("(())");
                expect(result).toBeTruthy();
                expect(result.split('\n').length).toBeGreaterThan(2);
            });

            test('invalid parentheses', () => {
                const result = parenthesestoTree("((");
                expect(result).toBe("Invalid parentheses");
            });
        });

        describe('generateMultiBrackets', () => {
            test('multiple bracket types', () => {
                const result = generateMultiBrackets(1, ['()', '[]']);
                expect(result.length).toBeGreaterThan(0);

                // Should include combinations of both bracket types
                result.forEach(s => {
                    expect(s.length).toBe(4); // 2 pairs * 2 brackets each
                });
            });

            test('empty brackets array', () => {
                expect(generateMultiBrackets(1, [])).toEqual([]);
            });

            test('n = 0', () => {
                expect(generateMultiBrackets(0, ['()'])).toEqual([]);
            });
        });

        describe('visualizeGeneration', () => {
            test('generates visualization', () => {
                const result = visualizeGeneration(2);
                expect(result).toContain("Generation Tree");
                expect(result).toContain("open:");
                expect(result).toContain("close:");
            });

            test('n = 0 edge case', () => {
                const result = visualizeGeneration(0);
                expect(result).toContain("No valid parentheses");
            });

            test('contains proper structure', () => {
                const result = visualizeGeneration(1);
                expect(result).toContain('""');
                expect(result).toContain("()");
            });
        });
    });

    describe('Specific LeetCode Examples', () => {
        test('LeetCode Example 1: n = 3', () => {
            const result = generateParentheses(3);
            const expected = ["((()))", "(()())", "(())()", "()(())", "()()()"];
            expect(result.sort()).toEqual(expected.sort());
        });

        test('LeetCode Example 2: n = 1', () => {
            const result = generateParentheses(1);
            expect(result).toEqual(["()"]);
        });
    });

    describe('Complex Scenarios', () => {
        test('verify all n=4 combinations are unique and valid', () => {
            const result = generateParentheses(4);
            const uniqueSet = new Set(result);

            expect(uniqueSet.size).toBe(result.length);
            expect(result.length).toBe(14); // 4th Catalan number

            result.forEach(s => {
                expect(isValidParentheses(s)).toBe(true);
                expect(s.length).toBe(8);
            });
        });

        test('lexicographic ordering consistency', () => {
            const result = generateParentheses(3);
            const sorted = [...result].sort();

            // First should always be all opening then all closing
            expect(sorted[0]).toBe("((()))");
            // Last should always be alternating
            expect(sorted[sorted.length - 1]).toBe("()()()");
        });

        test('symmetric properties', () => {
            const result = generateParentheses(4);

            // For each valid string, reversing and swapping () should still be valid count
            result.forEach(s => {
                const reversed = s.split('').reverse().join('');
                const swapped = reversed.replace(/\(/g, 'TEMP').replace(/\)/g, '(').replace(/TEMP/g, ')');
                expect(isValidParentheses(swapped)).toBe(true);
            });
        });
    });

    describe('Error Handling', () => {
        test('handles non-integer input gracefully', () => {
            expect(generateParentheses(2.5)).toEqual([]);
        });

        test('handles very large n efficiently', () => {
            // This should not cause stack overflow or excessive memory usage
            const start = Date.now();
            const result = generateParentheses(7);
            const end = Date.now();

            expect(result.length).toBe(catalanNumbers[7]);
            expect(end - start).toBeLessThan(1000); // Should complete within 1 second
        });
    });

    describe('Mathematical Properties', () => {
        test('Catalan number growth', () => {
            // Each result count should match the Catalan sequence
            for (let n = 1; n <= 6; n++) {
                const count = generateParentheses(n).length;
                expect(count).toBe(catalanNumbers[n]);
            }
        });

        test('combinatorial properties', () => {
            // C(n) = C(0)*C(n-1) + C(1)*C(n-2) + ... + C(n-1)*C(0)
            for (let n = 2; n <= 5; n++) {
                let sum = 0;
                for (let i = 0; i < n; i++) {
                    sum += catalanNumbers[i] * catalanNumbers[n - 1 - i];
                }
                expect(sum).toBe(catalanNumbers[n]);
            }
        });
    });
});