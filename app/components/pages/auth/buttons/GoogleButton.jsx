import React from "react";
import {Button, Box} from "@mantine/core";
import icon  from '../../../../public/GoogleIcon.ico'
import Image from "next/image";

export function GoogleButton(props) {
  return (
    <Button leftIcon={<GoogleIcon />} onClick={props.signIn} variant="default" radius="lg">
      Sign in with Google
    </Button>
  )
}

export function GoogleIcon() {
  return (
    <Box className="w-5 h-5">
      <Image src={icon}/>
    </Box>
  )
}