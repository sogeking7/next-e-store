import React from "react";
import { Button, Box, Text, Rating, Flex, Stack } from "@mantine/core";

function ProductDetail({ title, price, rating }) {
  return (
    <Stack spacing="md" className="md:w-1/3 w-full p-4">
      <Box>
        <Text className="text-2xl" lineClamp={2}>
          {title}
        </Text>
        <Flex align="center" className="gap-1">
          <Rating readOnly defaultValue={rating} fractions={2} />
          <Text color="blue" className="text-sm cursor-pointer hover:underline">
            ({100} review)
          </Text>
        </Flex>
      </Box>
      <Text className="text-xl" weight="bold">
        {price}$
      </Text>
      <Button color="green" variant="filled" >
        Add to Cart
      </Button>
    </Stack>
  );
}

export default ProductDetail;
