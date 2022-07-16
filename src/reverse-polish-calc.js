const reversePolishCalc = (expr) => {

    // Steps:
    // We need to check each element then determine if it's a number or an operand
    // If it's a number, add it to a stack
    // else, it's an operator
    // get the last 2 values from the stack and apply the operator
    // Then put the result back on the stack.
    // return last value

    // Holds the intermediary values
    let stack = [];

    for (const element of expr) {
        if(isElementANumber(element)){
            stack.push(element);
        } else { // Assuming to be an operator
            const operand2 = parseInt(stack.pop());
            // The 2nd value from the stack is the 1st operand
            // Matters for subtraction and division
            // B/c (13 - 5) != (5 - 13)
            const operand1 = parseInt(stack.pop());
            const result = evaluateExpression(operand1, operand2, element);
            stack.push(result.toString());
        }
    }

    return stack.pop();

}

const isElementANumber = element => !isNaN(element);

/**
 * Will either add, subtract, multiply, or divide 2 numbers.
 * @param value1 assumed to be a number
 * @param value2 assumed to be a number
 * @param operand +, -, *, or /
 * @returns the numeric value
 */
const evaluateExpression = (value1, value2, operand) => {

    if(operand === '+'){
        return value1 + value2;
    }

    if(operand === '-'){
        return value1 - value2;
    }

    if(operand === '*'){
        return value1 * value2;
    }

    if(operand === '/'){
        return Math.round(value1 / value2);
    }

    throw new Error(`${operand} is not a valid operand`)
};

const input = ["2", "1", "+", "3", "*"];
const input2 = ["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"];

const inputs = [input, input2];
inputs.forEach(input => console.log(reversePolishCalc(input)));

