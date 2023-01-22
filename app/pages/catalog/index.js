import { useState } from "react";

import { Box, Container, Flex, createStyles } from "@mantine/core";

import Footer from "../../components/layouts/Footer";
import MobileNavBar from "../../components/layouts/MobileNavBar";

import ProductGrid from "../../components/pages/catalog/product/ProductGrid";
import FilterDrawer from "../../components/pages/catalog/filter/FilterDrawer";
import FilterSideBar from "../../components/pages/catalog/filter/FilterSideBar";
import CatalogHeader from "../../components/layouts/CatalogHeader";
import { getAllProducts } from "../api/products";

const useStyle = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    overflow: 'hidden',
    fontFamily: 'Roboto',

    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : '#FFFFFF'
  },
  container: {
    padding: '0 1rem',
  }
}));

function Catalog({ products }) {
  const { classes } = useStyle()
  const [opened, setOpened] = useState(false); //FilterDrawer hook
  return (
    <Box className={classes.wrapper}>
      <CatalogHeader setOpened={setOpened} />
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

export const getStaticProps = async () => {
  const data = await getAllProducts();

  return {
    props: {
      products: data
    },
    revalidate: 5,
  };
};

export default Catalog;
