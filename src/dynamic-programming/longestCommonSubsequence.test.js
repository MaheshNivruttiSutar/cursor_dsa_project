const {
    longestCommonSubsequence,
    longestCommonSubsequenceOptimized,
    longestCommonSubsequenceRecursive,
    longestCommonSubsequenceWithString,
    findAllLCS,
    printDPTable,
    longestCommonSubsequenceMultiple,
    isSubsequence,
    longestCommonSubsequenceWithIndices,
    calculateSimilarity,
    shortestCommonSupersequence,
    generateTestCases,
    comparePerformance
} = require('./longestCommonSubsequence');

describe('Longest Common Subsequence', () => {
    describe('longestCommonSubsequence (2D DP)', () => {
        test('should find LCS length for basic cases', () => {
            expect(longestCommonSubsequence("abcde", "ace")).toBe(3);
            expect(longestCommonSubsequence("abc", "abc")).toBe(3);
            expect(longestCommonSubsequence("abc", "def")).toBe(0);
        });

        test('should handle edge cases', () => {
            expect(longestCommonSubsequence("", "abc")).toBe(0);
            expect(longestCommonSubsequence("abc", "")).toBe(0);
            expect(longestCommonSubsequence("", "")).toBe(0);
        });

        test('should handle single characters', () => {
            expect(longestCommonSubsequence("a", "a")).toBe(1);
            expect(longestCommonSubsequence("a", "b")).toBe(0);
            expect(longestCommonSubsequence("a", "ab")).toBe(1);
        });

        test('should handle complex cases', () => {
            expect(longestCommonSubsequence("abcdgh", "aedfhr")).toBe(3);
            expect(longestCommonSubsequence("aggtab", "gxtxayb")).toBe(4);
            expect(longestCommonSubsequence("bl", "yby")).toBe(1);
        });

        test('should handle identical strings', () => {
            expect(longestCommonSubsequence("hello", "hello")).toBe(5);
            expect(longestCommonSubsequence("programming", "programming")).toBe(11);
        });

        test('should handle one string being subsequence of another', () => {
            expect(longestCommonSubsequence("ace", "abcde")).toBe(3);
            expect(longestCommonSubsequence("abc", "aabbcc")).toBe(3);
        });

        test('should handle strings with repeated characters', () => {
            expect(longestCommonSubsequence("aaa", "aa")).toBe(2);
            expect(longestCommonSubsequence("aaaa", "bbbb")).toBe(0);
            expect(longestCommonSubsequence("abab", "baba")).toBe(3);
        });

        test('should handle long strings', () => {
            const str1 = "AAACCGTGAGTTATTCGTTCTAGAA";
            const str2 = "CACCCCTAAGGTACCTTTGGTTC";
            expect(longestCommonSubsequence(str1, str2)).toBe(14);
        });
    });

    describe('longestCommonSubsequenceOptimized (Space Optimized)', () => {
        test('should find LCS length for basic cases', () => {
            expect(longestCommonSubsequenceOptimized("abcde", "ace")).toBe(3);
            expect(longestCommonSubsequenceOptimized("abc", "abc")).toBe(3);
            expect(longestCommonSubsequenceOptimized("abc", "def")).toBe(0);
        });

        test('should handle edge cases', () => {
            expect(longestCommonSubsequenceOptimized("", "abc")).toBe(0);
            expect(longestCommonSubsequenceOptimized("abc", "")).toBe(0);
            expect(longestCommonSubsequenceOptimized("", "")).toBe(0);
        });

        test('should handle single characters', () => {
            expect(longestCommonSubsequenceOptimized("a", "a")).toBe(1);
            expect(longestCommonSubsequenceOptimized("a", "b")).toBe(0);
            expect(longestCommonSubsequenceOptimized("a", "ab")).toBe(1);
        });

        test('should handle complex cases', () => {
            expect(longestCommonSubsequenceOptimized("abcdgh", "aedfhr")).toBe(3);
            expect(longestCommonSubsequenceOptimized("aggtab", "gxtxayb")).toBe(4);
            expect(longestCommonSubsequenceOptimized("bl", "yby")).toBe(1);
        });

        test('should handle string order optimization', () => {
            // Function should swap strings to optimize space
            expect(longestCommonSubsequenceOptimized("short", "verylongstring")).toBe(2);
            expect(longestCommonSubsequenceOptimized("verylongstring", "short")).toBe(2);
        });
    });

    describe('longestCommonSubsequenceRecursive (Recursive with Memoization)', () => {
        test('should find LCS length for basic cases', () => {
            expect(longestCommonSubsequenceRecursive("abcde", "ace")).toBe(3);
            expect(longestCommonSubsequenceRecursive("abc", "abc")).toBe(3);
            expect(longestCommonSubsequenceRecursive("abc", "def")).toBe(0);
        });

        test('should handle edge cases', () => {
            expect(longestCommonSubsequenceRecursive("", "abc")).toBe(0);
            expect(longestCommonSubsequenceRecursive("abc", "")).toBe(0);
            expect(longestCommonSubsequenceRecursive("", "")).toBe(0);
        });

        test('should handle single characters', () => {
            expect(longestCommonSubsequenceRecursive("a", "a")).toBe(1);
            expect(longestCommonSubsequenceRecursive("a", "b")).toBe(0);
            expect(longestCommonSubsequenceRecursive("a", "ab")).toBe(1);
        });

        test('should handle complex cases', () => {
            expect(longestCommonSubsequenceRecursive("abcdgh", "aedfhr")).toBe(3);
            expect(longestCommonSubsequenceRecursive("aggtab", "gxtxayb")).toBe(4);
            expect(longestCommonSubsequenceRecursive("bl", "yby")).toBe(1);
        });
    });

    describe('longestCommonSubsequenceWithString (LCS with String)', () => {
        test('should return both length and subsequence', () => {
            const result = longestCommonSubsequenceWithString("abcde", "ace");
            expect(result.length).toBe(3);
            expect(result.subsequence).toBe("ace");
        });

        test('should handle identical strings', () => {
            const result = longestCommonSubsequenceWithString("hello", "hello");
            expect(result.length).toBe(5);
            expect(result.subsequence).toBe("hello");
        });

        test('should handle no common subsequence', () => {
            const result = longestCommonSubsequenceWithString("abc", "def");
            expect(result.length).toBe(0);
            expect(result.subsequence).toBe("");
        });

        test('should handle complex cases', () => {
            const result = longestCommonSubsequenceWithString("abcdgh", "aedfhr");
            expect(result.length).toBe(3);
            expect(result.subsequence).toBe("adh");
        });

        test('should handle edge cases', () => {
            const result1 = longestCommonSubsequenceWithString("", "abc");
            expect(result1.length).toBe(0);
            expect(result1.subsequence).toBe("");

            const result2 = longestCommonSubsequenceWithString("abc", "");
            expect(result2.length).toBe(0);
            expect(result2.subsequence).toBe("");
        });

        test('should handle repeated characters', () => {
            const result = longestCommonSubsequenceWithString("aaa", "aa");
            expect(result.length).toBe(2);
            expect(result.subsequence).toBe("aa");
        });
    });

    describe('findAllLCS (All LCS Strings)', () => {
        test('should find all LCS strings for simple cases', () => {
            const result = findAllLCS("abc", "abc");
            expect(result).toEqual(["abc"]);
        });

        test('should find multiple LCS strings', () => {
            const result = findAllLCS("ABCDGH", "AEDFHR");
            expect(result.length).toBeGreaterThan(0);
            expect(result.every(lcs => lcs.length === 3)).toBe(true);
        });

        test('should handle no common subsequence', () => {
            const result = findAllLCS("abc", "def");
            expect(result).toEqual([""]);
        });

        test('should handle empty strings', () => {
            const result = findAllLCS("", "abc");
            expect(result).toEqual([""]);
        });

        test('should find all valid LCS strings', () => {
            const result = findAllLCS("ABC", "ACB");
            expect(result.length).toBeGreaterThan(0);
            result.forEach(lcs => {
                expect(lcs.length).toBeLessThanOrEqual(2);
            });
        });
    });

    describe('printDPTable (DP Table Visualization)', () => {
        test('should create DP table for visualization', () => {
            const table = printDPTable("abc", "ac");
            expect(table.length).toBe(5); // 4 rows + 1 header
            expect(table[0]).toEqual(['', '', 'a', 'c']); // Header
            expect(table[table.length - 1][table[0].length - 1]).toBe(2); // Final LCS length
        });

        test('should handle empty strings', () => {
            const table = printDPTable("", "");
            expect(table.length).toBe(2); // Header + 1 row
            expect(table[1][1]).toBe(0);
        });

        test('should handle single characters', () => {
            const table = printDPTable("a", "a");
            expect(table.length).toBe(3); // Header + 2 rows
            expect(table[2][2]).toBe(1);
        });
    });

    describe('longestCommonSubsequenceMultiple (Multiple Strings)', () => {
        test('should find LCS length for multiple strings', () => {
            const result = longestCommonSubsequenceMultiple(["abc", "ac", "aec"]);
            expect(result).toBe(2); // "ac"
        });

        test('should handle empty array', () => {
            const result = longestCommonSubsequenceMultiple([]);
            expect(result).toBe(0);
        });

        test('should handle single string', () => {
            const result = longestCommonSubsequenceMultiple(["hello"]);
            expect(result).toBe(5);
        });

        test('should handle multiple strings with no common subsequence', () => {
            const result = longestCommonSubsequenceMultiple(["abc", "def", "ghi"]);
            expect(result).toBe(0);
        });

        test('should handle complex multiple strings', () => {
            const result = longestCommonSubsequenceMultiple(["abcd", "acbd", "abde"]);
            expect(result).toBeGreaterThanOrEqual(2);
        });
    });

    describe('isSubsequence (Subsequence Check)', () => {
        test('should check if string is subsequence', () => {
            expect(isSubsequence("ace", "abcde")).toBe(true);
            expect(isSubsequence("aec", "abcde")).toBe(false);
        });

        test('should handle edge cases', () => {
            expect(isSubsequence("", "abc")).toBe(true);
            expect(isSubsequence("abc", "")).toBe(false);
            expect(isSubsequence("", "")).toBe(true);
        });

        test('should handle identical strings', () => {
            expect(isSubsequence("hello", "hello")).toBe(true);
        });

        test('should handle single characters', () => {
            expect(isSubsequence("a", "a")).toBe(true);
            expect(isSubsequence("a", "b")).toBe(false);
            expect(isSubsequence("a", "ab")).toBe(true);
        });

        test('should handle complex cases', () => {
            expect(isSubsequence("abc", "aabbcc")).toBe(true);
            expect(isSubsequence("axc", "ahbgdc")).toBe(false);
        });
    });

    describe('longestCommonSubsequenceWithIndices (LCS with Indices)', () => {
        test('should return LCS with indices', () => {
            const result = longestCommonSubsequenceWithIndices("abcde", "ace");
            expect(result.length).toBe(3);
            expect(result.subsequence).toBe("ace");
            expect(result.indices1).toEqual([0, 2, 4]);
            expect(result.indices2).toEqual([0, 1, 2]);
        });

        test('should handle no common subsequence', () => {
            const result = longestCommonSubsequenceWithIndices("abc", "def");
            expect(result.length).toBe(0);
            expect(result.subsequence).toBe("");
            expect(result.indices1).toEqual([]);
            expect(result.indices2).toEqual([]);
        });

        test('should handle identical strings', () => {
            const result = longestCommonSubsequenceWithIndices("hello", "hello");
            expect(result.length).toBe(5);
            expect(result.subsequence).toBe("hello");
            expect(result.indices1).toEqual([0, 1, 2, 3, 4]);
            expect(result.indices2).toEqual([0, 1, 2, 3, 4]);
        });

        test('should handle edge cases', () => {
            const result = longestCommonSubsequenceWithIndices("", "abc");
            expect(result.length).toBe(0);
            expect(result.indices1).toEqual([]);
            expect(result.indices2).toEqual([]);
        });
    });

    describe('calculateSimilarity (Similarity Percentage)', () => {
        test('should calculate similarity percentage', () => {
            expect(calculateSimilarity("abc", "abc")).toBe(100);
            expect(calculateSimilarity("abc", "def")).toBe(0);
            expect(calculateSimilarity("abcde", "ace")).toBe(60); // 3/5 * 100
        });

        test('should handle edge cases', () => {
            expect(calculateSimilarity("", "")).toBe(100);
            expect(calculateSimilarity("", "abc")).toBe(0);
            expect(calculateSimilarity("abc", "")).toBe(0);
        });

        test('should handle partial matches', () => {
            expect(calculateSimilarity("hello", "hllo")).toBe(80); // 4/5 * 100
            expect(calculateSimilarity("programming", "program")).toBe(Math.round((7/11) * 100));
        });
    });

    describe('shortestCommonSupersequence (Shortest Common Supersequence)', () => {
        test('should find shortest common supersequence length', () => {
            expect(shortestCommonSupersequence("abac", "cab")).toBe(5);
            expect(shortestCommonSupersequence("abc", "abc")).toBe(3);
            expect(shortestCommonSupersequence("abc", "def")).toBe(6);
        });

        test('should handle edge cases', () => {
            expect(shortestCommonSupersequence("", "abc")).toBe(3);
            expect(shortestCommonSupersequence("abc", "")).toBe(3);
            expect(shortestCommonSupersequence("", "")).toBe(0);
        });

        test('should handle single characters', () => {
            expect(shortestCommonSupersequence("a", "a")).toBe(1);
            expect(shortestCommonSupersequence("a", "b")).toBe(2);
        });
    });

    describe('generateTestCases (Test Cases Generation)', () => {
        test('should generate valid test cases', () => {
            const testCases = generateTestCases();
            expect(testCases.length).toBeGreaterThan(0);

            testCases.forEach(testCase => {
                expect(testCase).toHaveProperty('text1');
                expect(testCase).toHaveProperty('text2');
                expect(testCase).toHaveProperty('expected');
                expect(typeof testCase.text1).toBe('string');
                expect(typeof testCase.text2).toBe('string');
                expect(typeof testCase.expected).toBe('number');
            });
        });

        test('should have correct expected values', () => {
            const testCases = generateTestCases();

            testCases.forEach(testCase => {
                const result = longestCommonSubsequence(testCase.text1, testCase.text2);
                expect(result).toBe(testCase.expected);
            });
        });
    });

    describe('Algorithm Consistency', () => {
        test('all LCS algorithms should produce same results', () => {
            const testCases = [
                ["abcde", "ace"],
                ["abc", "abc"],
                ["abc", "def"],
                ["", "abc"],
                ["abc", ""],
                ["a", "a"],
                ["abcdgh", "aedfhr"],
                ["aggtab", "gxtxayb"],
                ["bl", "yby"],
                ["hello", "hllo"]
            ];

            testCases.forEach(([text1, text2]) => {
                const result1 = longestCommonSubsequence(text1, text2);
                const result2 = longestCommonSubsequenceOptimized(text1, text2);
                const result3 = longestCommonSubsequenceRecursive(text1, text2);
                const result4 = longestCommonSubsequenceWithString(text1, text2).length;

                expect(result1).toBe(result2);
                expect(result2).toBe(result3);
                expect(result3).toBe(result4);
            });
        });
    });

    describe('Performance Tests', () => {
        test('should handle moderately long strings efficiently', () => {
            const str1 = "a".repeat(100);
            const str2 = "a".repeat(100);

            const startTime = Date.now();
            const result = longestCommonSubsequence(str1, str2);
            const endTime = Date.now();

            expect(result).toBe(100);
            expect(endTime - startTime).toBeLessThan(100); // Should complete quickly
        });

        test('space optimized version should handle large strings', () => {
            const str1 = "abc".repeat(100);
            const str2 = "def".repeat(100);

            const startTime = Date.now();
            const result = longestCommonSubsequenceOptimized(str1, str2);
            const endTime = Date.now();

            expect(result).toBe(0);
            expect(endTime - startTime).toBeLessThan(100);
        });

        test('recursive version should handle moderate strings with memoization', () => {
            const str1 = "abcdefg";
            const str2 = "aceg";

            const startTime = Date.now();
            const result = longestCommonSubsequenceRecursive(str1, str2);
            const endTime = Date.now();

            expect(result).toBe(4);
            expect(endTime - startTime).toBeLessThan(50);
        });
    });

    describe('Edge Cases and Corner Cases', () => {
        test('should handle strings with special characters', () => {
            expect(longestCommonSubsequence("a!b@c#", "a@c#")).toBe(4); // LCS is "a@c#"
            expect(longestCommonSubsequence("123", "13")).toBe(2);
        });

        test('should handle strings with spaces', () => {
            expect(longestCommonSubsequence("a b c", "abc")).toBe(3);
            expect(longestCommonSubsequence("hello world", "helloworld")).toBe(10);
        });

        test('should handle unicode characters', () => {
            expect(longestCommonSubsequence("αβγ", "αγ")).toBe(2);
            expect(longestCommonSubsequence("abc", "ac")).toBe(2);
        });

        test('should handle very long repeated sequences', () => {
            const str1 = "ab".repeat(50);
            const str2 = "ba".repeat(50);
            const result = longestCommonSubsequence(str1, str2);
            expect(result).toBeGreaterThan(0);
        });

        test('should handle alternating patterns', () => {
            expect(longestCommonSubsequence("ababa", "baba")).toBe(4);
            expect(longestCommonSubsequence("xyxyxy", "yxyxy")).toBe(5);
        });
    });
});