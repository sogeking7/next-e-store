import {Box, createStyles, Flex, Rating, Text} from "@mantine/core";
import Link from "next/link";

const useStyles = createStyles((theme) => ({
  
  overlay: {
    borderRadius: theme.radius.lg, 
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[1],
  },
  flexOverlay: { 
    width: '200px',
    ['@media (max-width: 768px)']: {
      width: '140px'
    },
    borderRadius: theme.radius.lg, 
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[1],
  },
  picture: {
    objectFit: 'cover',
    cursor: 'pointer',
    width: '100%',
    borderRadius: theme.radius.lg, 
  }
}));

export default function ProductCard({product, layout}) {
  const {classes} = useStyles();

  return (
    <Flex gap={layout ? 16 : 8} direction={layout ? 'row' : 'column'} >
        <Box className={layout ? classes.flexOverlay : classes.overlay}>
          <Flex className="aspect-square bg-contain">
            <Link href={`/item/${product.id}?category_name=${product.category.name}`}>
              <img
                className={classes.picture}
                src={product.images[0]}
                alt={null}
              />
            </Link>
          </Flex>
        </Box>
        <Box mb={layout ? 0 : 8}> 
          <Link href={`/item/${product.id}?category_name=${product.category.name}`}>
            <Text lineClamp={2} size='sm' className="cursor-pointer hover:text-[#228be6] mb-1">
              {product.title}
            </Text>
          </Link>
          <Link href="/">
            <Rating defaultValue={product.rating} mb={8} size="xs" fractions={2} readOnly className=""/>
          </Link>
          <Text size={20} weight="bold">${product.price}</Text>
        </Box>
    </Flex>
  );
}
