import React from "react";
import {
  Container,
  Flex,
  Title,
  ActionIcon,
  Avatar,
  useMantineColorScheme,
  Box,
  Group,
  createStyles,
} from "@mantine/core";
import { IconHeart, IconShoppingCart } from "@tabler/icons";

import SearchInput from "../pages/home/SearchInput";
import Link from "next/link";

const useStyles = createStyles((theme) => ({
  border: {
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    // boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
    boxShadow: theme.colorScheme === "dark" ? '' : 'rgba(149, 157, 165, 0.1) 0px 8px 16px',
  },
  logo: {
    textDecoration: "none",
    color: `${
      theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[9]
    }`,
  },
}));

function Header({ setOpened }) {
  // const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  // const dark = colorScheme === "dark";
  const { classes } = useStyles();

  return (
    <Box py="xs" className={classes.border}>
      <Container size="lg">
        <div className="flex md:justify-between md:flex-row basic:flex-col basic:gap-2 md:gap-0 md:pt-0 basic:pt-4 md:items-center">
          <Flex justify="space-between" align="center">
            <Link href="/" className={classes.logo}>
              <Title className="min-w-max mr-8 inline cursor-pointer" order={1}>
                e-store
              </Title>
            </Link>
            <div className="inline md:hidden">{/* <DarkModeButton1 /> */}</div>
          </Flex>
          <SearchInput setOpened={setOpened} />
          <Group spacing='xl' className="md:flex basic:hidden items-center">
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
          </Group>
        </div>
      </Container>
    </Box>
  );
}

export default Header;
