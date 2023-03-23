import React from 'react'
import HeroTitle from '../components/pages/home/HeroTitle'
import CatalogHeader from "../components/layouts/CatalogHeader";
import {createStyles} from "@mantine/core";
import Footer from "../components/layouts/Footer";

const useStyle = createStyles((theme) => ({
  wrapper: {
    minHeight: '99vh',
    paddingBottom: '202.19px',
    position: 'relative',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  }
}));

function Home() {
  const { classes } = useStyle();
  return (
    <div className={classes.wrapper}>
      <CatalogHeader isFilterOn={false}/>
      <HeroTitle />
      <Footer/>
    </div>
  )
}

export default Home