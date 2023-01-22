import React from "react";
import { TextInput, ActionIcon, Box } from "@mantine/core";
import {
  IconAdjustmentsHorizontal,
  IconSearch,
} from "@tabler/icons";

export default function Search({ setOpened }) {
  return (
    <Box className="md:block flex items-center gap-2 md:w-[500px] w-full md:mr-8">
      <TextInput
        radius="lg"
        className="w-full overflow-hidden"
        icon={<IconSearch size={14} />}
        placeholder="Search in Store"
      ></TextInput>
      <ActionIcon
        radius="md"
        onClick={() => setOpened(true)}
        className="md:hidden text-white hover:text-[#ADB5BD]"
        variant="transparent"
        color="dark"
      >
        <IconAdjustmentsHorizontal />
      </ActionIcon>
    </Box>
  );
}

