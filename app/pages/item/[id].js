import ProductDetail from '../../components/pages/productId/product/ProductDetail'
import {useQuery} from "react-query";
import axios from "axios";
import {Container} from "@mantine/core";
import Loader from "../../components/ui/Loader";
import React from "react";
import {useRouter} from "next/router";
import {unslugify} from "../../lib/utils/method";
import Bread from "../../components/layouts/Bread";
import Head from "next/head";

function Id() {
  const router = useRouter();
  const {category_name: categoryName, id: productId} = router.query;

  console.log(categoryName, productId);

  const { isLoading, error, data } =
    useQuery({
      queryKey: ['productId', { type: 'done' }],
      queryFn: async () => await axios
        .get(`/api/products/${categoryName}/${productId}`)
        .then(res => res.data),
      retry: false
    })

  if (isLoading) return (
    <Container size="lg" className="flex justify-center p-[20vh]">
      <Loader size="lg" color="indigo.5" variant="dots" />
    </Container>
  )

  if (error) {
    // router.push('/404');

    return <Text>{error.message}</Text>
  }

  const list = [{title: 'Home', href: '/'},]
  list.push({title: unslugify(data.category.name), href: `/catalog/${data.category.name}`})

  return (
    <>
      <Head>
        <title>{data.title}</title>
        <meta property="og:title" content={data.title} key="title" />
      </Head>
      <div className="max-w-7xl mx-auto p-4">
        <Bread list={list} />
        <ProductDetail data={data}/>
      </div>
    </>
  );
}

export default Id;
