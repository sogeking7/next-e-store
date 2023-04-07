import React from "react";
import {ActionIcon, Flex, Footer, Text,} from "@mantine/core";
import {useRouter} from 'next/router'
import {IconBuildingStore, IconCategory, IconHeart, IconShoppingCart} from "@tabler/icons";
import AuthBtn from "../../pages/auth/buttons/AuthBtn";
import Link from "next/link";
import AuthBtnMobile from "../../pages/auth/buttons/AuthBtnMobile";

export default function MobileNavBar() {
  const router = useRouter();
  return (
    <div className="md:hidden block">
      <Footer className="fixed z-50 bottom-0 px-4 py-2 overflow-hidden" height={60}>
        <div className="flex justify-between">
          <Link href="/">
            <Flex align="center" className="cursor-pointer flex-col w-[50px]">
              <ActionIcon
                size="md"
                color='dark'
                variant="transparent"
              >
                <IconBuildingStore size={26}/>
              </ActionIcon>
              <Text size={10} weight={600}>Store</Text>
            </Flex>
          </Link>
          <Link href="/categories">
            <Flex align="center" className="cursor-pointer flex-col w-[50px]">
              <ActionIcon
                size="md"
                color='dark'
                variant="transparent"
              >
                <IconCategory size={26}/>
              </ActionIcon>
              <Text size={10} weight={600}>Catalog</Text>
            </Flex>
          </Link>
          <Link href="/user/wishlist">
            <Flex align="center" className="cursor-pointer flex-col w-[50px]">
              <ActionIcon
                size="md"
                color='dark'
                variant="transparent"
              >
                <IconHeart size={26}/>
              </ActionIcon>
              <Text size={10} weight={600}>Wishlist</Text>
            </Flex>
          </Link>
          <Link href="/user/cart">
            <Flex align="center" className="cursor-pointer flex-col w-[50px]">
              <ActionIcon
                size="md"
                color='dark'
                variant="transparent"
              >
                <IconShoppingCart size={26}/>
              </ActionIcon>
              <Text size={10} weight={600}>Cart</Text>
            </Flex>
          </Link>
          <AuthBtnMobile/>
        </div>
      </Footer>
    </div>
  );
}

