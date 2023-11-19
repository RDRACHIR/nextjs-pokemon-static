import { useEffect, useState } from "react";

import Layout from "@/components/layouts/Layout";
import NoFavorites from "@/components/ui/NoFavorites";
import { localFavorites } from "@/utils";
import FavaritePokemon from "@/components/pokemon/FavaritePokemon";

const FavoritesPage = () => {
  const [favoritePokemons, setFavoritePokemons] = useState<number[]>([]);

  useEffect(() => {
    setFavoritePokemons(localFavorites.pokemons());
  }, []);

  return (
    <Layout title="Favoritos">
      {favoritePokemons.length === 0 ? (
        <NoFavorites />
      ) : (
        <FavaritePokemon pokemons={favoritePokemons} />
      )}
    </Layout>
  );
};

export default FavoritesPage;
