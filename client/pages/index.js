import { useState } from "react";

import { Box, Container, Flex, createStyles } from "@mantine/core";

import Header from "../components/layouts/Header";
import Footer from "../components/layouts/Footer";
import MobileNavBar from "../components/layouts/MobileNavBar";

import ProductGrid from "../components/pages/home/product/ProductGrid";
import FilterDrawer from "../components/pages/home/filter/FilterDrawer";
import FilterSideBar from "../components/pages/home/filter/FilterSideBar";

const useStyle = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    overflow: 'hidden',
    fontFami: 'Roboto',

    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : '#FFFFFF'
  },
  container: {
    padding: '0 1rem',
  }
}));

function Home({ products }) {
  const { classes } = useStyle()
  const [opened, setOpened] = useState(false); //FilterDrawer hook
  return (
    <Box className={classes.wrapper}>
      <Header setOpened={setOpened} />
      <MobileNavBar />
      <FilterDrawer opened={opened} setOpened={setOpened} />
      <Container size="lg" className="md:p-0 px-0 py-4">
        <Flex>
          <FilterSideBar />
          <ProductGrid products={products} />
        </Flex>
      </Container>
      <Footer />
    </Box>
  );
}

const prod = "https://next-e-store-api-sogeking7.vercel.app",
  dev = "http://localhost:9000";

export const getStaticProps = async () => {
  const res = await fetch(`${prod}/api/products`);
  console.log('(Re-)Generating...');
  const products = await (res).json();

  return {
    props: {
      products,
    },
    revalidate: 5,
  };
};

export default Home;
