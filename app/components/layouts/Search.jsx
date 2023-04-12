import React from "react";
import {TextInput, ActionIcon, Flex, HoverCard} from "@mantine/core";
import {
  IconAdjustmentsHorizontal, IconMenu2,
  IconSearch,
} from "@tabler/icons";
import CategoryHoverCard from "./CategoryHoverCard";

export default function Search({setOpened}) {
  return (
    <Flex className="justify-center md:flex items-center gap-2 md:w-[500px] w-full md:mr-8">
      <HoverCard width={600} position="bottom-start" className="hidden md:block" shadow="md">
        <HoverCard.Target>
          <Flex className="items-center">
            <ActionIcon
              size="lg"
              color='gray'
              variant="default"
              radius="md"
            >
              <IconMenu2 size={20}/>
            </ActionIcon>
          </Flex>
        </HoverCard.Target>
        <HoverCard.Dropdown className="mt-1 rounded-lg hidden md:block">
          <CategoryHoverCard/>
        </HoverCard.Dropdown>
      </HoverCard>
      <TextInput
        radius="xl"
        className="w-full overflow-hidden"
        icon={<IconSearch size={16}/>}
        placeholder="Search in Store"
      ></TextInput>
    </Flex>
  );
}

