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

console.log(maxNumber([20, 3, 15, 2, 400, 1, 1]));
