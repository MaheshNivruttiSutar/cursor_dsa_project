#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Generate comprehensive project statistics
 */
function generateStats() {
    const stats = {
        problems: {},
        tests: {},
        categories: {},
        totals: {
            problems: 0,
            testSuites: 0,
            testCases: 0,
            codeLines: 0,
            testLines: 0
        },
        coverage: {},
        complexity: {}
    };

    const srcPath = path.join(__dirname, '..', 'src');

    // Analyze each category
    const categories = fs.readdirSync(srcPath).filter(item => {
        return fs.statSync(path.join(srcPath, item)).isDirectory() && item !== 'utils';
    });

    categories.forEach(category => {
        const categoryPath = path.join(srcPath, category);
        const files = fs.readdirSync(categoryPath);

        const problemFiles = files.filter(f => f.endsWith('.js') && !f.endsWith('.test.js'));
        const testFiles = files.filter(f => f.endsWith('.test.js'));

        stats.categories[category] = {
            problems: problemFiles.length,
            testSuites: testFiles.length,
            files: problemFiles
        };

        // Count lines and test cases
        problemFiles.forEach(file => {
            const filePath = path.join(categoryPath, file);
            const content = fs.readFileSync(filePath, 'utf8');
            const lines = content.split('\n').length;

            stats.problems[file] = {
                category,
                lines,
                functions: (content.match(/function\s+\w+/g) || []).length,
                exports: (content.match(/module\.exports/g) || []).length
            };

            stats.totals.codeLines += lines;
        });

        testFiles.forEach(file => {
            const filePath = path.join(categoryPath, file);
            const content = fs.readFileSync(filePath, 'utf8');
            const lines = content.split('\n').length;
            const testCases = (content.match(/test\(|it\(/g) || []).length;

            stats.tests[file] = {
                category,
                lines,
                testCases,
                describes: (content.match(/describe\(/g) || []).length
            };

            stats.totals.testLines += lines;
            stats.totals.testCases += testCases;
        });

        stats.totals.problems += problemFiles.length;
        stats.totals.testSuites += testFiles.length;
    });

    // Generate report
    console.log('🚀 DSA Project Statistics');
    console.log('=' .repeat(50));

    console.log('\n📊 Overview:');
    console.log(`• Total Problems: ${stats.totals.problems}`);
    console.log(`• Total Test Suites: ${stats.totals.testSuites}`);
    console.log(`• Total Test Cases: ${stats.totals.testCases}`);
    console.log(`• Code Lines: ${stats.totals.codeLines.toLocaleString()}`);
    console.log(`• Test Lines: ${stats.totals.testLines.toLocaleString()}`);
    console.log(`• Test Coverage: ${((stats.totals.testCases / stats.totals.problems) * 100).toFixed(1)} tests per problem`);

    console.log('\n📁 By Category:');
    Object.entries(stats.categories).forEach(([category, data]) => {
        console.log(`• ${category}: ${data.problems} problems, ${data.testSuites} test suites`);
    });

    console.log('\n🏆 Top Test Coverage:');
    const testCoverage = Object.entries(stats.tests)
        .map(([file, data]) => ({
            file: file.replace('.test.js', ''),
            testCases: data.testCases,
            category: data.category
        }))
        .sort((a, b) => b.testCases - a.testCases)
        .slice(0, 5);

    testCoverage.forEach((item, index) => {
        console.log(`${index + 1}. ${item.file} (${item.category}): ${item.testCases} tests`);
    });

    console.log('\n🎯 Recommendations:');
    const avgTestsPerProblem = stats.totals.testCases / stats.totals.problems;
    if (avgTestsPerProblem < 20) {
        console.log('• Consider adding more test cases (target: 30+ per problem)');
    }

    const codeToTestRatio = stats.totals.testLines / stats.totals.codeLines;
    if (codeToTestRatio < 1) {
        console.log('• Consider expanding test coverage');
    } else {
        console.log('✅ Excellent test coverage ratio');
    }

    // Save detailed stats to file
    fs.writeFileSync(
        path.join(__dirname, '..', 'project-stats.json'),
        JSON.stringify(stats, null, 2)
    );

    console.log('\n📄 Detailed stats saved to project-stats.json');
    console.log('=' .repeat(50));
}

if (require.main === module) {
    generateStats();
}

module.exports = { generateStats };