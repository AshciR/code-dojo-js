const pokemon = [
    {name: "charmander", type: "fire"},
    {name: "squirtle", type: "water"},
    {name: "bulbasaur", type: "grass"},
    {name: "vulpix", type: "fire"},
    {name: "staru", type: "water"},
]

const getNameMapFromArray = data =>
    data.reduce((acc, item) => {
        console.log({acc: acc, item: item})
        acc[item.name] = {type: item.type};
        return acc;
    }, {})

/**
 * Groups the pokemon based on their type
 * @param pokemon list of pokemon
 */
const groupPokemonByType = pokemon => {

    return pokemon.reduce((acc, item) => {

        // Check if the key exists,
        // if it exists add to the list,
        // else then create an empty list
        acc[item.type] = acc[item.type] ? [...acc[item.type], item] : [item];
        return acc;
    },{})

}

const flattenArray = data => {
    // our initial value this time is a blank array
    const initialValue = [];

    // call reduce on our data
    return data.reduce((total, value) => {
        // if the value is an array then recursively call reduce
        // if the value is not an array then just concat our value
        return total.concat(Array.isArray(value) ? flattenArray(value) : value);
    }, initialValue);
};

// const result = getNameMapFromArray(pokemon);
const result = groupPokemonByType(pokemon);
// const numArray = [1, 2, [3, 10, [11, 12]], [1, 2, [3, 4]], 5, 6];
// const result = flattenArray(numArray);

console.log(result);