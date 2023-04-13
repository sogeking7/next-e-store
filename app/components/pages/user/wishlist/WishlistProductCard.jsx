import { Box, createStyles, Flex, Rating, Text } from "@mantine/core";
import Link from "next/link";
import React from "react";
import { RemoveFromWishlistBtn } from "./RemoveFromWishlistBtn";

const useStyles = createStyles((theme) => ({
  overlay: {
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[1],
  },
  picture: {
    objectFit: 'cover',
    width: '100%',
    borderRadius: theme.radius.lg,
  }
}));

function ProductCard({ product }) {
  const { classes } = useStyles();

  return (
    <Flex gap="md">
      <Box className={classes.overlay}>
        <Flex className="aspect-square" h={140}>
          <Link href={`/item/${product.id}?category_name=${product.category.name}`}>
            <img
              className={classes.picture}
              src={product.images[0]}
              alt={null}
            />
          </Link>
        </Flex>
      </Box>
      <Flex direction="col" justify="space-between" w="100%">
        <Box>
          <Box mb={8}>
            <Link href={`/item/${product.id}?category_name=${product.category.name}`}>
              <Text lineClamp={2} size='sm' className="cursor-pointer hover:text-[#228be6]" mb={2}>
                {product.title}
              </Text>
            </Link>
            <Link href="/">
              <Rating defaultValue={product.rating} size="xs" fractions={2} readOnly className="" />
            </Link>
          </Box>
          <Text weight="bold">${product.price}</Text>
        </Box>
        <Flex align='flex-end'>
          <RemoveFromWishlistBtn productId={product.id} />
        </Flex>
      </Flex>
    </Flex>
  );
}

export default ProductCard;
