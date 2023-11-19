import Image from "next/image";

import { Spacer, Text, useTheme } from "@nextui-org/react";
import NextLink from "next/link";

export const Navbar = () => {
  const { theme } = useTheme();

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "start",
        padding: "0px 20px",
      }}
    >
      <Image
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png"
        alt="Icono de la app"
        width={70}
        height={70}
      />

      <NextLink href="/" style={{ display: "flex" }}>
        <Text color="white" h2>
          P
        </Text>
        <Text color="white" h3>
          okemon
        </Text>
      </NextLink>

      <Spacer css={{ flex: 1 }} />

      <NextLink href="/favorites" style={{ marginRight: "10px" }}>
        <Text color="white">Favoritos</Text>
      </NextLink>
    </div>
  );
};
