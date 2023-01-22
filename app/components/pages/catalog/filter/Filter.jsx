import React from "react";
import {
  Button,
  Flex,
  Group,
  NumberInput,
  Divider,
  RangeSlider,
  createStyles,
  Stack,
  useMantineColorScheme,
  Text,
  Rating,
} from "@mantine/core";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";

const categories = [
  {
    title: 'All',
    route: 'all'
  },
  {
    title: 'Computers',
    route: 'computers'
  },
  {
    title: 'Smartphones',
    route: 'smartphones'
  },
  {
    title: 'Headphones',
    route: 'headphones'
  },
  {
    title: 'Laptops',
    route: 'laptops'
  },
  {
    title: 'Tablets',
    route: 'tablets'
  },
  {
    title: 'Fitness bracelets',
    route: 'fitness-bracelets'
  },
  {
    title: 'Smart watches',
    route: 'smart-watches'
  },
  {
    title: 'Electronic books',
    route: 'electronic-books'
  }
];

const useStyles = createStyles((theme) => ({
  filter: {
    padding: '1rem',
    borderRight: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[4]
      }`,
    height: '100%'
  }
}));

function Filter() {
  const router = useRouter()

  const { classes } = useStyles();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [curCategory, setCurCategory] = useState(categories[0]);
  const [curRating, setCurRating] = useState()

  const categoryHandler = (index, event) => {
    setCurCategory(categories[index])
    const currentPath = router.pathname;
    const newPath = `${currentPath}/${curCategory.route}`;
    router.push(newPath)
    console.log(newPath)
  }


  return (
    <Stack className={classes.filter}>
      <Stack spacing="xs" >
        <Text weight="bold">Price</Text>
        <Group spacing="xs">
          <NumberInput
            max={priceRange[1]}
            weight="bold"
            min={0}
            value={priceRange[0]}
            onChange={(val) => setPriceRange([val, priceRange[1]])}
            className="w-[100px]"
            size="xs"
            radius="md"
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            formatter={(value) =>
              !Number.isNaN(parseFloat(value))
                ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                : "$ "
            }
          />
          <NumberInput
            max={1000}
            min={priceRange[0]}
            weight="bold"
            value={priceRange[1]}
            onChange={(val) => setPriceRange([priceRange[0], val])}
            className="w-[100px]"
            size="xs"
            radius="md"
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
          color="indigo"
          className="w-full"
          defaultValue={[priceRange[0], priceRange[1]]}
          styles={(theme) => ({
            thumb: {
              height: 16,
              backgroundColor: 'white',
              width: 16,
              borderWidth: 1,
              boxShadow: theme.shadows.sm,
            },
          })}
        />
      </Stack>
      <Divider my="xs" />
      <Stack spacing="xs">
        <Text weight="bold">Category</Text>
        <Flex direction="column">
          {categories.map((category, index) => {
            return (
              <button
                onClick={(event) => categoryHandler(index, event)}
                className={`${curCategory.title == category.title ? `text-left rounded-lg text-sm ${colorScheme === 'dark' ? 'text-[#C1C2C5]' : 'text-[#1A1B1E]'} border-none font-bold ${colorScheme === 'dark' ? 'bg-[#25262B]' : 'bg-[#E9ECEF]'} py-[6px] px-2` : `text-left rounded-lg text-sm ${colorScheme === 'dark' ? 'text-[#C1C2C5]' : 'text-[#1A1B1E]'} ${colorScheme === 'dark' ? 'bg-[#141517]' : 'bg-white'} border-none  ${colorScheme === 'dark' ? 'hover:bg-[#25262B]' : 'hover:bg-[#E9ECEF]'} py-[6px] px-2`}`}>
                <Text>
                  {category.title}
                </Text>
              </button>
            )
          })}
        </Flex>
      </Stack>
      <Divider my="xs" />
      <Stack spacing="xs">
        <Text weight="bold">Rating</Text>
        {
          Array(4).fill(0).map((val, ind) => {
            const rating = 4 - ind;
            return (
              <Flex key={ind} className="gap-1" align='center' onClick={() => { setCurRating(rating) }} >
                <Rating readOnly defaultValue={rating} size="xs" />{" "}
                <Text size="sm" weight="bold" color={curRating === rating ? `${colorScheme === 'dark' ? '#C1C2C5' : 'dark'}` : 'blue'} className="cursor-pointer hover:underline">
                  and above
                </Text>

              </Flex>
            )
          })
        }


      </Stack>
      <Button className="fixed w-full bottom-0 right-0 md:hidden" size="lg">Show {20} items</Button>
    </Stack>
  );
}

export default Filter;
