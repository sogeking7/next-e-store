import {Footer, Flex, createStyles} from "@mantine/core";
import SocialLinks from "./SocialLinks";
import {DarkModeButton} from "../ui/DarkModeButton";

const useStyles = createStyles((theme) => ({
  footer: {
    position: 'absolute',
    bottom: '0',
    zIndex: '10',
    height: '60px',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0]
  }
}))

export default function MyFooter() {
  const {classes} = useStyles();
  return (
    <Footer px="md" py="md" className={classes.footer}>
      <div className="max-w-5xl mx-auto">
        <Flex className="justify-between md:flex-row flex-col items-center">
          <SocialLinks/>
          <div className="hidden md:block">
            <DarkModeButton/>
          </div>
        </Flex>
      </div>
    </Footer>
  );
}
