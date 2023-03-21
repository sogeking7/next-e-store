import React from "react";
import {TextInput, ActionIcon, Flex, HoverCard, Box, Text} from "@mantine/core";
import {
  IconAdjustmentsHorizontal, IconMenu2,
  IconSearch,
} from "@tabler/icons";
import CategoryHoverCard from "./CategoryHoverCard";
import {categories} from "../../data/categories";

export default function Search({ setOpened }) {
  return (
    <Flex className="justify-center md:flex items-center gap-2 md:w-[500px] w-full md:mr-8">
      <HoverCard width={700} position="bottom-start"  onPositionChange={30} shadow="md">
        <HoverCard.Target>
          <Flex className="items-center">
            <ActionIcon
              size="lg"
              color='gray'
              variant="default"
              radius="md"
            >
              <IconMenu2 size={20} />
            </ActionIcon>
          </Flex>
        </HoverCard.Target>
        <HoverCard.Dropdown className="mt-2 rounded-lg">
          <CategoryHoverCard/>
        </HoverCard.Dropdown>
      </HoverCard>
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

