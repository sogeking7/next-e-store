import React from "react";
import {Box, Card, createStyles, Image, Title} from "@mantine/core";
import Link from "next/link";
import {data} from "../../../data/categories";
import {Carousel} from "@mantine/carousel";

const useStyles = createStyles((theme) => ({

}));

function CategoryCarousel() {
  const {classes} = useStyles();
  return (
    <Box className="max-w-7xl mx-auto px-4 mb-6">
      <Title order={2} className="mb-4">Catalogs</Title>
      <Carousel
        height={130}
        withControls={true}
        align="start"
        slideGap={10}
        slideSize="14.2857142857%"
        controlSize={26}
        breakpoints={[
          { maxWidth: 'md', slideSize: '16.67%', slidesToScroll: 3},
          { maxWidth: '857', slideSize: '20%'},
          { maxWidth: '710', slideSize: '25%'},
          { maxWidth: '575', slideSize: '33.33%'},
          { maxWidth: '440', slideSize: '50%'},
          { maxWidth: '320', slideSize: '100%'},
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
        }) }
      >
        {
          data.map((category, ind) => {

            return (
              <Carousel.Slide>
                <Link key={ind} href={`/catalog/${category.path}`}>
                  <Card shadow="xs" padding="lg" radius="md" withBorder className="h-[130px] cursor-pointer">
                    <Card.Section className="p-4 text-center text-[14px] font-[600]">{category.title}</Card.Section>
                  </Card>
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