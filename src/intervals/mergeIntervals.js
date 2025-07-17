/**
 * Merge Intervals Implementation
 *
 * LeetCode #56 - Given an array of intervals where intervals[i] = [starti, endi],
 * merge all overlapping intervals, and return an array of the non-overlapping intervals
 * that cover all the intervals in the input.
 *
 * Example 1:
 * Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
 * Output: [[1,6],[8,10],[15,18]]
 * Explanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].
 *
 * Company Tags: Facebook, Google, Microsoft, Amazon, Apple, Bloomberg, Adobe, Uber
 * Difficulty: Medium
 * Pattern: Intervals, Sorting, Greedy
 */

/**
 * Approach 1: Sort and Merge (Optimal Solution)
 *
 * Time Complexity: O(n log n) due to sorting
 * Space Complexity: O(1) if we can modify input, O(n) otherwise
 *
 * Algorithm:
 * 1. Sort intervals by start time
 * 2. Iterate through sorted intervals
 * 3. If current interval overlaps with previous, merge them
 * 4. Otherwise, add current interval to result
 *
 * @param {number[][]} intervals - Array of intervals [start, end]
 * @return {number[][]} - Merged intervals
 */
function merge(intervals) {
    if (!intervals || intervals.length <= 1) return intervals || [];

    // Sort intervals by start time
    intervals.sort((a, b) => a[0] - b[0]);

    const merged = [intervals[0]];

    for (let i = 1; i < intervals.length; i++) {
        const current = intervals[i];
        const lastMerged = merged[merged.length - 1];

        // Check if current interval overlaps with the last merged interval
        if (current[0] <= lastMerged[1]) {
            // Merge intervals by extending the end time
            lastMerged[1] = Math.max(lastMerged[1], current[1]);
        } else {
            // No overlap, add current interval to result
            merged.push(current);
        }
    }

    return merged;
}

/**
 * Approach 2: Using Stack
 *
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 *
 * @param {number[][]} intervals
 * @return {number[][]}
 */
function mergeWithStack(intervals) {
    if (!intervals || intervals.length <= 1) return intervals || [];

    intervals.sort((a, b) => a[0] - b[0]);

    const stack = [intervals[0]];

    for (let i = 1; i < intervals.length; i++) {
        const current = intervals[i];
        const top = stack[stack.length - 1];

        if (current[0] <= top[1]) {
            // Overlapping intervals - merge
            top[1] = Math.max(top[1], current[1]);
        } else {
            // Non-overlapping - push to stack
            stack.push(current);
        }
    }

    return stack;
}

/**
 * Approach 3: Two Pointers without Sorting (for special cases)
 *
 * Time Complexity: O(n²)
 * Space Complexity: O(n)
 *
 * Note: Only efficient when intervals are mostly non-overlapping
 *
 * @param {number[][]} intervals
 * @return {number[][]}
 */
function mergeWithoutSort(intervals) {
    if (!intervals || intervals.length <= 1) return intervals || [];

    const merged = [];
    const used = new Set();

    for (let i = 0; i < intervals.length; i++) {
        if (used.has(i)) continue;

        let current = [...intervals[i]];
        used.add(i);

        // Look for overlapping intervals
        let hasOverlap = true;
        while (hasOverlap) {
            hasOverlap = false;
            for (let j = 0; j < intervals.length; j++) {
                if (used.has(j)) continue;

                const other = intervals[j];
                if (intervalsOverlap(current, other)) {
                    current = mergeTwo(current, other);
                    used.add(j);
                    hasOverlap = true;
                }
            }
        }

        merged.push(current);
    }

    return merged.sort((a, b) => a[0] - b[0]);
}

/**
 * Utility: Check if two intervals overlap
 *
 * @param {number[]} interval1
 * @param {number[]} interval2
 * @return {boolean}
 */
function intervalsOverlap(interval1, interval2) {
    return interval1[0] <= interval2[1] && interval2[0] <= interval1[1];
}

/**
 * Utility: Merge two overlapping intervals
 *
 * @param {number[]} interval1
 * @param {number[]} interval2
 * @return {number[]}
 */
function mergeTwo(interval1, interval2) {
    return [
        Math.min(interval1[0], interval2[0]),
        Math.max(interval1[1], interval2[1])
    ];
}

/**
 * Enhanced: Insert interval and merge
 *
 * @param {number[][]} intervals - Non-overlapping sorted intervals
 * @param {number[]} newInterval - Interval to insert
 * @return {number[][]}
 */
function insertInterval(intervals, newInterval) {
    if (!intervals) return [newInterval];
    if (!newInterval) return intervals;

    const result = [];
    let i = 0;

    // Add all intervals that end before newInterval starts
    while (i < intervals.length && intervals[i][1] < newInterval[0]) {
        result.push(intervals[i]);
        i++;
    }

    // Merge overlapping intervals with newInterval
    let mergedInterval = [...newInterval];
    while (i < intervals.length && intervals[i][0] <= mergedInterval[1]) {
        mergedInterval[0] = Math.min(mergedInterval[0], intervals[i][0]);
        mergedInterval[1] = Math.max(mergedInterval[1], intervals[i][1]);
        i++;
    }
    result.push(mergedInterval);

    // Add remaining intervals
    while (i < intervals.length) {
        result.push(intervals[i]);
        i++;
    }

    return result;
}

/**
 * Enhanced: Find maximum number of non-overlapping intervals
 *
 * @param {number[][]} intervals
 * @return {number}
 */
