import { Text, Button, createStyles, Rating, Group, Box } from "@mantine/core";

import Link from "next/link";

import { AddToFavorite } from "./AddToFavorite";

const useStyles = createStyles((theme) => ({
  border: {
    // paddingBottom: '1rem',
    // borderBottom: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[4]}`
  }
}));

const grid = {
  wrapper: "flex flex-col gap-2",
  image: 'object-contain h-[160px] w-full',
  imageBox: "relative p-5 bg-white rounded-xl ",
  body: "flex flex-col gap-2",
};
const flex = {
  wrapper: "flex flex-row gap-4",
  body: "",
  image: 'object-contain',
  imageBox: "w-1/2",
};
function ProductCard(props) {
  const { product, layout } = props;
  const { title, thumbnail, price, rating, _id } = product;
  const { classes } = useStyles();
  return (
    
    <Box className={layout ? flex.wrapper : grid.wrapper}>
      
      <div className={layout ? flex.imageBox : grid.imageBox}>
        <Link href={"/product/" + _id}>
          <img
            className={layout ? flex.image : grid.image}
            src={thumbnail}
          />
        </Link>
        {!layout && <AddToFavorite />}
      </div>
      <Box className={layout ? flex.body : grid.body}>
        <Box>
          <Link href={"/product/" + _id}>
            <Text lineClamp={2} size='sm' className="cursor-pointer hover:text-[#228be6]">
              {title}
            </Text>
          </Link>
          <Link href="/">
            <Rating defaultValue={rating} size="xs" fractions={2} readOnly className="" />
          </Link>
        </Box>
        <Text weight="bold">
          {price}$
        </Text>
        <div className={classes.border}>
        <Group>
          <Button color="gray" variant="outline" size="xs" radius="lg">
            Add to cart +
          </Button>
        </Group>
        </div>
      </Box>
    </Box>
  );
}

export default ProductCard;
