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
  Rating,
} from "@mantine/core";
import { useState } from "react";
import { useEffect } from "react";

const categories = [
	{
		title: 'All'
	},
	{
		title: 'Computers',
	},
	{
		title: 'Smartphones',
	},
	{
		title: 'Headphones',
	},
	{
		title: 'Laptops',
	},
	{
		title: 'Tablets',
	},
	{
		title: 'Fitness bracelets',
	},
	{
		title: 'Smart watches',
	},
	{
		title: 'Electronic books',
	},
];


function Filter() {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [curCategory, setCurCategory] = useState(categories[0]);
  const [curRating, setCurRating] = useState()
  useEffect(() => {
    console.log(priceRange[0], priceRange[1]);

  }, [priceRange])

  return (
    <Stack>
      <Stack spacing="xs">
        <Text weight="bold" size="sm">
          Price
        </Text>
        <Group spacing="xs">
          <NumberInput
            label="Min"
            max={priceRange[1]}
            min={0}
            value={priceRange[0]}
            onChange={(val) => setPriceRange([val, priceRange[1]])}
            className="w-[100px]"
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            formatter={(value) =>
              !Number.isNaN(parseFloat(value))
                ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                : "$ "
            }
          />
          <NumberInput
            label="Max"
            max={1000}
            min={priceRange[0]}
            value={priceRange[1]}
            onChange={(val) => setPriceRange([priceRange[0], val])}
            className="w-[100px]"
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
          min={0}
          max={1000}
          label={null}
          value={priceRange}
          onChange={setPriceRange}
          className="w-full"
          defaultValue={[priceRange[0], priceRange[1]]}
          styles={(theme) => ({
            thumb: {
              height: 16,
              width: 16,
              backgroundColor: theme.white,
              borderWidth: 1,
              boxShadow: theme.shadows.sm,
            },
          })}
        />
      </Stack>
      <Divider my="sm" />
      <Stack spacing="xs">
        <Text weight="bold" size="sm">
          Category
        </Text>
        <Flex wrap="wrap" gap="xs">
          {categories.map((category, index) => {
            return (
              <Button
                key={index}
                size="xs"
                variant={category.title === curCategory.title ? 'filled' : 'outline'}
                onClick={() => {
                  setCurCategory(category)
                }}
              >
                {category.title}
              </Button>
            )
          })}
        </Flex>
      </Stack>
      <Divider my="sm" />
      <Stack spacing="xs">
        <Text weight="bold" size="sm">
          Rating
        </Text>

        {
          Array(4).fill(0).map((val, ind) => {
            const rating = 4 - ind;
            return (
              <Flex key={ind} className="gap-1" align='center' onClick={() => { setCurRating(rating) }} >
                <Rating readOnly defaultValue={rating} size="xs" />{" "}
                <Text size="sm" color={curRating === rating ? 'dark' : 'blue'} className="cursor-pointer hover:underline">
                  and above
                </Text>

              </Flex>
            )
          })
        }


      </Stack>
      <Button className="fixed w-full bottom-0 right-0 md:hidden" size="lg">
        Show {20} items
      </Button>
    </Stack>
  );
}

export default Filter;
