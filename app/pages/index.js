import React from 'react'
import HeroTitle from '../components/pages/home/HeroTitle'
import CategoryCarousel from "../components/pages/home/CategoryCarousel";
import CatalogHeader from "../components/layouts/CatalogHeader";
import {createStyles} from "@mantine/core";
import Footer from "../components/layouts/Footer";

const useStyle = createStyles((theme) => ({
  bgWhite: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : '#fff',
    height: "100vh"
  },
  bgGray: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.dark[8],
  },
  wrapper: {
    minHeight: '100vh',
    paddingBottom: '392.19px',
    position: 'relative'
  }
}));

// const UserContext = createContext();

function Home() {
  const { classes } = useStyle();

  return (
    <div className={classes.wrapper}>
      <CatalogHeader />
      <HeroTitle />
      {/*<CategoryCarousel />*/}
      <Footer/>
    </div>
  )
}

export default Home