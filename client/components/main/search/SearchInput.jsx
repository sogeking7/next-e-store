import React from "react";
import { MediaQuery, Input, ActionIcon, Flex } from "@mantine/core";
import { IconAdjustmentsHorizontal, IconFilter, IconFocus, IconSearch } from "@tabler/icons";

function SearchInput({setOpened}) {
  return (
    <div className="md:block flex items-center gap-2 md:w-[800px] md:mr-8">
      <Input
        className=" basic:w-full overflow-hidden "
        icon={<IconSearch size={20} />}
        size="md"
        variant="filled"
        radius="md"
        placeholder="Search in Store"
      ></Input>
      <ActionIcon onClick={() => setOpened(true)} className="md:hidden" variant="transparent" color="blue">
        <IconAdjustmentsHorizontal/>
      </ActionIcon>
    </div>
  );
}

export default SearchInput;
