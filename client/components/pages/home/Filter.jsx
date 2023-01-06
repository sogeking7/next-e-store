import React from "react";

import {
  Button,
  Flex,
  Group,
  NumberInput,
  RangeSlider,
  Stack,
  Text,
} from "@mantine/core";

function Filter() {
  return (
    <Stack>
      <Group spacing="xs">
        <Text weight="bold" size="lg">
          Price
        </Text>
        <Flex gap="lg">
          <NumberInput
            hideControls
            radius="md"
            description="Min"
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            formatter={(value) =>
              !Number.isNaN(parseFloat(value))
                ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                : "$ "
            }
          />
          <NumberInput
            hideControls
            description="Max"
            radius="md"
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            formatter={(value) =>
              !Number.isNaN(parseFloat(value))
                ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                : "$ "
            }
          />
        </Flex>
        <RangeSlider
          min={1}
          max={1000}
          label={null}
          className="w-full"
          defaultValue={[300, 700]}
        />
      </Group>
      <Group spacing="xs">
        <Text weight="bold" size="lg">
          Category
        </Text>
        <Flex className="flex-wrap gap-x-1 gap-y-2">
          <Button radius="md" variant="filled" color="blue" size="xs">
            All
          </Button>
          <Button radius="md" variant="outline" color="gray" size="xs">
            Computers
          </Button>
          <Button radius="md" variant="outline" color="gray" size="xs">
            Smartphones
          </Button>
          <Button radius="md" variant="outline" color="gray" size="xs">
            Headphones
          </Button>
          <Button radius="md" variant="outline" color="gray" size="xs">
            Books
          </Button>
          <Button radius="md" variant="outline" color="gray" size="xs">
            Laptops
          </Button>
          <Button radius="md" variant="outline" color="gray" size="xs">
            Smart Watches
          </Button>
        </Flex>
      </Group>
      <Button
        className="fixed w-full bottom-0 right-0 md:hidden"
        radius="0"
        size="lg"
      >
        Show {20} items
      </Button>
    </Stack>
  );
}

export default Filter;
