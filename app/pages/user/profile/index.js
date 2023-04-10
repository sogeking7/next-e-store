import {createStyles} from "@mantine/core";
import SideBar from "../../../components/pages/user/SideBar";
import Head from "next/head";
import {ProfileUser} from "../../../components/pages/user/profile/ProfileUser";


const useStyle = createStyles((theme) => ({}));


function Main() {
  return (
    <>
      <ProfileUser/>
    </>
  );
}

function Profile() {

  return (
    <>
      <Head>
        <title>Profile</title>
        <meta property="og:title" content="Profile title" key="title"/>
      </Head>
      <div className="max-w-5xl mx-auto flex p-4">
        <SideBar/>
        <div className="md:px-4 pt-4">
          <Main/>
        </div>
      </div>
    </>
  );
}


export default Profile;
