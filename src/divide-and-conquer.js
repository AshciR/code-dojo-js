/**
 * Sums all the numbers in an array
 * @param {number[]}nums
 * @return {number}
 */
const sumTheArray = (nums) => {
    // Find the base case: if array is empty or 1 element
    if (nums.length === 0) {
        return 0;
    }

    if (nums.length === 1) {
        return nums[0];
    }

    // Divide the problem into smaller parts
    return nums[0] + sumTheArray(nums.slice(1));
}

/**
 * Find the max number in a list, 0 if it's empty
 * @param {number[]}nums
 * @return {number}
 */
const maxNumber = (nums) => {

    // Find the base case: if array is empty or 1 element
    if (nums.length === 0) {
        return 0;
    }

    if (nums.length === 1) {
        return nums[0];
    }

    // 2nd base case: we wanna compare 2 values
    // return the larger of the two
    if (nums.length === 2) {
        return (nums[0] > nums[1]) ? nums[0] : nums[1];
    }

    const maxNumberFromTheRestOfTheArray = maxNumber(nums.slice(1));
    return (nums[0] > maxNumberFromTheRestOfTheArray) ? nums[0] : maxNumberFromTheRestOfTheArray;
}

/**
 * Uses quick sort algorithm
 * @param {number[]}nums
 */
const quickSort = (nums) => {

    // Base case 1: if it's empty
    if (nums.length === 0) {
        return [];
    }

    // Base case 2: if it's 1 element
    if (nums.length === 1) {
        return [nums[0]];
    }

    // Base case 3: if it's 2 elements, swap them
    if (nums.length === 2) {
        return (nums[0] > nums[1]) ? [nums[0], nums[1]] : [nums[1], nums[0]];
    }

    // Otherwise, find a pivot, then place all the numbers less than it one 1 side
    // and the numbers greater than it on the other side.
    // Then call the divided problem

    const pivot = nums[Math.floor(nums.length / 2)]; // Using the middle element as the pivot

    const lessThanPivot = nums.filter(num => num < pivot);
    const greaterThanPivot = nums.filter(num => num > pivot);

    // Combined the arrays
    return [...quickSort(lessThanPivot), pivot, ...quickSort(greaterThanPivot)];

}

// console.log(quickSort([20, 3, 15, 2, 400, 1, 27]));
console.log(sumTheArray([1, 2, 3, 4]));
