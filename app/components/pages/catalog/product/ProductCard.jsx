import {Box, createStyles, Flex, Group, Rating, Skeleton, Text} from "@mantine/core";
import Link from "next/link";
import {AddToCartBtn} from "./buttons/AddToCartBtn";
import {useRouter} from "next/router";
import React from "react";
import {RemoveFromWishlistBtn} from "./buttons/RemoveFromWishlistBtn";

const useStyles = createStyles((theme) => ({
  background: {
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    borderRadius: theme.radius.md,
  },
  wrapper: {
    padding: '1rem .75rem',
    border: theme.colorScheme === "dark" ? `` : `1px solid ${theme.colors.gray[4]}`,
    borderRadius: theme.radius.md,
    ['@media (max-width: 768px)']: {
      padding: '1rem .5rem',
    }
  },
  wrapperSkeleton: {
    padding: '1rem .75rem',
    ['@media (max-width: 768px)']: {
      padding: '1rem .5rem',
    }
  },
  overlay: {
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
  }
}));

function ProductCard({layout, product, isLoading, url}) {
  const router = useRouter();

  const {classes} = useStyles();

  return (
    <div className={isLoading ? null : classes.background}>
      <div className={isLoading ? classes.wrapperSkeleton : classes.wrapper}>
        <Box className={layout ? "flex flex-row gap-4" : "flex flex-col gap-2"}>
          <div className={isLoading ? null : classes.overlay}>
            <div className={`aspect-square flex items-center mb-2 ${layout && 'h-[160px]'}`}>
              {
                isLoading ?
                  <Skeleton height={layout ? 160 : 200} width={layout ? 160 : 200} radius="md"/>
                  :
                  <>
                    <Link href={`/item/${product.id}?category_name=${product.category.name}`}>
                      <img
                        className='object-contain w-full'
                        src={product.images[0]}
                        alt={null}
                      />
                    </Link>
                  </>
              }

            </div>
          </div>
          <div className="flex flex-col justify-between w-full">
            <Flex direction='column' gap={4}>
              <div>
                {
                  isLoading ?
                    <Skeleton height={20} width="100%" mb={4}/>
                    :
                    <Link href={`/item/${product.id}?category_name=${product.category.name}`}>
                      <Text lineClamp={2} size='sm'
                            className="cursor-pointer hover:text-[#228be6] mb-1">
                        {product.title}
                      </Text>
                    </Link>
                }

                <Link href="/">
                  {
                    isLoading ?
                      <Skeleton height={20} width="100%"/>
                      :
                      <Rating defaultValue={product.rating} size="xs" fractions={2} readOnly className=""/>
                  }
                </Link>
              </div>
              <Text weight="bold" mb={8}>
                {
                  isLoading ?
                    <Skeleton height={20} width={100}/>
                    :
                    '$' + product.price
                }
              </Text>
              {
                layout ?
                  <></>
                  :
                  <AddToCartBtn productId={product.id} inCart={product.inCart}/>
              }

            </Flex>
            {
              layout && !isLoading ?
                <Group position="right">
                  <RemoveFromWishlistBtn productId={product.id}/>
                </Group>
                :
                <></>
            }
          </div>
        </Box>
      </div>
    </div>
  );
}

export default ProductCard;
