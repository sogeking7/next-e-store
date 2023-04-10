import {Box, createStyles, Flex, Rating, Text} from "@mantine/core";
import Link from "next/link";
import React from "react";
import {RemoveFromWishlistBtn} from "./RemoveFromWishlistBtn";

const useStyles = createStyles((theme) => ({
  overlay: {
    borderRadius: theme.radius.md,
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[1],
  }
}));

function ProductCard({product}) {
  const {classes} = useStyles();

  return (
    <Flex gap="md">
      <Box className={classes.overlay}>
        <Flex align='center' className="aspect-square h-[140px]">
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
  );
}

export default ProductCard;
