const { containsDuplicate, containsDuplicateSort, containsDuplicateOneLiner } = require('./containsDuplicate');

describe('Contains Duplicate', () => {
    const testCases = [
        { input: [1, 2, 3, 1], expected: true, description: 'array with duplicates' },
        { input: [1, 2, 3, 4], expected: false, description: 'array without duplicates' },
        { input: [1, 1, 1, 3, 3, 4, 3, 2, 4, 2], expected: true, description: 'array with multiple duplicates' },
        { input: [1], expected: false, description: 'single element' },
        { input: [], expected: false, description: 'empty array' },
        { input: [1, 2], expected: false, description: 'two different elements' },
        { input: [1, 1], expected: true, description: 'two same elements' }
    ];

    describe('Hash Set approach', () => {
        testCases.forEach(({ input, expected, description }) => {
            test(`should return ${expected} for ${description}`, () => {
                expect(containsDuplicate([...input])).toBe(expected);
            });
        });
    });

    describe('Sorting approach', () => {
        testCases.forEach(({ input, expected, description }) => {
            test(`should return ${expected} for ${description}`, () => {
                expect(containsDuplicateSort([...input])).toBe(expected);
            });
        });
    });

    describe('One-liner approach', () => {
        testCases.forEach(({ input, expected, description }) => {
            test(`should return ${expected} for ${description}`, () => {
                expect(containsDuplicateOneLiner([...input])).toBe(expected);
            });
        });
    });
});