import React, {useEffect, useState} from "react";
import {
  Box,
  Container,
  Flex,
  createStyles,
  Group,
  Select,
  Stack,
  Title
} from "@mantine/core";
import Footer from "../../../components/layouts/Footer";
import MobileNavBar from "../../../components/layouts/MobileNavBar";
import ProductGrid from "../../../components/pages/catalog/product/ProductGrid";
import FilterDrawer from "../../../components/pages/catalog/filter/FilterDrawer";
import FilterSideBar from "../../../components/pages/catalog/filter/FilterSideBar";
import CatalogHeader from "../../../components/layouts/CatalogHeader";
import {useRouter} from "next/router";
import Bread from "../../../components/layouts/Bread";

const useStyle = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    paddingBottom: '256.19px',
    minHeight: '100vh',
    overflow: 'hidden',
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
  },
  container: {
    padding: '0 1rem',
  }
}));

const unslugify = (slug) => slug.replace(/\-/g, " ")
  .replace(/\w\S*/g,
    (text) => text.charAt(0).toUpperCase() + text.slice(1).toLowerCase());

function getList(router) {
  const list = [
    {title: 'Home', href: '/'},
    {title: unslugify(router.query.category_name), href: `/catalog/${router.query.category_name}`},
  ]
  return list;
}

function Category(options) {
  const router = useRouter();
  const {classes} = useStyle();
  const [opened, setOpened] = useState(false);
  const [value, setValue] = useState(router.query.sort ? router.query.sort : "featured");

  useEffect(() => {
    const query = router.query;
    query.sort = value;
    router.push({
      pathname: `/catalog/${query.category_name}`,
      query: query,
    }, undefined,  { shallow: true })
  }, [value])

  return (
    <Box className={classes.wrapper}>
      <CatalogHeader setOpened={setOpened} isFilterOn={true}/>
      <MobileNavBar/>
      <FilterDrawer opened={opened} setOpened={setOpened}/>
      <Container size="lg" className="md:p-0 px-0 py-4 mb-16">
        <Bread list={getList(router)}/>
        <Flex>
          <FilterSideBar />
          <Stack spacing="md" className="overflow-hidden w-full md:w-[80%]">
            <Box className="md:block hidden">
              <Box className="mb-4">
                <Title order={1}>{getList(router)[1].title}</Title>
              </Box>
              <Group position="left">

                <Select
                  radius="md"
                  value={value}
                  className="w-[140px]"
                  placeholder="Not set"
                  size="xs"
                  onChange={setValue}
                  data={[
                    {value: "desc", label: "Price: high to low"},
                    {value: "asc", label: "Price: low to high"},
                    {value: "name", label: "Alphabetically"},
                    {value: "featured", label: "Featured"},
                  ]}
                />
              </Group>
            </Box>
            <ProductGrid/>
          </Stack>
        </Flex>
      </Container>
      <Footer/>
    </Box>
  );
}

export default Category;
