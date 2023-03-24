import React from "react";
import {
  Flex,
  NumberInput,
  Divider,
  RangeSlider,
  createStyles,
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
    <div className="h-full w-full">
      <div>
        <Text weight="bold" className="mb-4">Price</Text>
        <div className="flex mb-4">
          <NumberInput
            max={priceRange[1]}
            weight="bold"
            min={0}
            value={priceRange[0]}
            onChange={(val) => setPriceRange([val, priceRange[1]])}
            className="w-[100px] mr-4"
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
        </div>
        <RangeSlider
          min={0}
          max={1000}
          label={null}
          color='blue'
          value={priceRange}
          onChange={setPriceRange}
          className="w-full mb-4"
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
      </div>
      <Divider my="xs" />
      <div>
        <Text weight="bold" className="mb-4">Rating</Text>
        {
          Array(4).fill(0).map((val, ind) => {
            const rating = 4 - ind;
            return (
              <Flex key={ind} className="gap-1 mb-2" align='center' onClick={() => setCurRating(rating)} >
                <Rating readOnly defaultValue={rating} size="xs" />{" "}
                <Text size="sm" weight="bold" color={curRating === rating ? `${colorScheme === 'dark' ? '#C1C2C5' : 'dark'}` : '#4dabf7'} className="cursor-pointer hover:underline">
                  and above
                </Text>
              </Flex>
            )
          })
        }
      </div>
    </div>
  );
}

export default Filter;
