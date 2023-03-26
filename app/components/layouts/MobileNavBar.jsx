import React from "react";
import {
  Flex,
  Text,
  ActionIcon,
  Footer,
} from "@mantine/core";
import {useRouter} from 'next/router'
import {IconHeart, IconShoppingCart} from "@tabler/icons";
import AuthBtn from "../pages/auth/AuthBtn";

export default function MobileNavBar() {
  const router = useRouter();
  return (
    <div className="md:hidden block">
      <Footer className="fixed z-50 bottom-0 px-4 py-2 overflow-hidden">
        <div className="flex justify-between">
          <Flex align="center" className="cursor-pointer flex-col w-[50px]">
            <ActionIcon
              size="md"
              color='dark'
              variant="transparent"
              onClick={() => {
                router.push('/user/cart')
              }}
            >
              <IconShoppingCart size={20}/>
            </ActionIcon>
            <Text size={12} weight={600}>Cart</Text>
          </Flex>
          <Flex align="center" className="cursor-pointer flex-col w-[50px]">
            <ActionIcon
              size="md"
              color='dark'
              variant="transparent"
              onClick={() => {
                router.push('/user/wishlist')
              }}
            >
              <IconHeart size={20}/>
            </ActionIcon>
            <Text size={12} weight={600}>Wishlist</Text>
          </Flex>
          <AuthBtn/>
        </div>
      </Footer>
    </div>
  );
}

