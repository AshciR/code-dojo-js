/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const twoSum = function (nums, target) {

    // Get the value of the current index
    // The check the value of the subsequent indices
    // if the value adds up to the target, that the match

    for (let i = 0; i < nums.length; i++) {

        for (let j = i + 1; j < nums.length; j++) {

            let potentialTarget = nums[i] + nums[j];

            if (potentialTarget === target) {
                return [i, j]
            }

        }

    }

};

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const twoSumMapImpl = (nums, target) => {

    let map = {};
    for (let i = 0; i < nums.length; i++) {
        if (target - nums[i] in map) {
            return [map[target-nums[i]], i];
        } else {
            map[nums[i]] = i;
        }
    }

}

// console.log(twoSum([3, 2, 4], 6));
console.log(twoSumMapImpl([3, 2, 4], 6));