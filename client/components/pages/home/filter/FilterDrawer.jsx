import React from "react";

import { Drawer } from "@mantine/core";

import Filter from "./Filter";

function FilterDrawer(props) {
  const { opened, setOpened } = props;
  return (
    <Drawer
      opened={opened}
      onClose={() => setOpened(false)}
      position="right"
      padding="xl"
      className="md:hidden"
      size="xl"
    >
      <Filter />
    </Drawer>
  );
}

export default FilterDrawer;
