/**
 * Word Search Implementation
 *
 * LeetCode #79 - Given an m x n grid of characters board and a string word,
 * return true if word exists in the grid.
 *
 * The word can be constructed from letters of sequentially adjacent cells,
 * where adjacent cells are horizontally or vertically neighboring.
 * The same letter cell may not be used more than once.
 *
 * Company Tags: Microsoft, Amazon, Google, Facebook, Apple, Bloomberg, Adobe, Uber
 * Difficulty: Medium
 * Pattern: Backtracking, DFS, Matrix Traversal
 */

/**
 * Approach 1: DFS Backtracking (Most Common Interview Solution)
 *
 * Time Complexity: O(m * n * 4^k) where k is the length of the word
 * Space Complexity: O(k) for recursion stack
 *
 * Key Insights:
 * - Use DFS to explore all possible paths from each cell
 * - Mark visited cells to avoid revisiting in the same path
 * - Backtrack by unmarking cells when returning from recursion
 * - Early termination when word is found
 *
 * @param {character[][]} board - 2D grid of characters
 * @param {string} word - Target word to find
 * @return {boolean} - True if word exists in the grid
 */
function exist(board, word) {
    if (!board || board.length === 0 || !word) return false;

    const m = board.length;
    const n = board[0].length;

    // Try starting DFS from each cell
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (dfs(board, word, i, j, 0)) {
                return true;
            }
        }
    }

    return false;
}

/**
 * DFS helper function
 * @param {character[][]} board
 * @param {string} word
 * @param {number} i - Current row
 * @param {number} j - Current column
 * @param {number} index - Current character index in word
 * @return {boolean}
 */
function dfs(board, word, i, j, index) {
    // Base case: found the word
    if (index === word.length) return true;

    // Check boundaries and character match
    if (i < 0 || i >= board.length || j < 0 || j >= board[0].length ||
        board[i][j] !== word[index]) {
        return false;
    }

    // Mark current cell as visited
    const temp = board[i][j];
    board[i][j] = '#';

    // Explore all 4 directions
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    for (const [di, dj] of directions) {
        if (dfs(board, word, i + di, j + dj, index + 1)) {
            board[i][j] = temp; // Restore before returning
            return true;
        }
    }

    // Backtrack: restore the cell
    board[i][j] = temp;
    return false;
}

/**
 * Approach 2: Optimized DFS with Early Pruning
 *
 * Time Complexity: O(m * n * 4^k) - but with better average case
 * Space Complexity: O(k) for recursion stack
 *
 * Optimizations:
 * - Character frequency check for early termination
 * - Start from less frequent characters first
 * - Reverse word if last character is less frequent
 */
function existOptimized(board, word) {
    if (!board || board.length === 0 || !word) return false;

    const m = board.length;
    const n = board[0].length;

    // Count character frequencies in the board
    const boardFreq = new Map();
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            const char = board[i][j];
            boardFreq.set(char, (boardFreq.get(char) || 0) + 1);
        }
    }

    // Count character frequencies in the word
    const wordFreq = new Map();
    for (const char of word) {
        wordFreq.set(char, (wordFreq.get(char) || 0) + 1);
    }

    // Early termination: check if board has enough characters
    for (const [char, freq] of wordFreq) {
        if ((boardFreq.get(char) || 0) < freq) {
            return false;
        }
    }

    // Optimization: reverse word if last character is less frequent
    const firstFreq = boardFreq.get(word[0]) || 0;
    const lastFreq = boardFreq.get(word[word.length - 1]) || 0;
    let searchWord = word;
    if (lastFreq < firstFreq) {
        searchWord = word.split('').reverse().join('');
    }

    // Try starting DFS from each cell
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (dfsOptimized(board, searchWord, i, j, 0)) {
                return true;
            }
        }
    }

    return false;
}

/**
 * Optimized DFS helper function
 */
function dfsOptimized(board, word, i, j, index) {
    if (index === word.length) return true;

    if (i < 0 || i >= board.length || j < 0 || j >= board[0].length ||
        board[i][j] !== word[index]) {
        return false;
    }

    const temp = board[i][j];
    board[i][j] = '#';

    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    for (const [di, dj] of directions) {
        if (dfsOptimized(board, word, i + di, j + dj, index + 1)) {
            board[i][j] = temp;
            return true;
        }
    }

    board[i][j] = temp;
    return false;
}

