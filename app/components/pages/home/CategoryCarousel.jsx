import React from "react";
import { createStyles, Text, Box } from "@mantine/core";
import Link from "next/link";
import { data } from "../../../data/categories";
import { Carousel } from "@mantine/carousel";

const useStyles = createStyles((theme) => ({
  card: {
    height: '130px',
    cursor: 'pointer',
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
  }
}));

function CategoryCarousel() {
  const { classes } = useStyles();
  return (
    <Box maw={1024} mx="auto" px={16} mb={20} >
      <Text weight={700} size={24} mb={16}>Catalogs</Text>
      <Carousel
        height={130}
        withControls={true}
        align="start"
        slideGap={10}
        slideSize="14.2857142857%"
        controlSize={26}
        breakpoints={[
          { maxWidth: 'md', slideSize: '16.67%', slidesToScroll: 3 },
          { maxWidth: '857', slideSize: '20%' },
          { maxWidth: '710', slideSize: '25%' },
          { maxWidth: '575', slideSize: '33.33%' },
          { maxWidth: '440', slideSize: '50%' },
          { maxWidth: '320', slideSize: '100%' },
        ]}
        styles={(theme) => ({
          controls: {
            padding: '0',
            position: 'absolute',
            top: '-44px',
            boxShadow: 'none',
            justifyContent: 'flex-end',
            gap: '6px',
            previousControlIcon: {
              backgroundColor: 'red'
            }
          },
          control: {
            boxShadow: 'none'
          }
        })}
      >
        {
          data.map((category, ind) => {
            return (
              <Carousel.Slide>
                <Link key={ind} href={`/catalog/${category.path}`}>
                  <Box className={classes.card}>
                    <Text p={16} size={14} weight={600} ta="center">{category.title}</Text>
                  </Box>
                </Link>
              </Carousel.Slide>
            )
          })
        }
      </Carousel>
    </Box>
  )
}

export default CategoryCarousel