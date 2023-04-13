import React, { useState } from "react";
import { Box, createStyles, Text, Flex } from "@mantine/core";
import ProductGrid from "../../../components/pages/catalog/product/ProductGrid";
import { FilterDrawer } from "../../../components/pages/catalog/filter/FilterDrawer";
import { useRouter } from "next/router";
import Bread from "../../../components/layouts/Bread";
import SortSelect from "../../../components/pages/catalog/SortSelect";
import { unslugify } from "../../../lib/utils/method";
import { Filter } from "../../../components/pages/catalog/filter/Filter";
import Search from '../../../components/layouts/Search.jsx'
import Layout from "../../../components/layouts/Layout";

const useStyle = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    paddingBottom: '61px',
    minHeight: '100vh',
    overflow: 'hidden',
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
  },
  sideBarWrapper: {
    minWidth: '210px',
    ['@media (max-width: 767px)']: {
      display: 'none'
    },
  },
  mainWrapper: {
    width: '100%',
    padding: '0 0 0 2rem',
    ['@media (max-width: 767px)']: {
      padding: '0'
    },
  },
  orders: {
    minWidth: '250px',
    ['@media (max-width: 1023px)']: {
      display: 'none'
    },
    backgroundColor: 'red'
  }
}));

function getList(router) {
  return [
    { title: 'Home', href: '/' },
    { title: unslugify(router.query.category_name), href: `/catalog/${router.query.category_name}` },
  ]
}

function Store() {
  const router = useRouter();
  const { classes } = useStyle();

  //Bottom Filter Bar Hook
  const [opened, setOpened] = useState(false);

  //Layout Hook
  const [layout, setLayout] = useState(0);

  const breadList = getList(router);
  return (
    <Layout>
      <FilterDrawer opened={opened} setOpened={setOpened} />
      <Box maw={1024} mx="auto" p={16}>
        <Box className="md:hidden" mb={16}>
          <Search />
        </Box>
        <Box className="hidden md:block">
          <Bread list={breadList} />
        </Box>
        <Flex>
          <Box className={classes.sideBarWrapper}>
            <Filter />
          </Box>
          <Box className={classes.mainWrapper}>
            <Text weight={600} mb="md" size={32}>{breadList[1].title}</Text>
            <SortSelect layout={layout} setLayout={setLayout} />
            <ProductGrid layout={layout} />
          </Box>
        </Flex>
      </Box>
    </Layout>
  );
}

export default Store;