/**
 * Approach 3: Iterative DFS using Stack
 *
 * Time Complexity: O(m * n * 4^k)
 * Space Complexity: O(k) for stack
 *
 * Converts recursive DFS to iterative using explicit stack
 */
function existIterative(board, word) {
    if (!board || board.length === 0 || !word) return false;

    const m = board.length;
    const n = board[0].length;

    // Try starting from each cell
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (board[i][j] === word[0]) {
                if (dfsIterative(board, word, i, j)) {
                    return true;
                }
            }
        }
    }

    return false;
}

/**
 * Iterative DFS helper function
 */
function dfsIterative(board, word, startI, startJ) {
    const m = board.length;
    const n = board[0].length;
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

    // Stack stores: [row, col, index, visited_set]
    const stack = [[startI, startJ, 0, new Set()]];

    while (stack.length > 0) {
        const [i, j, index, visited] = stack.pop();

        // Check boundaries and character match
        if (i < 0 || i >= m || j < 0 || j >= n ||
            board[i][j] !== word[index] || visited.has(`${i},${j}`)) {
            continue;
        }

        // Found the word
        if (index === word.length - 1) {
            return true;
        }

        // Mark current cell as visited
        const newVisited = new Set(visited);
        newVisited.add(`${i},${j}`);

        // Add neighbors to stack
        for (const [di, dj] of directions) {
            stack.push([i + di, j + dj, index + 1, newVisited]);
        }
    }

    return false;
}

/**
 * Approach 4: Find All Occurrences
 *
 * Returns all starting positions where the word can be found
 */
function findAllWordOccurrences(board, word) {
    if (!board || board.length === 0 || !word) return [];

    const m = board.length;
    const n = board[0].length;
    const results = [];

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (dfsForAllOccurrences(board, word, i, j, 0)) {
                results.push([i, j]);
            }
        }
    }

    return results;
}

function dfsForAllOccurrences(board, word, i, j, index) {
    if (index === word.length) return true;

    if (i < 0 || i >= board.length || j < 0 || j >= board[0].length ||
        board[i][j] !== word[index]) {
        return false;
    }

    const temp = board[i][j];
    board[i][j] = '#';

    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    for (const [di, dj] of directions) {
        if (dfsForAllOccurrences(board, word, i + di, j + dj, index + 1)) {
            board[i][j] = temp;
            return true;
        }
    }

    board[i][j] = temp;
    return false;
}

/**
 * Utility Functions for Analysis and Debugging
 */

/**
 * Visualize the search path
 * @param {character[][]} board
 * @param {string} word
 * @return {object}
 */
function visualizeWordSearch(board, word) {
    if (!board || board.length === 0 || !word) return null;

    const m = board.length;
    const n = board[0].length;
    let searchPath = [];
    let found = false;

    function dfsWithPath(i, j, index, path) {
        if (index === word.length) {
            searchPath = [...path];
            found = true;
            return true;
        }

        if (i < 0 || i >= m || j < 0 || j >= n ||
            board[i][j] !== word[index] || path.some(p => p[0] === i && p[1] === j)) {
            return false;
        }

        const newPath = [...path, [i, j]];
        const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

        for (const [di, dj] of directions) {
            if (dfsWithPath(i + di, j + dj, index + 1, newPath)) {
                return true;
            }
        }

        return false;
    }

    // Try starting from each cell
    for (let i = 0; i < m && !found; i++) {
        for (let j = 0; j < n && !found; j++) {
            if (board[i][j] === word[0]) {
                dfsWithPath(i, j, 0, []);
            }
        }
    }

    return {
        found,
        path: searchPath,
        word,
        board: board.map(row => [...row]) // Deep copy
    };
}

/**
 * Generate test cases for word search
 * @param {number} rows
 * @param {number} cols
 * @param {string} alphabet
 * @return {object}
 */
