import React from "react";
import { MediaQuery,  TextInput, ActionIcon, Flex } from "@mantine/core";
import {
  IconAdjustmentsHorizontal,
  IconSearch,
} from "@tabler/icons";

function SearchInput({ setOpened }) {
  return (
    <div className="md:block flex items-center gap-2 md:w-[800px] md:mr-8">
      <TextInput
        className=" basic:w-full overflow-hidden"
        rightSection={<ActionIcon color="blue" variant="filled"><IconSearch color="white" size={20}/></ActionIcon>}
        size="sm"
        placeholder="Search in Store"
      ></TextInput>
      <ActionIcon
        onClick={() => setOpened(true)}
        className="md:hidden"
        variant="transparent"
        color="blue"
      >
        <IconAdjustmentsHorizontal />
      </ActionIcon>
    </div>
  );
}

export default SearchInput;
