/**
 * @param {string} s
 * @return {boolean}
 */
const isValidParenthesis = (s) => {

    const matchingParenthesis = {
        ')': '(',
        ']': '[',
        '}': '{',
    };

    // Use a stack to track the parenthesis
    let stack = [];

    for (const char of s) {

        // check if a closing parenthesis,
        if (matchingParenthesis[char]) {

            // then last 1 on the stack must matches it
            const isMatchingParenthesis = stack[stack.length - 1] === matchingParenthesis[char];

            if (stack.length !== 0 && isMatchingParenthesis) {
                stack.pop();
            } else {
                return false;
            }
        } else { // it's an opening parenthesis
            // add it to the stack
            stack.push(char);
        }
    }

    return stack.length === 0;

}

const testCases = [
    "()[]{}",
    "([]{}",
    "{([])}",
];

testCases.forEach(test => console.log(isValidParenthesis(test)));



