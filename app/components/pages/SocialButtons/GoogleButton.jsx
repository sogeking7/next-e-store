import React from "react";
import {Button} from "@mantine/core";
import {GoogleIcon} from "./GoogleIcon";

export function GoogleButton(props) {
  return (
    <Button leftIcon={<GoogleIcon />} onClick={props.signIn} variant="default" radius="lg">
      Sign in with Google
    </Button>
  )
}