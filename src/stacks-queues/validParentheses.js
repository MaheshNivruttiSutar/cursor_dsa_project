/**
 * Valid Parentheses
 * Given a string s containing just the characters '(', ')', '{', '}', '[' and ']',
 * determine if the input string is valid.
 *
 * An input string is valid if:
 * 1. Open brackets must be closed by the same type of brackets.
 * 2. Open brackets must be closed in the correct order.
 * 3. Every close bracket has a corresponding open bracket of the same type.
 *
 * Example 1:
 * Input: s = "()"
 * Output: true
 *
 * Example 2:
 * Input: s = "()[]{}"
 * Output: true
 *
 * Example 3:
 * Input: s = "(]"
 * Output: false
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 *
 * @param {string} s - String containing parentheses
 * @return {boolean} - True if parentheses are valid, false otherwise
 */
function isValid(s) {
    const stack = [];
    const pairs = {
        '(': ')',
        '{': '}',
        '[': ']'
    };

    for (const char of s) {
        if (pairs[char]) {
            // Opening bracket
            stack.push(char);
        } else {
            // Closing bracket
            if (stack.length === 0) {
                return false; // No matching opening bracket
            }

            const lastOpening = stack.pop();
            if (pairs[lastOpening] !== char) {
                return false; // Mismatched brackets
            }
        }
    }

    return stack.length === 0; // All brackets should be matched
}

/**
 * Valid Parentheses - Alternative approach using Map
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 *
 * @param {string} s - String containing parentheses
 * @return {boolean} - True if parentheses are valid, false otherwise
 */
function isValidMap(s) {
    const stack = [];
    const closeToOpen = new Map([
        [')', '('],
        ['}', '{'],
        [']', '[']
    ]);

    for (const char of s) {
        if (closeToOpen.has(char)) {
            // Closing bracket
            if (stack.length === 0 || stack.pop() !== closeToOpen.get(char)) {
                return false;
            }
        } else {
            // Opening bracket
            stack.push(char);
        }
    }

    return stack.length === 0;
}

module.exports = {
    isValid,
    isValidMap
};