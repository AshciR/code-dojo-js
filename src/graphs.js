const friendsGraph = {
    me: ['alice', 'bob', 'claire'],
    alice: ['peggy'],
    bob: ['anuj', 'peggy'],
    claire: ['jonny', 'thom'],
    peggy: [],
    anuj: [],
    jonny: [],
    thom: [],
}

/**
 * Adds element to the queue
 * @param queue
 * @param elements
 * @return
 */
const enqueue = (queue, ...elements) => {
    queue.push(...elements);
    return queue;
}

/**
 * Removes the first element from the queue.
 * First in; First Out
 * @param {any[]}queue
 * @return {any}
 */
const dequeue = (queue) => {

    // Since it's a queue,
    // the 1st element should be one oldest element
    return queue.shift();
}


const doesPersonInGraphMatchCriteria = (graph, startingNode) => {

    let searchQueue = graph[startingNode];
    let peopleAlreadyChecked = [];

    while (searchQueue) {

        const personToCheck = dequeue(searchQueue);

        // Means the search queue is empty, and the person wasn't found
        if (!personToCheck) {
            return false;
        }

        // if this person has not been checked yet
        if (!peopleAlreadyChecked.includes(personToCheck)) {

            if (isFruitSeller(personToCheck)) {
                return true;
            }

            // Add their friends to the search queue
            enqueue(searchQueue, ...graph[personToCheck]);
            // Make sure to add the person you already checked
            peopleAlreadyChecked.push(personToCheck);

        }

    }

}

const isFruitSeller = (personToCheck) => {
    return personToCheck ? personToCheck.slice(-1) === 'm' : false;
}

// const queue = [1,2,3,4,5];
// console.log(queue);
// console.log(enqueue(queue,6,7,8));
// console.log(dequeue(queue));
// console.log(queue);

console.log(doesPersonInGraphMatchCriteria(friendsGraph, 'me'));