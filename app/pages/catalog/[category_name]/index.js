import React, { useState } from "react";
import { createStyles, Title } from "@mantine/core";
import ProductGrid from "../../../components/pages/catalog/product/ProductGrid";
import {FilterDrawer} from "../../../components/pages/catalog/filter/FilterDrawer";
import { useRouter } from "next/router";
import Bread from "../../../components/layouts/Bread";
import SortSelect from "../../../components/pages/catalog/SortSelect";
import { unslugify } from "../../../lib/utils/method";
import Filter from "../../../components/pages/catalog/filter/Filter";

const useStyle = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    paddingBottom: '61px',
    minHeight: '100vh',
    overflow: 'hidden',
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
  },
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
  const [opened, setOpened] = useState(false);
  const breadList = getList(router);

  return (
    <>
      <FilterDrawer opened={opened} setOpened={setOpened} />

      <div className="max-w-5xl mx-auto p-4">
        <Bread list={breadList} />
        <div className="flex w-full">
          <div className="hidden md:block">
            <div style={{ minWidth: '210px', marginRight: '2rem' }}>
              <Filter />
            </div>
          </div>
          <div className="w-full">
            <div className="mb-4">
              <Title className="mb-4" order={1}>{breadList[1].title}</Title>
              <div className="md:block hidden">
                <SortSelect />
              </div>
            </div>
            <ProductGrid />
          </div>
        </div>
      </div>
    </>
  );
}

export default Store;
