import { Box, createStyles } from '@mantine/core';
import CatalogHeader from './CatalogHeader';
import MyFooter from './Footer';
import MobileNavBar from './mobile/MobileNavBar';

const useStyle = createStyles((theme) => ({
  wrapper: {
    minHeight: '100vh',
    ['@media (max-width: 768px)']: {
      marginBottom: '67px',
    },
    paddingBottom: '61px',
    position: 'relative',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
  }
}));

const MobileLayout = ({ children }) => {
	const { classes } = useStyle();

	return (
    <Box className={classes.wrapper}>
			<CatalogHeader/>
			<MobileNavBar/>
      {children}
			<MyFooter/>
    </Box>
  );
};
export default MobileLayout
