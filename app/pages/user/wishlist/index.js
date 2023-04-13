import { Box, createStyles, Flex, Loader, Text } from "@mantine/core";
import SideBar from "../../../components/pages/user/SideBar";
import Head from "next/head";
import { useQuery } from "react-query";
import axios from "axios";
import WishlistProductCard from "../../../components/pages/user/wishlist/WishlistProductCard";
import Layout from "../../../components/layouts/Layout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const useStyle = createStyles((theme) => ({
  sideBarWrapper: {
    height: '100%',
    width: '25%',
    ['@media (max-width: 1024px)']: {
      width: '30%'
    },
    ['@media (max-width: 767px)']: {
      display: 'none'
    }
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
  mainWrapper: {
    width: '75%',
    ['@media (max-width: 1024px)']: {
      width: '70%'
    },
    ['@media (max-width: 767px)']: {
      width: '100%'
    }
  }
}));

const fetchUserWishlist = async () => {
  return (
    await axios.get('/api/user/wishlist').then(res => res.data)
  )
}

function Main() {
  const { classes } = useStyle();

  const { isLoading, isError, error, data } =
    useQuery({
      queryKey: ['user/wishlist'],
      queryFn: fetchUserWishlist,
      retry: false,
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
    return error.response.data.error;
  }

  return (
    <Flex className={classes.wrapper}>
      <Box className={classes.sideBarWrapper}>
        <SideBar />
      </Box>
      <Box className={classes.mainWrapper}>
        <Text weight={600} mb="md" size={32}>Orders</Text>
        <Box className="w-full">
          {data.wishlist.items.map((item) => {
            return (
              <Box mb='md'>
                <WishlistProductCard product={item} />
              </Box>
            )
          })}
        </Box>
      </Box>
    </Flex>
  )
}


function Wishlist() {
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
        <title>Wishlist</title>
        <meta property="og:title" content="Orders title" key="title" />
      </Head>
      <Main />
    </Layout>
  );
}

export default Wishlist;
