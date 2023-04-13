import React from "react";
import {ActionIcon, Box, Flex, Text, createStyles} from "@mantine/core";
import {useRouter} from 'next/router'
import {IconBuildingStore, IconCategory, IconShoppingCart} from "@tabler/icons";
import Link from "next/link";
import AuthBtn from "../../pages/auth/buttons/AuthBtn";

const useStyles = createStyles((theme) => ({
  footer: {
    position: 'fixed',
    bottom: '0',
    width: '100%',
    display: 'none',
    ['@media (max-width: 767px)']: {
      display: 'block'
    },
    zIndex: '50',
    padding: '.5rem 1rem',
    overflow: 'hidden',
    height: '60px',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white
  }
}))

export default function MobileNavBar() {
  const {classes} = useStyles();
  const router = useRouter();
  return (
      <Box className={classes.footer}>
        <Box
         className="flex justify-between">
          <Link href="/">
            <Flex align="center" className="cursor-pointer flex-col w-[50px]">
              <ActionIcon
                size="md"
                color='dark'
                variant="transparent"
              >
                <IconBuildingStore strokeWidth={1.75}/>
              </ActionIcon>
              <Text size={12}>Store</Text>
            </Flex>
          </Link>
          <Link href="/categories">
            <Flex align="center" className="cursor-pointer flex-col w-[50px]">
              <ActionIcon
                size="md"
                color='dark'
                variant="transparent"
              >
                <IconCategory strokeWidth={1.75}/>
              </ActionIcon>
              <Text size={12}>Catalog</Text>
            </Flex>
          </Link>
          <Link href="/user/cart">
            <Flex align="center" className="cursor-pointer flex-col w-[50px]">
              <ActionIcon
                size="md"
                color='dark'
                variant="transparent"
              >
                <IconShoppingCart strokeWidth={1.75}/>
              </ActionIcon>
              <Text size={12}>Cart</Text>
            </Flex>
          </Link>
          <AuthBtn/>
        </Box>
      </Box>
  );
}

