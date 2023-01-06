import { Container, Text, Rating, Box } from "@mantine/core";

import Header from "../../components/main/Header";
import Footer from "../../components/main/Footer";
import MobileNavBar from "../../components/main/MobileNavBar";

import ProductCarousel from "../../components/pages/productId/product/carousel/ProductCarousel";
import AddToCart from "../../components/pages/productId/product/buttons/AddToCart";

function ProductId({ product }) {
  const { title, imageUrl, price, salePrice, rating, _id } = product;
  const images = new Array(5).fill(`${imageUrl}`);
  return (
    <div className="relative overflow-hidden">
      <Header />
      <MobileNavBar />
      <Container size="md">
        <div className="flex md:flex-row flex-col md:gap-8 gap-5 my-8">
          <ProductCarousel images={images} />
          <Box className="flex gap-6 flex-col w-full">
            <Box>
              <Text className="md:block md:text-3xl text-xl mb-2" lineClamp={2}>
                {title}
              </Text>
              <Rating defaultValue={3.5} fractions={2} />
            </Box>
            <Text className="w-full md:text-3xl text-2xl" weight="bold">
              {price}$
            </Text>
            <AddToCart />
          </Box>
        </div>
      </Container>
      <Footer />
    </div>
  );
}

const prod_link = "https://next-e-store-api-sogeking7.vercel.app";
const dev_link = "http:localhost:9000";

export const getStaticPaths = async () => {
  const res = await fetch(`${prod_link}/api/products`);
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
  const res = await fetch(`${prod_link}/api/products/${productId}`);
  const data = await res.json();

  return {
    props: {
      product: data,
    },
  };
};

export default ProductId;
