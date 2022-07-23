createNode = (value, next) => {
    return {
        value: value,
        next: next
    }
};

const createLinkedListFromArray = (array) => {

    // Initialize the Linked List with the 1st item in the array

    const linkedList = createNode(array[0]);
    const tailOfTheArray = array.slice(1);
    tailOfTheArray.forEach(ele => {
        addElementToList(ele, linkedList)
    });

    return linkedList;

}

const addElementToList = (value, linkedList) => {
    // check if next is null, then add the element there
    if (!linkedList.next) {
        linkedList.next = createNode(value);
        return linkedList;
    }
    // else keep going through the list until we reach the end
    return addElementToList(value, linkedList.next);
};

console.log(createLinkedListFromArray([1,2,3]));
// console.log(createNode(1, undefined));

