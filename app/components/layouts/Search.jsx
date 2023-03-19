import React from "react";
import {TextInput, ActionIcon, Box, Flex} from "@mantine/core";
import {
  IconAdjustmentsHorizontal,
  IconSearch, IconShoppingCart,
} from "@tabler/icons";

export default function Search({ setOpened }) {
  return (
    <Flex className="justify-center md:flex items-center gap-2 md:w-[500px] w-full md:mr-8">
      <TextInput
        radius="xl"
        className="w-full overflow-hidden"
        icon={<IconSearch size={16} />}
        placeholder="Search in Store"
      ></TextInput>
      <ActionIcon
        size="md"
        color='dark'
        onClick={() => setOpened(true)}
        variant="transparent"
        className="md:hidden"
      >
        <IconAdjustmentsHorizontal />
      </ActionIcon>
    </Flex>
  );
}

