import { z } from "zod";
import "skuba-dive/register";
import fetch from "node-fetch";

// Define one schema
const pokemonValidator = z.object({
  id: z.number(),
  name: z.string(),
  height: z.number().min(0),
  weight: z.number().min(0),
  sprites: z.object({
    front_default: z.string().url(),
  }),
  doesntExist: z.number(),
});

// TypeScript type
// type PokemonResponse = z.infer<typeof pokemonValidator>

const fetchPokemon = async (id: string) => {
  const res = await (
    await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
  ).json();

  // const validationResult = pokemonValidator.safeParse(res);
  // if (validationResult.success) {
  //   return validationResult.data;
  // }
  // throw new Error(String(validationResult.error));

  return pokemonValidator.parse(res);
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
// ZodError: [
//   {
//     "code": "invalid_type",
//     "expected": "number",
//     "received": "undefined",
//     "path": [
//       "doesntExist"
//     ],
//     "message": "Required"
//   }
// ]
