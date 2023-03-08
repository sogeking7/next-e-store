import {useEffect, useState} from "react";
import { Box, Container, Flex, createStyles } from "@mantine/core";
import Footer from "../../components/layouts/Footer";
import MobileNavBar from "../../components/layouts/MobileNavBar";
import ProductGrid from "../../components/pages/catalog/product/ProductGrid";
import FilterDrawer from "../../components/pages/catalog/filter/FilterDrawer";
import FilterSideBar from "../../components/pages/catalog/filter/FilterSideBar";
import CatalogHeader from "../../components/layouts/CatalogHeader";
import {useRouter} from "next/router";
import {useQuery} from "react-query";
import axios from "axios";

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

function Catalog(options) {
  const router = useRouter();
  const { classes } = useStyle()
  const [opened, setOpened] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(()=>{
    try {
      // setLoading(true);
      let rating, category;
      const {from, to} = router.query;
      if (router.query.category && router.query.category !== 'all') category = router.query.category;
      if (router.query.rating) rating = parseFloat(router.query.rating);
      const params = `from=${from ? from : '0'}&to=${to ? to : '0'}${category ? `&category=${category}` : ``}${rating ? `&rating=${rating}` : ``}`
      const link = `/api/products?${params}&order=${router.query.order ? router.query.order : 'featured'}`;

      axios
        .get(link)
        .then(res => {
          const sortedProducts = res.data;
          setProducts(sortedProducts)
        })
    } catch (e) {
      // setLoading(false);
      console.error(e)
    }
  }, [router]);

  // const fetchProducts = async() => {
  //   let rating, category;
  //   const {from, to} = router.query;
  //   if (router.query.category && router.query.category !== 'all') category = router.query.category;
  //   if (router.query.rating) rating = parseFloat(router.query.rating);
  //   const params = `from=${from ? from : '0'}&to=${to ? to : '0'}${category ? `&category=${category}` : ``}${rating ? `&rating=${rating}` : ``}`
  //   const link = `/api/products?${params}&order=${router.query.order ? router.query.order : 'featuted'}`;
  //   const res = await axios.get(link);
  //   return res.data;
  // }
  //
  // const {data:products, isLoading, isError, isSuccess} = useQuery("products", fetchProducts)

  // if (isLoading) {
  //   return <Box>Loading...</Box>
  // }
  // if (isError) {
  //   return <Box>Error!</Box>
  // }
  // if (isSuccess) {
    return (
      <Box className={classes.wrapper}>
        <CatalogHeader setOpened={setOpened}/>
        <MobileNavBar/>
        <FilterDrawer opened={opened} setOpened={setOpened}/>
        <Container size="lg" className="md:p-0 px-0 py-4">
          <Flex>
            <FilterSideBar/>
            <ProductGrid products={products}/>
          </Flex>
        </Container>
        <Footer/>
      </Box>
    );
  // }

}

export default Catalog;
