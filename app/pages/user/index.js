import {Box, Container, createStyles, Flex,} from "@mantine/core";
import {useState} from "react";
import MobileNavBar from "../../components/layouts/MobileNavBar";
import CatalogHeader from "../../components/layouts/CatalogHeader";
import SideBar from "../../components/pages/user/SideBar";
import ProfileContent from "../../components/pages/user/profile/ProfileContent";
import Footer from '../../components/layouts/Footer'


const useStyle = createStyles((theme) => ({
}));

export default function User() {
  const { classes } = useStyle();
  const [opened, setOpened] = useState(false);

  return (
    <>
      <div className="max-w-7xl mx-auto p-4">
        <Flex>
          <SideBar/>
          <ProfileContent/>
        </Flex>
      </div>
    </>
  );
}
