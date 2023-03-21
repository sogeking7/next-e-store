import React from "react";

import {
  Container,
  Header,
  Flex,
  ActionIcon,
  Box,
  createStyles,
  Text,
} from "@mantine/core";

import Logo from "../ui/Logo";

import { DarkModeButton } from "../ui/DarkModeButton";
import {IconHeart, IconMenu2, IconShoppingCart} from "@tabler/icons";

import Search from "./Search";
import AuthBtn from "../pages/auth/AuthBtn";
import {useRouter} from "next/router";

const useStyles = createStyles((theme) => ({
  border: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : '#FFF',
    borderBottom: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[4]}`
  },
}));

function CatalogHeader({ setOpened }) {
  const { classes } = useStyles();
  const router = useRouter();
  return (
    <Header className={classes.border}>
      <Container size="lg" className="my-2" sx={{height:'100%'}}>
          <Flex className="flex md:flex-row flex-col  h-full first-letter:basic:flex-col basic:gap-2 md:gap-0 md:pt-0 md:pb-0 pb-[6px] basic:pt-4 md:items-center">
            <Flex justify='space-between' className="lg:w-[23.2%] md:w-[28.5%] md:mr-4" align='center'>
              <Logo />
            </Flex>
            <Flex className="justify-between lg:w-[76%] md:w-[70%] w-full">
              <Search setOpened={setOpened} />
              <Flex className="gap-6 md:flex basic:hidden" align='center'>
                <AuthBtn />
                <Flex align="center" className="flex-col w-[50px]">
                  <ActionIcon
                    size="md"
                    color='dark'
                    variant="transparent"
                  >
                    <IconShoppingCart size={20} />
                  </ActionIcon>
                  <Text size={12} weight={600}>Cart</Text>
                </Flex>
                <Flex align="center" className="flex-col w-[50px]">
                  <ActionIcon
                    size="md"
                    color='dark'
                    variant="transparent"
                    onClick={()=>{
                      router.push('/user/wishlist')
                    }}
                  >
                    <IconHeart size={20} />
                  </ActionIcon>
                  <Text size={12} weight={600}>Wishlist</Text>
                </Flex>
              </Flex>
          </Flex>
        </Flex>
      </Container>
    </Header>
  );
}

export default CatalogHeader;
