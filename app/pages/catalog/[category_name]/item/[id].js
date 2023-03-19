import {Stack} from "@mantine/core";
import CatalogHeader from '../../../../components/layouts/CatalogHeader'
import Footer from "../../../../components/layouts/Footer";
import MobileNavBar from "../../../../components/layouts/MobileNavBar";
import ProductDetail from '../../../../components/pages/productId/product/ProductDetail'

function Id() {
  return (
    <Stack spacing='sm'>
      <CatalogHeader />
      <MobileNavBar />
      <ProductDetail />
      <Footer />
    </Stack>
  );
}

export default Id;
