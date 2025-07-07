/**
 * Container With Most Water Implementation
 *
 * LeetCode #11 - Given n non-negative integers a1, a2, ..., an, where each represents
 * a point at coordinate (i, ai). n vertical lines are drawn such that the two endpoints
 * of the line i is at (i, 0) and (i, ai). Find two lines, which, together with the
 * x-axis forms a container, such that the container contains the most water.
 *
 * Key Insight: The area is determined by the shorter line and the distance between lines.
 * Area = min(height[left], height[right]) * (right - left)
 *
 * Company Tags: Amazon, Google, Microsoft, Facebook, Apple, Bloomberg, Adobe, Uber, Twitter
 * Difficulty: Medium
 * Pattern: Two Pointers, Greedy
 */

/**
 * Approach 1: Two Pointers (Optimal Solution)
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 *
 * Algorithm:
 * 1. Start with pointers at both ends of the array
 * 2. Calculate area with current pointers
 * 3. Move the pointer with the smaller height inward
 * 4. Repeat until pointers meet
 *
 * Why move the smaller height pointer?
 * - The area is limited by the shorter line
 * - Moving the taller pointer won't increase the area (distance decreases, height stays same or decreases)
 * - Moving the shorter pointer might find a taller line and increase the area
 *
 * @param {number[]} height - Array of heights
 * @return {number} - Maximum water area
 */
function maxArea(height) {
    if (!height || height.length < 2) return 0;

    let left = 0;
    let right = height.length - 1;
    let maxWater = 0;

    while (left < right) {
        // Calculate current area
        const width = right - left;
        const minHeight = Math.min(height[left], height[right]);
        const currentArea = width * minHeight;

        // Update maximum area
        maxWater = Math.max(maxWater, currentArea);

        // Move the pointer with smaller height
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }

    return maxWater;
}

/**
 * Approach 2: Brute Force (For comparison and understanding)
 *
 * Time Complexity: O(n²)
 * Space Complexity: O(1)
 *
 * Check all possible pairs of lines and find the maximum area
 */
function maxAreaBruteForce(height) {
    if (!height || height.length < 2) return 0;

    let maxWater = 0;

    for (let i = 0; i < height.length; i++) {
        for (let j = i + 1; j < height.length; j++) {
            const width = j - i;
            const minHeight = Math.min(height[i], height[j]);
            const area = width * minHeight;
            maxWater = Math.max(maxWater, area);
        }
    }

    return maxWater;
}

/**
 * Approach 3: Two Pointers with Tracking
 *
 * Same as optimal solution but tracks the indices of the best container
 */
function maxAreaWithIndices(height) {
    if (!height || height.length < 2) return { area: 0, indices: [] };

    let left = 0;
    let right = height.length - 1;
    let maxWater = 0;
    let bestIndices = [0, 0];

    while (left < right) {
        const width = right - left;
        const minHeight = Math.min(height[left], height[right]);
        const currentArea = width * minHeight;

        if (currentArea > maxWater) {
            maxWater = currentArea;
            bestIndices = [left, right];
        }

        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }

    return {
        area: maxWater,
        indices: bestIndices,
        heights: [height[bestIndices[0]], height[bestIndices[1]]]
    };
}

/**
 * Approach 4: Optimized Two Pointers with Early Termination
 *
 * Additional optimization: Skip consecutive equal heights
 */
function maxAreaOptimized(height) {
    if (!height || height.length < 2) return 0;

    let left = 0;
    let right = height.length - 1;
    let maxWater = 0;

    while (left < right) {
        const width = right - left;
        const leftHeight = height[left];
        const rightHeight = height[right];
        const minHeight = Math.min(leftHeight, rightHeight);
        const currentArea = width * minHeight;

        maxWater = Math.max(maxWater, currentArea);

        // Skip consecutive equal heights for optimization
        if (leftHeight < rightHeight) {
            while (left < right && height[left] <= leftHeight) {
                left++;
            }
        } else {
            while (left < right && height[right] <= rightHeight) {
                right--;
            }
        }
    }

    return maxWater;
}

/**
 * Utility Functions for Analysis and Visualization
 */

/**
 * Find all containers that achieve the maximum area
 * @param {number[]} height
 * @return {object[]}
 */
function findAllMaxContainers(height) {
    if (!height || height.length < 2) return [];

    const maxWater = maxArea(height);
    const containers = [];

    for (let i = 0; i < height.length; i++) {
        for (let j = i + 1; j < height.length; j++) {
            const width = j - i;
            const minHeight = Math.min(height[i], height[j]);
            const area = width * minHeight;

            if (area === maxWater) {
                containers.push({
                    indices: [i, j],
                    heights: [height[i], height[j]],
                    area: area,
                    width: width,
                    effectiveHeight: minHeight
                });
            }
        }
    }

    return containers;
}

/**
 * Visualize the container problem
 * @param {number[]} height
 * @return {string}
 */
