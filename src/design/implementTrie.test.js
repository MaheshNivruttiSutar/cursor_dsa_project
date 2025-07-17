/**
 * @fileoverview Test cases for Implement Trie (Prefix Tree) - LeetCode #208
 * @author Your Name
 * @since 2024
 */

const {
    Trie,
    TrieArray,
    TrieMap,
    CompressedTrie,
    getAllWordsWithPrefix,
    getAllWords,
    deleteWord,
    countWords,
    countNodes,
    longestCommonPrefix,
    isEmpty,
    visualizeTrie,
    createTrieFromWords
} = require('./implementTrie');

describe('Implement Trie (Prefix Tree)', () => {
    // Test all trie implementations
    const trieImplementations = [
        { name: 'TrieArray', class: TrieArray },
        { name: 'TrieMap', class: TrieMap },
        { name: 'CompressedTrie', class: CompressedTrie },
        { name: 'Default', class: Trie }
    ];

    trieImplementations.forEach(({ name, class: TrieClass }) => {
        describe(`${name} Implementation`, () => {
            let trie;

            beforeEach(() => {
                trie = new TrieClass();
            });

            describe('Basic Operations', () => {
                test('insert and search single word', () => {
                    trie.insert('apple');
                    expect(trie.search('apple')).toBe(true);
                    expect(trie.search('app')).toBe(false);
                });

                test('insert multiple words', () => {
                    const words = ['apple', 'app', 'application'];
                    words.forEach(word => trie.insert(word));

                    words.forEach(word => {
                        expect(trie.search(word)).toBe(true);
                    });
                });

                test('startsWith functionality', () => {
                    trie.insert('apple');
                    trie.insert('app');
                    trie.insert('application');

                    expect(trie.startsWith('app')).toBe(true);
                    expect(trie.startsWith('appl')).toBe(true);
                    expect(trie.startsWith('banana')).toBe(false);
                    expect(trie.startsWith('')).toBe(true);
                });
            });

            describe('Edge Cases', () => {
                test('empty string operations', () => {
                    trie.insert('');
                    expect(trie.search('')).toBe(false);
                    expect(trie.startsWith('')).toBe(true);
                });

                test('null and undefined inputs', () => {
                    trie.insert(null);
                    trie.insert(undefined);

                    expect(trie.search(null)).toBe(false);
                    expect(trie.search(undefined)).toBe(false);
                });

                test('single character words', () => {
                    trie.insert('a');
                    trie.insert('b');

                    expect(trie.search('a')).toBe(true);
                    expect(trie.search('b')).toBe(true);
                    expect(trie.search('c')).toBe(false);
                    expect(trie.startsWith('a')).toBe(true);
                });

                test('overlapping words', () => {
                    trie.insert('car');
                    trie.insert('card');
                    trie.insert('care');
                    trie.insert('careful');

                    expect(trie.search('car')).toBe(true);
                    expect(trie.search('card')).toBe(true);
                    expect(trie.search('care')).toBe(true);
                    expect(trie.search('careful')).toBe(true);
                    expect(trie.search('ca')).toBe(false);
                });
            });

            describe('LeetCode Examples', () => {
                test('LeetCode Example 1', () => {
                    // ["Trie", "insert", "search", "search", "startsWith", "insert", "search"]
                    // [[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]
                    // Output: [null, null, true, false, true, null, true]

                    trie.insert('apple');
                    expect(trie.search('apple')).toBe(true);   // true
                    expect(trie.search('app')).toBe(false);    // false
                    expect(trie.startsWith('app')).toBe(true); // true
                    trie.insert('app');
                    expect(trie.search('app')).toBe(true);     // true
                });
            });

            describe('Complex Scenarios', () => {
                test('large dictionary', () => {
                    const words = [
                        'the', 'quick', 'brown', 'fox', 'jumps', 'over', 'lazy', 'dog',
                        'this', 'is', 'a', 'test', 'of', 'trie', 'data', 'structure',
                        'algorithm', 'computer', 'science', 'programming'
                    ];

                    words.forEach(word => trie.insert(word));
                    words.forEach(word => {
                        expect(trie.search(word)).toBe(true);
                    });

                    expect(trie.search('nonexistent')).toBe(false);
                    expect(trie.startsWith('prog')).toBe(true);
                    expect(trie.startsWith('xyz')).toBe(false);
                });

                test('duplicate insertions', () => {
                    trie.insert('hello');
                    trie.insert('hello');
                    trie.insert('hello');

                    expect(trie.search('hello')).toBe(true);
                });

                test('case sensitivity', () => {
                    // Skip for TrieArray as it only supports lowercase
                    if (name === 'TrieArray') return;

                    trie.insert('Hello');
                    trie.insert('hello');

                    expect(trie.search('Hello')).toBe(true);
                    expect(trie.search('hello')).toBe(true);
                    expect(trie.search('HELLO')).toBe(false);
                });
            });
        });
    });

    describe('Performance Tests', () => {
        test('large scale operations', () => {
            const trie = new TrieMap();
            const words = [];

            // Generate test words
            for (let i = 0; i < 1000; i++) {
                const word = 'word' + i.toString().padStart(4, '0');
                words.push(word);
            }

            // Insert performance
            const insertStart = Date.now();
            words.forEach(word => trie.insert(word));
            const insertEnd = Date.now();

            // Search performance
            const searchStart = Date.now();
            words.forEach(word => {
                expect(trie.search(word)).toBe(true);
            });
            const searchEnd = Date.now();

            // Prefix search performance
            const prefixStart = Date.now();
            for (let i = 0; i < 100; i++) {
                expect(trie.startsWith('word')).toBe(true);
            }
            const prefixEnd = Date.now();

            expect(insertEnd - insertStart).toBeLessThan(100);
            expect(searchEnd - searchStart).toBeLessThan(100);
            expect(prefixEnd - prefixStart).toBeLessThan(50);
        });

        test('memory efficiency comparison', () => {
            const words = ['cat', 'car', 'card', 'care', 'careful', 'cards', 'cats'];

            const arrayTrie = new TrieArray();
            const mapTrie = new TrieMap();

            words.forEach(word => {
                arrayTrie.insert(word);
                mapTrie.insert(word);
            });

            words.forEach(word => {
                expect(arrayTrie.search(word)).toBe(true);
                expect(mapTrie.search(word)).toBe(true);
            });
        });
    });

    describe('Utility Functions', () => {
        let trie;

        beforeEach(() => {
            trie = new TrieMap();
            ['cat', 'car', 'card', 'care', 'careful', 'dog', 'dodge'].forEach(word => {
                trie.insert(word);
            });
        });

        describe('getAllWordsWithPrefix', () => {
            test('get words with common prefix', () => {
                const carWords = getAllWordsWithPrefix(trie, 'car');
                expect(carWords.sort()).toEqual(['car', 'card', 'care', 'careful']);
            });

            test('prefix with no matches', () => {
                const result = getAllWordsWithPrefix(trie, 'xyz');
                expect(result).toEqual([]);
            });

            test('empty prefix returns all words', () => {
                const allWords = getAllWordsWithPrefix(trie, '');
                expect(allWords.sort()).toEqual(['car', 'card', 'care', 'careful', 'cat', 'dodge', 'dog']);
            });
        });

        describe('getAllWords', () => {
            test('get all words from trie', () => {
                const allWords = getAllWords(trie);
                expect(allWords.sort()).toEqual(['car', 'card', 'care', 'careful', 'cat', 'dodge', 'dog']);
            });

            test('empty trie returns empty array', () => {
                const emptyTrie = new TrieMap();
                expect(getAllWords(emptyTrie)).toEqual([]);
            });
        });

        describe('deleteWord', () => {
            test('delete existing word', () => {
                expect(trie.search('cat')).toBe(true);
                expect(deleteWord(trie, 'cat')).toBe(true);
                expect(trie.search('cat')).toBe(false);
            });

            test('delete non-existing word', () => {
                expect(deleteWord(trie, 'nonexistent')).toBe(false);
            });

            test('delete word without affecting other words', () => {
                deleteWord(trie, 'card');
                expect(trie.search('card')).toBe(false);
                expect(trie.search('car')).toBe(true);
                expect(trie.search('care')).toBe(true);
            });
        });

        describe('countWords', () => {
            test('count words in trie', () => {
                expect(countWords(trie)).toBe(7);
            });

            test('count after insertions and deletions', () => {
                trie.insert('new');
                expect(countWords(trie)).toBe(8);

                deleteWord(trie, 'cat');
                expect(countWords(trie)).toBe(7);
            });
        });

        describe('countNodes', () => {
            test('count nodes in trie', () => {
                const nodeCount = countNodes(trie);
                expect(nodeCount).toBeGreaterThan(7); // At least one node per word
            });

            test('empty trie has one node (root)', () => {
                const emptyTrie = new TrieMap();
                expect(countNodes(emptyTrie)).toBe(1);
            });
        });

        describe('longestCommonPrefix', () => {
            test('find longest common prefix', () => {
                const trie = new TrieMap();
                ['flower', 'flow', 'flight'].forEach(word => trie.insert(word));

                expect(longestCommonPrefix(trie)).toBe('fl');
            });

            test('no common prefix', () => {
                const trie = new TrieMap();
                ['dog', 'racecar', 'car'].forEach(word => trie.insert(word));

                expect(longestCommonPrefix(trie)).toBe('');
            });

            test('all words identical', () => {
                const trie = new TrieMap();
                ['test', 'test', 'test'].forEach(word => trie.insert(word));

                expect(longestCommonPrefix(trie)).toBe('test');
            });
        });

        describe('isEmpty', () => {
            test('non-empty trie', () => {
                expect(isEmpty(trie)).toBe(false);
            });

            test('empty trie', () => {
                const emptyTrie = new TrieMap();
                expect(isEmpty(emptyTrie)).toBe(true);
            });
        });

        describe('visualizeTrie', () => {
            test('generate trie visualization', () => {
                const visualization = visualizeTrie(trie);
                expect(visualization).toContain('Trie Structure');
                expect(visualization).toContain('root');
                expect(visualization).toContain('●'); // End of word marker
            });
        });

        describe('createTrieFromWords', () => {
            test('create trie from word array', () => {
                const words = ['apple', 'app', 'application'];
                const newTrie = createTrieFromWords(words);

                words.forEach(word => {
                    expect(newTrie.search(word)).toBe(true);
                });
            });

            test('create with different trie class', () => {
                const words = ['test', 'testing'];
                const arrayTrie = createTrieFromWords(words, TrieArray);

                words.forEach(word => {
                    expect(arrayTrie.search(word)).toBe(true);
                });
            });
        });
    });

    describe('Algorithm Consistency', () => {
        test('all implementations produce same results', () => {
            const words = ['apple', 'app', 'application', 'apply', 'banana', 'band', 'bandana'];
            const testQueries = ['app', 'appl', 'apple', 'banana', 'ban', 'xyz'];
            const prefixQueries = ['app', 'ban', 'xyz', ''];

            const results = trieImplementations.map(({ name, class: TrieClass }) => {
                const trie = new TrieClass();
                words.forEach(word => trie.insert(word));

                return {
                    name,
                    searches: testQueries.map(query => trie.search(query)),
                    prefixes: prefixQueries.map(prefix => trie.startsWith(prefix))
                };
            });

            // All implementations should give same results
            const firstResult = results[0];
            results.slice(1).forEach(result => {
                expect(result.searches).toEqual(firstResult.searches);
                expect(result.prefixes).toEqual(firstResult.prefixes);
            });
        });
    });

    describe('Error Handling', () => {
        test('handles special characters gracefully', () => {
            // Skip for TrieArray as it only supports lowercase letters
            const trie = new TrieMap();

            trie.insert('hello-world');
            trie.insert('test_case');
            trie.insert('123numbers');

            expect(trie.search('hello-world')).toBe(true);
            expect(trie.search('test_case')).toBe(true);
            expect(trie.search('123numbers')).toBe(true);
        });

        test('handles very long words', () => {
            const trie = new TrieMap();
            const longWord = 'a'.repeat(1000);

            trie.insert(longWord);
            expect(trie.search(longWord)).toBe(true);
            expect(trie.startsWith(longWord.substring(0, 500))).toBe(true);
        });

        test('handles maximum operations', () => {
            const trie = new TrieMap();

            // Simulate maximum operations (3 * 10^4)
            const operationCount = 100; // Reduced for test performance

            for (let i = 0; i < operationCount; i++) {
                const word = `word${i}`;
                trie.insert(word);
                expect(trie.search(word)).toBe(true);
                expect(trie.startsWith(word.substring(0, 3))).toBe(true);
            }
        });
    });

    describe('Real-world Use Cases', () => {
        test('autocomplete functionality', () => {
            const trie = new TrieMap();
            const dictionary = [
                'apple', 'application', 'apply', 'appreciate', 'approach',
                'banana', 'band', 'bandana', 'bank', 'banner'
            ];

            dictionary.forEach(word => trie.insert(word));

            // Autocomplete for "app"
            const appSuggestions = getAllWordsWithPrefix(trie, 'app');
            expect(appSuggestions.sort()).toEqual(['apple', 'application', 'apply', 'appreciate', 'approach']);

            // Autocomplete for "ban"
            const banSuggestions = getAllWordsWithPrefix(trie, 'ban');
            expect(banSuggestions.sort()).toEqual(['banana', 'band', 'bandana', 'bank', 'banner']);
        });

        test('spell checker functionality', () => {
            const trie = new TrieMap();
            const dictionary = ['hello', 'world', 'programming', 'computer', 'science'];

            dictionary.forEach(word => trie.insert(word));

            // Valid words
            expect(trie.search('hello')).toBe(true);
            expect(trie.search('programming')).toBe(true);

            // Invalid words (misspellings)
            expect(trie.search('helo')).toBe(false);
            expect(trie.search('programing')).toBe(false);
        });

        test('prefix matching for search engines', () => {
            const trie = new TrieMap();
            const searchTerms = [
                'javascript', 'java', 'python', 'programming',
                'algorithm', 'data', 'structure', 'computer'
            ];

            searchTerms.forEach(term => trie.insert(term));

            // Search suggestions
            expect(trie.startsWith('java')).toBe(true);
            expect(trie.startsWith('prog')).toBe(true);
            expect(trie.startsWith('algo')).toBe(true);
            expect(trie.startsWith('xyz')).toBe(false);
        });
    });
});