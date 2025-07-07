/**
 * LRU Cache Implementation
 *
 * LeetCode #146 - Design and implement a data structure for Least Recently Used (LRU) cache.
 *
 * Requirements:
 * - get(key): Get the value of the key if the key exists in the cache, otherwise return -1
 * - put(key, value): Update the value of the key if the key exists. Otherwise, add the key-value pair
 * - Both operations should be done in O(1) time complexity
 * - When the cache reaches its capacity, it should invalidate the least recently used item
 *
 * Company Tags: Google, Amazon, Microsoft, Facebook, Apple, Bloomberg, Adobe, Uber, Twitter
 * Difficulty: Medium
 * Pattern: Hash Map + Doubly Linked List
 */

/**
 * Approach 1: Hash Map + Doubly Linked List (Most Common Interview Solution)
 *
 * Time Complexity: O(1) for both get and put operations
 * Space Complexity: O(capacity)
 *
 * Key Insights:
 * - Hash map provides O(1) access to cache entries
 * - Doubly linked list maintains insertion order and allows O(1) removal
 * - Most recent items are kept at the head, least recent at the tail
 *
 * @param {number} capacity - Maximum number of items the cache can hold
 */
class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map();

        // Create dummy head and tail nodes to simplify edge cases
        this.head = new Node(0, 0);
        this.tail = new Node(0, 0);
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    /**
     * Get value by key
     * @param {number} key
     * @return {number}
     */
    get(key) {
        if (this.cache.has(key)) {
            const node = this.cache.get(key);
            // Move to head (mark as recently used)
            this.moveToHead(node);
            return node.value;
        }
        return -1;
    }

    /**
     * Put key-value pair
     * @param {number} key
     * @param {number} value
     * @return {void}
     */
    put(key, value) {
        if (this.cache.has(key)) {
            // Update existing key
            const node = this.cache.get(key);
            node.value = value;
            this.moveToHead(node);
        } else {
            // Add new key
            const newNode = new Node(key, value);

            if (this.cache.size >= this.capacity) {
                // Remove least recently used item
                const tail = this.removeTail();
                this.cache.delete(tail.key);
            }

            this.cache.set(key, newNode);
            this.addToHead(newNode);
        }
    }

    /**
     * Add node right after head
     * @param {Node} node
     */
    addToHead(node) {
        node.prev = this.head;
        node.next = this.head.next;
        this.head.next.prev = node;
        this.head.next = node;
    }

    /**
     * Remove node from linked list
     * @param {Node} node
     */
    removeNode(node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    /**
     * Move node to head (mark as recently used)
     * @param {Node} node
     */
    moveToHead(node) {
        this.removeNode(node);
        this.addToHead(node);
    }

    /**
     * Remove tail node (least recently used)
     * @return {Node}
     */
    removeTail() {
        const last = this.tail.prev;
        this.removeNode(last);
        return last;
    }

    /**
     * Get current size of cache
     * @return {number}
     */
    size() {
        return this.cache.size;
    }

    /**
     * Check if cache is empty
     * @return {boolean}
     */
    isEmpty() {
        return this.cache.size === 0;
    }

    /**
     * Check if cache is full
     * @return {boolean}
     */
    isFull() {
        return this.cache.size >= this.capacity;
    }

    /**
     * Clear all entries from cache
     */
    clear() {
        this.cache.clear();
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    /**
     * Get all keys in order (most recent first)
     * @return {number[]}
     */
    getKeys() {
        const keys = [];
        let current = this.head.next;
        while (current !== this.tail) {
            keys.push(current.key);
            current = current.next;
        }
        return keys;
    }

    /**
     * Get all values in order (most recent first)
     * @return {number[]}
     */
    getValues() {
        const values = [];
        let current = this.head.next;
        while (current !== this.tail) {
            values.push(current.value);
            current = current.next;
        }
        return values;
    }

    /**
     * Get cache state as array of [key, value] pairs
     * @return {number[][]}
     */
    toArray() {
        const result = [];
        let current = this.head.next;
        while (current !== this.tail) {
            result.push([current.key, current.value]);
            current = current.next;
        }
        return result;
    }
}

/**
 * Node class for doubly linked list
 */
class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}

/**
 * Approach 2: Using JavaScript Map (Leverages insertion order)
 *
 * Time Complexity: O(1) for both get and put operations
 * Space Complexity: O(capacity)
 *
 * Note: This approach leverages the fact that JavaScript Maps maintain insertion order
 * In interviews, clarify if you can use this built-in feature
 */
class LRUCacheMap {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map();
    }

    get(key) {
        if (this.cache.has(key)) {
            const value = this.cache.get(key);
            // Remove and re-add to move to end (most recent)
            this.cache.delete(key);
            this.cache.set(key, value);
            return value;
        }
        return -1;
    }

    put(key, value) {
        if (this.cache.has(key)) {
            // Update existing key
            this.cache.delete(key);
        } else if (this.cache.size >= this.capacity) {
            // Remove least recently used (first item)
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }

        this.cache.set(key, value);
    }

    size() {
        return this.cache.size;
    }

    clear() {
        this.cache.clear();
    }

        getKeys() {
        return Array.from(this.cache.keys()).reverse();
    }

    getValues() {
        return Array.from(this.cache.values()).reverse();
    }

    toArray() {
        return Array.from(this.cache.entries()).reverse();
    }
}

/**
 * Approach 3: Array-based LRU (Less efficient but educational)
 *
 * Time Complexity: O(n) for both get and put operations
 * Space Complexity: O(capacity)
 *
 * This approach is less efficient but helps understand the core LRU concept
 */
