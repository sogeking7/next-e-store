import React from "react";
import {
  Box,
  ActionIcon,
  createStyles,
  MediaQuery,
} from "@mantine/core";
import { IconHeart, IconShoppingCart, IconUser } from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  border: {
    borderTop: `1px solid ${theme.colors.gray[4]}`,
    backgroundColor: 'white',
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

export default function MobileNavBar() {
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

