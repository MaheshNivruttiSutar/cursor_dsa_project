const {
    lengthOfLongestSubstring,
    lengthOfLongestSubstringSet,
    lengthOfLongestSubstringWithString,
    lengthOfLongestSubstringBruteForce,
    hasUniqueCharacters
} = require('./longestSubstringWithoutRepeatingCharacters');

describe('Longest Substring Without Repeating Characters', () => {
    describe('lengthOfLongestSubstring (HashMap)', () => {
        test('should find longest substring with unique characters', () => {
            expect(lengthOfLongestSubstring("abcabcbb")).toBe(3);
            expect(lengthOfLongestSubstring("bbbbb")).toBe(1);
            expect(lengthOfLongestSubstring("pwwkew")).toBe(3);
        });

        test('should handle empty string', () => {
            expect(lengthOfLongestSubstring("")).toBe(0);
        });

        test('should handle single character', () => {
            expect(lengthOfLongestSubstring("a")).toBe(1);
        });

        test('should handle string with all unique characters', () => {
            expect(lengthOfLongestSubstring("abcdef")).toBe(6);
        });

        test('should handle string with all same characters', () => {
            expect(lengthOfLongestSubstring("aaaa")).toBe(1);
        });

        test('should handle complex cases', () => {
            expect(lengthOfLongestSubstring("abba")).toBe(2);
            expect(lengthOfLongestSubstring("tmmzuxt")).toBe(5);
            expect(lengthOfLongestSubstring("dvdf")).toBe(3);
        });

        test('should handle strings with spaces and special characters', () => {
            expect(lengthOfLongestSubstring("a b c")).toBe(3);
            expect(lengthOfLongestSubstring("!@#$%")).toBe(5);
            expect(lengthOfLongestSubstring("a!b@c#")).toBe(6);
        });
    });

    describe('lengthOfLongestSubstringSet (Set)', () => {
        test('should find longest substring with unique characters - set approach', () => {
            expect(lengthOfLongestSubstringSet("abcabcbb")).toBe(3);
            expect(lengthOfLongestSubstringSet("bbbbb")).toBe(1);
            expect(lengthOfLongestSubstringSet("pwwkew")).toBe(3);
        });

        test('should handle empty string - set approach', () => {
            expect(lengthOfLongestSubstringSet("")).toBe(0);
        });

        test('should handle complex cases - set approach', () => {
            expect(lengthOfLongestSubstringSet("abba")).toBe(2);
            expect(lengthOfLongestSubstringSet("tmmzuxt")).toBe(5);
            expect(lengthOfLongestSubstringSet("dvdf")).toBe(3);
        });
    });

    describe('lengthOfLongestSubstringWithString', () => {
        test('should return both length and substring', () => {
            const result1 = lengthOfLongestSubstringWithString("abcabcbb");
            expect(result1.length).toBe(3);
            expect(result1.substring).toBe("abc");

            const result2 = lengthOfLongestSubstringWithString("bbbbb");
            expect(result2.length).toBe(1);
            expect(result2.substring).toBe("b");

            const result3 = lengthOfLongestSubstringWithString("pwwkew");
            expect(result3.length).toBe(3);
            expect(result3.substring).toBe("wke");
        });

        test('should handle empty string', () => {
            const result = lengthOfLongestSubstringWithString("");
            expect(result.length).toBe(0);
            expect(result.substring).toBe("");
        });

        test('should handle single character', () => {
            const result = lengthOfLongestSubstringWithString("a");
            expect(result.length).toBe(1);
            expect(result.substring).toBe("a");
        });

        test('should handle all unique characters', () => {
            const result = lengthOfLongestSubstringWithString("abcdef");
            expect(result.length).toBe(6);
            expect(result.substring).toBe("abcdef");
        });
    });

    describe('lengthOfLongestSubstringBruteForce', () => {
        test('should find longest substring - brute force', () => {
            expect(lengthOfLongestSubstringBruteForce("abcabcbb")).toBe(3);
            expect(lengthOfLongestSubstringBruteForce("bbbbb")).toBe(1);
            expect(lengthOfLongestSubstringBruteForce("pwwkew")).toBe(3);
        });

        test('should handle empty string - brute force', () => {
            expect(lengthOfLongestSubstringBruteForce("")).toBe(0);
        });

        test('should handle single character - brute force', () => {
            expect(lengthOfLongestSubstringBruteForce("a")).toBe(1);
        });
    });

    describe('hasUniqueCharacters', () => {
        test('should detect unique characters', () => {
            expect(hasUniqueCharacters("abc")).toBe(true);
            expect(hasUniqueCharacters("abcc")).toBe(false);
            expect(hasUniqueCharacters("")).toBe(true);
            expect(hasUniqueCharacters("a")).toBe(true);
            expect(hasUniqueCharacters("abcdef")).toBe(true);
            expect(hasUniqueCharacters("abcdefg")).toBe(true);
        });

        test('should handle special characters', () => {
            expect(hasUniqueCharacters("!@#$%")).toBe(true);
            expect(hasUniqueCharacters("!@#$%!")).toBe(false);
            expect(hasUniqueCharacters("abc")).toBe(true);
            expect(hasUniqueCharacters("a b c ")).toBe(false);
        });
    });

    describe('Comparison between approaches', () => {
        test('all approaches should give same results', () => {
            const testCases = [
                "abcabcbb",
                "bbbbb",
                "pwwkew",
                "",
                "a",
                "abcdef",
                "abba",
                "tmmzuxt",
                "dvdf",
                "a b c",
                "!@#$%"
            ];

            testCases.forEach(testCase => {
                const hashMap = lengthOfLongestSubstring(testCase);
                const set = lengthOfLongestSubstringSet(testCase);
                const withString = lengthOfLongestSubstringWithString(testCase);
                const bruteForce = lengthOfLongestSubstringBruteForce(testCase);

                expect(hashMap).toBe(set);
                expect(hashMap).toBe(withString.length);
                expect(hashMap).toBe(bruteForce);
            });
        });
    });

    describe('Edge cases', () => {
        test('should handle very long strings', () => {
            const longString = "a".repeat(1000) + "b".repeat(1000);
            expect(lengthOfLongestSubstring(longString)).toBe(2);
        });

        test('should handle numeric strings', () => {
            expect(lengthOfLongestSubstring("123456789")).toBe(9);
            expect(lengthOfLongestSubstring("1234567890")).toBe(10);
            expect(lengthOfLongestSubstring("12341234")).toBe(4);
        });

        test('should handle Unicode characters', () => {
            expect(lengthOfLongestSubstring("αβγαβγ")).toBe(3);
            expect(lengthOfLongestSubstring("🚀🌟⭐🚀")).toBe(5);
        });
    });
});