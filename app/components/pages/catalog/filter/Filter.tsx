import React, {FC} from "react";
import {
  Flex,
  NumberInput,
  Divider,
  RangeSlider,
  useMantineColorScheme,
  Text,
  Rating, MantineTheme,
} from "@mantine/core";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Filter:FC = () => {
  const router = useRouter()
  const { colorScheme }: { colorScheme: 'light' | 'dark' } = useMantineColorScheme();
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [curRating, setCurRating] = useState<number>(0)

  useEffect(() => {
    const query = router.query;
    query.from = `${priceRange[0]}`;
    query.to = `${priceRange[1]}`;
    router.push({
      pathname: router.pathname,
      query: query
    })
  }, [priceRange[0], priceRange[1]]);

  useEffect(()=>{
    if (curRating) {
      const query = router.query;
      query.rating = `${curRating}`;
      router.push({
        pathname: router.pathname,
        query: query
      })
    }
  }, [curRating]);

  return (
    <div className="h-full w-full">
      <div>
        <Text weight="bold" className="mb-4">Price</Text>
        <div className="flex mb-4">
          <NumberInput
            max={priceRange[1]}
            min={0}
            value={priceRange[0]}
            onChange={(val:number) => setPriceRange([val, priceRange[1]])}
            className="w-[100px] mr-4"
            size="xs"
            radius="md"
            parser={(value:any) => value.replace(/\$\s?|(,*)/g, "")}
            formatter={(value:any) =>
              !Number.isNaN(parseFloat(value))
                ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                : "$ "
            }
          />
          <NumberInput
            max={1000}
            min={priceRange[0]}
            value={priceRange[1]}
            onChange={(val:any) => setPriceRange([priceRange[0], val])}
            className="w-[100px] font-bold"
            size="xs"
            radius="md"
            parser={(value:any) => value.replace(/\$\s?|(,*)/g, "")}
            formatter={(value:any) =>
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
          styles={(theme:MantineTheme) => ({
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
          Array(4).fill(0).map((_val:number, ind:number) => {
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
