import Head from "next/head";
import ProductDetail from "../../../../components/pages/productId/product/ProductDetail";
import {useQuery} from "react-query";
import axios from "axios";
import {Container} from "@mantine/core";
import Loader from "../../../../components/ui/Loader";
import React from "react";
import {useRouter} from "next/router";
import {unslugify} from "../../../../lib/utils/method";
import Bread from "../../../../components/layouts/Bread";

function getList(router) {
  return [
    {title: 'Home', href: '/'},
    {title: unslugify(router.query.category_name), href: `/catalog/${router.query.category_name}`},
  ];
}

function Id() {
  const router = useRouter();

  const { isLoading, error, data } = useQuery(['productId', { type: 'done' }], () => {
    return axios
      .get(`/api/products/${router.query.category_name}/${router.query.id}`)
      .then(res => res.data)
  })

  if (isLoading) return (
    <Container size="lg" className="flex justify-center p-[20vh]">
      <Loader size="lg" color="indigo.5" variant="dots" />
    </Container>
  )
  if (error) return 'An error has occurred: ' + error.message

  const list = getList(router);
  list.push({title: data.title, href: `/catalog/${router.query.category_name}/item/${data.id}`})

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
