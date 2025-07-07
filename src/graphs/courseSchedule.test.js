const {
    canFinish,
    canFinishDFS,
    canFinishOptimized,
    findOrder,
    analyzeCourseGraph
} = require('./courseSchedule');

describe('Course Schedule', () => {
    describe('canFinish (Topological Sort)', () => {
        test('should return true for courses with no prerequisites', () => {
            expect(canFinish(2, [])).toBe(true);
            expect(canFinish(1, [])).toBe(true);
        });

        test('should return true for valid course sequence', () => {
            expect(canFinish(2, [[1, 0]])).toBe(true);
            expect(canFinish(4, [[1, 0], [2, 0], [3, 1], [3, 2]])).toBe(true);
        });

        test('should return false for circular dependencies', () => {
            expect(canFinish(2, [[1, 0], [0, 1]])).toBe(false);
            expect(canFinish(3, [[1, 0], [2, 1], [0, 2]])).toBe(false);
        });

        test('should handle complex valid cases', () => {
            expect(canFinish(5, [[1, 0], [2, 1], [3, 2], [4, 3]])).toBe(true);
            expect(canFinish(6, [[1, 0], [2, 1], [3, 2], [4, 0], [5, 4]])).toBe(true);
        });

        test('should handle complex invalid cases', () => {
            expect(canFinish(4, [[1, 0], [2, 1], [3, 2], [1, 3]])).toBe(false);
            expect(canFinish(5, [[1, 0], [2, 1], [3, 2], [4, 3], [0, 4]])).toBe(false);
        });

        test('should handle single course', () => {
            expect(canFinish(1, [])).toBe(true);
        });

        test('should handle disconnected components', () => {
            expect(canFinish(4, [[1, 0], [3, 2]])).toBe(true);
            expect(canFinish(6, [[1, 0], [3, 2], [5, 4]])).toBe(true);
        });

        test('should handle self-loops', () => {
            expect(canFinish(2, [[0, 0]])).toBe(false);
            expect(canFinish(3, [[1, 1], [2, 0]])).toBe(false);
        });
    });

    describe('canFinishDFS (Cycle Detection)', () => {
        test('should return true for courses with no prerequisites', () => {
            expect(canFinishDFS(2, [])).toBe(true);
            expect(canFinishDFS(1, [])).toBe(true);
        });

        test('should return true for valid course sequence', () => {
            expect(canFinishDFS(2, [[1, 0]])).toBe(true);
            expect(canFinishDFS(4, [[1, 0], [2, 0], [3, 1], [3, 2]])).toBe(true);
        });

        test('should return false for circular dependencies', () => {
            expect(canFinishDFS(2, [[1, 0], [0, 1]])).toBe(false);
            expect(canFinishDFS(3, [[1, 0], [2, 1], [0, 2]])).toBe(false);
        });

        test('should handle complex valid cases', () => {
            expect(canFinishDFS(5, [[1, 0], [2, 1], [3, 2], [4, 3]])).toBe(true);
            expect(canFinishDFS(6, [[1, 0], [2, 1], [3, 2], [4, 0], [5, 4]])).toBe(true);
        });

        test('should handle complex invalid cases', () => {
            expect(canFinishDFS(4, [[1, 0], [2, 1], [3, 2], [1, 3]])).toBe(false);
            expect(canFinishDFS(5, [[1, 0], [2, 1], [3, 2], [4, 3], [0, 4]])).toBe(false);
        });

        test('should handle disconnected components', () => {
            expect(canFinishDFS(4, [[1, 0], [3, 2]])).toBe(true);
            expect(canFinishDFS(6, [[1, 0], [3, 2], [5, 4]])).toBe(true);
        });
    });

    describe('canFinishOptimized (Optimized DFS)', () => {
        test('should return true for courses with no prerequisites', () => {
            expect(canFinishOptimized(2, [])).toBe(true);
            expect(canFinishOptimized(1, [])).toBe(true);
        });

        test('should return true for valid course sequence', () => {
            expect(canFinishOptimized(2, [[1, 0]])).toBe(true);
            expect(canFinishOptimized(4, [[1, 0], [2, 0], [3, 1], [3, 2]])).toBe(true);
        });

        test('should return false for circular dependencies', () => {
            expect(canFinishOptimized(2, [[1, 0], [0, 1]])).toBe(false);
            expect(canFinishOptimized(3, [[1, 0], [2, 1], [0, 2]])).toBe(false);
        });

        test('should handle large input efficiently', () => {
            const numCourses = 100;
            const prerequisites = [];
            for (let i = 1; i < numCourses; i++) {
                prerequisites.push([i, i - 1]);
            }
            expect(canFinishOptimized(numCourses, prerequisites)).toBe(true);
        });
    });

    describe('findOrder (Course Completion Order)', () => {
        test('should return valid order for simple cases', () => {
            const order1 = findOrder(2, [[1, 0]]);
            expect(order1).toEqual([0, 1]);

            const order2 = findOrder(4, [[1, 0], [2, 0], [3, 1], [3, 2]]);
            expect(order2.length).toBe(4);
            expect(order2.indexOf(0)).toBeLessThan(order2.indexOf(1));
            expect(order2.indexOf(0)).toBeLessThan(order2.indexOf(2));
            expect(order2.indexOf(1)).toBeLessThan(order2.indexOf(3));
            expect(order2.indexOf(2)).toBeLessThan(order2.indexOf(3));
        });

        test('should return empty array for impossible cases', () => {
            expect(findOrder(2, [[1, 0], [0, 1]])).toEqual([]);
            expect(findOrder(3, [[1, 0], [2, 1], [0, 2]])).toEqual([]);
        });

        test('should handle courses with no prerequisites', () => {
            const order = findOrder(3, []);
            expect(order.length).toBe(3);
            expect(order.sort()).toEqual([0, 1, 2]);
        });

        test('should handle disconnected components', () => {
            const order = findOrder(4, [[1, 0], [3, 2]]);
            expect(order.length).toBe(4);
            expect(order.indexOf(0)).toBeLessThan(order.indexOf(1));
            expect(order.indexOf(2)).toBeLessThan(order.indexOf(3));
        });
    });

    describe('analyzeCourseGraph (Graph Analysis)', () => {
        test('should analyze simple graph correctly', () => {
            const analysis = analyzeCourseGraph(4, [[1, 0], [2, 0], [3, 1], [3, 2]]);
            expect(analysis.totalCourses).toBe(4);
            expect(analysis.totalPrerequisites).toBe(4);
            expect(analysis.coursesWithNoPrereqs).toBe(1); // Only course 0
            expect(analysis.coursesWithNoDependents).toBe(1); // Only course 3
            expect(analysis.maxPrerequisites).toBe(2); // Course 3 has 2 prerequisites
            expect(analysis.maxDependents).toBe(2); // Course 0 has 2 dependents
        });

        test('should analyze empty graph correctly', () => {
            const analysis = analyzeCourseGraph(3, []);
            expect(analysis.totalCourses).toBe(3);
            expect(analysis.totalPrerequisites).toBe(0);
            expect(analysis.coursesWithNoPrereqs).toBe(3);
            expect(analysis.coursesWithNoDependents).toBe(3);
            expect(analysis.maxPrerequisites).toBe(0);
            expect(analysis.maxDependents).toBe(0);
            expect(analysis.averagePrerequisites).toBe(0);
            expect(analysis.averageDependents).toBe(0);
        });

        test('should analyze linear dependency correctly', () => {
            const analysis = analyzeCourseGraph(4, [[1, 0], [2, 1], [3, 2]]);
            expect(analysis.totalCourses).toBe(4);
            expect(analysis.totalPrerequisites).toBe(3);
            expect(analysis.coursesWithNoPrereqs).toBe(1); // Only course 0
            expect(analysis.coursesWithNoDependents).toBe(1); // Only course 3
            expect(analysis.averagePrerequisites).toBe(0.75); // 3 prerequisites / 4 courses
            expect(analysis.averageDependents).toBe(0.75); // 3 dependents / 4 courses
        });

        test('should handle complex graph analysis', () => {
            const prerequisites = [
                [1, 0], [2, 0], [3, 1], [3, 2], [4, 1], [4, 2], [5, 3], [5, 4]
            ];
            const analysis = analyzeCourseGraph(6, prerequisites);
            expect(analysis.totalCourses).toBe(6);
            expect(analysis.totalPrerequisites).toBe(8);
            expect(analysis.coursesWithNoPrereqs).toBe(1); // Only course 0
            expect(analysis.coursesWithNoDependents).toBe(1); // Only course 5
        });
    });

    describe('Algorithm Comparison', () => {
        test('all algorithms should produce same results', () => {
            const testCases = [
                [2, []],
                [2, [[1, 0]]],
                [2, [[1, 0], [0, 1]]],
                [4, [[1, 0], [2, 0], [3, 1], [3, 2]]],
                [3, [[1, 0], [2, 1], [0, 2]]],
                [5, [[1, 0], [2, 1], [3, 2], [4, 3]]],
                [4, [[1, 0], [2, 1], [3, 2], [1, 3]]]
            ];

            for (const [numCourses, prerequisites] of testCases) {
                const result1 = canFinish(numCourses, prerequisites);
                const result2 = canFinishDFS(numCourses, prerequisites);
                const result3 = canFinishOptimized(numCourses, prerequisites);

                expect(result1).toBe(result2);
                expect(result2).toBe(result3);
            }
        });

        test('findOrder should be consistent with canFinish', () => {
            const testCases = [
                [2, [[1, 0]]],
                [2, [[1, 0], [0, 1]]],
                [4, [[1, 0], [2, 0], [3, 1], [3, 2]]],
                [3, [[1, 0], [2, 1], [0, 2]]]
            ];

            for (const [numCourses, prerequisites] of testCases) {
                const canComplete = canFinish(numCourses, prerequisites);
                const order = findOrder(numCourses, prerequisites);

                if (canComplete) {
                    expect(order.length).toBe(numCourses);
                } else {
                    expect(order.length).toBe(0);
                }
            }
        });
    });
});