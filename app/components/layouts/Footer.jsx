import {Footer, Flex, createStyles, Box} from "@mantine/core";
import SocialLinks from "./SocialLinks";
import {DarkModeButton} from "../ui/DarkModeButton";

const useStyles = createStyles((theme) => ({
  footer: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0]
  }
}))

export default function MyFooter() {
  const {classes} = useStyles();
  return (
    <Footer height={60} zIndex={10} px="md" py="md" pos="absolute" bottom={0} className={classes.footer}>
      <Box maw={1024} mx="auto">
        <Flex justify="space-between" direction="column" align="center" className="md:flex-row">
          <SocialLinks/>
          <Box className="hidden md:block">
            <DarkModeButton/>
          </Box>
        </Flex>
      </Box>
    </Footer>
  );
}
