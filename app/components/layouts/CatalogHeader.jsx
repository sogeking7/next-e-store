import {ActionIcon, Box, Flex, Header, Text,} from "@mantine/core";
import Logo from "../ui/Logo";
import {IconHeart, IconShoppingCart} from "@tabler/icons";
import Search from "./Search";
import AuthBtn from "../pages/auth/buttons/AuthBtn";
import {DarkModeButton} from "../ui/DarkModeButton";
import Link from "next/link";
import {useSession} from "next-auth/react";

function CatalogHeader() {
  const {status} = useSession();
  return (
    <Header py={8} className="hidden md:block" height={64}>
      <Box maw={1024} mx="auto">
        <Flex justify="space-between" align="center" className="md:gap-0 gap-4" px="md">
          <Box miw="max-content" mr={64}>
            <Logo/>
          </Box>
          <Box className="md:hidden">
            <DarkModeButton/>
          </Box>
          <Search/>
          <Flex items="center" gap="xl" className="hidden md:flex">
            <AuthBtn/>
            <Link href={status === 'unauthenticated' ? '/login' : "/user/wishlist"}>
              <Flex align="center" direction="column" w={50} className="cursor-pointer">
                <ActionIcon
                  size="md"
                  color='dark'
                  variant="transparent"
                >
                  <IconHeart />
                </ActionIcon>
                <Text size={12}>Wishlist</Text>
              </Flex>
            </Link>
            <Link href={status === 'unauthenticated' ? '/login' : "/user/cart"}>
              <Flex align="center" direction="column" w={50} className="cursor-pointer">
                <ActionIcon
                  size="md"
                  color='dark'
                  variant="transparent"
                >
                  <IconShoppingCart />
                </ActionIcon>
                <Text size={12}>Cart</Text>
              </Flex>
            </Link>
          </Flex>
        </Flex>
      </Box>
    </Header>
  )
}

export default CatalogHeader;
