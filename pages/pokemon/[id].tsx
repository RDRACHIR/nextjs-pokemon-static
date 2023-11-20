import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Grid } from "@nextui-org/react";

import Layout from "@/components/layouts/Layout";
import PokemonCardFull from "@/components/pokemon/PokemonCardFull";
import { Pokemon } from "@/interfaces";
import { getPokemonInfo } from "@/utils";

interface Props {
  pokemon: Pokemon;
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
  return (
    <Layout title={pokemon.name}>
      <Grid.Container css={{ marginTop: "5px" }} gap={2}>
        <PokemonCardFull pokemon={pokemon} />
      </Grid.Container>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  const pokemon151 = [...Array(151)].map((value, index) => `${index + 1}`);

  return {
    paths: pokemon151.map((id) => ({
      params: { id },
    })),
    // fallback: false,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };

  const pokemon = await getPokemonInfo(id);

  if (!pokemon) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      pokemon,
    },
    revalidate: 86400,
  };
};

export default PokemonPage;
