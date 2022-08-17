/**
 * Implementation of a queue which is a
 * First In, First Out data structure
 */
class Queue {

    // The queue is initialized as empty
    constructor() {
        this.array = [];
    }

    /**
     * Get the contents of the queue
     * @return {[]}
     */
    get items() {
        return this.array;
    }

    /**
     * Add an element to the queue
     * @param item the item to add to the queue
     * @return {number} the current size of the queue
     */
    enqueue(item) {
        this.array.unshift(item);
        return this.array.length;
    }

    /**
     * Removes the earliest item added to the queue
     * @return {*|*[]} the oldest element in the queue
     */
    dequeue() {
        return (this.array.length) ? this.array.pop() : [];
    }
}

const queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);

console.log(queue.items);

console.log(queue.dequeue());
console.log(queue.dequeue());

console.log(queue.items);

console.log(queue.dequeue());


