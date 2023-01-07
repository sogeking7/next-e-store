
import { Container, createStyles, Flex, Modal, Stack } from "@mantine/core";

import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import MobileNavBar from "../../components/layouts/MobileNavBar";

import ProductCarousel from "../../components/pages/productId/ProductCarousel";

//embla
import EmblaCarousel from '../../components/layouts/embla-carousel/EmblaCarousel'
import { useState } from "react";
import ProductDetail from "../../components/pages/productId/ProductDetail";
const OPTIONS = {}
const SLIDE_COUNT = 4
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

const useStyles = createStyles((theme) => ({
  Card: {
    border: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
      }`,
    borderRadius: '4px'
  },
  Modal: {
    backgroundColor: 'white',
  }
}));

function ProductId({ product }) {
  const { title, images, price, rating, _id } = product;
  const { classes } = useStyles();
  const [opened, setOpened] = useState(false);
  return (
    <Stack  spacing='sm'>
      <Header />
      <MobileNavBar />
      <Modal
        centered
        className={classes.Modal}
        opened={opened}
        onClose={() => setOpened(false)}
        size="xl"
      >
        <ProductCarousel images={images} />
      </Modal>
      <Container size="lg">
        <div className={classes.Card}>
          <Flex className="md:flex-row flex-col md:gap-4 gap-4">
            <EmblaCarousel setOpened={setOpened} slides={images} options={OPTIONS} />
            <ProductDetail title={title} price={price} rating={rating}/>
          </Flex>
        </div>
      </Container>
      <Footer />
    </Stack>
  );
}

const prod = "https://next-e-store-api-sogeking7.vercel.app";
const dev = "http:localhost:9000";

export const getStaticPaths = async () => {
  const res = await fetch(`${prod}/api/products`);
  const data = await res.json();

  const paths = data.map((product) => {
    return {
      params: { productId: product._id.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const productId = context.params.productId;
  const res = await fetch(`${prod}/api/products/${productId}`);
  const data = await res.json();

  return {
    props: {
      product: data,
    },
  };
};

export default ProductId;
