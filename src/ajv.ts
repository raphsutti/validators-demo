import Ajv, { JSONSchemaType } from "ajv";
import fetch from "node-fetch";

const ajv = new Ajv({ allErrors: true, verbose: true });

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

const pokemonSchema: JSONSchemaType<PokemonResponse> = {
  type: "object",
  properties: {
    id: { type: "integer" },
    name: { type: "string" },
    weight: { type: "integer" },
    height: { type: "integer" },
    sprites: {
      type: "object",
      properties: {
        front_default: { type: "string" },
      },
      required: [],
    },
    doesntExist: { type: "integer" },
  },
  required: ["id", "doesntExist"],
  additionalProperties: true,
};

const fetchPokemon = async (id: string) => {
  const res = await (
    await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
  ).json();
  const validate = ajv.compile(pokemonSchema);
  if (validate(res)) return res;

  throw new Error(String(ajv.errors));
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
// Error: null
