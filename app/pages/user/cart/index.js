import {Box, createStyles, Flex, Text, Loader} from "@mantine/core";
import Head from "next/head";
import {useQuery} from "react-query";
import axios from "axios";
import CartCheck from "../../../components/pages/user/cart/CartCheck";
import CartProduct from "../../../components/pages/user/cart/CartProductCard";

const useStyle = createStyles((theme) => ({
  cartListWrapper: {
    width: '60%',
    ['@media (max-width: 767px)']: {
      width: '100%'
    },
  },
  productBox: {
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
    borderRadius: '0 .5rem .5rem 0',
    padding: '1rem',
    width: 'min-content'
  }
}));

const fetchUserCart = async () => {
  return (
    await axios.get('/api/user/cart').then(res => res.data)
  )
}

function Main() {
  const {classes} = useStyle();

  const {isLoading, isError, error, data } =
    useQuery({
      queryKey: ['user/cart'],
      queryFn: fetchUserCart,
      retry: false
    });

  if (isLoading) {
    return (     
      <Flex className="w-full" justify='center'>
        <Loader size="md" color="indigo.5" variant="oval"/>
      </Flex>
    )
  }
  if (isError) {
    if (error.response.status === 401) {
      return (
        <div>
          {
            error.response.data.error
          }
        </div>
      );
    }
  }
  return (
    <Flex gap={32} className="w-full flex-col md:flex-row">
      <Box className={classes.cartListWrapper}>
        <Text weight={600} mb="md" size={32}>Cart</Text>     
        <Flex direction="column" gap="md">
          {
            data.cart.cartItems.map(item => {
              return <CartProduct key={item.product.id} product={item.product}/>
            })
          }
        </Flex>
      </Box>
      <CartCheck />
    </Flex>
  )
}

function Cart() {
  const {classes} = useStyle();

  return (
    <>
      <Head>
        <title>Cart</title>
        <meta property="og:title" content="Profile title" key="title"/>
      </Head>
      <Flex className="max-w-5xl mx-auto p-4">
        <Main/>  
      </Flex>
    </>
  );
}

export default Cart;
