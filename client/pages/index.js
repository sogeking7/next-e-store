import { useState } from "react";

import { Box, Container, Flex } from "@mantine/core";

import Header from "../components/main/Header";
import Footer from "../components/main/Footer";
import MobileNavBar from "../components/main/MobileNavBar";

import ProductGrid from "../components/pages/home/product/ProductGrid";
import FilterDrawer from "../components/pages/home/filter/FilterDrawer";
import FilterSideBar from "../components/pages/home/filter/FilterSideBar";

function Home({ products }) {
  const [opened, setOpened] = useState(false); //FilterDrawer hook

  return (
    <Box className="relative overflow-hidden">
      <Header setOpened={setOpened} />
      <MobileNavBar />
      <FilterDrawer opened={opened} setOpened={setOpened} />
      <Container size="xl" className="py-4">
        <Flex gap="lg">
          <FilterSideBar />
          <ProductGrid products={products} />
        </Flex>
      </Container>
      <Footer/>
    </Box>
  );
}

const prod = "https://next-e-store-api-sogeking7.vercel.app",
      dev = "http://localhost:9000";

export const getStaticProps = async () => {
  const res = await fetch(`${prod}/api/products`);
  const products = await res.json();

  return {
    props: {
      products,
    },
  };
};

export default Home;
