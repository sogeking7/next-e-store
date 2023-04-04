import {Footer, Flex} from "@mantine/core";
import SocialLinks from "./SocialLinks";
import {DarkModeButton} from "../ui/DarkModeButton";

export default function MyFooter() {
  return (
    <Footer px="md" py="md" className="z-10 absolute bottom-0">
      <div className="max-w-7xl mx-auto">
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
