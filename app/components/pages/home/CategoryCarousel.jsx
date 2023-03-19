import React, {useEffect, useState} from "react";
import {Box, Button, Container, createStyles, Flex, Image, Text, Title} from "@mantine/core";
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
import {useQuery} from "react-query";
import Loader from "../../ui/Loader";

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
    // border: '1px solid black',
    height: '240px',
    cursor: 'pointer',
    // fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px 16px 16px 16px',
    borderRadius: '16px',
    background: theme.colorScheme === 'dark' ? theme.colors.dark[7] : 'white',
  },
  gradient: {
    backgroundImage: theme.colorScheme === 'dark' ? theme.fn.linearGradient(85, theme.colors.blue[4], theme.colors.grape[2], theme.colors.grape[5]) : theme.fn.linearGradient(85, theme.colors.blue[6], theme.colors.grape[7])
  },
  bgGray: {
    paddingBottom: '2rem',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[1],
  }
}));
const unslugify = (slug) => slug.replace(/\-/g, " ").replace(/\w\S*/g,
  (text) => text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
);

function CategoryCarousel() {
  const router = useRouter();
  const { classes } = useStyle();
  const {isLoading, error, data} = useQuery('categories', ()=>{
    return axios.get('/api/categories').then(res => res.data)
  })

  if (isLoading) return <Loader/>
  if (error) return 'An error has occurred: ' + error.message
  return (
    <Box className={classes.bgGray}>
      <Container size="lg" className="py-16">
        <Box className="text-center pb-8">
          <Title>Online Store</Title>
        </Box>
        <Box className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-4 phone:grid-cols-3 mini:grid-cols-2 basic: grid-cols-1 md:gap-x-4 gap-x-3 gap-y-6">
          {
            data.map((category, ind) => {
            return <Link href={`/catalog/${category.name}`}>
                <Box className={classes.wrapper}>
                  <Box className='flex gap-y-2 justify-center flex-col w-[150px] relative items-center break-words'  >
                    <Image src={category.image} className="object-contain "/>
                    <Box className="text-center">{unslugify(category.name)}</Box>
                  </Box>
                </Box>
              </Link>
            })
          }
        </Box>
      </Container>
    </Box>
  )
}

export default CategoryCarousel