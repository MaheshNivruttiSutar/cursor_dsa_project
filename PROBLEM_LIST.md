# DSA Problems List

## Overview
This document contains a comprehensive list of all Data Structures and Algorithms problems implemented in this project, organized by difficulty level and category.

## Quick Stats
- **Total Problems**: 21
- **Easy**: 14
- **Medium**: 6
- **Hard**: 1
- **Categories**: 9 (Arrays, Strings, Linked Lists, Trees, Stacks/Queues, Dynamic Programming, Sorting, Searching, Graphs)

---

## Easy Problems (14)

### Arrays (3)
1. **Two Sum** (LeetCode #1) ⭐⭐⭐⭐⭐
   - Hash map approach for O(n) solution
   - File: `src/arrays/twoSum.js`

2. **Best Time to Buy and Sell Stock** (LeetCode #121) ⭐⭐⭐⭐⭐
   - Single pass optimization with O(n) time complexity
   - File: `src/arrays/bestTimeToBuyAndSellStock.js`

3. **Contains Duplicate** (LeetCode #217) ⭐⭐⭐⭐
   - Multiple approaches: HashSet, Sorting, One-liner
   - File: `src/arrays/containsDuplicate.js`

### Strings (3)
4. **Valid Palindrome** (LeetCode #125) ⭐⭐⭐⭐
   - Two-pointer technique with character filtering
   - File: `src/strings/isPalindrome.js`

5. **Valid Anagram** (LeetCode #242) ⭐⭐⭐⭐
   - Multiple approaches: HashMap, Sorting, Character Array
   - File: `src/strings/validAnagram.js`

### Linked Lists (2)
6. **Reverse Linked List** (LeetCode #206) ⭐⭐⭐⭐⭐
   - Both iterative and recursive solutions
   - File: `src/linked-lists/reverseLinkedList.js`

7. **Merge Two Sorted Lists** (LeetCode #21) ⭐⭐⭐⭐⭐
   - Iterative and recursive approaches
   - File: `src/linked-lists/mergeTwoLists.js`

### Trees (2)
8. **Maximum Depth of Binary Tree** (LeetCode #104) ⭐⭐⭐⭐
   - Recursive, BFS, and DFS approaches
   - File: `src/trees/maxDepth.js`

### Stacks/Queues (1)
9. **Valid Parentheses** (LeetCode #20) ⭐⭐⭐⭐⭐
   - Stack-based bracket matching
   - File: `src/stacks-queues/validParentheses.js`

### Dynamic Programming (1)
10. **Climbing Stairs** (LeetCode #70) ⭐⭐⭐⭐
    - Four approaches: optimized iterative, DP array, memoization, naive recursive
    - File: `src/dynamic-programming/climbingStairs.js`

### Sorting (1)
11. **Quick Sort** (Algorithm) ⭐⭐⭐⭐
    - Complete implementation with multiple variants
    - File: `src/sorting/quickSort.js`

### Searching (1)
12. **Binary Search** (LeetCode #704) ⭐⭐⭐⭐⭐
    - Both iterative and recursive implementations
    - File: `src/searching/binarySearch.js`

### Graphs (1)
13. **Number of Islands** (LeetCode #200) ⭐⭐⭐⭐
    - DFS, BFS, and non-destructive approaches
    - File: `src/graphs/numberOfIslands.js`

---

## Medium Problems (6)

### Arrays (3)
14. **3Sum** (LeetCode #15) ⭐⭐⭐⭐⭐
    - Two pointers with sorted array, O(n²) complexity
    - File: `src/arrays/threeSum.js`

15. **Maximum Subarray (Kadane's Algorithm)** (LeetCode #53) ⭐⭐⭐⭐⭐
    - Kadane's algorithm with O(n) complexity
    - File: `src/arrays/maxSubarray.js`

### Strings (1)
16. **Longest Substring Without Repeating Characters** (LeetCode #3) ⭐⭐⭐⭐⭐
    - Sliding window with HashMap, O(n) complexity
    - File: `src/strings/longestSubstringWithoutRepeatingCharacters.js`

### Trees (1)
17. **Validate Binary Search Tree** (LeetCode #98) ⭐⭐⭐⭐
    - Multiple approaches: bounds checking, in-order traversal, iterative
    - File: `src/trees/validateBST.js`

### Dynamic Programming (1)
18. **Coin Change** (LeetCode #322) ⭐⭐⭐⭐⭐
    - Dynamic programming with multiple solution approaches
    - File: `src/dynamic-programming/coinChange.js`

---

## Hard Problems (1)

### Arrays (1)
19. **Trapping Rain Water** (LeetCode #42) ⭐⭐⭐⭐⭐
    - Two pointers, DP, stack, and brute force approaches
    - File: `src/arrays/trappingRainWater.js`

### Linked Lists (1)
20. **Merge k Sorted Lists** (LeetCode #23) ⭐⭐⭐⭐⭐
    - Divide and conquer approach, O(N log k) complexity
    - File: `src/linked-lists/mergeKSortedLists.js`

---

## Problem Categories

### Arrays (6 problems)
- Focus on two-pointers, sliding window, and optimization techniques
- Essential for FAANG interviews

### Strings (3 problems)
- Pattern matching, character manipulation, and optimization
- Common in coding interviews

### Linked Lists (3 problems)
- Pointer manipulation, merging, and reversal techniques
- Fundamental data structure operations

### Trees (2 problems)
- Binary tree traversal, validation, and properties
- Important for system design and algorithms

### Stacks/Queues (1 problem)
- Stack-based problem solving
- Essential for parsing and validation

### Dynamic Programming (2 problems)
- Optimization problems with overlapping subproblems
- Critical for advanced algorithm interviews

### Sorting (1 problem)
- Fundamental sorting algorithms
- Foundation for many other algorithms

### Searching (1 problem)
- Binary search and variants
- Essential for optimization problems

### Graphs (1 problem)
- Graph traversal and connectivity
- Important for system design and complex problems

---

## Interview Frequency Legend
- ⭐⭐⭐⭐⭐: Asked very frequently in FAANG interviews
- ⭐⭐⭐⭐: Asked frequently in tech interviews
- ⭐⭐⭐: Asked occasionally in interviews
- ⭐⭐: Asked rarely in interviews
- ⭐: Academic/learning purposes

---

## Learning Path Recommendations

### Beginner Path (Start here)
1. Two Sum
2. Valid Palindrome
3. Binary Search
4. Maximum Depth of Binary Tree
5. Valid Parentheses

### Intermediate Path
1. Reverse Linked List
2. Best Time to Buy and Sell Stock
3. Climbing Stairs
4. Contains Duplicate
5. Valid Anagram

### Advanced Path
1. 3Sum
2. Longest Substring Without Repeating Characters
3. Maximum Subarray
4. Merge Two Sorted Lists
5. Number of Islands

### Expert Path
1. Validate Binary Search Tree
2. Coin Change
3. Trapping Rain Water
4. Merge k Sorted Lists
5. Quick Sort

---

## Company-Specific Notes

### Google/Meta/Apple
- Focus on: Two Sum, 3Sum, Longest Substring, Valid Parentheses, Binary Search
- Emphasis on optimization and multiple approaches

### Amazon
- Focus on: Merge k Sorted Lists, Coin Change, Number of Islands, Trapping Rain Water
- Emphasis on scalability and system design applications

### Microsoft
- Focus on: Reverse Linked List, Valid Anagram, Climbing Stairs, Maximum Subarray
- Emphasis on clean code and edge case handling

### Netflix/Uber
- Focus on: Best Time to Buy and Sell Stock, Valid Palindrome, Maximum Depth
- Emphasis on real-world applications and performance

---

## Test Coverage
- **Total Test Cases**: 400+ comprehensive test cases
- **Edge Cases**: Extensively covered for all problems
- **Performance Tests**: Included for optimization verification
- **Multiple Approaches**: Each problem includes 2-4 different solution methods

---

## Next Steps
Consider adding these high-value problems:
- **Graphs**: Course Schedule, Clone Graph, Word Ladder
- **Dynamic Programming**: House Robber, Longest Common Subsequence
- **Trees**: Lowest Common Ancestor, Level Order Traversal
- **Heaps**: Kth Largest Element, Top K Frequent Elements