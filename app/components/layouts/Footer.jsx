import {Footer, Flex, Box} from "@mantine/core";
import SocialLinks from "./SocialLinks";
import {DarkModeButton} from "../ui/DarkModeButton";

export default function MyFooter() {
  return (
    <Footer px="md" py="md" className="max-w-5xl mx-auto absolute bottom-0">
      <Flex className="justify-between md:flex-row flex-col items-center">
        <SocialLinks/>
        <Box className="hidden md:block">
          <DarkModeButton/>
        </Box>
      </Flex>
    </Footer>
  );
}
