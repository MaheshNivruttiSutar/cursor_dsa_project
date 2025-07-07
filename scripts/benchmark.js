#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { performance } = require('perf_hooks');

/**
 * Benchmark runner for DSA problems
 */
class BenchmarkRunner {
    constructor() {
        this.results = {};
        this.testSizes = [10, 100, 1000, 5000];
    }

    /**
     * Run benchmarks for all problems
     */
    async runAllBenchmarks() {
        console.log('🏃‍♂️ DSA Performance Benchmark Suite');
        console.log('=' .repeat(50));

        const categories = this.getCategories();

        for (const category of categories) {
            console.log(`\n📁 Category: ${category}`);
            console.log('-'.repeat(30));

            const problems = this.getProblemsInCategory(category);

            for (const problem of problems) {
                await this.benchmarkProblem(category, problem);
            }
        }

        this.generateReport();
    }

    /**
     * Get all problem categories
     */
    getCategories() {
        const srcPath = path.join(__dirname, '..', 'src');
        return fs.readdirSync(srcPath)
            .filter(item => {
                const itemPath = path.join(srcPath, item);
                return fs.statSync(itemPath).isDirectory() && item !== 'utils';
            });
    }

    /**
     * Get all problems in a category
     */
    getProblemsInCategory(category) {
        const categoryPath = path.join(__dirname, '..', 'src', category);
        return fs.readdirSync(categoryPath)
            .filter(file => file.endsWith('.js') && !file.endsWith('.test.js'))
            .map(file => file.replace('.js', ''));
    }

    /**
     * Benchmark a specific problem
     */
    async benchmarkProblem(category, problemName) {
        try {
            const problemPath = path.join(__dirname, '..', 'src', category, `${problemName}.js`);

            if (!fs.existsSync(problemPath)) {
                return;
            }

            const problemModule = require(problemPath);
            const mainFunction = this.getMainFunction(problemModule);

            if (!mainFunction) {
                console.log(`⚠️  ${problemName}: No main function found`);
                return;
            }

            console.log(`🔍 ${problemName}`);

            const benchmarkResults = {};

            for (const size of this.testSizes) {
                const testData = this.generateTestData(category, size);
                const result = await this.measurePerformance(mainFunction, testData, 5);

                benchmarkResults[size] = result;
                console.log(`   Size ${size}: ${result.avgTime.toFixed(3)}ms (${result.operations}/ops)`);
            }

            this.results[`${category}/${problemName}`] = benchmarkResults;

        } catch (error) {
            console.log(`❌ ${problemName}: Error - ${error.message}`);
        }
    }

    /**
     * Get the main function from a problem module
     */
    getMainFunction(module) {
        // Try common function names
        const commonNames = [
            'twoSum', 'threeSum', 'maxArea', 'isValid', 'isPalindrome',
            'reverseList', 'mergeTwoLists', 'maxDepth', 'climbStairs',
            'coinChange', 'rob', 'longestCommonSubsequence', 'canFinish',
            'findKthLargest', 'lowestCommonAncestor', 'exist', 'get', 'put'
        ];

        // First, try to find a function with common names
        for (const name of commonNames) {
            if (typeof module[name] === 'function') {
                return module[name];
            }
        }

        // If it's a direct export
        if (typeof module === 'function') {
            return module;
        }

        // Get the first function from exports
        const functions = Object.values(module).filter(val => typeof val === 'function');
        return functions[0] || null;
    }

    /**
     * Generate test data based on category
     */
    generateTestData(category, size) {
        switch (category) {
            case 'arrays':
                return [Array.from({length: size}, () => Math.floor(Math.random() * 1000))];

            case 'strings':
                return [Array.from({length: size}, () => String.fromCharCode(97 + Math.floor(Math.random() * 26))).join('')];

            case 'sorting':
                return [Array.from({length: size}, () => Math.floor(Math.random() * 1000))];

            case 'searching':
                const sortedArray = Array.from({length: size}, (_, i) => i);
                return [sortedArray, Math.floor(Math.random() * size)];

            case 'dynamic-programming':
                return [Math.min(size, 50)]; // DP problems often have exponential complexity

            default:
                return [Array.from({length: Math.min(size, 100)}, () => Math.floor(Math.random() * 100))];
        }
    }

