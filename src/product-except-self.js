/**
 * @param {number[]} nums
 * @return {number[]}
 */
const productExceptSelf = (nums = [1, 2, 3, 4]) => {

    return nums.map((element, index, array) => {
        const leftSubArray = array.slice(0, index);
        const rightSubArray = array.slice(index + 1);

        return calculateArrayProduct(leftSubArray) * calculateArrayProduct(rightSubArray);
    });
};

/**
 * @param {number[]}nums
 */
const calculateArrayProduct = (nums) => {

    // Base cases
    if (nums.length === 0) {
        return 1;
    }

    if (nums.length === 1) {
        // E.g. [2] should return itself
        return nums[0];
    }

    // The main base case
    if (nums.length === 2) {
        return nums[0] * nums[1];
    }

    // Split the array based on index
    // then keep splitting the array and multiply recursively
    const midpoint = Math.round(nums.length / 2);
    const leftSide = nums.slice(0, midpoint);
    const rightSide = nums.slice(midpoint);

    return calculateArrayProduct(leftSide) * calculateArrayProduct(rightSide)

}

console.log(productExceptSelf());