import { Stack, Image, Text, Button, Rating, Group, Box } from "@mantine/core";

import Link from "next/link";

import { AddToCart } from "./AddToCart";
import { AddToFavorite } from "./AddToFavorite";

function ProductCard(props) {
  const { product } = props;
  const { title, imageUrl, price, rating, _id } = product;

  return (
    <Stack spacing="xs">
      <Box className="relative">
        <Link href={"/products/" + _id}>
          <Image
            className="aspect-square"
            radius="md"
            withPlaceholder
            alt="product-item"
            src={imageUrl}
          />
        </Link>
        <AddToFavorite />
      </Box>
      <Stack spacing="xs">
        <Link href={"/products/" + _id}>
          <Text lineClamp={2} className="cursor-pointer hover:text-[#37B24D]">
            {title}
          </Text>
        </Link>
        <Box>
          <Box>
            <Rating defaultValue={3.5} size="xs" fractions={2} readOnly />
            <Link href="/">
              <Text color="dimmed" size="sm" className="cursor-pointer">
                (12 Reviews)
              </Text>
            </Link>
          </Box>
          <Text weight="bold" size="lg">
            {price}$
          </Text>
        </Box>
        <Group>
          <AddToCart />
        </Group>
      </Stack>
    </Stack>
  );
}

export default ProductCard;
