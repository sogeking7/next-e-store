import React, {useState} from "react";
import {
  Button,
  Box,
  Text,
  Rating,
  Flex,
  Stack,
  createStyles,
  Divider,
} from "@mantine/core";
import {Carousel} from "@mantine/carousel";
import {useRouter} from "next/router";
import {AddToWishlistBtn} from "./buttons/AddToWishlistBtn";

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

function ProductDetail({data}) {
  const router = useRouter();
  const {title, images, price, rating, inWishlist, id} = data;
  const {classes} = useStyles();
  const [index, setIndex] = useState(0);

  return (
    <div className={classes.Card}>
      <Flex className="md:flex-row flex-col w-full rounded-md">
        <div className="flex flex-col md:w-2/3 h-full relative bg-white rounded-lg">
          <div className="w-full h-full md:pt-4 pt-4 md:pb-32 pb-0 md:px-4 duration-500 transition ease-in-out">
            <img
              src={images ? images[index] : ''}
              className="md:block hidden max-h-[300px] transition-opacity w-full duration-500 object-contain ease-in-out"
              alt={null}
            />
            <div className="md:hidden block">
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
            </div>
          </div>
          <div className="md:block hidden">
            <div style={{
              paddingBottom: '1rem',
              paddingLeft: '1rem',
              display: 'grid',
              width: '100%',
              height: '100%',
              gridTemplateColumns: `repeat(${images ? images.length : 0}, minmax(0, 1fr))`
            }}>
              {images ? images.map((image, ind) => {
                return <div key={ind} style={
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
                </div>
              }) : <></>}
            </div>
          </div>
        </div>
        <Divider orientation="vertical"/>
        <Stack spacing="md" className="md:w-1/3 w-full md:p-4 py-4">
          <Box>
            <Text className="text-2xl">
              {title}
            </Text>
            <Flex align="center" className="gap-1">
              <Rating readOnly defaultValue={rating} fractions={2}/>
              <Text color="indigo.5" className="text-sm cursor-pointer hover:underline">
                ({100} review)
              </Text>
            </Flex>
          </Box>
          <Text className="text-xl" weight="bold">
            {price}$
          </Text>
          <div className="flex gap-4 items-center">
            <Button className="w-[100%]" color="indigo.5" variant="filled" radius='md'>
              Add to Cart
            </Button>
            <AddToWishlistBtn productId={id} inWishlist={inWishlist}/>
          </div>
        </Stack>
      </Flex>
    </div>
  );
}

export default ProductDetail;
