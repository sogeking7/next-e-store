import React from "react";

import {
  Container,
  Flex,
  ActionIcon,
  Avatar,
  Box,
  createStyles,
} from "@mantine/core";

import Logo from "../ui/Logo";

import { DarkModeButton } from "../ui/DarkModeButton";
import { IconHeart, IconShoppingCart } from "@tabler/icons";

import Search from "./Search";

const useStyles = createStyles((theme) => ({
  border: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : '#fff',
    borderBottom: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
      }`,
    boxShadow: theme.colorScheme === "dark" ? '' : 'rgba(149, 157, 165, 0.1) 0px 8px 16px',
  },
}));

function Header({ setOpened }) {
  const { classes } = useStyles();
  return (
    <Box py="xs" className={classes.border}>
      <Container size="md">
        <Flex className="flex md:justify-between md:flex-row basic:flex-col basic:gap-2 md:gap-0 md:pt-0 basic:pt-4 md:items-center">
          <Flex justify='space-between' align='center'><Logo /> <Box className="md:hidden block"><DarkModeButton /></Box></Flex>
          <Search setOpened={setOpened} />
          <Flex gap='xl' className="md:flex basic:hidden" align='center'>
            <ActionIcon
              color="dark"
              size="sm"
              variant="transparent"
            >
              <IconHeart size={18} />
            </ActionIcon>
            <ActionIcon
              color="dark"
              size="sm"
              variant="transparent"
            >
              <IconShoppingCart size={18} />
            </ActionIcon>
            <Avatar radius="xl" alt="no image here" size='sm' src="https://avatars.githubusercontent.com/u/111349192?v=4" />
            <DarkModeButton />
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}

export default Header;
