import React from "react";
import {TextInput, ActionIcon, Flex, HoverCard} from "@mantine/core";
import {
  IconMenu2,
  IconSearch,
} from "@tabler/icons";
import CategoryHoverCard from "./CategoryHoverCard";

export default function Search() {
  return (
    <Flex justify="center" align="center" gap={4} className="w-full md:w-[500px]" mr={64}>
      <HoverCard width={600} position="bottom-start" className="hidden md:block" shadow="md">
        <HoverCard.Target>
          <Flex align="center">
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
        <HoverCard.Dropdown mt={2} className="rounded-lg hidden md:block">
          <CategoryHoverCard/>
        </HoverCard.Dropdown>
      </HoverCard>
      <TextInput
        radius="xl"
        w="100%"
        className="overflow-hidden"
        icon={<IconSearch size={16}/>}
        placeholder="Search in Store"
      ></TextInput>
    </Flex>
  );
}

