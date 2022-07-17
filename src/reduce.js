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
        if(acc[item.type]){
            acc[item.type] = [...acc[item.type], item]
        } else {
            acc[item.type] = [item]
        }
        return acc;
    },{})

}

// const result = getNameMapFromArray(pokemon);
const result = groupPokemonByType(pokemon);
console.log(result);