const {
    groupAnagrams,
    groupAnagramsCharCount,
    groupAnagramsPrime,
    groupAnagramsLocale,
    areAnagrams,
    findAnagramsOf,
    countAnagramGroups,
    findLargestAnagramGroup,
    getAnagramStats,
    visualizeAnagramGroups
} = require('./groupAnagrams');

describe('Group Anagrams', () => {

    // Test all main implementations with the same test cases
    const implementations = [
        { name: 'Sort Characters', func: groupAnagrams },
        { name: 'Character Count', func: groupAnagramsCharCount },
        { name: 'Prime Multiplication', func: groupAnagramsPrime },
        { name: 'Locale Compare', func: groupAnagramsLocale }
    ];

    // Helper function to sort groups for comparison
    const sortGroups = (groups) => {
        return groups.map(group => group.sort()).sort((a, b) => a[0].localeCompare(b[0]));
    };

    implementations.forEach(({ name, func }) => {
        describe(`${name} Implementation`, () => {

            describe('Basic Functionality', () => {
                test('should group anagrams correctly', () => {
                    const input = ["eat", "tea", "tan", "ate", "nat", "bat"];
                    const result = func(input);
                    const sorted = sortGroups(result);

                    expect(sorted).toEqual([
                        ["ate", "eat", "tea"],
                        ["bat"],
                        ["nat", "tan"]
                    ]);
                });

                test('should handle single string', () => {
                    const result = func(["a"]);
                    expect(result).toEqual([["a"]]);
                });

                test('should handle empty string', () => {
                    const result = func([""]);
                    expect(result).toEqual([[""]]);
                });

                test('should handle multiple empty strings', () => {
                    const result = func(["", ""]);
                    expect(result[0]).toEqual(["", ""]);
                    expect(result.length).toBe(1);
                });

                test('should handle no anagrams', () => {
                    const input = ["abc", "def", "ghi"];
                    const result = func(input);
                    expect(result.length).toBe(3);
                    expect(result.every(group => group.length === 1)).toBe(true);
                });

                test('should handle all anagrams', () => {
                    const input = ["abc", "bca", "cab", "acb"];
                    const result = func(input);
                    expect(result.length).toBe(1);
                    expect(result[0].length).toBe(4);
                });
            });

            describe('Edge Cases', () => {
                test('should handle empty array', () => {
                    const result = func([]);
                    expect(result).toEqual([]);
                });

                test('should handle null input', () => {
                    const result = func(null);
                    expect(result).toEqual([]);
                });

                test('should handle undefined input', () => {
                    const result = func(undefined);
                    expect(result).toEqual([]);
                });

                test('should handle single character strings', () => {
                    const input = ["a", "b", "a", "c", "b"];
                    const result = func(input);
                    const sorted = sortGroups(result);

                    expect(sorted).toEqual([
                        ["a", "a"],
                        ["b", "b"],
                        ["c"]
                    ]);
                });

                test('should handle duplicate strings', () => {
                    const input = ["abc", "abc", "bca", "bca"];
                    const result = func(input);
                    expect(result.length).toBe(1);
                    expect(result[0].length).toBe(4);
                });
            });

            describe('Complex Cases', () => {
                test('should handle mixed case sensitivity', () => {
                    // Note: This assumes lowercase input as per problem statement
                    const input = ["abc", "bac", "xyz", "zyx"];
                    const result = func(input);
                    const sorted = sortGroups(result);

                    expect(sorted).toEqual([
                        ["abc", "bac"],
                        ["xyz", "zyx"]
                    ]);
                });

                test('should handle long strings', () => {
                    const input = ["abcdefghijklmnop", "ponmlkjihgfedcba"];
                    const result = func(input);
                    expect(result.length).toBe(1);
                    expect(result[0].length).toBe(2);
                });

                test('should handle many small groups', () => {
                    const input = ["ab", "ba", "cd", "dc", "ef", "fe"];
                    const result = func(input);
                    expect(result.length).toBe(3);
                    expect(result.every(group => group.length === 2)).toBe(true);
                });

                test('should preserve original strings', () => {
                    const input = ["eat", "tea", "ate"];
                    const result = func(input);
                    const allWords = result.flat();

                    expect(allWords.sort()).toEqual(input.sort());
                    expect(allWords.every(word => input.includes(word))).toBe(true);
                });
            });
        });
    });

    describe('Utility Functions', () => {
        describe('areAnagrams', () => {
            test('should detect anagrams correctly', () => {
                expect(areAnagrams("listen", "silent")).toBe(true);
                expect(areAnagrams("evil", "vile")).toBe(true);
                expect(areAnagrams("a", "a")).toBe(true);
                expect(areAnagrams("", "")).toBe(true);
            });

            test('should detect non-anagrams', () => {
                expect(areAnagrams("hello", "world")).toBe(false);
                expect(areAnagrams("abc", "def")).toBe(false);
                expect(areAnagrams("a", "ab")).toBe(false);
                expect(areAnagrams("", "a")).toBe(false);
            });

            test('should handle edge cases', () => {
                expect(areAnagrams(null, "abc")).toBe(false);
                expect(areAnagrams("abc", null)).toBe(false);
                expect(areAnagrams(null, null)).toBe(false);
            });
        });

        describe('findAnagramsOf', () => {
            test('should find all anagrams of target word', () => {
                const strs = ["eat", "tea", "tan", "ate", "nat", "bat"];
                const anagrams = findAnagramsOf(strs, "tea");
                expect(anagrams.sort()).toEqual(["ate", "eat", "tea"]);
            });

            test('should return empty array when no anagrams found', () => {
                const strs = ["abc", "def", "ghi"];
                const anagrams = findAnagramsOf(strs, "xyz");
                expect(anagrams).toEqual([]);
            });

            test('should handle edge cases', () => {
                expect(findAnagramsOf(null, "abc")).toEqual([]);
                expect(findAnagramsOf(["abc"], null)).toEqual([]);
                expect(findAnagramsOf([], "abc")).toEqual([]);
            });
        });

        describe('countAnagramGroups', () => {
            test('should count groups correctly', () => {
                const strs = ["eat", "tea", "tan", "ate", "nat", "bat"];
                expect(countAnagramGroups(strs)).toBe(3);
            });

            test('should handle edge cases', () => {
                expect(countAnagramGroups([])).toBe(0);
                expect(countAnagramGroups(["a"])).toBe(1);
                expect(countAnagramGroups(["a", "a", "a"])).toBe(1);
            });
        });

        describe('findLargestAnagramGroup', () => {
            test('should find largest group', () => {
                const strs = ["eat", "tea", "ate", "tan", "nat", "bat", "tab"];
                const largest = findLargestAnagramGroup(strs);
                expect(largest.sort()).toEqual(["ate", "eat", "tea"]);
            });

            test('should handle ties', () => {
                const strs = ["ab", "ba", "cd", "dc"];
                const largest = findLargestAnagramGroup(strs);
                expect(largest.length).toBe(2);
            });

            test('should handle edge cases', () => {
                expect(findLargestAnagramGroup([])).toEqual([]);
                expect(findLargestAnagramGroup(["a"])).toEqual(["a"]);
            });
        });

        describe('getAnagramStats', () => {
            test('should provide comprehensive statistics', () => {
                const strs = ["eat", "tea", "ate", "bat", "tab", "xyz"];
                const stats = getAnagramStats(strs);

                expect(stats.totalStrings).toBe(6);
                expect(stats.totalGroups).toBe(3);
                expect(stats.largestGroupSize).toBe(3);
                expect(stats.smallestGroupSize).toBe(1);
                expect(stats.singletonCount).toBe(1);
                expect(parseFloat(stats.averageGroupSize)).toBe(2.00);
            });

            test('should handle empty input', () => {
                const stats = getAnagramStats([]);
                expect(stats.totalStrings).toBe(0);
                expect(stats.totalGroups).toBe(0);
                expect(stats.largestGroupSize).toBe(0);
                expect(stats.averageGroupSize).toBe(0);
                expect(stats.singletonCount).toBe(0);
            });
        });

        describe('visualizeAnagramGroups', () => {
            test('should create readable visualization', () => {
                const strs = ["eat", "tea", "bat"];
                const visualization = visualizeAnagramGroups(strs);

                expect(visualization).toContain('Anagram Groups');
                expect(visualization).toContain('Group 1');
                expect(visualization).toContain('Group 2');
                expect(visualization).toContain('"eat"');
                expect(visualization).toContain('"tea"');
                expect(visualization).toContain('"bat"');
            });

            test('should handle empty input', () => {
                const visualization = visualizeAnagramGroups([]);
                expect(visualization).toContain('Anagram Groups (0 total)');
            });
        });
    });

    describe('Performance Tests', () => {
        test('should handle large input efficiently', () => {
            // Generate large input with many anagrams
            const baseWords = ["abc", "def", "ghi", "jkl", "mno"];
            const largeInput = [];

            for (let i = 0; i < 1000; i++) {
                const word = baseWords[i % baseWords.length];
                // Create anagrams by shuffling
                largeInput.push(word.split('').sort().join(''));
            }

            const startTime = performance.now();
            const result = groupAnagrams(largeInput);
            const endTime = performance.now();

            expect(endTime - startTime).toBeLessThan(100); // Should be fast
            expect(result.length).toBeGreaterThan(0);
        });

        test('should handle worst-case scenario', () => {
            // All strings are anagrams of each other
            const input = new Array(500).fill("abc").map((word, i) => {
                const chars = word.split('');
                // Shuffle to create anagrams
                return chars.sort(() => Math.random() - 0.5).join('');
            });

            const startTime = performance.now();
            const result = groupAnagrams(input);
            const endTime = performance.now();

            expect(endTime - startTime).toBeLessThan(200);
            expect(result.length).toBe(1); // All in one group
            expect(result[0].length).toBe(500);
        });
    });

    describe('Algorithm Consistency', () => {
        test('all implementations should produce equivalent results', () => {
            const testCases = [
                ["eat", "tea", "tan", "ate", "nat", "bat"],
                ["a"],
                [""],
                ["abc", "def", "ghi"],
                ["abc", "bca", "cab"],
                []
            ];

            testCases.forEach(testCase => {
                const results = implementations.map(({ func }) => {
                    const result = func([...testCase]);
                    return sortGroups(result);
                });

                // All implementations should agree
                const firstResult = results[0];
                expect(results.every(result =>
                    JSON.stringify(result) === JSON.stringify(firstResult)
                )).toBe(true);
            });
        });
    });
});