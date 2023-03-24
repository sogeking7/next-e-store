import React from 'react'
import HeroTitle from '../components/pages/home/HeroTitle'
import CatalogHeader from "../components/layouts/CatalogHeader";
import {createStyles} from "@mantine/core";
import Footer from "../components/layouts/Footer";

const useStyle = createStyles((theme) => ({
  wrapper: {
    minHeight: '100vh',
    paddingBottom: '61px',
    position: 'relative',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
  }
}));

function Home() {
  const { classes } = useStyle();
  return (
    <div className={classes.wrapper}>
      <CatalogHeader/>
      <HeroTitle />
      <Footer/>
    </div>
  )
}

export default Home