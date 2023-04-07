import {IconUser} from '@tabler/icons'
import {useDisclosure} from '@mantine/hooks';
import {Modal,Flex, ActionIcon, Loader, Text} from '@mantine/core';
import {useSession, signIn} from "next-auth/react";
import {AuthenticationForm} from "../AuthentificationForm"
import Link from "next/link";
import Image from "next/image";
import React from "react";

const AuthBtnMobile = () => {

  const [opened, {open, close}] = useDisclosure(false);
  const {data: session, status} = useSession();

  if (status === "loading") {
    return (
      // <Flex align="center" onClick={open} className="cursor-pointer flex-col w-[50px]">
      //   <Loader size="xs" className="relative top-1"/>
      //   <Text size={10} className="relative top-1" weight={600}>Loading</Text>
      // </Flex>
    <Flex className="flex-col justify-center items-center  w-[50px] cursor-pointer">
      <Flex className="h-[28px] w-[28px] items-center justify-center">
        <Loader size="xs" className=""/>
      </Flex>
      <Text size={10} weight={600}>Loading</Text>
    </Flex>
    );
  }
  if (status === "unauthenticated") {
    return (
      <>
        <Modal opened={opened} onClose={close} title={<Text className="text-2xl" weight={900}>
          Welcome to e-store</Text>
        }>
          <AuthenticationForm signIn={signIn}/>
        </Modal>
        <Flex align="center" onClick={open} className="cursor-pointer flex-col w-[50px]">
          <ActionIcon
            size="md"
            color='dark'
            variant="transparent"
          >
            <IconUser size={26}/>
          </ActionIcon>
          <Text size={10} weight={600}>Sign in</Text>
        </Flex>
      </>
    );
  }
  return (
    <Link href="/user/profile">
      <Flex className="flex-col  items-center h-[50px] w-[50px] hover:cursor-pointer">
        <Image src={session.user.image} alt={session.user.name} width={28} height={28} className="rounded-full"/>
        <Text weight={600} size={10}>Profile</Text>
      </Flex>
    </Link>
  );
};
export default AuthBtnMobile;