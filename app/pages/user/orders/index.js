import { createStyles, Flex } from "@mantine/core";
import { useState } from "react";
import OrdersContent from "../../../components/pages/user/orders/OrdersContent";
import SideBar from "../../../components/pages/user/SideBar";

const useStyle = createStyles((theme) => ({
}));

function Orders() {
  const { classes } = useStyle();
  const [opened, setOpened] = useState(false);

  return (
    <>
      <div className="max-w-5xl mx-auto py-4">
        <Flex>
          <SideBar />
          <OrdersContent />
        </Flex>
      </div>
    </>
  );
}

export default Orders;
