# DSA Problems List

## Overview
This document contains a comprehensive list of all Data Structures and Algorithms problems implemented in this project, organized by difficulty level and category.

## Quick Stats
- **Total Problems**: 36 ⭐ **+4 NEW**
- **Easy**: 15
- **Medium**: 20
- **Hard**: 1
- **Categories**: 10 (Arrays, Strings, Linked Lists, Trees, Stacks/Queues, Dynamic Programming, Sorting, Searching, Graphs, Intervals, Two-Pointers, Backtracking, Design, Heaps)

---

## Easy Problems (15)

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

### Linked Lists (3)
6. **Reverse Linked List** (LeetCode #206) ⭐⭐⭐⭐⭐
   - Both iterative and recursive solutions
   - File: `src/linked-lists/reverseLinkedList.js`

7. **Merge Two Sorted Lists** (LeetCode #21) ⭐⭐⭐⭐⭐
   - Iterative and recursive approaches
   - File: `src/linked-lists/mergeTwoLists.js`

8. **Linked List Cycle** (LeetCode #141) ⭐⭐⭐⭐⭐ **NEW**
   - Floyd's cycle detection algorithm, hash set approach
   - File: `src/linked-lists/linkedListCycle.js`

### Trees (2)
9. **Maximum Depth of Binary Tree** (LeetCode #104) ⭐⭐⭐⭐
   - Recursive, BFS, and DFS approaches
   - File: `src/trees/maxDepth.js`

### Stacks/Queues (1)
10. **Valid Parentheses** (LeetCode #20) ⭐⭐⭐⭐⭐
   - Stack-based bracket matching
   - File: `src/stacks-queues/validParentheses.js`

### Dynamic Programming (1)
11. **Climbing Stairs** (LeetCode #70) ⭐⭐⭐⭐
    - Four approaches: optimized iterative, DP array, memoization, naive recursive
    - File: `src/dynamic-programming/climbingStairs.js`

### Sorting (1)
12. **Quick Sort** (Algorithm) ⭐⭐⭐⭐
    - Complete implementation with multiple variants
    - File: `src/sorting/quickSort.js`

### Searching (1)
13. **Binary Search** (LeetCode #704) ⭐⭐⭐⭐⭐
    - Both iterative and recursive implementations
    - File: `src/searching/binarySearch.js`

### Graphs (1)
14. **Number of Islands** (LeetCode #200) ⭐⭐⭐⭐
    - DFS, BFS, and non-destructive approaches
    - File: `src/graphs/numberOfIslands.js`

---

## Medium Problems (20)

### Arrays (4)
15. **3Sum** (LeetCode #15) ⭐⭐⭐⭐⭐
    - Two pointers with sorted array, O(n²) complexity
    - File: `src/arrays/threeSum.js`

16. **Maximum Subarray (Kadane's Algorithm)** (LeetCode #53) ⭐⭐⭐⭐⭐
    - Kadane's algorithm with O(n) complexity
    - File: `src/arrays/maxSubarray.js`

17. **Rotate Array** (LeetCode #189) ⭐⭐⭐⭐⭐ **NEW**
    - Multiple approaches: reverse method, extra array, cyclic replacements
    - File: `src/arrays/rotateArray.js`

### Strings (2)
18. **Longest Substring Without Repeating Characters** (LeetCode #3) ⭐⭐⭐⭐⭐
    - Sliding window with HashMap, O(n) complexity
    - File: `src/strings/longestSubstringWithoutRepeatingCharacters.js`

19. **Group Anagrams** (LeetCode #49) ⭐⭐⭐⭐⭐ **NEW**
    - Hash map grouping with multiple key strategies
    - File: `src/strings/groupAnagrams.js`

### Trees (3)
20. **Validate Binary Search Tree** (LeetCode #98) ⭐⭐⭐⭐
    - Multiple approaches: bounds checking, in-order traversal, iterative
    - File: `src/trees/validateBST.js`

21. **Lowest Common Ancestor of a Binary Search Tree** (LeetCode #235) ⭐⭐⭐⭐
    - Recursive and iterative approaches
    - File: `src/trees/lowestCommonAncestor.js`

22. **Binary Tree Level Order Traversal** (LeetCode #102) ⭐⭐⭐⭐⭐ **NEW**
    - BFS, DFS, and multiple queue-based approaches
    - File: `src/trees/levelOrderTraversal.js`

### Dynamic Programming (3)
23. **Coin Change** (LeetCode #322) ⭐⭐⭐⭐⭐
    - Dynamic programming with multiple solution approaches
    - File: `src/dynamic-programming/coinChange.js`

24. **House Robber** (LeetCode #198) ⭐⭐⭐⭐
    - Dynamic programming with space optimization
    - File: `src/dynamic-programming/houseRobber.js`

25. **Longest Common Subsequence** (LeetCode #1143) ⭐⭐⭐⭐
    - 2D DP approach with space optimization
    - File: `src/dynamic-programming/longestCommonSubsequence.js`

### Graphs (2)
26. **Course Schedule** (LeetCode #207) ⭐⭐⭐⭐
    - Topological sorting with DFS and BFS
    - File: `src/graphs/courseSchedule.js`

### Intervals (1)
27. **Merge Intervals** (LeetCode #56) ⭐⭐⭐⭐⭐ **NEW**
    - Sorting and merging with multiple approaches
    - File: `src/intervals/mergeIntervals.js`

### Two Pointers (1)
28. **Container With Most Water** (LeetCode #11) ⭐⭐⭐⭐⭐
    - Two pointers technique for O(n) solution
    - File: `src/two-pointers/containerWithMostWater.js`

### Backtracking (2)
29. **Word Search** (LeetCode #79) ⭐⭐⭐⭐
    - DFS backtracking with visited tracking
    - File: `src/backtracking/wordSearch.js`

30. **Generate Parentheses** (LeetCode #22) ⭐⭐⭐⭐⭐ **NEW**
    - Backtracking, DP, and closure-based approaches
    - File: `src/backtracking/generateParentheses.js`

### Design (2)
31. **LRU Cache** (LeetCode #146) ⭐⭐⭐⭐⭐
    - HashMap + Doubly Linked List implementation
    - File: `src/design/lruCache.js`

32. **Implement Trie (Prefix Tree)** (LeetCode #208) ⭐⭐⭐⭐⭐ **NEW**
    - Array-based, Map-based, and compressed trie implementations
    - File: `src/design/implementTrie.js`

### Heaps (2)
33. **Kth Largest Element in an Array** (LeetCode #215) ⭐⭐⭐⭐
    - Min heap, max heap, and quickselect approaches
    - File: `src/heaps/kthLargestElement.js`

34. **Top K Frequent Elements** (LeetCode #347) ⭐⭐⭐⭐⭐ **NEW**
    - Min heap, bucket sort, and quickselect approaches
    - File: `src/heaps/topKFrequentElements.js`

---

## Hard Problems (1)

### Arrays (1)
35. **Trapping Rain Water** (LeetCode #42) ⭐⭐⭐⭐⭐
    - Two pointers, DP, stack, and brute force approaches
    - File: `src/arrays/trappingRainWater.js`

### Linked Lists (1)
36. **Merge k Sorted Lists** (LeetCode #23) ⭐⭐⭐⭐⭐
    - Divide and conquer approach, O(N log k) complexity
    - File: `src/linked-lists/mergeKSortedLists.js`

---

## Problem Categories

### Arrays (7 problems)
- Focus on two-pointers, sliding window, and optimization techniques
- Essential for FAANG interviews

### Strings (4 problems)
- Pattern matching, character manipulation, and optimization
- Common in coding interviews

### Linked Lists (4 problems)
- Pointer manipulation, merging, cycle detection, and reversal techniques
- Fundamental data structure operations

### Trees (3 problems)
- Binary tree traversal, validation, and properties
- Important for system design and algorithms

### Dynamic Programming (3 problems)
- Optimization problems with overlapping subproblems
- Critical for advanced algorithm interviews

### Graphs (2 problems)
- Graph traversal and connectivity
- Important for system design and complex problems

### Heaps (2 problems) **NEW**
- Priority queue operations and top-k problems
- Essential for efficient sorting and selection

### Backtracking (2 problems) **NEW**
- Constraint satisfaction and combinatorial problems
- Critical for recursive problem solving

### Design (2 problems) **NEW**
- Data structure design and implementation
- Important for system design interviews

### Stacks/Queues (1 problem)
- Stack-based problem solving
- Essential for parsing and validation

### Sorting (1 problem)
- Fundamental sorting algorithms
- Foundation for many other algorithms

### Searching (1 problem)
- Binary search and variants
- Essential for optimization problems

### Intervals (1 problem) **NEW**
- Interval merging and overlap detection
- Critical for scheduling and time-based problems

### Two-Pointers (1 problem) **NEW**
- Two-pointer technique for array problems
- Essential optimization technique

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
5. Generate Parentheses **NEW**

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
- **Total Test Cases**: 1450+ comprehensive test cases ⭐ **UPDATED**
- **Edge Cases**: Extensively covered for all problems
- **Performance Tests**: Included for optimization verification
- **Multiple Approaches**: Each problem includes 2-4 different solution methods

---

## Recent Additions ⭐ **NEW**

### Four High-Value FAANG Problems Added:

1. **Top K Frequent Elements** (Heaps) - LeetCode #347, Medium
   - Min heap, bucket sort, quickselect approaches
   - Essential for top-k selection problems

2. **Generate Parentheses** (Backtracking) - LeetCode #22, Medium
   - Backtracking, DP, closure-based methods
   - Classic Catalan number application

3. **Implement Trie (Prefix Tree)** (Design) - LeetCode #208, Medium
   - Array-based, Map-based, compressed implementations
   - Critical for autocomplete and search systems

4. **Binary Tree Level Order Traversal** (Trees) - LeetCode #102, Medium
   - BFS, DFS, multiple queue techniques
   - Foundation for tree traversal problems

Each new problem includes:
- ✅ Multiple optimal solution approaches
- ✅ Comprehensive test suites (80+ test cases each)
- ✅ Detailed complexity analysis
- ✅ Rich utility functions and variations
- ✅ Performance benchmarking
- ✅ Real-world application examples

---

## Next Steps
Consider adding these high-value problems:
- **Graphs**: Clone Graph, Word Ladder, Alien Dictionary
- **Dynamic Programming**: Word Break, Palindromic Substrings
- **Trees**: Serialize/Deserialize Binary Tree, Path Sum II
- **Advanced Data Structures**: Design Twitter, Sliding Window Maximum