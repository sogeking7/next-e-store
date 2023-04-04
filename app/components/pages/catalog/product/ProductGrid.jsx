import { Text } from "@mantine/core";
import ProductCard from "./ProductCard";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import axios from "axios";
import Loader from "../../../ui/Loader";

function ProductGrid() {
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

  if (isLoading) return (
    <div className="max-w-7xl mx-auto flex justify-center py-[20vh]">
      <Loader size="lg" color="blue" variant="oval" />
    </div>
  )
  if (error) return (
    <Text weight={500}>Sorry, no products were found matching your criteria.</Text>
  )

  return (
    <div className="grid lgg:grid-cols-3 lg:grid-cols-2 mmd:grid-cols-3 md:grid-cols-2 sm:grid-cols-3 phone:grid-cols-2 mini:grid-cols-1 basic: grid-cols-1 md:gap-x-4 gap-x-2 gap-y-6">
      {data.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid;
