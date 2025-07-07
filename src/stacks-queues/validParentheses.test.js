const { isValid, isValidMap } = require('./validParentheses');

describe('Valid Parentheses', () => {
    const testCases = [
        { input: '()', expected: true, description: 'simple parentheses' },
        { input: '()[]{}'  , expected: true, description: 'all types of brackets' },
        { input: '(]', expected: false, description: 'mismatched brackets' },
        { input: '([)]', expected: false, description: 'wrong order' },
        { input: '{[]}', expected: true, description: 'nested brackets' },
        { input: '', expected: true, description: 'empty string' },
        { input: '(', expected: false, description: 'only opening bracket' },
        { input: ')', expected: false, description: 'only closing bracket' },
        { input: '((', expected: false, description: 'multiple opening brackets' },
        { input: '))', expected: false, description: 'multiple closing brackets' },
        { input: '(())', expected: true, description: 'nested parentheses' },
        { input: '((()))', expected: true, description: 'deeply nested' },
        { input: '({[]})', expected: true, description: 'complex valid case' },
        { input: '([{}])', expected: true, description: 'another complex valid case' },
        { input: '([{])', expected: false, description: 'complex invalid case' }
    ];

    describe('Object-based approach', () => {
        testCases.forEach(({ input, expected, description }) => {
            test(`should return ${expected} for ${description}`, () => {
                expect(isValid(input)).toBe(expected);
            });
        });
    });

    describe('Map-based approach', () => {
        testCases.forEach(({ input, expected, description }) => {
            test(`should return ${expected} for ${description}`, () => {
                expect(isValidMap(input)).toBe(expected);
            });
        });
    });
});