    /**
     * Measure performance of a function
     */
    async measurePerformance(func, testData, iterations = 5) {
        const times = [];

        for (let i = 0; i < iterations; i++) {
            const start = performance.now();

            try {
                // Handle different argument patterns
                if (Array.isArray(testData)) {
                    func(...testData);
                } else {
                    func(testData);
                }
            } catch (error) {
                // Some functions might fail with random data, that's ok for benchmarking
            }

            const end = performance.now();
            times.push(end - start);
        }

        const avgTime = times.reduce((a, b) => a + b) / times.length;
        const operations = Math.round(1000 / avgTime);

        return {
            avgTime,
            minTime: Math.min(...times),
            maxTime: Math.max(...times),
            operations,
            iterations
        };
    }

    /**
     * Generate benchmark report
     */
    generateReport() {
        console.log('\n\n📊 BENCHMARK REPORT');
        console.log('=' .repeat(50));

        // Find fastest and slowest
        const flatResults = [];
        Object.entries(this.results).forEach(([problem, sizes]) => {
            Object.entries(sizes).forEach(([size, result]) => {
                flatResults.push({
                    problem,
                    size: parseInt(size),
                    ...result
                });
            });
        });

        // Sort by performance
        const fastest = flatResults
            .filter(r => r.size === 1000)
            .sort((a, b) => a.avgTime - b.avgTime)
            .slice(0, 5);

        const slowest = flatResults
            .filter(r => r.size === 1000)
            .sort((a, b) => b.avgTime - a.avgTime)
            .slice(0, 5);

        console.log('\n🏆 Fastest (size 1000):');
        fastest.forEach((result, index) => {
            console.log(`${index + 1}. ${result.problem}: ${result.avgTime.toFixed(3)}ms`);
        });

        console.log('\n🐌 Slowest (size 1000):');
        slowest.forEach((result, index) => {
            console.log(`${index + 1}. ${result.problem}: ${result.avgTime.toFixed(3)}ms`);
        });

        // Complexity analysis
        console.log('\n📈 Complexity Analysis:');
        Object.entries(this.results).forEach(([problem, sizes]) => {
            const sizeKeys = Object.keys(sizes).map(Number).sort((a, b) => a - b);
            if (sizeKeys.length >= 2) {
                const growth = sizes[sizeKeys[sizeKeys.length - 1]].avgTime / sizes[sizeKeys[0]].avgTime;
                const complexity = this.estimateComplexity(growth, sizeKeys[sizeKeys.length - 1] / sizeKeys[0]);
                console.log(`• ${problem}: ~${complexity}`);
            }
        });

        // Save results
        const reportPath = path.join(__dirname, '..', 'benchmark-results.json');
        fs.writeFileSync(reportPath, JSON.stringify({
            timestamp: new Date().toISOString(),
            results: this.results,
            summary: {
                fastest: fastest.slice(0, 3),
                slowest: slowest.slice(0, 3)
            }
        }, null, 2));

        console.log(`\n📄 Full results saved to benchmark-results.json`);
        console.log('=' .repeat(50));
    }

    /**
     * Estimate time complexity based on growth rate
     */
    estimateComplexity(timeGrowth, sizeGrowth) {
        const ratio = Math.log(timeGrowth) / Math.log(sizeGrowth);

        if (ratio < 1.1) return 'O(1)';
        if (ratio < 1.5) return 'O(log n)';
        if (ratio < 2.1) return 'O(n)';
        if (ratio < 2.5) return 'O(n log n)';
        if (ratio < 3.1) return 'O(n²)';
        if (ratio < 4.1) return 'O(n³)';
        return 'O(n^k) or worse';
    }
}

// Run benchmarks if called directly
if (require.main === module) {
    const runner = new BenchmarkRunner();
    runner.runAllBenchmarks().catch(console.error);
}

module.exports = { BenchmarkRunner };