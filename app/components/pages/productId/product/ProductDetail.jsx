import React, { useState } from "react";
import { Box, createStyles, Loader, Flex, Rating, Stack, Text, } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { useRouter } from "next/router";
import { AddToWishlistBtn } from "./buttons/AddToWishlistBtn";
import { AddToCartBtn } from "./buttons/AddToCartBtn";
import { useSession } from "next-auth/react";
import { useQuery } from "react-query";
import axios from "axios";
import { unslugify } from "../../../../lib/utils/method";
import Bread from "../../../layouts/Bread";
import Head from "next/head";

const useStyles = createStyles((theme) => ({
  Card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : '#fff',
    width: '100%',
    [`@media (min-width: 768px)`]: {
      border: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[4]
        }`,
      borderRadius: '8px'
    }
  },
  carouselIndicator: {
    width: 6,
    height: 6,
    transition: 'width 250ms ease',
    backgroundColor: `${theme.colorScheme === "dark" ? theme.colors.gray[5] : theme.colors.gray[5]
      }`,
    "&[data-active]": {
      backgroundColor: `${theme.colorScheme === "dark"
        ? theme.colors.blue[5]
        : theme.colors.blue[6]
        }`,
    },
  },
}));

function ProductDetail() {
  const { status } = useSession();
  const { classes } = useStyles();
  const [index, setIndex] = useState(0);

  const router = useRouter();
  const { category_name: categoryName, id: productId } = router.query;

  const { isLoading, error, data } =
    useQuery({
      queryKey: ['productId', { type: 'done' }],
      queryFn: async () => await axios
        .get(`/api/products/${categoryName}/${productId}`)
        .then(res => res.data),
      retry: false
    })

  if (isLoading) {
    return (
      <Flex justify="center" maw={1034} mx="auto" p={16}>
        <Loader size="md" color="indigo.5" variant="oval" />
      </Flex>
    )
  }

  if (error) {
    return (
      <Box className="max-w-5xl mx-auto p-4">
        error.response.data.error;
      </Box>
    )
  }

  const { title, images, price, rating, inWishlist, id } = data;

  const list = [{ title: 'Home', href: '/' },]
  list.push({ title: unslugify(data.category.name), href: `/catalog/${data.category.name}` })

  return (
    <>
      <Head>
        <title>{data.title}</title>
        <meta property="og:title" content={data.title} key="title" />
      </Head>
      <Box className="max-w-5xl mx-auto p-4">
        <Bread list={list} />
        <Box className={classes.Card}>
          <Flex className="md:flex-row flex-col w-full rounded-md">
            <Box className="flex flex-col md:w-2/3 h-full relative bg-white rounded-lg">
              <Box className="w-full h-full md:pt-4 pt-4 md:pb-32 pb-0 md:px-4 duration-500 transition ease-in-out">
                <img
                  src={images ? images[index] : ''}
                  className="md:block hidden max-h-[300px] transition-opacity w-full duration-500 object-contain ease-in-out"
                  alt={null}
                />
                <Box className="md:hidden block">
                  <Carousel
                    withIndicators
                    withControls={false}
                    align="center"
                    classNames={{
                      indicator: classes.carouselIndicator,
                    }}
                  >
                    {
                      images ?
                        images.map((image, ind) => {
                          return <Carousel.Slide key={ind} className="mb-10">
                            <img
                              src={image}
                              className="max-h-[300px] transition-opacity w-full duration-500 object-contain ease-in-out"
                            />
                          </Carousel.Slide>
                        })
                        : <></>
                    }
                  </Carousel>
                </Box>
              </Box>
              <Box className="md:block hidden">
                <Box style={{
                  paddingBottom: '1rem',
                  paddingLeft: '1rem',
                  display: 'grid',
                  width: '100%',
                  height: '100%',
                  gridTemplateColumns: `repeat(${images ? images.length : 0}, minmax(0, 1fr))`
                }}>
                  {images ? images.map((image, ind) => {
                    return <Box key={ind} style={
                      {
                        width: '100%',
                        maxHeight: '75px',
                        border: ind === index ? '1px solid #228be6' : ''
                      }
                    }>
                      <img
                        onClick={() => setIndex(ind)}
                        className="w-full h-full object-contain"
                        src={image}
                      />
                    </Box>
                  }) : <></>}
                </Box>
              </Box>
            </Box>
            <Box orientation="vertical" />
            <Stack spacing="md" className="md:w-1/3 w-full md:p-4 py-4">
              <Box>
                <Text className="text-2xl">
                  {title}
                </Text>
                <Flex align="center" className="gap-1">
                  <Rating readOnly defaultValue={rating} fractions={2} />
                  <Text color="indigo.5" className="text-sm cursor-pointer hover:underline">
                    ({100} review)
                  </Text>
                </Flex>
              </Box>
              <Text className="text-xl" weight="bold">
                {price}$
              </Text>
              <Box className="flex gap-4 items-center">
                <AddToCartBtn productId={id} inCart={0} status={status} />
                <AddToWishlistBtn productId={id} inWishlist={inWishlist} status={status} />
              </Box>
            </Stack>
          </Flex>
        </Box>
      </Box>
    </>
  );
}

export default ProductDetail;