function generateWordSearchTestCase(rows, cols, alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ') {
    const board = [];

    // Generate random board
    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
            row.push(alphabet[Math.floor(Math.random() * alphabet.length)]);
        }
        board.push(row);
    }

    // Generate words that exist in the board
    const existingWords = [];
    const nonExistingWords = [];

    // Create a word that definitely exists
    const wordLength = Math.min(Math.max(3, Math.floor(Math.random() * 6) + 1), rows * cols);
    let word = '';
    let currentRow = Math.floor(Math.random() * rows);
    let currentCol = Math.floor(Math.random() * cols);
    const visited = new Set();
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

    for (let i = 0; i < wordLength; i++) {
        word += board[currentRow][currentCol];
        visited.add(`${currentRow},${currentCol}`);

        // Try to move to adjacent cell
        const validMoves = [];
        for (const [di, dj] of directions) {
            const newRow = currentRow + di;
            const newCol = currentCol + dj;
            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols &&
                !visited.has(`${newRow},${newCol}`)) {
                validMoves.push([newRow, newCol]);
            }
        }

        if (validMoves.length > 0 && i < wordLength - 1) {
            const [newRow, newCol] = validMoves[Math.floor(Math.random() * validMoves.length)];
            currentRow = newRow;
            currentCol = newCol;
        }
    }

    existingWords.push(word);

    // Create a word that definitely doesn't exist
    let nonExistingWord = '';
    do {
        nonExistingWord = '';
        for (let i = 0; i < wordLength; i++) {
            nonExistingWord += alphabet[Math.floor(Math.random() * alphabet.length)];
        }
    } while (exist(board, nonExistingWord));

    nonExistingWords.push(nonExistingWord);

    return {
        board,
        existingWords,
        nonExistingWords,
        dimensions: { rows, cols }
    };
}

/**
 * Benchmark different word search approaches
 * @param {character[][]} board
 * @param {string} word
 * @return {object}
 */
function benchmarkWordSearch(board, word) {
    const approaches = [
        { name: 'DFS Backtracking', func: exist },
        { name: 'Optimized DFS', func: existOptimized },
        { name: 'Iterative DFS', func: existIterative }
    ];

    const results = {};

    for (const { name, func } of approaches) {
        const startTime = performance.now();
        const result = func(board.map(row => [...row]), word); // Deep copy to avoid mutation
        const endTime = performance.now();

        results[name] = {
            result,
            time: endTime - startTime,
            found: result
        };
    }

    return results;
}

/**
 * Count total possible words in board
 * @param {character[][]} board
 * @param {number} maxLength
 * @return {number}
 */
function countPossibleWords(board, maxLength = 10) {
    if (!board || board.length === 0) return 0;

    const m = board.length;
    const n = board[0].length;
    const words = new Set();

    function dfs(i, j, word, visited) {
        if (word.length > maxLength) return;

        if (word.length > 0) {
            words.add(word);
        }

        if (i < 0 || i >= m || j < 0 || j >= n || visited.has(`${i},${j}`)) {
            return;
        }

        const newVisited = new Set(visited);
        newVisited.add(`${i},${j}`);
        const newWord = word + board[i][j];

        const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        for (const [di, dj] of directions) {
            dfs(i + di, j + dj, newWord, newVisited);
        }
    }

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            dfs(i, j, '', new Set());
        }
    }

    return words.size;
}

/**
 * Find longest possible word in board
 * @param {character[][]} board
 * @return {string}
 */
function findLongestWord(board) {
    if (!board || board.length === 0) return '';

    const m = board.length;
    const n = board[0].length;
    let longestWord = '';

    function dfs(i, j, word, visited) {
        if (word.length > longestWord.length) {
            longestWord = word;
        }

        if (i < 0 || i >= m || j < 0 || j >= n || visited.has(`${i},${j}`)) {
            return;
        }

        const newVisited = new Set(visited);
        newVisited.add(`${i},${j}`);
        const newWord = word + board[i][j];

        const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        for (const [di, dj] of directions) {
            dfs(i + di, j + dj, newWord, newVisited);
        }
    }

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            dfs(i, j, '', new Set());
        }
    }

    return longestWord;
}

module.exports = {
    exist,
    existOptimized,
    existIterative,
    findAllWordOccurrences,
    visualizeWordSearch,
    generateWordSearchTestCase,
    benchmarkWordSearch,
    countPossibleWords,
    findLongestWord
};