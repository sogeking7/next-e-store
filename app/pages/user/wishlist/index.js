import {Box, createStyles, Flex, Text} from "@mantine/core";
import SideBar from "../../../components/pages/user/SideBar";
import Head from "next/head";
import {useQuery} from "react-query";
import axios from "axios";
import {AlertBox} from "../../../components/pages/user/wishlist/AlertBox";
import Loader from "../../../components/ui/Loader";
import WishlistProductCard from "../../../components/pages/user/wishlist/WishlistProductCard";


const useStyle = createStyles((theme) => ({
  wrapper: {
    width: '50%',
    padding: '0 1rem',
    ['@media (max-width: 1024px)']: {
      width: '66.5%'
    },
    ['@media (max-width: 767px)']: {
      padding: '0',
      width: '100%'
    }
  },
  title: {
    fontSize: '2rem',
    fontFamily: 'sans-serif',
    fontWeight: 600,
    ['@media (max-width: 767px)']: {
      fontSize: '1.5rem'
    },
    marginBottom: '1rem'
  }
}));

const fetchAllWishlist = async () => {
  return await axios.get('/api/user/wishlist').catch((e) => console.log(e.response)).then(res => res.data.wishlist)
}

function Main(props) {

  const {isLoading, error, data} =
    useQuery({
      queryKey: ['wishlist'],
      queryFn: fetchAllWishlist,
      retry: false
    });

  if (isLoading || !data) {
    return (
      <Flex className="w-full" justify='center'>
        <Loader color="indigo.5" variant="oval"/>
      </Flex>
    )
  }
  if (error) {
    return (
      // <Text weight={500}>Sorry, no products were found matching your criteria. </Text>
      <AlertBox/>
    )
  }

  return (
    <div className="w-full">
      {data.items.map((item) => {
        return (
          <Box mb='md'>
            <WishlistProductCard product={item}/>
          </Box>
        )
      })}
    </div>
  )
}


function Wishlist() {
  const {classes} = useStyle();
  return (
    <>
      <Head>
        <title>Wishlist</title>
        <meta property="og:title" content="Wishlist title" key="title"/>
      </Head>
      <div className="max-w-5xl mx-auto flex p-4">
        <SideBar/>
        <div className={classes.wrapper}>
          <Text className={classes.title}>Wishlist</Text>
          <Main/>
        </div>
      </div>
    </>
  );
}

export default Wishlist;
