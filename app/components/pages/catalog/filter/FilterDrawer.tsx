import React, {FC} from "react";
import { Drawer } from "@mantine/core";
import Filter from "./Filter";

export const FilterDrawer:FC<any> = (props) => {

  const { opened, setOpened } = props;
  return (
    <Drawer
      opened={opened}
      onClose={() => setOpened(false)}
      position="bottom"
      padding="xl"
      className="md:hidden"
      size="lg"
    >
      <Filter />
    </Drawer>
  );
}
