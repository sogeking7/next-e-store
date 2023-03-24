import React from "react";
import {
  Header,
  Flex,
  ActionIcon,
  Text, Box,
} from "@mantine/core";
import Logo from "../ui/Logo";
import {IconHeart, IconShoppingCart} from "@tabler/icons";
import Search from "./Search";
import AuthBtn from "../pages/auth/AuthBtn";
import {useRouter} from "next/router";
import {DarkModeButton} from "../ui/DarkModeButton";

function CatalogHeader({setOpened, isFilterOn}) {
  const router = useRouter();

  return (
    <Header px="md" className="py-2 max-w-5xl mx-auto">
      <Flex className="justify-between items-center flex-row md:gap-0 gap-4">
        <Logo/>
        <Box className="md:hidden">
          <DarkModeButton/>
        </Box>
        <Search setOpened={setOpened} isFilterOn={isFilterOn}/>
        <Flex className="gap-4 items-center hidden md:flex">
          <AuthBtn/>
          <Flex align="center" className="cursor-pointer flex-col w-[50px]">
            <ActionIcon
              size="md"
              color='dark'
              variant="transparent"
              onClick={() => {
                router.push('/user/cart')
              }}
            >
              <IconShoppingCart size={20}/>
            </ActionIcon>
            <Text size={12} weight={600}>Cart</Text>
          </Flex>
          <Flex align="center" className="cursor-pointer flex-col w-[50px]">
            <ActionIcon
              size="md"
              color='dark'
              variant="transparent"
              onClick={() => {
                router.push('/user/wishlist')
              }}
            >
              <IconHeart size={20}/>
            </ActionIcon>
            <Text size={12} weight={600}>Wishlist</Text>
          </Flex>
        </Flex>
      </Flex>
    </Header>
  );
}

export default CatalogHeader;
