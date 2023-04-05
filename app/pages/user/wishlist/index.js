import {createStyles, Text, Title} from "@mantine/core";
import SideBar from "../../../components/pages/user/SideBar";
import Head from "next/head";
import {useQuery} from "react-query";
import axios from "axios";
import Loader from "../../../components/ui/Loader";
import ProductCard from "../../../components/pages/catalog/product/ProductCard";


const useStyle = createStyles((theme) => ({}));


function Main(props) {
  const { isLoading, error, data } = useQuery(['wishlist'], async () => {
   return await axios.get('api/user/wishlist').then(res => res.data)
  })
  if (isLoading) return (
    <div className="max-w-7xl mx-auto flex justify-center py-[20vh]">
      <Loader size="lg" color="blue" variant="oval" />
    </div>
  )
  if (error) return (
    <Text weight={500}>Sorry, no products were found matching your criteria.</Text>
  )
  return (
    <>
      {data.map((item) => {
        return (
          <ProductCard key={item.id} product={item}/>
        )
      })}
    </>
  );
}


function Wishlist() {

  return (
    <>
      <Head>
        <title>Wishlist</title>
        <meta property="og:title" content="Wishlist title" key="title"/>
      </Head>
      <div className="max-w-7xl mx-auto flex p-4">
        <SideBar/>
        <div className="md:px-4">
          <Title className="mb-4" order={1}>Wishlist</Title>
          <Main/>
        </div>
      </div>
    </>
  );
}

export default Wishlist;
