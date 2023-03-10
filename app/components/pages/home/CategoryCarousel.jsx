import React, {useEffect, useState} from "react";
import {Box, Button, Container, createStyles, Flex, Text} from "@mantine/core";
import axios from "axios";
import {useRouter} from "next/router";
import Link from "next/link";
import {
  IconBooks,
  IconDeviceDesktop, IconDeviceIpad,
  IconDeviceLaptop,
  IconDeviceMobile,
  IconDeviceWatchStats2, IconFileUnknown, IconGridDots,
  IconHeadphones
} from "@tabler/icons";

const icons = [

  <IconDeviceDesktop />,
  <IconHeadphones />,
  <IconBooks />,

  <IconDeviceMobile />,
  <IconDeviceWatchStats2/>,
  <IconDeviceLaptop />,

  <IconDeviceIpad />,
  <IconFileUnknown />,
  <IconGridDots />,


]
const useStyle = createStyles((theme) => ({
  wrapper: {
    // backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3],
    // color: theme.colorScheme === 'dark' ? theme.colors.gray[0] : theme.colors.dark[5],
    fontSize: '16px',
    height: '120px',
    borderRadius: "8px",
  },
  gradient: {
    backgroundImage: theme.colorScheme === 'dark' ? theme.fn.linearGradient(85, theme.colors.blue[4], theme.colors.grape[2], theme.colors.grape[5]) : theme.fn.linearGradient(85, theme.colors.blue[6], theme.colors.grape[7])
  },
  bg: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : '#fff',

  }
}));
const unslugify = (slug) => slug.replace(/\-/g, " ").replace(/\w\S*/g,
  (text) => text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
);

function CategoryCarousel() {
  const router = useRouter();
  const { classes } = useStyle();

  const [categories, setCategories] = useState([]);
  useEffect(()=>{
    try {
      const link = `/api/categories`;
      axios
        .get(link)
        .then(res => {
          setCategories(res.data)
        })
    } catch (e) {
      console.error(e)
    }
  }, []);
  return (
    <Box className={classes.bg}>
      <Container size="lg">
        <Box className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-4 phone:grid-cols-3 mini:grid-cols-2 basic: grid-cols-1 md:gap-x-4 gap-x-2 gap-y-6">
          {categories.map((category, ind) => {
            return <Link href={`/catalog/${category.name}`}>
                <Button variant="default" className={classes.wrapper}>
                  <Box className='flex gap-y-2 justify-center flex-col items-center'>
                    <Box>{icons[ind]}</Box>
                    <Box>{unslugify(category.name)}</Box>
                  </Box>

                </Button>
              </Link>

          })}
        </Box>
      </Container>
    </Box>
  )
}

export default CategoryCarousel;