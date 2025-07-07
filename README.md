# DSA Practice JavaScript

A comprehensive JavaScript project for practicing Data Structures and Algorithms (DSA) questions.

## 📁 Project Structure

```
dsa-practice-js/
├── src/
│   ├── arrays/
│   ├── strings/
│   ├── linked-lists/
│   ├── stacks-queues/
│   ├── trees/
│   ├── graphs/
│   ├── sorting/
│   ├── searching/
│   ├── dynamic-programming/
│   ├── greedy/
│   ├── math/
│   └── utils/
├── tests/
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone or download this project
2. Navigate to project directory:
```bash
cd dsa-practice-js
```
3. Install dependencies:
```bash
npm install
```

## 📋 Available Commands

### 🧪 Testing Commands

```bash
# Run all tests (214 test cases across 11 problems)
npm test

# Run tests in watch mode (automatically re-runs when files change)
npm run test:watch

# Run tests with coverage report (see which code is tested)
npm run test:coverage

# Run specific test file
npm test src/arrays/twoSum.test.js

# Run tests for specific category
npm test src/arrays/
npm test src/strings/
npm test src/linked-lists/
```

### 🎯 Running Examples

```bash
# Run the main demo showcasing all 11 problems
npm start
# OR
node index.js

# Run specific problem examples
node src/arrays/twoSum.js
node src/strings/isPalindrome.js
```

### 📁 Project Exploration Commands

```bash
# View project structure
ls -la src/

# List all problem files
find src/ -name "*.js" -not -name "*.test.js"

# List all test files
find src/ -name "*.test.js"

# View problem catalog
cat PROBLEM_LIST.md

# Count total lines of code
find src/ -name "*.js" -exec wc -l {} + | tail -1
```

### 🔍 Code Analysis Commands

```bash
# Check for syntax errors
npm run test -- --dry-run

# Run tests with verbose output
npm test -- --verbose

# Run tests for a specific pattern
npm test -- --testNamePattern="Two Sum"

# Run tests and show coverage for specific files
npm run test:coverage -- src/arrays/
```

### 🛠️ Development Commands

```bash
# Watch for file changes during development
npm run test:watch

# Create a new problem using templates
cp templates/problem-template.js src/arrays/newProblem.js
cp templates/test-template.js src/arrays/newProblem.test.js

# Check all test files are running
npm test -- --listTests
```

### 📊 Useful npm Scripts

The project includes these predefined scripts in `package.json`:

| Command | Description |
|---------|-------------|
| `npm start` | Run the main demo file |
| `npm test` | Run all tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage report |

## 📚 How to Use

1. **Solve Problems**: Navigate to the appropriate category folder in `src/` and create your solution
2. **Write Tests**: Create corresponding test files to verify your solutions
3. **Run Tests**: Use the test commands to check if your solutions work correctly

## 🎯 Problem Categories

- **Arrays**: Array manipulation, sorting, searching
- **Strings**: String processing, pattern matching
- **Linked Lists**: Singly/doubly linked lists, operations
- **Stacks & Queues**: LIFO/FIFO data structures
- **Trees**: Binary trees, BST, tree traversals
- **Graphs**: Graph traversal, shortest path algorithms
- **Sorting**: Various sorting algorithms
- **Searching**: Binary search, linear search variations
- **Dynamic Programming**: Optimization problems
- **Greedy**: Greedy algorithm problems
- **Math**: Mathematical problem solving

## 📝 Example Usage

```javascript
// Example: Two Sum Problem
const twoSum = require('./src/arrays/twoSum');

const result = twoSum([2, 7, 11, 15], 9);
console.log(result); // [0, 1]
```

## 🧪 Testing Example

```javascript
// tests/arrays/twoSum.test.js
const twoSum = require('../../src/arrays/twoSum');

describe('Two Sum', () => {
  test('should return indices of two numbers that add up to target', () => {
    expect(twoSum([2, 7, 11, 15], 9)).toEqual([0, 1]);
    expect(twoSum([3, 2, 4], 6)).toEqual([1, 2]);
  });
});
```

## 💡 Tips for Practice

1. **Start Simple**: Begin with easy array and string problems
2. **Understand Time/Space Complexity**: Always analyze your solutions
3. **Write Tests First**: Practice TDD (Test-Driven Development)
4. **Document Your Approach**: Add comments explaining your logic
5. **Optimize**: Try to find multiple solutions and compare their efficiency

## 🔧 Utility Functions

The `utils/` folder contains helper functions for common operations:
- Array helpers
- Tree node creation
- Linked list utilities
- Performance measurement tools

## ⚡ Quick Reference Commands

### Most Used Commands
```bash
# Quick start workflow
npm install          # Install dependencies
npm test            # Verify everything works
npm start           # See examples
npm run test:watch  # Start developing

# Problem development workflow
cp templates/problem-template.js src/category/myProblem.js
cp templates/test-template.js src/category/myProblem.test.js
npm run test:watch  # Develop with automatic testing
```

### Performance Testing
```bash
# Run specific performance tests
npm test -- --testNamePattern="Performance"

# Test with coverage to see code paths
npm run test:coverage

# Benchmark large inputs
node -e "console.time('test'); /* your code */; console.timeEnd('test')"
```

## 🐛 Troubleshooting

### Common Issues and Solutions

**Issue**: Tests not running
```bash
# Solution: Check Node.js version
node --version  # Should be v14+
npm --version
npm install     # Reinstall dependencies
```

**Issue**: Test files not found
```bash
# Solution: Check file structure
ls -la src/     # Verify files exist
npm test -- --listTests  # List all test files
```

**Issue**: Import/Export errors
```bash
# Solution: Check module.exports syntax
# Each file should end with: module.exports = { functionName };
grep -r "module.exports" src/
```

**Issue**: Performance tests failing
```bash
# Solution: Run tests individually
npm test src/sorting/quickSort.test.js
npm test -- --maxWorkers=1  # Run tests serially
```

### Getting Help

- 📖 **Check PROBLEM_LIST.md** for problem catalog
- 🧪 **Run `npm test`** to verify setup
- 📝 **Use templates/** for new problem structure
- 🔍 **Check existing solutions** for patterns

## 📈 Project Statistics

Run these commands to get project insights:

```bash
# Count problems by category
find src/ -name "*.js" -not -name "*.test.js" | cut -d'/' -f2 | sort | uniq -c

# Count total test cases
grep -r "test\|it" src/ --include="*.test.js" | wc -l

# Show complexity analysis
grep -r "Time Complexity\|Space Complexity" src/ --include="*.js"

# List all algorithms implemented
grep -r "function.*(" src/ --include="*.js" -h | grep -v test | sort | uniq
```

Happy coding! 🚀