function findMaxNonOverlapping(intervals) {
    if (!intervals || intervals.length === 0) return 0;

    // Sort by end time for greedy approach
    intervals.sort((a, b) => a[1] - b[1]);

    let count = 1;
    let lastEnd = intervals[0][1];

    for (let i = 1; i < intervals.length; i++) {
        if (intervals[i][0] >= lastEnd) {
            count++;
            lastEnd = intervals[i][1];
        }
    }

    return count;
}

/**
 * Enhanced: Find minimum number of intervals to remove
 *
 * @param {number[][]} intervals
 * @return {number}
 */
function minIntervalsToRemove(intervals) {
    if (!intervals || intervals.length <= 1) return 0;

    const maxNonOverlapping = findMaxNonOverlapping([...intervals]);
    return intervals.length - maxNonOverlapping;
}

/**
 * Utility: Get total coverage of intervals
 *
 * @param {number[][]} intervals
 * @return {number}
 */
function getTotalCoverage(intervals) {
    if (!intervals || intervals.length === 0) return 0;

    const merged = merge([...intervals]);
    return merged.reduce((total, interval) => total + (interval[1] - interval[0]), 0);
}

/**
 * Utility: Find gaps between intervals
 *
 * @param {number[][]} intervals
 * @return {number[][]}
 */
function findGaps(intervals) {
    if (!intervals || intervals.length === 0) return [];

    const merged = merge([...intervals]);
    const gaps = [];

    for (let i = 1; i < merged.length; i++) {
        const gap = [merged[i - 1][1], merged[i][0]];
        if (gap[0] < gap[1]) {
            gaps.push(gap);
        }
    }

    return gaps;
}

/**
 * Utility: Check if point is covered by any interval
 *
 * @param {number[][]} intervals
 * @param {number} point
 * @return {boolean}
 */
function isPointCovered(intervals, point) {
    return intervals.some(interval => interval[0] <= point && point <= interval[1]);
}

/**
 * Utility: Find all overlapping interval pairs
 *
 * @param {number[][]} intervals
 * @return {number[][][]}
 */
function findOverlappingPairs(intervals) {
    if (!intervals || intervals.length < 2) return [];

    const overlapping = [];

    for (let i = 0; i < intervals.length; i++) {
        for (let j = i + 1; j < intervals.length; j++) {
            if (intervalsOverlap(intervals[i], intervals[j])) {
                overlapping.push([intervals[i], intervals[j]]);
            }
        }
    }

    return overlapping;
}

/**
 * Utility: Visualize intervals on a timeline
 *
 * @param {number[][]} intervals
 * @param {number} width - Width of the visualization
 * @return {string}
 */
function visualizeIntervals(intervals, width = 50) {
    if (!intervals || intervals.length === 0) return 'No intervals to visualize';

    const merged = merge([...intervals]);
    let visualization = 'Interval Timeline:\n';

    // Find range
    const minStart = Math.min(...intervals.map(i => i[0]));
    const maxEnd = Math.max(...intervals.map(i => i[1]));
    const range = maxEnd - minStart;

    if (range === 0) return 'All intervals are at the same point';

    // Create timeline
    const timeline = new Array(width).fill(' ');

    intervals.forEach((interval, index) => {
        const startPos = Math.floor(((interval[0] - minStart) / range) * (width - 1));
        const endPos = Math.floor(((interval[1] - minStart) / range) * (width - 1));

        for (let i = startPos; i <= endPos; i++) {
            timeline[i] = timeline[i] === ' ' ? String(index % 10) : 'X';
        }
    });

    visualization += `Range: [${minStart}, ${maxEnd}]\n`;
    visualization += timeline.join('') + '\n';
    visualization += 'Legend: Numbers = interval index, X = overlap\n';

    // Show merged result
    visualization += '\nAfter merging:\n';
    const mergedTimeline = new Array(width).fill(' ');
    merged.forEach((interval, index) => {
        const startPos = Math.floor(((interval[0] - minStart) / range) * (width - 1));
        const endPos = Math.floor(((interval[1] - minStart) / range) * (width - 1));

        for (let i = startPos; i <= endPos; i++) {
            mergedTimeline[i] = String(index % 10);
        }
    });
    visualization += mergedTimeline.join('') + '\n';

    return visualization;
}

/**
 * Utility: Generate interval statistics
 *
 * @param {number[][]} intervals
 * @return {object}
 */
function getIntervalStats(intervals) {
    if (!intervals || intervals.length === 0) {
        return {
            totalIntervals: 0,
            mergedIntervals: 0,
            totalCoverage: 0,
            averageLength: 0,
            maxLength: 0,
            minLength: 0,
            overlappingPairs: 0,
            gaps: 0
        };
    }

    const merged = merge([...intervals]);
    const lengths = intervals.map(i => i[1] - i[0]);
    const overlapping = findOverlappingPairs(intervals);
    const gaps = findGaps(intervals);

    return {
        totalIntervals: intervals.length,
        mergedIntervals: merged.length,
        totalCoverage: getTotalCoverage(intervals),
        averageLength: lengths.reduce((a, b) => a + b, 0) / lengths.length,
        maxLength: Math.max(...lengths),
        minLength: Math.min(...lengths),
        overlappingPairs: overlapping.length,
        gaps: gaps.length,
        reductionRatio: ((intervals.length - merged.length) / intervals.length * 100).toFixed(1) + '%'
    };
}

module.exports = {
    merge,
    mergeWithStack,
    mergeWithoutSort,
    intervalsOverlap,
    mergeTwo,
    insertInterval,
    findMaxNonOverlapping,
    minIntervalsToRemove,
    getTotalCoverage,
    findGaps,
    isPointCovered,
    findOverlappingPairs,
    visualizeIntervals,
    getIntervalStats
};