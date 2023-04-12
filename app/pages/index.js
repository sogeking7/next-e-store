import React from 'react'
import HeroTitle from '../components/pages/home/HeroTitle'
import CategoryCarousel from "../components/pages/home/CategoryCarousel";
import Layout from '../components/layouts/Layout.jsx'
import {DarkModeButton} from '../components/ui/DarkModeButton.jsx'
import {Group, Box} from '@mantine/core'
function Home() {
  return (
    <>
      <Box p="md" className="md:hidden">
        <Group position="right">
          <DarkModeButton />  
        </Group>
      </Box>
      <HeroTitle/>
      <CategoryCarousel/>
    </>
  )
}

export default Home
