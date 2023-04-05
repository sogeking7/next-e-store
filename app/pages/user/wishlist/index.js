import {createStyles, Title} from "@mantine/core";
import SideBar from "../../../components/pages/user/SideBar";
import Head from "next/head";


const useStyle = createStyles((theme) => ({}));


function Main(props) {
  return (
    <>
      <Title className="mb-4" order={1}>Wishlist</Title>
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
          <Main/>
        </div>
      </div>
    </>
  );
}

export default Wishlist;
