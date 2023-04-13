import { Box, createStyles, Flex, Loader, Text } from "@mantine/core";
import Head from "next/head";
import { useQuery } from "react-query";
import axios from "axios";
import CartCheck from "../../../components/pages/user/cart/CartCheck";
import CartProduct from "../../../components/pages/user/cart/CartProductCard";
import Layout from "../../../components/layouts/Layout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const useStyle = createStyles((theme) => ({
  cartListWrapper: {
    width: '60%',
    ['@media (max-width: 767px)']: {
      width: '100%'
    },
  },
  wrapper: {
    padding: '1rem 1rem 1rem 1rem',
    maxWidth: '64rem',
    gap: '2rem',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'row',
    ['@media (max-width: 767px)']: {
      padding: '1rem',
      gap: '0'
    }
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
  const { classes } = useStyle();

  const { isLoading, isError, error, data } =
    useQuery({
      queryKey: ['user/cart'],
      queryFn: fetchUserCart,
      retry: false
    });

  if (isLoading) {
    return (
      <Flex className={classes.wrapper}>
        <Flex className="w-full" justify='center'>
          <Loader size="md" color="indigo.5" variant="oval" />
        </Flex>
      </Flex>
    )
  }

  if (isError) {
    return error.response.data.error
  }

  return (
    <Flex gap={32} className="max-w-5xl mx-auto p-4 flex-col md:flex-row">
      <Box className={classes.cartListWrapper}>
        <Text weight={600} mb="md" size={32}>Cart</Text>
        <Flex direction="column" gap="md">
          {
            data.cart.cartItems.map(item => {
              return <CartProduct key={item.product.id} product={item.product} />
            })
          }
        </Flex>
      </Box>
      <CartCheck />
    </Flex>
  )
}

function Cart() {
  const { classes } = useStyle();
  const { status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return (
      <Flex className={classes.wrapper}>
        <Flex className="w-full" justify='center'>
          <Loader size="md" color="indigo.5" variant="oval" />
        </Flex>
      </Flex>
    )
  }

  if (status === 'unauthenticated') {
    router.push('/login');
    return;
  }

  return (
    <Layout>
      <Head>
        <title>Cart</title>
        <meta property="og:title" content="Profile title" key="title" />
      </Head>
      <Main />
    </Layout>
  );
}

export default Cart;
