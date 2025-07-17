/**
 * @fileoverview Implement Trie (Prefix Tree) - LeetCode #208 (Medium)
 *
 * Problem Description:
 * A trie (pronounced as "try") or prefix tree is a tree data structure used to efficiently
 * store and search strings in a dataset of strings. There are various applications of this
 * data structure, such as autocomplete and spellchecker.
 *
 * Implement the Trie class:
 * - Trie() Initializes the trie object.
 * - void insert(String word) Inserts the string word into the trie.
 * - boolean search(String word) Returns true if the string word is in the trie.
 * - boolean startsWith(String prefix) Returns true if there is a previously inserted string
 *   word that has the prefix prefix.
 *
 * Examples:
 * Input: ["Trie", "insert", "search", "search", "startsWith", "insert", "search"]
 *        [[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]
 * Output: [null, null, true, false, true, null, true]
 *
 * Constraints:
 * - 1 <= word.length, prefix.length <= 2000
 * - word and prefix consist only of lowercase English letters.
 * - At most 3 * 10^4 calls will be made to insert, search, and startsWith.
 *
 * @author Your Name
 * @since 2024
 */

/**
 * Approach 1: Array-based Trie (fastest for lowercase letters)
 * Time Complexity: O(m) for all operations where m is the key length
 * Space Complexity: O(ALPHABET_SIZE * N * M) where N is number of words, M is average length
 */
class TrieArray {
    constructor() {
        this.root = new TrieArrayNode();
    }

    /**
     * Insert word into the trie
     * @param {string} word - Word to insert
     */
    insert(word) {
        if (!word) return;

        let node = this.root;
        for (const char of word) {
            const index = char.charCodeAt(0) - 97; // 'a' = 97
            if (!node.children[index]) {
                node.children[index] = new TrieArrayNode();
            }
            node = node.children[index];
        }
        node.isEndOfWord = true;
    }

    /**
     * Search for a word in the trie
     * @param {string} word - Word to search
     * @returns {boolean} True if word exists
     */
    search(word) {
        if (!word) return false;

        let node = this.root;
        for (const char of word) {
            const index = char.charCodeAt(0) - 97;
            if (!node.children[index]) {
                return false;
            }
            node = node.children[index];
        }
        return node.isEndOfWord;
    }

    /**
     * Check if there's any word starting with the given prefix
     * @param {string} prefix - Prefix to check
     * @returns {boolean} True if prefix exists
     */
    startsWith(prefix) {
        if (!prefix) return true;

        let node = this.root;
        for (const char of prefix) {
            const index = char.charCodeAt(0) - 97;
            if (!node.children[index]) {
                return false;
            }
            node = node.children[index];
        }
        return true;
    }
}

class TrieArrayNode {
    constructor() {
        this.children = new Array(26).fill(null);
        this.isEndOfWord = false;
    }
}

/**
 * Approach 2: Map-based Trie (more flexible, supports any characters)
 * Time Complexity: O(m) for all operations
 * Space Complexity: O(N * M) where N is number of words, M is average length
 */
class TrieMap {
    constructor() {
        this.root = new TrieMapNode();
    }

    insert(word) {
        if (!word) return;

        let node = this.root;
        for (const char of word) {
            if (!node.children.has(char)) {
                node.children.set(char, new TrieMapNode());
            }
            node = node.children.get(char);
        }
        node.isEndOfWord = true;
    }

    search(word) {
        if (!word) return false;

        let node = this.root;
        for (const char of word) {
            if (!node.children.has(char)) {
                return false;
            }
            node = node.children.get(char);
        }
        return node.isEndOfWord;
    }

    startsWith(prefix) {
        if (!prefix) return true;

        let node = this.root;
        for (const char of prefix) {
            if (!node.children.has(char)) {
                return false;
            }
            node = node.children.get(char);
        }
        return true;
    }
}

class TrieMapNode {
    constructor() {
        this.children = new Map();
        this.isEndOfWord = false;
    }
}

/**
 * Approach 3: Compressed Trie (Radix Tree) - Space efficient
 * Time Complexity: O(m) for operations, but with better practical performance
 * Space Complexity: O(N * M) but more space-efficient in practice
 */
class CompressedTrie {
    constructor() {
        this.root = new CompressedTrieNode();
    }

    insert(word) {
        if (!word) return;
        this._insert(this.root, word, 0);
    }

