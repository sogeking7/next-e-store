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

function Category(options) {
  const router = useRouter();
  const { classes } = useStyle()
  const [opened, setOpened] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    try {
      setLoading(true);
      let rating;
      const {from, to, category_name} = router.query;
      if (router.query.rating) rating = parseFloat(router.query.rating);
      const params = `from=${from ? from : '0'}&to=${to ? to : '0'}${rating ? `&rating=${rating}` : ``}`
      const link = `/api/products/${category_name}?${params}&sort=${router.query.sort ? router.query.sort : 'featured'}`;

      axios
        .get(link)
        .then(res => {
          const sortedProducts = res.data;
          setProducts(sortedProducts)
        })
      setLoading(false)
    } catch (e) {
      setLoading(false);
      console.error(e)
    }
  }, [router]);

      return (
        <Box className={classes.wrapper}>
          <CatalogHeader setOpened={setOpened}/>
          <MobileNavBar/>
          <FilterDrawer opened={opened} setOpened={setOpened}/>
          <Container size="lg" className="md:p-0 px-0 py-4">
            <Flex>
              <FilterSideBar/>
              {loading ? <LoaderComponent/> :
              <ProductGrid  products={products}/>}
            </Flex>
          </Container>
          <Footer/>
        </Box>
      );

  // }

}

export default Category;
