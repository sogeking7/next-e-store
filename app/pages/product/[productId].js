import { useState } from "react";
import { Container, createStyles, Box, Flex, Modal, Stack, Divider, Loader } from "@mantine/core";
import { Carousel } from '@mantine/carousel'

import CatalogHeader from '../../components/layouts/CatalogHeader'
import Footer from "../../components/layouts/Footer";
import MobileNavBar from "../../components/layouts/MobileNavBar";

import ProductDetail from '../../components/pages/productId/product/ProductDetail'

import { useRouter } from "next/router";

const useStyles = createStyles((theme) => ({
  Card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : '#fff',
    width: '100%',
    border: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[4]
      }`,
    borderRadius: '8px'
  },
  carouselIndicator: {
    width: 6,
    height: 6,
    transition: 'width 250ms ease',
    backgroundColor: `${theme.colorScheme === "dark" ? theme.colors.gray[5] : theme.colors.gray[5]
      }`,
    "&[data-active]": {
      backgroundColor: `${theme.colorScheme === "dark"
        ? theme.colors.blue[5]
        : theme.colors.blue[6]
        }`,
    },
  },
}));

function ProductId({ product }) {
  const router = useRouter();

  const { title, images, price, rating, _id } = product;
  const { classes } = useStyles();
  const [index, setIndex] = useState(0);


  return (
    <Stack spacing='sm' className={classes.wrapper}>
      <CatalogHeader />
      <MobileNavBar />

      <Container size="lg" className="w-full">
        <div className={classes.Card}>
          <Flex className="md:flex-row flex-col w-full rounded-md">
            <div className="flex flex-col md:w-2/3 h-full relative bg-white rounded-lg">

              <div className="w-full h-full pt-4 md:pb-32 pb-0 md:px-16 px-4 duration-500 transition ease-in-out">
                <img
                  src={images[index]}
                  className="md:block hidden max-h-[300px] transition-opacity w-full duration-500 object-contain ease-in-out"
                />
                <div className="md:hidden block">
                  <Carousel
                    withIndicators
                    withControls={false}
                    align="center"
                    classNames={{
                      indicator: classes.carouselIndicator,
                    }}
                  >
                    {images.map((image, ind) => {
                      return <Carousel.Slide key={ind} className="mb-10">
                        <img
                          src={image}

                          className="max-h-[300px] transition-opacity w-full duration-500 object-contain ease-in-out"
                        />
                      </Carousel.Slide>
                    })}
                  </Carousel>
                </div>
              </div>
              <div className="md:block hidden">
                <div style={{
                  paddingBottom: '1rem',
                  paddingLeft: '1rem',
                  display: 'grid',
                  width: '100%',
                  height: '100%',
                  gridTemplateColumns: `repeat(${images.length}, minmax(0, 1fr))`
                }}>
                  {images.map((image, ind) => {
                    return <div key={ind} style={
                      {
                        width: '100%',
                        maxHeight: '75px',
                        border: ind === index ? '1px solid #228be6' : ''
                      }
                    }>
                      <img
                        onClick={() => setIndex(ind)}
                        className="w-full h-full object-contain"
                        src={image}
                      />
                    </div>
                  })}
                </div>
              </div>

            </div>
            <Divider orientation="vertical" />
            <ProductDetail title={title} price={price} rating={rating} />
          </Flex>
        </div>
      </Container>
      <Footer />

    </Stack>
  );
}

export const getServerSideProps = async (context) => {
  const { params } = context;
  const productId = params.productId;

  console.log(productId);

  const url = 'http://localhost:3000';
  const res = await fetch(`${url}/api/product/${productId}`)
  const data = await res.json()

  if (!Object.keys(data).length || data.error || !data) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      product: JSON.parse(JSON.stringify(data)),
    },
  }
};

export default ProductId;
