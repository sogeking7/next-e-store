import React from "react";
import {Button, Box, useMantineColorScheme} from "@mantine/core";
import iconLight  from '../../../../public/githubLightIcon.png'
import iconDark  from '../../../../public/githubDarkIcon.png'
import Image from "next/image";
// import {signIn} from "next-auth/react";

export function GitHubButton() {
  return (
    <Button leftIcon={<GitHubIcon />} variant="default" w="100%" size="md" radius="xl">
      Sign in with GitHub
    </Button>
  )
}

export function GitHubIcon() {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  return (
    <Box w={20} h={20}>
      <Image src={dark ? iconLight : iconDark}/>
    </Box>
  )
}