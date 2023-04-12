import React from "react";
import {ActionIcon, Flex, Header, Text,} from "@mantine/core";
import Logo from "../ui/Logo";
import {IconHeart, IconShoppingCart} from "@tabler/icons";
import Search from "./Search";
import AuthBtn from "../pages/auth/buttons/AuthBtn";
import {DarkModeButton} from "../ui/DarkModeButton";
import Link from "next/link";

function CatalogHeader({setOpened, isFilterOn}) {
  return (
    <Header className="py-2 hidden md:block"  height={64}>
      <div className="max-w-5xl mx-auto">
        <Flex className="justify-between items-center flex-row md:gap-0 gap-4 px-4">
          <Logo/>
          <div className="md:hidden">
            <DarkModeButton/>
          </div>
          <Search setOpened={setOpened} isFilterOn={isFilterOn}/>
          <Flex className="gap-6 items-center hidden md:flex">
            <AuthBtn/>
            <Link href="/user/wishlist">
              <Flex align="center" className="cursor-pointer flex-col w-[50px]">
                <ActionIcon
                  size="md"
                  color='dark'
                  variant="transparent"
                >
                  <IconHeart />
                </ActionIcon>
                <Text size={12}>Wishlist</Text>
              </Flex>
            </Link>
            <Link href="/user/cart">
              <Flex align="center" className="cursor-pointer flex-col w-[50px]">
                <ActionIcon
                  size="md"
                  color='dark'
                  variant="transparent"
                >
                  <IconShoppingCart />
                </ActionIcon>
                <Text size={12}>Cart</Text>
              </Flex>
            </Link>
          </Flex>
        </Flex>
      </div>
    </Header>
  )
}

export default CatalogHeader;
