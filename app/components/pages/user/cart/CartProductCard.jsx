import {Box, Checkbox, createStyles, Flex, Rating, Text} from "@mantine/core";
import Link from "next/link";
import React from "react";
import {IconMinus, IconPlus, IconTrash} from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  priceBox: {
    padding: '1rem 1rem 1rem 0rem'
  },
  overlay: {
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[1],
  },
  counterWrapper: {
    userSelect: 'none',
    height: 'min-content',
    width: 'min-content',
    padding: '6px 12px',
    borderRadius: theme.radius.xl,
    border: theme.colorScheme === "dark" ? `1px solid ${theme.colors.dark[6]}` : `1px solid ${theme.colors.gray[2]}`,
  },
  picture: {
    objectFit: 'cover',
    width: '100%',
    borderRadius: theme.radius.lg, 
  }
}));

function ProductCard({product}) {
  const {classes} = useStyles();

  const [quantity, setQuantity] = React.useState(1);

  return (
    <Box className={classes.wrapper}>
      <Flex direction="row" gap="md">
        <Box className={classes.overlay}>
          <Flex className="aspect-square h-[160px] lg:h-[120px]">
            <Link href={`/item/${product.id}?category_name=${product.category.name}`}>
              <img
                className={classes.picture}
                src={product.images[0]}
                alt={null}
              />
            </Link>
          </Flex>
        </Box>
        <Flex justify="space-between" gap="md" className="p-0 md:py-4 w-full flex-col lg:flex-row">
          <Flex direction='column' gap="md">
            <Box>
              <Link href={`/item/${product.id}?category_name=${product.category.name}`}>
                <Text lineClamp={2} size='sm' className="cursor-pointer hover:text-[#228be6] mb-1">
                  Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.
                  //{product.title}
                </Text>
              </Link>
              <Link href="/">
                <Rating defaultValue={product.rating} size="xs" fractions={2} readOnly className=""/>
              </Link>
            </Box>
          </Flex>
          <Box>
            <Flex direction="row" align="center" className={classes.counterWrapper}>
              <Flex justify='space-between' align='center' className='hover:text-red-500 cursor-pointer' onClick={() => {
                if (quantity > 0) {
                  setQuantity(quantity - 1)
                }
              }}>
                {quantity > 1 ? <IconMinus stroke={1.5}/> : <IconTrash stroke={1.5}/>}
              </Flex>
              <Text className="mx-4" weight="bold">{quantity}</Text>
              <Flex justify='space-between' align='center' className='hover:text-green-500 cursor-pointer' onClick={()=>{
                setQuantity(quantity + 1)
              }}>
                <IconPlus stroke={1.5}/>
              </Flex>
            </Flex>
          </Box>
        </Flex>


        <Box className="md:pt-4 ">
          <Flex gap={16} align='center'>
            <Text weight="bold" size={18}>${product.price}</Text>
            <Checkbox color="indigo.7"/>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

export default ProductCard;
