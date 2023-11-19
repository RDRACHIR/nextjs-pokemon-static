import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Grid } from "@nextui-org/react";

import { pokeApi } from "@/api";

import Layout from "@/components/layouts/Layout";
import PokemonCardFull from "@/components/pokemon/PokemonCardFull";
import { Pokemon, PokemonListResponse } from "@/interfaces";
import { getPokemonInfo } from "@/utils";

interface Props {
  pokemon: Pokemon;
}

const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {
  return (
    <Layout title={pokemon.name}>
      <Grid.Container css={{ marginTop: "5px" }} gap={2}>
        <PokemonCardFull pokemon={pokemon} />
      </Grid.Container>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>("/pokemon?limit=151");
  const pokemonNames: string[] = data.results.map((pokemon) => pokemon.name);

  return {
    paths: pokemonNames.map((name) => ({
      params: { name },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name } = params as { name: string };

  return {
    props: {
      pokemon: await getPokemonInfo(name),
    },
  };
};

export default PokemonByNamePage;
