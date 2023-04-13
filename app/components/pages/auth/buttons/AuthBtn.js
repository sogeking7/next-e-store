import {IconUser} from '@tabler/icons'
import {useDisclosure} from '@mantine/hooks';
import {ActionIcon, Flex, Loader, Modal, Text} from '@mantine/core';
import {signIn, useSession} from "next-auth/react";
import {AuthenticationForm} from "../AuthentificationForm"
import Link from "next/link";
import Image from "next/image";
import React from "react";

const AuthBtn = () => {
  const [opened, {open, close}] = useDisclosure(false);
  const {data: session, status} = useSession();

  if (status === "loading") {
    return (
      <Flex w={50} direction="column" justify="center" align="center" className="cursor-pointer">
        <Flex h={28} w={28} justify="center" align="center">
          <Loader size="xs"/>
        </Flex>
        <Text size={12}>Loading</Text>
      </Flex>
    );
  }
  if (status === "unauthenticated") {
    return (
      <>
        <Modal opened={opened} onClose={close} size="sm" radius="xl">
          <AuthenticationForm signIn={signIn}/>
        </Modal>
        <Flex align="center" onClick={open} direction="column" w={50} className="cursor-pointer">
          <ActionIcon
            size="md"
            color='dark'
            variant="transparent"
          >
            <IconUser/>
          </ActionIcon>
          <Text size={12}>Sign in</Text>
        </Flex>
      </>
    );
  }
  return (
    <Link href="/user/profile">
      <Flex direction="column" justify="center" align="center" w={50} h={46.59} className="hover:cursor-pointer">
        <Image src={session.user.image} alt={session.user.name} width={28} height={28} className="rounded-full"/>
        <Text size={12}>Profile</Text>
      </Flex>
    </Link>
  );
};
export default AuthBtn;