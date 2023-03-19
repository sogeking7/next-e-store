import {IconRefresh} from '@tabler/icons'
import { useDisclosure } from '@mantine/hooks';
import {Modal, Group, Flex} from '@mantine/core';
import { useSession, signIn, signOut } from "next-auth/react";
import {Box, Button, Text} from "@mantine/core";
import {AuthenticationForm} from "./AuthentificationForm";
import Link from "next/link";
import Image from "next/image";

const AuthBtn = () => {

  const [opened, { open, close }] = useDisclosure(false);
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <Flex className="items-center justify-center">
        <IconRefresh className="icon animate-spin" />
      </Flex>
    );
  }
  if (status === "unauthenticated") {
    return (
      <>
        <Modal opened={opened} onClose={close} title={<Text className="text-2xl" weight={900}>
          Welcome to e-store</Text>
        }>
          <AuthenticationForm signIn={signIn} />
        </Modal>
        <Flex className="gap-2">
          <Button variant="default" size="xs" radius="md" onClick={open}>Log in</Button>
          <Button size="xs" radius="md" color="dark">Sign up</Button>
        </Flex>
      </>
    );
  }
  return (
    <Link href="/user/profile">
        <Flex className="flex-col justify-end items-center h-[50px] w-[50px] hover:cursor-pointer">
        <Image src={session.user.image} alt={session.user.name} width={27} height={27} className="rounded-full" />
        <Text weight={600} size={12}>Profile</Text>
      </Flex>
    </Link>
  );
};
export default AuthBtn;