/**
 * DSA Practice JavaScript - Main Entry Point
 *
 * This file demonstrates how to use the DSA practice project.
 * You can run this file with: node index.js
 */

// Import example problems
const twoSum = require('./src/arrays/twoSum');
const { maxProfit } = require('./src/arrays/bestTimeToBuyAndSellStock');
const { threeSum } = require('./src/arrays/threeSum');
const { maxSubArrayWithIndices } = require('./src/arrays/maxSubarray');
const { containsDuplicate } = require('./src/arrays/containsDuplicate');
const isPalindrome = require('./src/strings/isPalindrome');
const { isAnagram } = require('./src/strings/validAnagram');
const { lengthOfLongestSubstring } = require('./src/strings/longestSubstringWithoutRepeatingCharacters');
const { isValid } = require('./src/stacks-queues/validParentheses');
const { reverseList } = require('./src/linked-lists/reverseLinkedList');
const { mergeTwoLists } = require('./src/linked-lists/mergeTwoLists');
const { mergeKLists } = require('./src/linked-lists/mergeKSortedLists');
const { maxDepth } = require('./src/trees/maxDepth');
const { binarySearch } = require('./src/searching/binarySearch');
const { climbStairs } = require('./src/dynamic-programming/climbingStairs');
const { quickSort } = require('./src/sorting/quickSort');

// Utility imports
const { createLinkedList, linkedListToArray } = require('./src/utils/ListNode');
const { createBinaryTree } = require('./src/utils/TreeNode');

console.log('🚀 DSA Practice Project - Enhanced with Popular Interview Problems');
console.log('=' .repeat(80));

// Easy Problems
console.log('\n📚 EASY PROBLEMS (Most Common Interview Questions)');
console.log('-'.repeat(60));

// Two Sum
console.log('\n1. Two Sum (LeetCode #1)');
const nums1 = [2, 7, 11, 15];
const target1 = 9;
console.log(`Input: nums = [${nums1.join(', ')}], target = ${target1}`);
console.log(`Output: [${twoSum(nums1, target1).join(', ')}]`);

// Best Time to Buy and Sell Stock
console.log('\n2. Best Time to Buy and Sell Stock (LeetCode #121)');
const prices = [7, 1, 5, 3, 6, 4];
console.log(`Input: prices = [${prices.join(', ')}]`);
console.log(`Max Profit: ${maxProfit(prices)}`);

// Valid Parentheses
console.log('\n3. Valid Parentheses (LeetCode #20)');
const parentheses = "()[]{}";
console.log(`Input: "${parentheses}"`);
console.log(`Valid: ${isValid(parentheses)}`);

// Reverse Linked List
console.log('\n4. Reverse Linked List (LeetCode #206)');
const linkedList = createLinkedList([1, 2, 3, 4, 5]);
console.log(`Original: [${linkedListToArray(linkedList).join(' -> ')}]`);
const reversed = reverseList(linkedList);
console.log(`Reversed: [${linkedListToArray(reversed).join(' -> ')}]`);

// Binary Search
console.log('\n5. Binary Search (LeetCode #704)');
const sortedArray = [-1, 0, 3, 5, 9, 12];
const searchTarget = 9;
console.log(`Array: [${sortedArray.join(', ')}], Target: ${searchTarget}`);
console.log(`Index: ${binarySearch(sortedArray, searchTarget)}`);

// Valid Palindrome
console.log('\n6. Valid Palindrome (LeetCode #125)');
const palindromeStr = "A man, a plan, a canal: Panama";
console.log(`Input: "${palindromeStr}"`);
console.log(`Is Palindrome: ${isPalindrome(palindromeStr)}`);

// Medium Problems
console.log('\n\n🔥 MEDIUM PROBLEMS (Advanced Interview Questions)');
console.log('-'.repeat(60));

// 3Sum
console.log('\n1. 3Sum (LeetCode #15)');
const nums3sum = [-1, 0, 1, 2, -1, -4];
console.log(`Input: [${nums3sum.join(', ')}]`);
const triplets = threeSum(nums3sum);
console.log(`Triplets: ${JSON.stringify(triplets)}`);

// Longest Substring Without Repeating Characters
console.log('\n2. Longest Substring Without Repeating Characters (LeetCode #3)');
const uniqueStr = "abcabcbb";
console.log(`Input: "${uniqueStr}"`);
console.log(`Length: ${lengthOfLongestSubstring(uniqueStr)}`);

