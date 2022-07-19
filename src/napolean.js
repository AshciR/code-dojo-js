/**
 *
 * @param {number}players
 * @param {number[]}ages
 * @param {number}time in minutes
 * @return {number[]} the game config
 */
function secret_napoleon(players, ages, time) {

    if(!validatePlayersAndAges(players, ages)){
        return [-1]
    }

    // Guard clause
    if(!isAllowedNumberOfPlayers(players)){
        return [-1];
    }

    // Calculate the number of Bonas
    const numberOfBonapartists = calculateBonapartists(players);

    // Calculate the number of Royalists
    const remainingPlayersAfterBonapartists = players - numberOfBonapartists;
    const numberOfRoyalists = calculateRoyalists(remainingPlayersAfterBonapartists);

    // Calculate the number of Col
    const numberOfCoalistionists = calculateCoalistionists(players, numberOfBonapartists, numberOfRoyalists);

    const napoleanArrivalTime = determineWhenNapoleanArrives(ages, numberOfBonapartists, numberOfRoyalists, numberOfCoalistionists, players, time)

    return [numberOfBonapartists, numberOfRoyalists, numberOfCoalistionists, napoleanArrivalTime];
}

const validatePlayersAndAges = (players, ages) => {
    return players === ages.length && ages.every(age => age > 0);
}

const isAllowedNumberOfPlayers = (players) => {
    return players > 3 && players < 28;
}

const calculateBonapartists = (players) => {
    return Math.floor(players / 2);
}

const calculateRoyalists = (remainingPlayersAfterBonapartists) => {
    return Math.ceil(remainingPlayersAfterBonapartists / 3);
}

const calculateCoalistionists = (players, numberOfBonapartists, numberOfRoyalists) => {
    return players - (numberOfBonapartists + numberOfRoyalists);
}

const determineWhenNapoleanArrives = (ages, numberOfBonapartists, numberOfRoyalists, numberOfCoalistionists, players, time) => {

    const areAllPlayersAreChildren = ages.every(age => age < 18);

    // Check if there are no adults
    if (areAllPlayersAreChildren) {
        return 0;
    }

    // Players are not a factor when time is less than 2 hours
    const twoHoursInMinutes = 2 * 60;
    if (time < twoHoursInMinutes) {
        return 3;
    }

    // Calculate the time according to the business rules
    let arrivalTime = (numberOfRoyalists - numberOfBonapartists) <= 3 ? 4 : 5;

    // TODO: If time allows refactor into another method
    // Check if col is evenly divisible by royalists
    if (numberOfCoalistionists % numberOfRoyalists === 0) {
        arrivalTime = arrivalTime - 1;
    }

    // Check if there's an odd number of players
    if (players % 2 === 1) {
        arrivalTime = arrivalTime + 1
    }

    return arrivalTime;
}

// console.log(calculateRoyalists(10));
// console.log(isAllowedNumberOfPlayers(28));
console.log(secret_napoleon(5, [17,17,17,17,18], 120));
