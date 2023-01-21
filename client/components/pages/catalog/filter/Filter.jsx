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

const useStyles = createStyles((theme) => ({
  filter: {
    padding: '1rem',
    borderRight: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[4]
  }`,
    height: '100%'
  }
}));

function Filter() {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [curCategory, setCurCategory] = useState(categories[0]);
  const [curRating, setCurRating] = useState()
  useEffect(() => {
    console.log(priceRange[0], priceRange[1]);

  }, [priceRange])

  const {classes} = useStyles();
  
  return (
    <Stack className={classes.filter}>
      <Stack spacing="xs" >
        <Text weight="bold" size="xs">
          Price
        </Text>
        <Group spacing="xs">
          <NumberInput
            // label="Min"
            max={priceRange[1]}
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
            // label="Max"
            max={1000}
            min={priceRange[0]}
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
          className="w-full"
          defaultValue={[priceRange[0], priceRange[1]]}
          styles={(theme) => ({
            thumb: {
              height: 16,
              width: 16,
              borderWidth: 1,
              boxShadow: theme.shadows.sm,
            },
          })}
        />
      </Stack>
      <Divider my="xs" />
      <Stack spacing="xs">
        <Text weight="bold" size="xs">
          Category
        </Text>
        <Flex direction="column">
          {categories.map((category, index) => {
            return (
              <button
                onClick={()=>setCurCategory(categories[index])}
                className={`${curCategory.title == category.title ?"text-left rounded-lg text-sm text-[#1A1B1E] border-none font-bold bg-[#E9ECEF] py-[6px] px-2" : "text-left rounded-lg text-sm text-[#1A1B1E] bg-white border-none hover:bg-[#E9ECEF] py-[6px] px-2"}`}>
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
        <Text weight="bold" size="xs">
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
