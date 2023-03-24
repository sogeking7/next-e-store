import { createStyles, Flex} from "@mantine/core";
import {useState} from "react";
import SideBar from "../../../components/pages/user/SideBar";
import ProfileContent from "../../../components/pages/user/profile/ProfileContent";

const useStyle = createStyles((theme) => ({
}));

function Profile() {
  const { classes } = useStyle();
  const [opened, setOpened] = useState(false);

  return (
    <>
      <div className="max-w-5xl mx-auto p-4">
        <Flex>
          <SideBar/>
          <ProfileContent/>
        </Flex>
      </div>
    </>
  );
}

export default Profile;
