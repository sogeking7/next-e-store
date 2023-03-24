import {Box, Button, Container, Text} from "@mantine/core";
import {getSession, signOut} from "next-auth/react";
import React, {useEffect, useState} from "react";
import Image from "next/image";
import {useQuery} from "react-query";
import axios from "axios";
import Loader from "../../../ui/Loader";

export default function WishlistContent(props) {

  const {isLoading, error, data: session} = useQuery('session', async () => {
    return await getSession();
  })

  if (isLoading) return (
    <Container size="lg" className="flex justify-center p-[20vh]">
      <Loader size="lg" color="blue" variant="oval"/>
    </Container>
  )
  if (error) return 'An error has occurred: ' + error.message

  return (
    <Box className="w-[80%]">
      Hello Wishlist
    </Box>
  );
}
