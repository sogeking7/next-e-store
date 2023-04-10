import {Box, createStyles, Flex, Rating, Text} from "@mantine/core";
import Link from "next/link";

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
  overlay: {
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
  }
}));

export default function ProductCard({product}) {
  const {classes} = useStyles();

  return (
    <Box className={classes.background}>
      <Box className={classes.wrapper}>
        <Box className={classes.overlay}>
          <Flex mb={4} items='center' className="aspect-square">
            <Link href={`/item/${product.id}?category_name=${product.category.name}`}>
              <img
                className='object-contain w-full'
                src={product.images[0]}
                alt={null}
              />
            </Link>
          </Flex>
        </Box>
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
    </Box>
  );
}