import React from "react";
import {Button, Box} from "@mantine/core";
import icon  from '../../../../public/GoogleIcon.ico'
import Image from "next/image";
import {signIn} from "next-auth/react";

export function GoogleButton() {
  return (
    <Button leftIcon={<GoogleIcon />} onClick={signIn} w="100%" variant="default" size="md" radius="xl">
      Sign in with Google
    </Button>
  )
}

export function GoogleIcon() {
  return (
    <Box w={20} h={20}>
      <Image src={icon}/>
    </Box>
  )
}