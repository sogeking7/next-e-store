import { Box, createStyles, Flex, Loader } from "@mantine/core";
import SideBar from "../../../components/pages/user/SideBar";
import Head from "next/head";
import { ProfileUser } from "../../../components/pages/user/profile/ProfileUser";
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
      width: '100%'
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


function Main({ user }) {
  const { classes } = useStyle();
  return (
    <Flex className={classes.wrapper}>
      <Box className={classes.sideBarWrapper}>
        <SideBar />
      </Box>
      <Box className={classes.mainWrapper}>
        <ProfileUser user={user} status={0} />
      </Box>
    </Flex>
  )
}

function Profile() {
  const { classes } = useStyle();
  const { data: session, status } = useSession();
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
        <title>Profile</title>
        <meta property="og:title" content="Profile title" key="title" />
      </Head>
      <Main user={session.user} />
    </Layout>
  );
}


export default Profile;