function visualizeContainer(height) {
    if (!height || height.length < 2) return '';

    const result = maxAreaWithIndices(height);
    const [left, right] = result.indices;
    const maxHeight = Math.max(...height);

    let visualization = '';

    // Draw from top to bottom
    for (let row = maxHeight; row >= 0; row--) {
        let line = '';
        for (let col = 0; col < height.length; col++) {
            if (row === 0) {
                // Bottom line
                line += '-';
            } else if (row <= height[col]) {
                // Bar exists at this height
                if (col === left || col === right) {
                    line += '|'; // Container walls
                } else if (col > left && col < right && row <= Math.min(height[left], height[right])) {
                    line += '~'; // Water
                } else {
                    line += '|'; // Regular bar
                }
            } else {
                // Empty space
                if (col > left && col < right && row <= Math.min(height[left], height[right])) {
                    line += '~'; // Water
                } else {
                    line += ' ';
                }
            }
        }
        visualization += line + '\n';
    }

    visualization += `Max Area: ${result.area}, Container: [${left}, ${right}]\n`;
    visualization += `Heights: [${height[left]}, ${height[right]}]\n`;

    return visualization;
}

/**
 * Generate test cases for container with most water
 * @param {number} size - Array size
 * @param {number} maxHeight - Maximum height
 * @return {object}
 */
function generateContainerTestCase(size, maxHeight = 10) {
    const height = [];

    for (let i = 0; i < size; i++) {
        height.push(Math.floor(Math.random() * maxHeight) + 1);
    }

    const result = maxAreaWithIndices(height);

    return {
        height,
        expectedArea: result.area,
        expectedIndices: result.indices,
        analysis: {
            maxHeight: Math.max(...height),
            minHeight: Math.min(...height),
            averageHeight: height.reduce((a, b) => a + b) / height.length,
            size: size
        }
    };
}

/**
 * Benchmark different container approaches
 * @param {number[]} height
 * @return {object}
 */
function benchmarkContainer(height) {
    const approaches = [
        { name: 'Two Pointers', func: maxArea },
        { name: 'Brute Force', func: maxAreaBruteForce },
        { name: 'Optimized Two Pointers', func: maxAreaOptimized }
    ];

    const results = {};

    for (const { name, func } of approaches) {
        const startTime = performance.now();
        const result = func([...height]); // Copy array to avoid mutation
        const endTime = performance.now();

        results[name] = {
            result,
            time: endTime - startTime,
            area: result
        };
    }

    return results;
}

/**
 * Analyze container problem patterns
 * @param {number[]} height
 * @return {object}
 */
function analyzeContainerPatterns(height) {
    if (!height || height.length < 2) return null;

    const maxWater = maxArea(height);
    const allContainers = findAllMaxContainers(height);

    // Find pattern insights
    const tallestBars = [];
    const maxHeight = Math.max(...height);

    for (let i = 0; i < height.length; i++) {
        if (height[i] === maxHeight) {
            tallestBars.push(i);
        }
    }

    // Calculate efficiency metrics
    const totalPossibleArea = height.length * maxHeight;
    const efficiency = (maxWater / totalPossibleArea) * 100;

    return {
        maxArea: maxWater,
        optimalContainers: allContainers,
        tallestBars,
        maxHeight,
        efficiency: Math.round(efficiency * 100) / 100,
        heightDistribution: {
            max: Math.max(...height),
            min: Math.min(...height),
            average: Math.round((height.reduce((a, b) => a + b) / height.length) * 100) / 100,
            median: height.sort((a, b) => a - b)[Math.floor(height.length / 2)]
        }
    };
}

/**
 * Find the minimum height needed to achieve a target area
 * @param {number[]} height
 * @param {number} targetArea
 * @return {object}
 */
function findMinHeightForTarget(height, targetArea) {
    if (!height || height.length < 2) return null;

    const maxPossibleArea = maxArea(height);

    if (targetArea > maxPossibleArea) {
        return {
            achievable: false,
            maxPossibleArea,
            message: `Target area ${targetArea} exceeds maximum possible area ${maxPossibleArea}`
        };
    }

    // Find minimum height adjustments needed
    const solutions = [];

    for (let i = 0; i < height.length; i++) {
        for (let j = i + 1; j < height.length; j++) {
            const width = j - i;
            const currentArea = Math.min(height[i], height[j]) * width;

            if (currentArea < targetArea) {
                const requiredHeight = Math.ceil(targetArea / width);
                const heightIncrease = Math.max(0, requiredHeight - Math.max(height[i], height[j]));

                if (heightIncrease > 0) {
                    solutions.push({
                        indices: [i, j],
                        originalHeights: [height[i], height[j]],
                        requiredHeight,
                        heightIncrease,
                        width,
                        resultingArea: requiredHeight * width
                    });
                }
            }
        }
    }

    return {
        achievable: true,
        targetArea,
        currentMaxArea: maxPossibleArea,
        solutions: solutions.sort((a, b) => a.heightIncrease - b.heightIncrease)
    };
}

/**
 * Calculate water capacity at each position
 * @param {number[]} height
 * @return {number[]}
 */
function calculateWaterCapacity(height) {
    if (!height || height.length < 2) return [];

    const capacities = new Array(height.length).fill(0);

    for (let i = 0; i < height.length; i++) {
        let maxCapacity = 0;

        // Check capacity with all other positions
        for (let j = 0; j < height.length; j++) {
            if (i !== j) {
                const width = Math.abs(j - i);
                const minHeight = Math.min(height[i], height[j]);
                const capacity = width * minHeight;
                maxCapacity = Math.max(maxCapacity, capacity);
            }
        }

        capacities[i] = maxCapacity;
    }

    return capacities;
}

module.exports = {
    maxArea,
    maxAreaBruteForce,
    maxAreaWithIndices,
    maxAreaOptimized,
    findAllMaxContainers,
    visualizeContainer,
    generateContainerTestCase,
    benchmarkContainer,
    analyzeContainerPatterns,
    findMinHeightForTarget,
    calculateWaterCapacity
};