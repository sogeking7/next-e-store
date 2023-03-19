import {Box, Container, Group, Select, Stack} from "@mantine/core";
import ProductCard from "./ProductCard";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {useQuery} from "react-query";
import axios from "axios";
import Loader from "../../../ui/Loader";

const layout = 0;

const grid =
  "grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-4 phone:grid-cols-3 mini:grid-cols-2 basic: grid-cols-1 md:gap-x-4 gap-x-2 gap-y-6";
const flex = "flex flex-col gap-4";

function ProductGrid() {
  // const { classes } = useStyle();
  const router = useRouter();

  const [value, setValue] = useState(router.query.sort ? router.query.sort : "featured");
  useEffect(() => {
    const query = router.query;
    query.sort = value;
    router.push({
      pathname: `/catalog/${query.category_name}`,
      query: query
    })
  }, [value])


  const {isLoading, error, data} = useQuery(['products', router], () => {
    let rating;
    let {from, to, category_name} = router.query;
    if (!to) to = 1000
    if (router.query.rating) rating = parseFloat(router.query.rating);
    const params = `from=${from ? from : '0'}&to=${to ? to : '0'}${rating ? `&rating=${rating}` : ``}`
    const link = `/api/products/${category_name}?${params}&sort=${router.query.sort ? router.query.sort : 'featured'}`;
    return axios.get(link).then(res => res.data)
  })

  if (isLoading) return (
    <Container size="lg" className="flex justify-center p-[20vh]">
      <Loader size="lg" color="blue" variant="oval"/>
    </Container>
  )
  if (error) return 'An error has occurred: ' + error.message

  return (
    <Stack spacing="md" className="overflow-hidden w-full md:w-[80%] p-4">

      <Box className="md:block hidden">
        <Group position="right">
          <Select
            radius="md"
            value={value}
            className="w-[140px]"
            placeholder="Not set"
            size="xs"
            onChange={setValue}
            data={[
              { value: "desc", label: "Price: high to low" },
              { value: "asc", label: "Price: low to high" },
              { value: "name", label: "Alphabetically" },
              { value: "featured", label: "Featured" },
            ]}
          />
        </Group>
      </Box>

      <Box className={layout ? flex : grid}>
        {data.map((product) => (
          <ProductCard key={product.id} product={product} layout={layout} />
        ))}
      </Box>
    </Stack>
  );
}

export default ProductGrid;
