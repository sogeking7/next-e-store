import {createStyles, Text, Title} from "@mantine/core";
import SideBar from "../../../components/pages/user/SideBar";
import Head from "next/head";
import {useMutation, useQuery} from "react-query";
import axios from "axios";
import Loader from "../../../components/ui/Loader";
import ProductCard from "../../../components/pages/catalog/product/ProductCard";


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


function Main(props) {
  const {isLoading, error, data} = useQuery(['wishlist'], async () => {
    return await axios.get('/api/user/wishlist').then(res => res.data)
  })

  if (isLoading) return (
    <div className="w-full">
      <ProductCard isLoading={1} product={undefined} layout={1}/>
      <ProductCard isLoading={1} product={undefined} layout={1}/>
      <ProductCard isLoading={1} product={undefined} layout={1}/>
    </div>
  )
  if (error) return (
    <Text weight={500}>Sorry, no products were found matching your criteria.</Text>
  )
  return (
    <div className="w-full">
      {data.map((item) => {
        return (
          <ProductCard key={item.id} product={item} layout={1} isLoading={0} url={"user/wishlist"}/>
        )
      })}
    </div>
  );
}


function Wishlist() {
  const {classes} = useStyle();
  return (
    <>
      <Head>
        <title>Wishlist</title>
        <meta property="og:title" content="Wishlist title" key="title"/>
      </Head>
      <div className="max-w-7xl mx-auto flex p-4">
        <SideBar/>
        <div className={classes.wrapper}>
          <Text className={classes.title} >Wishlist</Text>
          <Main/>
        </div>
      </div>
    </>
  );
}

export default Wishlist;
