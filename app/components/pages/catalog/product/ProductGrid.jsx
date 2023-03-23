import {Box, Container, Group, Select, Text, Title,} from "@mantine/core";
import ProductCard from "./ProductCard";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {useQuery} from "react-query";
import axios from "axios";
import Loader from "../../../ui/Loader";
import Image from "next/image";
import error_navigation
  from '../../../../public/error-support-navigation-lost-not-found-question-questions-faq-people.png'

const layout = 0;

const grid = "grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-4 phone:grid-cols-3 mini:grid-cols-2 basic: grid-cols-1 md:gap-x-4 gap-x-2 gap-y-6";
const flex = "flex flex-col gap-4";

function ProductGrid({title}) {
  const router = useRouter();

  const {isLoading, error, data} = useQuery(['products', router], async () => {
    let rating;
    let {from, to, category_name} = router.query;
    if (!to) to = 1000
    if (router.query.rating) rating = parseFloat(router.query.rating);
    const params = `from=${from ? from : '0'}&to=${to ? to : '0'}${rating ? `&rating=${rating}` : ``}`
    const link = `/api/products/${category_name}?${params}&sort=${router.query.sort ? router.query.sort : 'featured'}`;
    return await axios.get(link).then(res => res.data)
  })

  if (isLoading) return (
    <Container size="lg" className="flex justify-center py-[20vh]">
      <Loader size="lg" color="blue" variant="oval"/>
    </Container>
  )
  if (error) return (
    <Text weight={500}>Sorry, no products were found matching your criteria.</Text>
  )

  return (
    <>
      <Box className={grid}>
        {data.map((product) => (
          <ProductCard key={product.id} product={product} layout={layout}/>
        ))}
      </Box>
    </>
  );
}

export default ProductGrid;