    _insert(node, word, depth) {
        if (depth === word.length) {
            node.isEndOfWord = true;
            return;
        }

        const char = word[depth];
        let child = null;

        // Find child that starts with this character
        for (const [key, childNode] of node.children) {
            if (key[0] === char) {
                child = childNode;
                break;
            }
        }

        if (!child) {
            // No matching child, create new one with remaining suffix
            const suffix = word.substring(depth);
            node.children.set(suffix, new CompressedTrieNode());
            node.children.get(suffix).isEndOfWord = true;
            return;
        }

        // Find matching prefix
        const childKey = [...node.children.keys()].find(key =>
            node.children.get(key) === child);
        const commonPrefixLength = this._getCommonPrefixLength(
            word.substring(depth), childKey);

        if (commonPrefixLength === childKey.length) {
            // Full match with existing edge
            this._insert(child, word, depth + commonPrefixLength);
        } else {
            // Partial match, need to split edge
            this._splitEdge(node, childKey, child, commonPrefixLength);
            this._insert(node, word, depth);
        }
    }

    _splitEdge(parent, oldKey, oldChild, splitPoint) {
        // Create intermediate node
        const newNode = new CompressedTrieNode();
        const commonPrefix = oldKey.substring(0, splitPoint);
        const oldSuffix = oldKey.substring(splitPoint);

        // Update parent -> new node connection
        parent.children.delete(oldKey);
        parent.children.set(commonPrefix, newNode);

        // Update new node -> old child connection
        newNode.children.set(oldSuffix, oldChild);
    }

    _getCommonPrefixLength(str1, str2) {
        let i = 0;
        while (i < str1.length && i < str2.length && str1[i] === str2[i]) {
            i++;
        }
        return i;
    }

    search(word) {
        if (!word) return false;
        return this._search(this.root, word, 0);
    }

    _search(node, word, depth) {
        if (depth === word.length) {
            return node.isEndOfWord;
        }

        const char = word[depth];
        for (const [key, child] of node.children) {
            if (key[0] === char) {
                if (depth + key.length <= word.length &&
                    word.substring(depth, depth + key.length) === key) {
                    return this._search(child, word, depth + key.length);
                }
            }
        }
        return false;
    }

    startsWith(prefix) {
        if (!prefix) return true;
        return this._startsWith(this.root, prefix, 0);
    }

    _startsWith(node, prefix, depth) {
        if (depth === prefix.length) {
            return true;
        }

        const char = prefix[depth];
        for (const [key, child] of node.children) {
            if (key[0] === char) {
                const remainingPrefix = prefix.substring(depth);
                if (remainingPrefix.length <= key.length) {
                    return key.startsWith(remainingPrefix);
                } else if (key === remainingPrefix.substring(0, key.length)) {
                    return this._startsWith(child, prefix, depth + key.length);
                }
            }
        }
        return false;
    }
}

class CompressedTrieNode {
    constructor() {
        this.children = new Map();
        this.isEndOfWord = false;
    }
}

// Default implementation uses Map-based approach for flexibility
const Trie = TrieMap;

// Utility Functions

/**
 * Get all words in the trie with given prefix
 * @param {Trie} trie - Trie instance
 * @param {string} prefix - Prefix to search for
 * @returns {string[]} All words with the prefix
 */
function getAllWordsWithPrefix(trie, prefix) {
    const words = [];

    // Navigate to prefix node
    let node = trie.root;
    for (const char of prefix) {
        const next = node.children instanceof Map ?
                    node.children.get(char) :
                    node.children[char.charCodeAt(0) - 97];
        if (!next) return words;
        node = next;
    }

    // DFS to collect all words from this node
    function dfs(currentNode, currentWord) {
        if (currentNode.isEndOfWord) {
            words.push(prefix + currentWord);
        }

        if (currentNode.children instanceof Map) {
            for (const [char, child] of currentNode.children) {
                dfs(child, currentWord + char);
            }
        } else {
            for (let i = 0; i < 26; i++) {
                if (currentNode.children[i]) {
                    dfs(currentNode.children[i], currentWord + String.fromCharCode(97 + i));
                }
            }
        }
    }

    dfs(node, '');
    return words;
}

/**
 * Get all words in the trie
 * @param {Trie} trie - Trie instance
 * @returns {string[]} All words in the trie
 */
function getAllWords(trie) {
    return getAllWordsWithPrefix(trie, '');
}

/**
 * Delete a word from the trie
 * @param {Trie} trie - Trie instance
 * @param {string} word - Word to delete
 * @returns {boolean} True if word was deleted, false if word didn't exist
 */
