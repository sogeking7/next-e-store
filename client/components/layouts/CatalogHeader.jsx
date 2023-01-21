import React from "react";

import {
  Container,
  Header,
  Flex,
  ActionIcon,
  Avatar,
  Box,
  createStyles,
  Group,
} from "@mantine/core";

import Logo from "../ui/Logo";

import { DarkModeButton } from "../ui/DarkModeButton";
import { IconHeart, IconShoppingCart } from "@tabler/icons";

import Search from "./Search";

const useStyles = createStyles((theme) => ({
  border: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : '#FFF',
    borderBottom: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[4]
      }`
  },
  avatar: {
    border: `1px solid ${theme.colorScheme === "dark" ? "#FFF" : theme.colors.dark[5]
  }`
  }
}));

function CatalogHeader({ setOpened }) {
  const { classes } = useStyles();
  return (
    <Header height={60} className={classes.border} px="md">
      <Container size="lg" sx={{height:'100%'}}>
          <Flex className="flex  md:flex-row  h-full first-letter:basic:flex-col basic:gap-2 md:gap-0 md:pt-0 md:pb-0 pb-[6px] basic:pt-4 md:items-center">
          <Flex justify='space-between' className="lg:w-[23.2%] md:w-[28.5%] md:mr-4" align='center'><Logo /> <Box className="md:hidden block"><DarkModeButton /></Box></Flex>
          <Flex className="justify-between lg:w-[76%] md:w-[70%]">
            <Search setOpened={setOpened} />
            <Flex gap='xl' className="md:flex basic:hidden" align='center'>
              <ActionIcon
                // className="hover:text-[#ADB5BD]"
                size="md"
                color='dark'

                variant="transparent"

              >
                <IconHeart size={20} />
              </ActionIcon>
              <ActionIcon
                size="md"
                color='dark'
                // className=" hover:text-[#ADB5BD]"
                variant="transparent"
              >
                <IconShoppingCart size={20} />
              </ActionIcon>
              <Avatar className={classes.avatar} radius="xl" alt="no image here" size='sm' src="https://avatars.githubusercontent.com/u/111349192?v=4" />
              <DarkModeButton />
            </Flex>
          </Flex>
        </Flex>
      </Container>
    </Header>
  );
}

export default CatalogHeader;
