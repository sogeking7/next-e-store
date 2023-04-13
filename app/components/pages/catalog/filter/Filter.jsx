import {
  Flex,
  NumberInput,
  Divider,
  RangeSlider,
  useMantineColorScheme,
  Text,
  createStyles,
  Rating, Box,
} from "@mantine/core";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: '1rem',
    [`@media (max-width: 767px)`]: {
      fontSize: '1.5rem'
    }
  }
}))

export const Filter = () => {
  const router = useRouter()
  const { classes } = useStyles();
  const { colorScheme } = useMantineColorScheme();
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [curRating, setCurRating] = useState(0)

  useEffect(() => {
    const query = router.query;
    query.from = `${priceRange[0]}`;
    query.to = `${priceRange[1]}`;
    router.push({
      pathname: router.pathname,
      query: query
    })
  }, [priceRange[0], priceRange[1]]);

  useEffect(() => {
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
    <Box w="100%" h="100%">
      <Box>
        <Text weight="bold" mb={16} className={classes.title}>Price</Text>
        <Flex mb={16}>
          <NumberInput
            max={priceRange[1]}
            min={0}
            value={priceRange[0]}
            onChange={(val) => setPriceRange([val, priceRange[1]])}
            styles={(theme) => ({
              input: {
                border: theme.colorScheme === "dark" ? 'none' : ''
              }
            })}
            w={100}
            mr={16}
            size="xs"
            radius="sm"
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
            value={priceRange[1]}
            onChange={(val) => setPriceRange([priceRange[0], val])}
            styles={(theme) => ({
              input: {
                border: theme.colorScheme === "dark" ? 'none' : ''
              }
            })}
            w={100}
            size="xs"
            radius="sm"
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            formatter={(value) =>
              !Number.isNaN(parseFloat(value))
                ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                : "$ "
            }
          />
        </Flex>
        <RangeSlider
          min={0}
          max={1000}
          label={null}
          color='indigo.5'
          value={priceRange}
          onChange={setPriceRange}
          w="100$"
          mb={16}
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
      </Box>
      <Divider my="xs" />
      <Box>
        <Text weight="bold" mb={16} className={classes.title} >Rating</Text>
        {
          Array(4).fill(0).map((_val, ind) => {
            const rating = 4 - ind;
            return (
              <Flex key={ind} mb={8} gap={2} align='center' onClick={() => setCurRating(rating)} >
                <Rating readOnly defaultValue={rating} size="xs" />{" "}
                <Text size="sm" weight="bold" color={curRating === rating ? `${colorScheme === 'dark' ? 'dark.0' : '#000'}` : 'indigo.5'} className="cursor-pointer hover:underline">
                  and above
                </Text>
              </Flex>
            )
          })
        }
      </Box>
    </Box>
  );
}
