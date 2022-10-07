import "skuba-dive/register";
import fetch from "node-fetch";

interface PokemonResponse {
  id: number;
  name: string;
  weight: number;
  height: number;
  sprites: {
    front_default: string;
  };
  doesntExist: number;
}

const fetchPokemon = async (id: string) => {
  return (await (
    await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
  ).json()) as PokemonResponse;
};

const run = async (pokemonId: string) => {
  const {
    id,
    name,
    weight,
    height,
    sprites: { front_default },
    doesntExist,
  } = await fetchPokemon(pokemonId);
  console.log("id: ", id);
  console.log("name: ", name);
  console.log("weight: ", weight);
  console.log("height: ", height);
  console.log("front_default: ", front_default);
  console.log("doesntExist: ", doesntExist);
};

run("2");
// id:  2
// name:  ivysaur
// weight:  130
// height:  10
// front_default:  https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png
// doesntExist:  undefined
