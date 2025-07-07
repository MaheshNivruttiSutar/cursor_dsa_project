const isPalindrome = require('./isPalindrome');

describe('Valid Palindrome', () => {
    test('should return true for valid palindromes', () => {
        expect(isPalindrome("A man, a plan, a canal: Panama")).toBe(true);
        expect(isPalindrome("race a car")).toBe(false);
        expect(isPalindrome("")).toBe(true);
        expect(isPalindrome("a")).toBe(true);
        expect(isPalindrome("Madam")).toBe(true);
        expect(isPalindrome("No 'x' in Nixon")).toBe(true);
    });

    test('should handle special characters and spaces', () => {
        expect(isPalindrome("Was it a car or a cat I saw?")).toBe(true);
        expect(isPalindrome("Madam, I'm Adam")).toBe(true);
        expect(isPalindrome("Mr. Owl ate my metal worm")).toBe(true);
    });

    test('should handle numbers', () => {
        expect(isPalindrome("12321")).toBe(true);
        expect(isPalindrome("1a2")).toBe(false);
        expect(isPalindrome("1221")).toBe(true);
    });

    test('should handle empty and single character strings', () => {
        expect(isPalindrome("")).toBe(true);
        expect(isPalindrome("a")).toBe(true);
        expect(isPalindrome("1")).toBe(true);
        expect(isPalindrome("@")).toBe(true);
    });
});