function deleteWord(trie, word) {
    if (!trie.search(word)) return false;

    function deleteHelper(node, word, depth) {
        if (depth === word.length) {
            if (!node.isEndOfWord) return false;
            node.isEndOfWord = false;

            // If node has no children, it can be deleted
            if (node.children instanceof Map) {
                return node.children.size === 0;
            } else {
                return node.children.every(child => child === null);
            }
        }

        const char = word[depth];
        const child = node.children instanceof Map ?
                     node.children.get(char) :
                     node.children[char.charCodeAt(0) - 97];

        if (!child) return false;

        const shouldDeleteChild = deleteHelper(child, word, depth + 1);

        if (shouldDeleteChild) {
            if (node.children instanceof Map) {
                node.children.delete(char);
                return !node.isEndOfWord && node.children.size === 0;
            } else {
                node.children[char.charCodeAt(0) - 97] = null;
                return !node.isEndOfWord && node.children.every(child => child === null);
            }
        }

        return false;
    }

    deleteHelper(trie.root, word, 0);
    return true;
}

/**
 * Count words in the trie
 * @param {Trie} trie - Trie instance
 * @returns {number} Number of words in the trie
 */
function countWords(trie) {
    function countHelper(node) {
        let count = node.isEndOfWord ? 1 : 0;

        if (node.children instanceof Map) {
            for (const child of node.children.values()) {
                count += countHelper(child);
            }
        } else {
            for (const child of node.children) {
                if (child) count += countHelper(child);
            }
        }

        return count;
    }

    return countHelper(trie.root);
}

/**
 * Count nodes in the trie
 * @param {Trie} trie - Trie instance
 * @returns {number} Number of nodes in the trie
 */
function countNodes(trie) {
    function countHelper(node) {
        let count = 1; // Count current node

        if (node.children instanceof Map) {
            for (const child of node.children.values()) {
                count += countHelper(child);
            }
        } else {
            for (const child of node.children) {
                if (child) count += countHelper(child);
            }
        }

        return count;
    }

    return countHelper(trie.root);
}

/**
 * Find longest common prefix of all words in trie
 * @param {Trie} trie - Trie instance
 * @returns {string} Longest common prefix
 */
function longestCommonPrefix(trie) {
    let prefix = '';
    let node = trie.root;

    while (true) {
        let singleChild = null;
        let childCount = 0;

        if (node.children instanceof Map) {
            for (const [char, child] of node.children) {
                singleChild = { char, child };
                childCount++;
                if (childCount > 1) break;
            }
        } else {
            for (let i = 0; i < 26; i++) {
                if (node.children[i]) {
                    singleChild = { char: String.fromCharCode(97 + i), child: node.children[i] };
                    childCount++;
                    if (childCount > 1) break;
                }
            }
        }

        // If there's exactly one child and current node is not end of word
        if (childCount === 1 && !node.isEndOfWord) {
            prefix += singleChild.char;
            node = singleChild.child;
        } else {
            break;
        }
    }

    return prefix;
}

/**
 * Check if trie is empty
 * @param {Trie} trie - Trie instance
 * @returns {boolean} True if trie has no words
 */
function isEmpty(trie) {
    return countWords(trie) === 0;
}

/**
 * Visualize trie structure
 * @param {Trie} trie - Trie instance
 * @returns {string} String representation of trie structure
 */
function visualizeTrie(trie) {
    let result = 'Trie Structure:\n';
    result += '─'.repeat(20) + '\n';

    function visualizeHelper(node, prefix, isLast, depth) {
        const indent = '  '.repeat(depth);
        const marker = node.isEndOfWord ? ' ●' : '';
        result += `${indent}${prefix}${marker}\n`;

        const children = [];
        if (node.children instanceof Map) {
            for (const [char, child] of node.children) {
                children.push({ char, child });
            }
        } else {
            for (let i = 0; i < 26; i++) {
                if (node.children[i]) {
                    children.push({
                        char: String.fromCharCode(97 + i),
                        child: node.children[i]
                    });
                }
            }
        }

        children.forEach(({ char, child }, index) => {
            const isLastChild = index === children.length - 1;
            visualizeHelper(child, char, isLastChild, depth + 1);
        });
    }

    visualizeHelper(trie.root, 'root', true, 0);
    return result;
}

/**
 * Create trie from array of words
 * @param {string[]} words - Array of words
 * @param {Class} TrieClass - Trie class to use (default: TrieMap)
 * @returns {Trie} Populated trie
 */
function createTrieFromWords(words, TrieClass = TrieMap) {
    const trie = new TrieClass();
    words.forEach(word => trie.insert(word));
    return trie;
}

module.exports = {
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
};