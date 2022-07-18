/**
 * Sums all the numbers in an array
 * @param {number[]}nums
 * @return {number}
 */
const sumTheArray = (nums) => {
    // Find the base case: if array is empty or 1 element
    if(nums.length === 0){
        return 0;
    }

    if(nums.length === 1){
        return nums[0];
    }

    // Divide the problem into smaller parts
    return nums[0] + sumTheArray(nums.slice(1));
}

console.log(sumTheArray([1,2,3]));