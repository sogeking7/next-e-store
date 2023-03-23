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

const useStyles = createStyles((theme) => ({
}));


function Filter() {
  const router = useRouter()

  const { classes } = useStyles();
  const { colorScheme, toggleColorScheme} = useMantineColorScheme();

  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [curRating, setCurRating] = useState(0)


  useEffect(() => {
    const query = router.query;
    query.from = priceRange[0]
    query.to = priceRange[1]
    router.push({
      pathname: router.pathname,
      query: query
    }, undefined,  { shallow: true })
  }, [priceRange[0], priceRange[1]]);


  useEffect(()=>{
    if (curRating) {
      const query = router.query;
      query.rating = curRating;
      router.push({
        pathname: router.pathname,
        query: query
      }, undefined,  { shallow: true })
    }
  }, [curRating]);

  return (
    <Stack className="h-full">
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
          color='blue'
          value={priceRange}
          onChange={setPriceRange}
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
        <Text weight="bold">Rating</Text>
        {
          Array(4).fill(0).map((val, ind) => {
            const rating = 4 - ind;
            return (
              <Flex key={ind} className="gap-1" align='center' onClick={() => setCurRating(rating)} >
                <Rating readOnly defaultValue={rating} size="xs" />{" "}
                <Text size="sm" weight="bold" color={curRating === rating ? `${colorScheme === 'dark' ? '#C1C2C5' : 'dark'}` : '#4dabf7'} className="cursor-pointer hover:underline">
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