// Maximum Subarray (Kadane's Algorithm)
console.log('\n3. Maximum Subarray - Kadane\'s Algorithm (LeetCode #53)');
const nums2 = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
console.log(`Input: [${nums2.join(', ')}]`);
const result = maxSubArrayWithIndices(nums2);
console.log(`Max Sum: ${result.maxSum}, Subarray: [${result.subarray.join(', ')}]`);

// Quick Sort
console.log('\n4. Quick Sort Algorithm');
const unsorted = [64, 34, 25, 12, 22, 11, 90];
console.log(`Original: [${unsorted.join(', ')}]`);
const sorted = [...unsorted];
quickSort(sorted);
console.log(`Sorted: [${sorted.join(', ')}]`);

// Hard Problems
console.log('\n\n💀 HARD PROBLEMS (Expert Level)');
console.log('-'.repeat(60));

// Merge k Sorted Lists
console.log('\n1. Merge k Sorted Lists (LeetCode #23)');
const lists = [
    createLinkedList([1, 4, 5]),
    createLinkedList([1, 3, 4]),
    createLinkedList([2, 6])
];
console.log('Input Lists:');
lists.forEach((list, index) => {
    console.log(`  List ${index + 1}: [${linkedListToArray(list).join(' -> ')}]`);
});
const mergedK = mergeKLists(lists);
console.log(`Merged: [${linkedListToArray(mergedK).join(' -> ')}]`);

// Additional Easy Problems
console.log('\n\n📝 MORE EASY PROBLEMS');
console.log('-'.repeat(60));

// Contains Duplicate
console.log('\n• Contains Duplicate (LeetCode #217)');
const duplicateArray = [1, 2, 3, 1];
console.log(`Input: [${duplicateArray.join(', ')}]`);
console.log(`Contains Duplicate: ${containsDuplicate(duplicateArray)}`);

// Valid Anagram
console.log('\n• Valid Anagram (LeetCode #242)');
const s = "anagram", t = "nagaram";
console.log(`s = "${s}", t = "${t}"`);
console.log(`Is Anagram: ${isAnagram(s, t)}`);

// Merge Two Sorted Lists
console.log('\n• Merge Two Sorted Lists (LeetCode #21)');
const list1 = createLinkedList([1, 2, 4]);
const list2 = createLinkedList([1, 3, 4]);
console.log(`List 1: [${linkedListToArray(list1).join(' -> ')}]`);
console.log(`List 2: [${linkedListToArray(list2).join(' -> ')}]`);
const mergedTwo = mergeTwoLists(list1, list2);
console.log(`Merged: [${linkedListToArray(mergedTwo).join(' -> ')}]`);

// Maximum Depth of Binary Tree
console.log('\n• Maximum Depth of Binary Tree (LeetCode #104)');
const tree = createBinaryTree([3, 9, 20, null, null, 15, 7]);
console.log('Tree structure: [3, 9, 20, null, null, 15, 7]');
console.log(`Maximum Depth: ${maxDepth(tree)}`);

// Climbing Stairs
console.log('\n• Climbing Stairs (LeetCode #70)');
const n = 5;
console.log(`Steps: ${n}`);
console.log(`Ways to climb: ${climbStairs(n)}`);

// Summary
console.log('\n\n🎯 PROJECT SUMMARY');
console.log('=' .repeat(80));
console.log('✅ Total Problems: 29 (Comprehensive collection)');
console.log('✅ Easy Problems: 14 (Perfect for beginners)');
console.log('✅ Medium Problems: 14 (Intermediate level)');
console.log('✅ Hard Problems: 1 (Advanced level)');
console.log('✅ Categories: 13 different algorithmic areas');
console.log('✅ All problems include multiple solution approaches');
console.log('✅ Comprehensive test coverage with 924+ test cases');
console.log('✅ Real interview questions from FAANG companies');

console.log('\n🚀 Next Steps:');
console.log('1. Run tests: npm test');
console.log('2. Practice individual problems');
console.log('3. Review time/space complexity');
console.log('4. Try different approaches');
console.log('5. Check PROBLEM_LIST.md for detailed study plan');

console.log('\n💡 Pro Tips:');
console.log('• Master the Easy problems first');
console.log('• Understand multiple solution approaches');
console.log('• Practice explaining your solution out loud');
console.log('• Time yourself solving problems');
console.log('• Focus on problems with ⭐⭐⭐⭐⭐ interview frequency');

console.log('\n🏆 Good luck with your interviews!');
console.log('=' .repeat(80));