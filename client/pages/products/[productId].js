
import { Container, createStyles, Flex, Modal, Stack, Divider } from "@mantine/core";

import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import MobileNavBar from "../../components/layouts/MobileNavBar";

import ProductDetail from '../../components/pages/productId/product/ProductDetail'
import CustomCarousel from '../../components/pages/productId/product/CustomCarousel';

const useStyles = createStyles((theme) => ({
  wrapper: {
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0]
  },
  Card: {
    backgroundColor: 'white',
    width: '100%',
    border: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[4]
      }`,
    borderRadius: '4px'
  },
}));

function ProductId({ product }) {
  const { title, images, price, rating, _id } = product;
  const { classes } = useStyles();

  return (
    <Stack spacing='sm' className={classes.wrapper}>
      <Header />
      <MobileNavBar />

      <Container size="lg" className="w-full">
        <div className={classes.Card}>
          <Flex className="md:flex-row flex-col w-full">
            <CustomCarousel images={images} />
            <Divider orientation="vertical" />
            <ProductDetail title={title} price={price} rating={rating} />
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
