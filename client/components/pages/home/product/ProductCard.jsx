import { Text, Button, Rating, Group, Box } from "@mantine/core";

import Link from "next/link";

import { AddToFavorite } from "./AddToFavorite";

const grid = {
  wrapper: "flex flex-col gap-2",
  image: 'object-contain h-[150px] w-full',
  imageBox: "relative p-5 bg-white rounded-[4px]",
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

  return (
    <Box className={layout ? flex.wrapper : grid.wrapper}>
      <div className={layout ? flex.imageBox : grid.imageBox}>
        <Link href={"/products/" + _id}>
          <img
            className={layout ? flex.image : grid.image}
            src={thumbnail}
          />
        </Link>
        {!layout && <AddToFavorite />}
      </div>
      <Box className={layout ? flex.body : grid.body}>
        <Box>
          <Link href={"/products/" + _id}>
            <Text lineClamp={2} size='sm' className="cursor-pointer hover:text-[#37B24D]">
              {title}
            </Text>
          </Link>
          <Link href="/">
            <Box>
              <Rating defaultValue={rating} size="xs" fractions={2} readOnly className="" />
              <Text color="blue" size="sm" className="cursor-pointer">
                ({12} Reviews)
              </Text>
            </Box>
          </Link>
        </Box>
        <Text weight="bold" size="md">
          {price}$
        </Text>
        <Group>
          <Button color="green" variant="filled" size="xs">
            + Add to cart
          </Button>
        </Group>
      </Box>
    </Box>
  );
}

export default ProductCard;
