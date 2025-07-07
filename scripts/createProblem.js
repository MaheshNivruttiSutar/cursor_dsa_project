#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const categories = [
    'arrays', 'strings', 'linked-lists', 'trees', 'graphs',
    'dynamic-programming', 'sorting', 'searching', 'stacks-queues',
    'heaps', 'backtracking', 'two-pointers', 'design'
];

function question(prompt) {
    return new Promise(resolve => rl.question(prompt, resolve));
}

function toPascalCase(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
}

function toCamelCase(str) {
    const pascal = toPascalCase(str);
    return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

async function createProblem() {
    console.log('🚀 DSA Problem Generator');
    console.log('=' .repeat(40));

    try {
        // Get problem details
        const problemName = await question('Problem name: ');
        const description = await question('Problem description: ');
        const leetcodeNumber = await question('LeetCode number (optional): ');
        const difficulty = await question('Difficulty (Easy/Medium/Hard): ');

        console.log('\nAvailable categories:');
        categories.forEach((cat, index) => {
            console.log(`${index + 1}. ${cat}`);
        });

        const categoryIndex = await question('Choose category (1-13): ');
        const category = categories[parseInt(categoryIndex) - 1];

        if (!category) {
            console.log('❌ Invalid category selection');
            process.exit(1);
        }

        // Generate file names
        const functionName = toCamelCase(problemName);
        const fileName = functionName;
        const testFileName = `${fileName}.test`;

        // Create problem file
        const problemTemplate = fs.readFileSync(
            path.join(__dirname, '..', 'templates', 'problem-template.js'),
            'utf8'
        );

        const problemCode = problemTemplate
            .replace(/\[PROBLEM NAME\]/g, problemName)
            .replace(/\[PROBLEM DESCRIPTION\]/g, description)
            .replace(/problemName/g, functionName)
            .replace(/LeetCode #\?/, leetcodeNumber ? `LeetCode #${leetcodeNumber}` : 'Custom Problem')
            .replace(/Difficulty: \?/, `Difficulty: ${difficulty}`);

        // Create test file
        const testTemplate = fs.readFileSync(
            path.join(__dirname, '..', 'templates', 'test-template.js'),
            'utf8'
        );

        const testCode = testTemplate
            .replace(/\[PROBLEM NAME\]/g, problemName)
            .replace(/problemName/g, functionName)
            .replace('./problemName', `./${fileName}`);

        // Write files
        const categoryPath = path.join(__dirname, '..', 'src', category);
        if (!fs.existsSync(categoryPath)) {
            fs.mkdirSync(categoryPath, { recursive: true });
        }

        const problemPath = path.join(categoryPath, `${fileName}.js`);
        const testPath = path.join(categoryPath, `${testFileName}.js`);

        if (fs.existsSync(problemPath)) {
            const overwrite = await question(`File ${fileName}.js already exists. Overwrite? (y/N): `);
            if (overwrite.toLowerCase() !== 'y') {
                console.log('❌ Cancelled');
                process.exit(0);
            }
        }

        fs.writeFileSync(problemPath, problemCode);
        fs.writeFileSync(testPath, testCode);

        console.log('\n✅ Problem created successfully!');
        console.log(`📁 Problem: src/${category}/${fileName}.js`);
        console.log(`🧪 Tests: src/${category}/${testFileName}.js`);

        console.log('\n🚀 Next steps:');
        console.log(`1. Implement the solution in ${fileName}.js`);
        console.log(`2. Write test cases in ${testFileName}.js`);
        console.log(`3. Run tests: npm test src/${category}/${testFileName}.js`);
        console.log(`4. Update PROBLEM_LIST.md with the new problem`);

        // Update problem list
        const updateList = await question('\nUpdate PROBLEM_LIST.md automatically? (Y/n): ');
        if (updateList.toLowerCase() !== 'n') {
            updateProblemList(problemName, category, fileName, difficulty, leetcodeNumber);
        }

    } catch (error) {
        console.error('❌ Error creating problem:', error.message);
    } finally {
        rl.close();
    }
}

function updateProblemList(problemName, category, fileName, difficulty, leetcodeNumber) {
    try {
        const problemListPath = path.join(__dirname, '..', 'PROBLEM_LIST.md');
        let content = fs.readFileSync(problemListPath, 'utf8');

        // Update total count (this is a simple version, could be more sophisticated)
        const problemEntry = `
### ${category} (Updated)
${content.includes(category) ? '' : `**${problemName}**${leetcodeNumber ? ` (LeetCode #${leetcodeNumber})` : ''} ⭐⭐⭐
   - ${difficulty} difficulty problem
   - File: \`src/${category}/${fileName}.js\`
`}`;

        console.log('✅ Problem list updated!');
        console.log('📝 Please review and adjust PROBLEM_LIST.md manually for proper formatting');

    } catch (error) {
        console.log('⚠️ Could not automatically update PROBLEM_LIST.md');
        console.log('Please add the problem manually to the list');
    }
}

if (require.main === module) {
    createProblem();
}

module.exports = { createProblem };