import {createStyles, Flex} from "@mantine/core";
import SideBar from "../../../components/pages/user/SideBar";
import Head from "next/head";
import {ProfileUser} from "../../../components/pages/user/profile/ProfileUser";


const useStyle = createStyles((theme) => ({
  sideBarWrapper: {
    height: '100%',
    width: '25%',
    ['@media (max-width: 1024px)']: {
      width: '30%'
    },
    ['@media (max-width: 767px)']: {
      width: '100%'
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
      flexDirection: 'column-reverse',
      gap: '1rem'
    }

  },
  mainWrapper: {
    width: '75%',
    ['@media (max-width: 1024px)']: {
      width: '70%'
    },
    ['@media (max-width: 767px)']: {
      padding: '0 0 0 .5rem',
      width: '100%'
    }
  },
}));


function Main() {
  return (
    <>
      <ProfileUser/>
    </>
  );
}

function Profile() {
  const {classes} = useStyle()
  return (
    <>
      <Head>
        <title>Profile</title>
        <meta property="og:title" content="Profile title" key="title"/>
      </Head>
      <Flex className={classes.wrapper}>
        <div className={classes.sideBarWrapper}>
          <SideBar/>
        </div>
        <div className={classes.mainWrapper}>
          <Main/>
        </div>
      </Flex>
    </>
  );
}


export default Profile;
