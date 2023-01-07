import React from "react";

import {
  Button,
  Flex,
  Group,
  NumberInput,
  Divider,
  RangeSlider,
  Stack,
  Text,
  Box,
  Rating,
} from "@mantine/core";

function Filter() {
  return (
    <Stack>
      <Stack spacing="xs">
        <Text weight="bold" size="sm">
          Price
        </Text>
        <Group spacing="xs">
          <NumberInput
            hideControls
            label="Min"
            className="w-[100px]"
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            formatter={(value) =>
              !Number.isNaN(parseFloat(value))
                ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                : "$ "
            }
          />
          <NumberInput
            hideControls
            className="w-[100px]"
            label="Max"
            size="sm"
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            formatter={(value) =>
              !Number.isNaN(parseFloat(value))
                ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                : "$ "
            }
          />
        </Group>
        <RangeSlider
          min={1}
          max={1000}
          label={null}
          className="w-full"
          defaultValue={[300, 700]}
        />
      </Stack>
      <Divider my="sm" />
      <Stack spacing="xs">
        <Text weight="bold" size="sm">
          Category
        </Text>
        <Flex wrap="wrap" gap="xs">
          <Button variant="filled" color="blue" size="xs">
            All
          </Button>
          <Button variant="outline" size="xs">
            Computers
          </Button>
          <Button variant="outline" size="xs">
            Smartphones
          </Button>
          <Button variant="outline" size="xs">
            Headphones
          </Button>
          <Button variant="outline" size="xs">
            Books
          </Button>
          <Button variant="outline" size="xs">
            Laptops
          </Button>
          <Button variant="outline" size="xs">
            Smart Watches
          </Button>
        </Flex>
      </Stack>
      <Divider my="sm" />
      <Stack spacing="xs">
        <Text weight="bold" size="sm">
          Rating
        </Text>

        <div className="flex items-center gap-1">
          <Rating readOnly defaultValue={4} size="xs" />{" "}
          <Text size="sm" color="blue" className="cursor-pointer hover:underline">
            and above
          </Text>
        </div>
        <div className="flex items-center gap-1">
          <Rating readOnly defaultValue={3} size="xs" />{" "}
          <Text size="sm" color="blue" className="cursor-pointer hover:underline">
            and above
          </Text>
        </div>
        <div className="flex items-center gap-1">
          <Rating readOnly defaultValue={2} size="xs" />{" "}
          <Text size="sm" color="blue" className="cursor-pointer hover:underline">
            and above
          </Text>
        </div>
        <div className="flex items-center gap-1">
          <Rating readOnly defaultValue={1} size="xs" />{" "}
          <Text size="sm" color="blue" className="cursor-pointer hover:underline">
            and above
          </Text>
        </div>
      </Stack>
      <Button className="fixed w-full bottom-0 right-0 md:hidden" size="lg">
        Show {20} items
      </Button>
    </Stack>
  );
}

export default Filter;
