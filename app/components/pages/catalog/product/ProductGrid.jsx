import { Box, Flex, Text, Loader} from "@mantine/core";
import ProductCard from "./ProductCard";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import axios from "axios";

function ProductGrid({ layout }) {
  const router = useRouter();

  const { isLoading, error, data } = useQuery(['products', router], async () => {
    let rating;
    let { from, to, category_name } = router.query;
    if (!to) to = 1000
    if (router.query.rating) rating = parseFloat(router.query.rating);
    const params = `from=${from ? from : '0'}&to=${to ? to : '0'}${rating ? `&rating=${rating}` : ``}`
    const link = `/api/products/${category_name}?${params}&sort=${router.query.sort ? router.query.sort : 'featured'}`;
    return await axios.get(link).then(res => res.data)
  })

  if (isLoading) {
    return (
      <Flex maw={1024} mx="auto" justify='center' align="center" py="20vh">
        <Loader size="lg" color="blue" variant="oval" />
      </Flex>
    )
  }
  
  if (error) {
    return (
      <Text weight={500}>Sorry, no products were found matching your criteria.</Text>
    )
  }

  const gridTail = "grid lgg:grid-cols-4 lg:grid-cols-4 mmd:grid-cols-3 md:grid-cols-3 sm:grid-cols-3 phone:grid-cols-3 mini:grid-cols-2 basic: grid-cols-1 md:gap-x-4 gap-x-2 gap-y-6"
  const flexTail = "grid grid-cols-1 gap-4"

  return (
    <Box className={layout ? flexTail : gridTail}>
      {data.products.map((product) => {
        product = {
          category: {
            name: data.name
          }, ...product
        }
        return <ProductCard layout={layout} key={product.id} product={product} />
      })}
    </Box>
  );
}

export default ProductGrid;
