import {Box, Checkbox, createStyles, Flex, Rating, Text} from "@mantine/core";
import Link from "next/link";
import {useRouter} from "next/router";
import React from "react";
import {AddToCartBtn} from "../cart/AddToCartBtn";
import {RemoveFromWishlistBtn} from "./RemoveFromWishlistBtn";

const useStyles = createStyles((theme) => ({
  background: {
    width: '100%',
    // backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3],
    marginBottom: '1rem',
  },
  priceBox: {
    padding: '1rem 1rem 1rem 0rem'
  },
  overlay: {
    borderRadius: '8px',
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[1],
  }
}));

function ProductCard({product}) {
  const router = useRouter();

  const {classes} = useStyles();

  return (
    <Box className={classes.background}>
      <Flex direction="row" gap="md">
        <Box className={classes.overlay}>
          <Flex align='center'  className="aspect-square h-[140px]">
            <Link href={`/item/${product.id}?category_name=${product.category.name}`}>
              <img
                className='object-contain w-full'
                src={product.images[0]}
                alt={null}
              />
            </Link>
          </Flex>
        </Box>
        <Flex direction="col" justify="space-between" className="w-full">
          <Box>
            <Box mb={8}>
              <Link href={`/item/${product.id}?category_name=${product.category.name}`}>
                <Text lineClamp={2} size='sm' className="cursor-pointer hover:text-[#228be6] mb-1">
                  {product.title}
                </Text>
              </Link>
              <Link href="/">
                <Rating defaultValue={product.rating} size="xs" fractions={2} readOnly className=""/>
              </Link>
            </Box>
            <Text weight="bold">${product.price}</Text>
          </Box>
          <Flex align='flex-end'>
            <RemoveFromWishlistBtn productId={product.id}/>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}

export default ProductCard;
