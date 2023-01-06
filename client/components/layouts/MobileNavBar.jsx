import React from "react";
import {
  Box,
  ActionIcon,
  createStyles,
  useMantineColorScheme,
  Flex,
  MediaQuery,
} from "@mantine/core";
import { IconHeart, IconShoppingCart, IconUser } from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  border: {
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    backgroundColor: theme.colorScheme === "dark" ? "#1A1B1E" : "#fff",
    position: "fixed",
    zIndex: 50,
    bottom: 0,
    padding: "4px",
    display: "flex",
    overflow: "hidden",
    justifyContent: "space-between",
    width: "100%",
  },
}));

function MobileNavBar() {
  const { classes } = useStyles();

  return (
    <MediaQuery largerThan="sm" styles={{ display: "none" }}>
      <Box className={classes.border}>
        <ActionIcon color="dark" size="xl" className="" variant="transparent">
          <IconHeart />
        </ActionIcon>
        <ActionIcon color="dark" size="xl" className="" variant="transparent">
          <IconShoppingCart />
        </ActionIcon>
        <ActionIcon color="dark" size="xl" variant="transparent">
          <IconUser />
        </ActionIcon>
      </Box>
    </MediaQuery>
  );
}

export default MobileNavBar;
