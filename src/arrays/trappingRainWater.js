/**
 * Trapping Rain Water
 * Given n non-negative integers representing an elevation map where the width of each bar is 1,
 * compute how much water it can trap after raining.
 *
 * Example 1:
 * Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
 * Output: 6
 * Explanation: The above elevation map is represented by array [0,1,0,2,1,0,1,3,2,1,2,1].
 * In this case, 6 units of rain water are being trapped.
 *
 * Example 2:
 * Input: height = [4,2,0,3,2,5]
 * Output: 9
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 *
 * @param {number[]} height - Array of non-negative integers
 * @return {number} - Amount of trapped water
 */
function trap(height) {
    if (!height || height.length < 3) {
        return 0;
    }

    let left = 0;
    let right = height.length - 1;
    let leftMax = 0;
    let rightMax = 0;
    let result = 0;

    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] >= leftMax) {
                leftMax = height[left];
            } else {
                result += leftMax - height[left];
            }
            left++;
        } else {
            if (height[right] >= rightMax) {
                rightMax = height[right];
            } else {
                result += rightMax - height[right];
            }
            right--;
        }
    }

    return result;
}

/**
 * Trapping Rain Water - Dynamic Programming approach
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 *
 * @param {number[]} height - Array of non-negative integers
 * @return {number} - Amount of trapped water
 */
function trapDP(height) {
    if (!height || height.length < 3) {
        return 0;
    }

    const n = height.length;
    const leftMax = new Array(n);
    const rightMax = new Array(n);

    // Fill leftMax array
    leftMax[0] = height[0];
    for (let i = 1; i < n; i++) {
        leftMax[i] = Math.max(leftMax[i - 1], height[i]);
    }

    // Fill rightMax array
    rightMax[n - 1] = height[n - 1];
    for (let i = n - 2; i >= 0; i--) {
        rightMax[i] = Math.max(rightMax[i + 1], height[i]);
    }

    // Calculate trapped water
    let result = 0;
    for (let i = 0; i < n; i++) {
        result += Math.min(leftMax[i], rightMax[i]) - height[i];
    }

    return result;
}

/**
 * Trapping Rain Water - Stack approach
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 *
 * @param {number[]} height - Array of non-negative integers
 * @return {number} - Amount of trapped water
 */
function trapStack(height) {
    if (!height || height.length < 3) {
        return 0;
    }

    const stack = [];
    let result = 0;

    for (let i = 0; i < height.length; i++) {
        while (stack.length > 0 && height[i] > height[stack[stack.length - 1]]) {
            const top = stack.pop();

            if (stack.length === 0) {
                break;
            }

            const distance = i - stack[stack.length - 1] - 1;
            const boundedHeight = Math.min(height[i], height[stack[stack.length - 1]]) - height[top];
            result += distance * boundedHeight;
        }

        stack.push(i);
    }

    return result;
}

/**
 * Trapping Rain Water - Brute Force approach (for educational purposes)
 *
 * Time Complexity: O(n²)
 * Space Complexity: O(1)
 *
 * @param {number[]} height - Array of non-negative integers
 * @return {number} - Amount of trapped water
 */
function trapBruteForce(height) {
    if (!height || height.length < 3) {
        return 0;
    }

    let result = 0;

    for (let i = 1; i < height.length - 1; i++) {
        // Find maximum height to the left
        let leftMax = 0;
        for (let j = i - 1; j >= 0; j--) {
            leftMax = Math.max(leftMax, height[j]);
        }

        // Find maximum height to the right
        let rightMax = 0;
        for (let j = i + 1; j < height.length; j++) {
            rightMax = Math.max(rightMax, height[j]);
        }

        // Water level at current position
        const waterLevel = Math.min(leftMax, rightMax);

        // Add trapped water if water level is higher than current height
        if (waterLevel > height[i]) {
            result += waterLevel - height[i];
        }
    }

    return result;
}

/**
 * Helper function to visualize the trapping water scenario
 *
 * @param {number[]} height - Array of non-negative integers
 * @return {string} - ASCII representation of the elevation map
 */
function visualizeTrap(height) {
    if (!height || height.length === 0) {
        return '';
    }

    const maxHeight = Math.max(...height);
    const result = [];

    for (let level = maxHeight; level >= 1; level--) {
        let line = '';
        for (let i = 0; i < height.length; i++) {
            if (height[i] >= level) {
                line += '█';
            } else {
                // Check if water can be trapped at this position
                const leftMax = Math.max(...height.slice(0, i));
                const rightMax = Math.max(...height.slice(i + 1));
                const waterLevel = Math.min(leftMax, rightMax);

                if (waterLevel >= level) {
                    line += '~';
                } else {
                    line += ' ';
                }
            }
        }
        result.push(line);
    }

    return result.join('\n');
}

/**
 * Get detailed breakdown of trapped water at each position
 *
 * @param {number[]} height - Array of non-negative integers
 * @return {object} - Detailed breakdown with water at each position
 */
function getTrappedWaterBreakdown(height) {
    if (!height || height.length < 3) {
        return {
            total: 0,
            breakdown: [],
            waterAtPosition: []
        };
    }

    const n = height.length;
    const leftMax = new Array(n);
    const rightMax = new Array(n);
    const waterAtPosition = new Array(n).fill(0);

    // Fill leftMax array
    leftMax[0] = height[0];
    for (let i = 1; i < n; i++) {
        leftMax[i] = Math.max(leftMax[i - 1], height[i]);
    }

    // Fill rightMax array
    rightMax[n - 1] = height[n - 1];
    for (let i = n - 2; i >= 0; i--) {
        rightMax[i] = Math.max(rightMax[i + 1], height[i]);
    }

    // Calculate trapped water at each position
    let total = 0;
    for (let i = 0; i < n; i++) {
        const trapped = Math.min(leftMax[i], rightMax[i]) - height[i];
        waterAtPosition[i] = Math.max(0, trapped);
        total += waterAtPosition[i];
    }

    return {
        total,
        breakdown: height.map((h, i) => ({
            position: i,
            height: h,
            leftMax: leftMax[i],
            rightMax: rightMax[i],
            waterLevel: Math.min(leftMax[i], rightMax[i]),
            trappedWater: waterAtPosition[i]
        })),
        waterAtPosition
    };
}

module.exports = {
    trap,
    trapDP,
    trapStack,
    trapBruteForce,
    visualizeTrap,
    getTrappedWaterBreakdown
};