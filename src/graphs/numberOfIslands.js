/**
 * Number of Islands
 * Given an m x n 2D binary grid which represents a map of '1's (land) and '0's (water),
 * return the number of islands.
 * An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.
 * You may assume all four edges of the grid are all surrounded by water.
 *
 * Example 1:
 * Input: grid = [
 *   ["1","1","1","1","0"],
 *   ["1","1","0","1","0"],
 *   ["1","1","0","0","0"],
 *   ["0","0","0","0","0"]
 * ]
 * Output: 1
 *
 * Example 2:
 * Input: grid = [
 *   ["1","1","0","0","0"],
 *   ["1","1","0","0","0"],
 *   ["0","0","1","0","0"],
 *   ["0","0","0","1","1"]
 * ]
 * Output: 3
 *
 * Time Complexity: O(m * n) where m is rows and n is columns
 * Space Complexity: O(m * n) in worst case for recursion stack
 *
 * @param {character[][]} grid - 2D grid of '1's and '0's
 * @return {number} - Number of islands
 */
function numIslands(grid) {
    if (!grid || grid.length === 0 || grid[0].length === 0) {
        return 0;
    }

    const rows = grid.length;
    const cols = grid[0].length;
    let islandCount = 0;

    // DFS helper function to mark connected land
    function dfs(row, col) {
        // Base case: out of bounds or water
        if (row < 0 || row >= rows || col < 0 || col >= cols || grid[row][col] === '0') {
            return;
        }

        // Mark current cell as visited by setting it to '0'
        grid[row][col] = '0';

        // Explore all 4 directions
        dfs(row - 1, col); // up
        dfs(row + 1, col); // down
        dfs(row, col - 1); // left
        dfs(row, col + 1); // right
    }

    // Iterate through each cell in the grid
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (grid[row][col] === '1') {
                islandCount++;
                dfs(row, col); // Mark all connected land
            }
        }
    }

    return islandCount;
}

/**
 * Number of Islands - BFS approach
 *
 * Time Complexity: O(m * n)
 * Space Complexity: O(min(m, n)) for queue
 *
 * @param {character[][]} grid - 2D grid of '1's and '0's
 * @return {number} - Number of islands
 */
function numIslandsBFS(grid) {
    if (!grid || grid.length === 0 || grid[0].length === 0) {
        return 0;
    }

    const rows = grid.length;
    const cols = grid[0].length;
    let islandCount = 0;

    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (grid[row][col] === '1') {
                islandCount++;

                // BFS to mark all connected land
                const queue = [[row, col]];
                grid[row][col] = '0';

                while (queue.length > 0) {
                    const [currentRow, currentCol] = queue.shift();

                    for (const [dr, dc] of directions) {
                        const newRow = currentRow + dr;
                        const newCol = currentCol + dc;

                        if (newRow >= 0 && newRow < rows &&
                            newCol >= 0 && newCol < cols &&
                            grid[newRow][newCol] === '1') {
                            grid[newRow][newCol] = '0';
                            queue.push([newRow, newCol]);
                        }
                    }
                }
            }
        }
    }

    return islandCount;
}

/**
 * Number of Islands - Non-destructive approach (preserves original grid)
 *
 * Time Complexity: O(m * n)
 * Space Complexity: O(m * n) for visited set
 *
 * @param {character[][]} grid - 2D grid of '1's and '0's
 * @return {number} - Number of islands
 */
function numIslandsNonDestructive(grid) {
    if (!grid || grid.length === 0 || grid[0].length === 0) {
        return 0;
    }

    const rows = grid.length;
    const cols = grid[0].length;
    const visited = new Set();
    let islandCount = 0;

    function dfs(row, col) {
        const key = `${row},${col}`;
        if (row < 0 || row >= rows || col < 0 || col >= cols ||
            grid[row][col] === '0' || visited.has(key)) {
            return;
        }

        visited.add(key);

        // Explore all 4 directions
        dfs(row - 1, col);
        dfs(row + 1, col);
        dfs(row, col - 1);
        dfs(row, col + 1);
    }

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const key = `${row},${col}`;
            if (grid[row][col] === '1' && !visited.has(key)) {
                islandCount++;
                dfs(row, col);
            }
        }
    }

    return islandCount;
}

/**
 * Helper function to create a deep copy of grid for testing
 *
 * @param {character[][]} grid - Original grid
 * @return {character[][]} - Deep copy of grid
 */
function deepCopyGrid(grid) {
    return grid.map(row => [...row]);
}

module.exports = {
    numIslands,
    numIslandsBFS,
    numIslandsNonDestructive,
    deepCopyGrid
};