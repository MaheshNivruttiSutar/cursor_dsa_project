/**
 * Valid Palindrome Problem
 * A phrase is a palindrome if, after converting all uppercase letters into lowercase
 * letters and removing all non-alphanumeric characters, it reads the same forward and backward.
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 *
 * @param {string} s - Input string
 * @return {boolean} - True if palindrome, false otherwise
 */
function isPalindrome(s) {
    // Clean the string: remove non-alphanumeric and convert to lowercase
    const cleanStr = s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

    let left = 0;
    let right = cleanStr.length - 1;

    while (left < right) {
        if (cleanStr[left] !== cleanStr[right]) {
            return false;
        }
        left++;
        right--;
    }

    return true;
}

module.exports = isPalindrome;