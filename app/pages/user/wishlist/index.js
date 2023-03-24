import { createStyles, Flex } from "@mantine/core";
import { useState } from "react";
import WishlistContent from "../../../components/pages/user/wishlist/WishlistContent";
import SideBar from "../../../components/pages/user/SideBar";


const useStyle = createStyles((theme) => ({
}));

function Wishlist() {
  const { classes } = useStyle();
  const [opened, setOpened] = useState(false);

  return (
    <>
      <div className="max-w-5xl mx-auto py-4">
        <Flex>
          <SideBar />
          <WishlistContent />
        </Flex>
      </div>
    </>
  );
}

export default Wishlist;
