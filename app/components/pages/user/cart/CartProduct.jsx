import {Box, Checkbox, createStyles, Flex, Rating, Text} from "@mantine/core";
import Link from "next/link";
import {useRouter} from "next/router";
import React from "react";
import {AddToCartBtn} from "../../catalog/product/buttons/AddToCartBtn";

const useStyles = createStyles((theme) => ({
  background: {
    width: '100%',
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    borderRadius: '8px',
    marginBottom: '1rem',
  },
  priceBox: {
    padding: '1rem 1rem 1rem 0rem'
  },
  overlay: {
    borderRadius: theme.colorScheme === "dark" ? '8px 0 0 8px' : '8px',
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
          <Flex align='center'  className="aspect-square h-[120px]">
            <Link href={`/item/${product.id}?category_name=${product.category.name}`}>
              <img
                className='object-contain w-full'
                src={product.images[0]}
                alt={null}
              />
            </Link>
          </Flex>
        </Box>
        <Flex direction="col" justify="space-between" pt="md" className="w-full">
          <Flex direction='column' gap="md">
            <Box>
              <Link href={`/item/${product.id}?category_name=${product.category.name}`}>
                <Text lineClamp={2} size='sm' className="cursor-pointer hover:text-[#228be6] mb-1">
                  {product.title}
                </Text>
              </Link>
              <Link href="/">
                <Rating defaultValue={product.rating} size="xs" fractions={2} readOnly className=""/>
              </Link>
            </Box>
            <AddToCartBtn productId={product.id} inCart={product.inCart}/>
          </Flex>
        </Flex>
        <Box className={classes.priceBox}>
          <Flex gap={16} align='center'>
            <Text weight={600} size={18}>${product.price}</Text>
            <Checkbox color="indigo.5"/>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

export default ProductCard;
