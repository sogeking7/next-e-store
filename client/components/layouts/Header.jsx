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

import { IconHeart, IconShoppingCart } from "@tabler/icons";

import Search from "./Search";


const useStyles = createStyles((theme) => ({
  border: {
    backgroundColor: 'white',
    boxShadow: theme.colorScheme === "dark" ? '' : 'rgba(149, 157, 165, 0.1) 0px 8px 16px',
  },
}));

function Header({ setOpened }) {
  const { classes } = useStyles();
  return (
    <Box py="xs" className={classes.border}>
      <Container size="lg">
        <Flex className="flex md:justify-between md:flex-row basic:flex-col basic:gap-2 md:gap-0 md:pt-0 basic:pt-4 md:items-center">
          <Logo />
          <Search setOpened={setOpened} />
          <Flex gap='xl' className="md:flex basic:hidden" align='center'>
            <ActionIcon
              color="dark"
              size="sm"
              variant="transparent"
            >
              <IconHeart />
            </ActionIcon>
            <ActionIcon
              color="dark"
              size="sm"
              variant="transparent"
            >
              <IconShoppingCart />
            </ActionIcon>
            <Avatar radius="sm" alt="no image here" />
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}

export default Header;