class LRUCacheArray {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = []; // Array of {key, value} objects
    }

    get(key) {
        const index = this.cache.findIndex(item => item.key === key);
        if (index !== -1) {
            const item = this.cache.splice(index, 1)[0];
            this.cache.push(item); // Move to end (most recent)
            return item.value;
        }
        return -1;
    }

    put(key, value) {
        const index = this.cache.findIndex(item => item.key === key);

        if (index !== -1) {
            // Update existing key
            this.cache.splice(index, 1);
        } else if (this.cache.length >= this.capacity) {
            // Remove least recently used (first item)
            this.cache.shift();
        }

        this.cache.push({ key, value });
    }

    size() {
        return this.cache.length;
    }

    clear() {
        this.cache = [];
    }

        getKeys() {
        return this.cache.map(item => item.key).reverse();
    }

    getValues() {
        return this.cache.map(item => item.value).reverse();
    }

    toArray() {
        return this.cache.map(item => [item.key, item.value]).reverse();
    }
}

/**
 * Utility Functions for Analysis and Debugging
 */

/**
 * Simulate cache operations with detailed logging
 * @param {LRUCache} cache
 * @param {string[]} operations
 * @param {number[][]} params
 * @return {(number|null)[]}
 */
function simulateOperations(cache, operations, params) {
    const results = [];
    const log = [];

    for (let i = 0; i < operations.length; i++) {
        const operation = operations[i];
        const param = params[i];

        let result = null;

        if (operation === 'get') {
            result = cache.get(param[0]);
            log.push(`get(${param[0]}) = ${result}, cache: [${cache.getKeys().join(', ')}]`);
        } else if (operation === 'put') {
            cache.put(param[0], param[1]);
            log.push(`put(${param[0]}, ${param[1]}), cache: [${cache.getKeys().join(', ')}]`);
        }

        results.push(result);
    }

    return { results, log };
}

/**
 * Compare performance of different LRU implementations
 * @param {number} capacity
 * @param {number} operations
 * @return {object}
 */
function compareLRUPerformance(capacity, operations) {
    const implementations = [
        { name: 'HashMap + Doubly Linked List', class: LRUCache },
        { name: 'JavaScript Map', class: LRUCacheMap },
        { name: 'Array-based', class: LRUCacheArray }
    ];

    const results = {};

    for (const impl of implementations) {
        const cache = new impl.class(capacity);
        const startTime = performance.now();

        // Perform random operations
        for (let i = 0; i < operations; i++) {
            if (Math.random() < 0.7) {
                // 70% put operations
                cache.put(Math.floor(Math.random() * operations), Math.floor(Math.random() * 1000));
            } else {
                // 30% get operations
                cache.get(Math.floor(Math.random() * operations));
            }
        }

        const endTime = performance.now();
        results[impl.name] = {
            time: endTime - startTime,
            finalSize: cache.size()
        };
    }

    return results;
}

/**
 * Analyze cache hit/miss patterns
 * @param {LRUCache} cache
 * @param {number[]} accessPattern
 * @return {object}
 */
function analyzeCacheHitRatio(cache, accessPattern) {
    let hits = 0;
    let misses = 0;
    const hitPattern = [];

    for (const key of accessPattern) {
        const value = cache.get(key);
        if (value !== -1) {
            hits++;
            hitPattern.push(1);
        } else {
            misses++;
            hitPattern.push(0);
            // Simulate putting a value for missed keys
            cache.put(key, key * 10);
        }
    }

    return {
        hits,
        misses,
        hitRatio: hits / (hits + misses),
        hitPattern
    };
}

/**
 * Visualize cache state changes
 * @param {LRUCache} cache
 * @param {string[]} operations
 * @param {number[][]} params
 * @return {string}
 */
function visualizeCacheOperations(cache, operations, params) {
    let visualization = 'LRU Cache Operation Visualization\n';
    visualization += '=====================================\n\n';

    for (let i = 0; i < operations.length; i++) {
        const operation = operations[i];
        const param = params[i];

        if (operation === 'get') {
            const result = cache.get(param[0]);
            visualization += `Step ${i + 1}: get(${param[0]}) → ${result}\n`;
        } else if (operation === 'put') {
            cache.put(param[0], param[1]);
            visualization += `Step ${i + 1}: put(${param[0]}, ${param[1]})\n`;
        }

        visualization += `Cache state: [${cache.getKeys().join(' → ')}]\n`;
        visualization += `Size: ${cache.size()}/${cache.capacity}\n\n`;
    }

    return visualization;
}

/**
 * Generate test cases for LRU Cache
 * @param {number} capacity
 * @param {number} numOperations
 * @return {object}
 */
function generateLRUTestCases(capacity, numOperations) {
    const operations = [];
    const params = [];
    const keyRange = capacity * 2; // Create more keys than capacity to test eviction

    for (let i = 0; i < numOperations; i++) {
        if (Math.random() < 0.6) {
            // 60% put operations
            operations.push('put');
            params.push([
                Math.floor(Math.random() * keyRange),
                Math.floor(Math.random() * 1000)
            ]);
        } else {
            // 40% get operations
            operations.push('get');
            params.push([Math.floor(Math.random() * keyRange)]);
        }
    }

    return { operations, params };
}

module.exports = {
    LRUCache,
    LRUCacheMap,
    LRUCacheArray,
    Node,
    simulateOperations,
    compareLRUPerformance,
    analyzeCacheHitRatio,
    visualizeCacheOperations,
    generateLRUTestCases
};