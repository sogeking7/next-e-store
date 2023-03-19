import {useEffect, useState} from "react";
import { Box, Container, Flex, createStyles } from "@mantine/core";
import Footer from "../../../components/layouts/Footer";
import MobileNavBar from "../../../components/layouts/MobileNavBar";
import ProductGrid from "../../../components/pages/catalog/product/ProductGrid";
import FilterDrawer from "../../../components/pages/catalog/filter/FilterDrawer";
import FilterSideBar from "../../../components/pages/catalog/filter/FilterSideBar";
import CatalogHeader from "../../../components/layouts/CatalogHeader";
import {useRouter} from "next/router";
import LoaderComponent from '../../../components/ui/Loader'
import axios from "axios";
import {useQuery} from "react-query";
import Loader from "../../../components/ui/Loader";

const useStyle = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    minHeight: '120vh',
    paddingBottom: '168.19px',
    overflow: 'hidden',
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : '#FFFFFF'
  },
  container: {
    padding: '0 1rem',
  }
}));

function Category(options) {
  const router = useRouter();
  const { classes } = useStyle();
  const [opened, setOpened] = useState(false);

  return (
    <Box className={classes.wrapper}>
      <CatalogHeader setOpened={setOpened}/>
      <MobileNavBar/>
      <FilterDrawer opened={opened} setOpened={setOpened}/>
      <Container size="lg" className="md:p-0 px-0 py-4 mb-16">
        <Flex>
          <FilterSideBar/>
          <ProductGrid />
        </Flex>
      </Container>
      <Footer/>
    </Box>
  );
}

export default Category;
