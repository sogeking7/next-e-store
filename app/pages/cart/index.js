import {createStyles} from "@mantine/core";
import Head from "next/head";

const useStyle = createStyles((theme) => ({}));


function CartList() {
  return (
    <>

    </>
  );
}

function Cart() {

  return (
    <>
      <Head>
        <title>Cart</title>
        <meta property="og:title" content="Profile title" key="title"/>
      </Head>
      <div className="max-w-5xl mx-auto flex p-4">
        <div>
          <CartList/>
        </div>
      </div>
    </>
  );
}

export default Cart;
