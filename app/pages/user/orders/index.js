import {createStyles, Text, Flex} from "@mantine/core";
import SideBar from "../../../components/pages/user/SideBar";
import Head from "next/head";

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
    padding: '1rem 1rem 1rem .5rem',
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

function Main(props) {
  return (
    <div className="w-full">
      
    </div>
  );
}

function Orders() {
  const {classes} = useStyle();
  return (
    <>
      <Head>
        <title>Orders</title>
        <meta property="og:title" content="Orders title" key="title"/>
      </Head>
      <Flex className={classes.wrapper}>
        <div className={classes.sideBarWrapper}>
          <SideBar />
        </div>
        <div className={classes.mainWrapper}>
          <Text weight={600} mb="md" size={32}>Orders</Text>
          <Main/>
        </div>
      </Flex>
    </>
  );
}

export default Orders;
