import {Box, createStyles} from '@mantine/core';
import CatalogHeader from './CatalogHeader';
import MyFooter from './Footer';
import MobileNavBar from './mobile/MobileNavBar';

const useStyle = createStyles((theme) => ({
  wrapper: {
    ['@media (max-width: 767px)']: {
      marginBottom: '60px',
    },
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
  }
}));

const Layout = ({children}) => {
  const {classes} = useStyle();

  return (
    <Box pb={60} pos="relative" mih="100vh" className={classes.wrapper}>
      <CatalogHeader/>
      <MobileNavBar/>
      {children}
      <MyFooter/>
    </Box>
  );
};

export default Layout;