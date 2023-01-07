import React from "react";
import { TextInput, ActionIcon, Box } from "@mantine/core";
import {
  IconAdjustmentsHorizontal,
  IconSearch,
} from "@tabler/icons";

export default function Search({ setOpened }) {
  return (
    <Box className="md:block flex items-center gap-2 md:w-[800px] md:mr-8">
      <TextInput
        className="w-full overflow-hidden"
        rightSection={<ActionIcon color="blue" variant="filled"><IconSearch color="white" size={20} /></ActionIcon>}
        placeholder="Search in Store"
      ></TextInput>
      <ActionIcon
        onClick={() => setOpened(true)}
        className="md:hidden"
        variant="transparent"
        color="dark"
      >
        <IconAdjustmentsHorizontal />
      </ActionIcon>
    </Box>
  );
}

