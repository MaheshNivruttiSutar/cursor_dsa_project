const { isAnagram, isAnagramSort, isAnagramArray } = require('./validAnagram');

describe('Valid Anagram', () => {
    const testCases = [
        { s: 'anagram', t: 'nagaram', expected: true, description: 'valid anagram' },
        { s: 'rat', t: 'car', expected: false, description: 'not an anagram' },
        { s: 'listen', t: 'silent', expected: true, description: 'another valid anagram' },
        { s: 'hello', t: 'bello', expected: false, description: 'different characters' },
        { s: 'a', t: 'a', expected: true, description: 'single character match' },
        { s: 'a', t: 'b', expected: false, description: 'single character mismatch' },
        { s: 'ab', t: 'ba', expected: true, description: 'two character anagram' },
        { s: 'abc', t: 'ab', expected: false, description: 'different lengths' },
        { s: '', t: '', expected: true, description: 'empty strings' },
        { s: 'aabbcc', t: 'abcabc', expected: true, description: 'multiple duplicates' }
    ];

    describe('Hash map approach', () => {
        testCases.forEach(({ s, t, expected, description }) => {
            test(`should return ${expected} for ${description}`, () => {
                expect(isAnagram(s, t)).toBe(expected);
            });
        });
    });

    describe('Sorting approach', () => {
        testCases.forEach(({ s, t, expected, description }) => {
            test(`should return ${expected} for ${description}`, () => {
                expect(isAnagramSort(s, t)).toBe(expected);
            });
        });
    });

    describe('Character array approach', () => {
        testCases.forEach(({ s, t, expected, description }) => {
            test(`should return ${expected} for ${description}`, () => {
                expect(isAnagramArray(s, t)).toBe(expected);
            });
        });
    });
});