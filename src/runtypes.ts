import { Record, Number, String } from "runtypes";
import fetch from "node-fetch";

// Define one schema
const pokemonValidator = Record({
  id: Number,
  name: String,
  height: Number.withConstraint((n) => n > 0 || `${n} is not positive`),
  weight: Number.withConstraint((n) => n > 0 || `${n} is not positive`),
  sprites: Record({
    front_default: String,
  }),
  doesntExist: Number,
});

// TypeScript type
// type PokemonResponse = Static<typeof pokemonValidator>;

const fetchPokemon = async (id: string) => {
  const res = await (
    await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
  ).json();
  return pokemonValidator.check(res);
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
// ValidationError: Validation failed:
// {
//   "doesntExist": "Expected number, but was missing"
// }.
// Object should match { id: number; name: string; height: number; weight: number; sprites: { front_default: string; }; doesntExist: number; }
