import {Box, Container, createStyles, Flex} from "@mantine/core";
import {useState} from "react";
import OrdersContent from "../../../components/pages/user/orders/OrdersContent";
import CatalogHeader from "../../../components/layouts/CatalogHeader";
import MobileNavBar from "../../../components/layouts/MobileNavBar";
import SideBar from "../../../components/pages/user/SideBar";
import Footer from '../../../components/layouts/Footer'

const useStyle = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    minHeight: '120vh',
    paddingBottom: '168.19px',
    overflow: 'hidden',
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : '#FFFFFF'
  },
  container: {
    padding: '0 1rem',
  }
}));

function Orders() {
  const { classes } = useStyle();
  const [opened, setOpened] = useState(false);

  return (
    <Box className={classes.wrapper}>
      <CatalogHeader setOpened={setOpened}/>
      <MobileNavBar/>
      <Container size="lg" className="md:p-0 px-0 py-4 mb-16">
        <Flex>
          <SideBar/>
          <OrdersContent/>
        </Flex>
      </Container>
      <Footer/>
    </Box>
  );
}

export default Orders;
