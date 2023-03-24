import React from "react";
import {
  Header,
  Flex,
  ActionIcon,
  Text,
} from "@mantine/core";
import Logo from "../ui/Logo";
import {IconHeart, IconShoppingCart} from "@tabler/icons";
import Search from "./Search";
import AuthBtn from "../pages/auth/AuthBtn";
import {useRouter} from "next/router";

function CatalogHeader({setOpened, isFilterOn}) {
  const router = useRouter();

  return (
    <Header px="md" className="md:py-1 py-2 max-w-5xl mx-auto">
      <Flex className="justify-between md:flex-row flex-col md:gap-0 gap-4">
        <Logo/>
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
