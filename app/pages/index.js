import React from 'react'
import HeroTitle from '../components/pages/home/HeroTitle'
import CategoryCarousel from "../components/pages/home/CategoryCarousel";
import CatalogHeader from "../components/layouts/CatalogHeader";
import {createStyles} from "@mantine/core";

const useStyle = createStyles((theme) => ({
  bg: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : '#fff',
    height: "100vh"
  }
}));

function Home() {
  const { classes } = useStyle();

  return (
    <div className={classes.bg}>
      <CatalogHeader />
      <HeroTitle />
      <CategoryCarousel />
    </div>
  )
}

export default Home