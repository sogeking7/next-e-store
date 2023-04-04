import React, {useState} from "react";
import {Box, createStyles, Title} from "@mantine/core";
import ProductGrid from "../../../components/pages/catalog/product/ProductGrid";
import {FilterDrawer} from "../../../components/pages/catalog/filter/FilterDrawer";
import {useRouter} from "next/router";
import Bread from "../../../components/layouts/Bread";
import SortSelect from "../../../components/pages/catalog/SortSelect";
import {unslugify} from "../../../lib/utils/method";
import Filter from "../../../components/pages/catalog/filter/Filter";

const useStyle = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    paddingBottom: '61px',
    minHeight: '100vh',
    overflow: 'hidden',
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
  },
  filter: {
    minWidth: '210px',
    ['@media (max-width: 768px)']: {
      display: 'none'
    },
  },
  products: {
    width: '100%',
    padding: '0 2rem',
    ['@media (max-width: 768px)']: {
      padding: '0'
    },
  },
  orders: {
    minWidth: '210px',
    ['@media (max-width: 1023px)']: {
      display: 'none'
    },
    backgroundColor: 'red'
  }
}));

function getList(router) {
  return [
    {title: 'Home', href: '/'},
    {title: unslugify(router.query.category_name), href: `/catalog/${router.query.category_name}`},
  ]
}

function Store() {
  const router = useRouter();
  const {classes} = useStyle();
  const [opened, setOpened] = useState(false);
  const breadList = getList(router);

  return (
    <>
      <FilterDrawer opened={opened} setOpened={setOpened}/>

      <Box className="max-w-7xl mx-auto p-4">
        <Bread list={breadList}/>
        <div className="flex">
          <div className={classes.filter}>
            <Filter/>
          </div>
          <div className={classes.products}>
            <Title className="mb-4" order={1}>{breadList[1].title}</Title>
            <SortSelect/>
            <ProductGrid/>
          </div>
          <div className={classes.orders}>

          </div>
        </div>
      </Box>
    </>
  );
}

export default Store;
