/**
 * Course Schedule (LeetCode #207)
 * Difficulty: Medium
 *
 * Problem: There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1.
 * You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.
 * Return true if you can finish all courses. Otherwise, return false.
 *
 * Company: Google, Facebook, Amazon, Microsoft, Apple
 * Topics: Graph, Topological Sort, DFS, BFS
 */

/**
 * Approach 1: Topological Sort using Kahn's Algorithm (BFS)
 * Time: O(V + E) where V is number of courses, E is number of prerequisites
 * Space: O(V + E) for adjacency list and queue
 */
function canFinish(numCourses, prerequisites) {
    // Build adjacency list and in-degree array
    const graph = Array(numCourses).fill(null).map(() => []);
    const inDegree = Array(numCourses).fill(0);

    for (const [course, prereq] of prerequisites) {
        graph[prereq].push(course);
        inDegree[course]++;
    }

    // Queue for courses with no prerequisites
    const queue = [];
    for (let i = 0; i < numCourses; i++) {
        if (inDegree[i] === 0) {
            queue.push(i);
        }
    }

    let completedCourses = 0;

    while (queue.length > 0) {
        const course = queue.shift();
        completedCourses++;

        // Process all courses that depend on this course
        for (const nextCourse of graph[course]) {
            inDegree[nextCourse]--;
            if (inDegree[nextCourse] === 0) {
                queue.push(nextCourse);
            }
        }
    }

    return completedCourses === numCourses;
}

/**
 * Approach 2: Cycle Detection using DFS
 * Time: O(V + E)
 * Space: O(V + E)
 */
function canFinishDFS(numCourses, prerequisites) {
    const graph = Array(numCourses).fill(null).map(() => []);

    // Build adjacency list
    for (const [course, prereq] of prerequisites) {
        graph[prereq].push(course);
    }

    // 0: unvisited, 1: visiting, 2: visited
    const state = Array(numCourses).fill(0);

    function hasCycle(course) {
        if (state[course] === 1) return true;  // Back edge found (cycle)
        if (state[course] === 2) return false; // Already processed

        state[course] = 1; // Mark as visiting

        for (const nextCourse of graph[course]) {
            if (hasCycle(nextCourse)) return true;
        }

        state[course] = 2; // Mark as visited
        return false;
    }

    for (let i = 0; i < numCourses; i++) {
        if (state[i] === 0 && hasCycle(i)) {
            return false;
        }
    }

    return true;
}

/**
 * Approach 3: Optimized DFS with memoization
 * Time: O(V + E)
 * Space: O(V + E)
 */
function canFinishOptimized(numCourses, prerequisites) {
    const graph = Array(numCourses).fill(null).map(() => []);

    for (const [course, prereq] of prerequisites) {
        graph[prereq].push(course);
    }

    const visited = new Set();
    const recursionStack = new Set();

    function dfs(course) {
        if (recursionStack.has(course)) return false;
        if (visited.has(course)) return true;

        recursionStack.add(course);

        for (const nextCourse of graph[course]) {
            if (!dfs(nextCourse)) return false;
        }

        recursionStack.delete(course);
        visited.add(course);
        return true;
    }

    for (let i = 0; i < numCourses; i++) {
        if (!visited.has(i) && !dfs(i)) {
            return false;
        }
    }

    return true;
}

/**
 * Utility: Get course completion order (if possible)
 */
function findOrder(numCourses, prerequisites) {
    const graph = Array(numCourses).fill(null).map(() => []);
    const inDegree = Array(numCourses).fill(0);

    for (const [course, prereq] of prerequisites) {
        graph[prereq].push(course);
        inDegree[course]++;
    }

    const queue = [];
    for (let i = 0; i < numCourses; i++) {
        if (inDegree[i] === 0) {
            queue.push(i);
        }
    }

    const result = [];

    while (queue.length > 0) {
        const course = queue.shift();
        result.push(course);

        for (const nextCourse of graph[course]) {
            inDegree[nextCourse]--;
            if (inDegree[nextCourse] === 0) {
                queue.push(nextCourse);
            }
        }
    }

    return result.length === numCourses ? result : [];
}

/**
 * Utility: Analyze course dependency graph
 */
function analyzeCourseGraph(numCourses, prerequisites) {
    const graph = Array(numCourses).fill(null).map(() => []);
    const inDegree = Array(numCourses).fill(0);
    const outDegree = Array(numCourses).fill(0);

    for (const [course, prereq] of prerequisites) {
        graph[prereq].push(course);
        inDegree[course]++;
        outDegree[prereq]++;
    }

    return {
        totalCourses: numCourses,
        totalPrerequisites: prerequisites.length,
        coursesWithNoPrereqs: inDegree.filter(degree => degree === 0).length,
        coursesWithNoDependents: outDegree.filter(degree => degree === 0).length,
        maxPrerequisites: Math.max(...inDegree),
        maxDependents: Math.max(...outDegree),
        averagePrerequisites: inDegree.reduce((a, b) => a + b, 0) / numCourses,
        averageDependents: outDegree.reduce((a, b) => a + b, 0) / numCourses
    };
}

module.exports = {
    canFinish,
    canFinishDFS,
    canFinishOptimized,
    findOrder,
    analyzeCourseGraph
};