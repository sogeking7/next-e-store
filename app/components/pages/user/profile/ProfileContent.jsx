import {Box, Button, Container, Text} from "@mantine/core";
import {getSession, signOut} from "next-auth/react";
import React, {useEffect, useState} from "react";
import Image from "next/image";
import {useQuery} from "react-query";
import axios from "axios";
import Loader from "../../../ui/Loader";
import {useRouter} from "next/router";

export default function ProfileContent(props) {
  const router = useRouter();

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
    <Box className="w-[80%] p-4">
      <Box className="mb-4">
        <Box className="mb-2">
          <Image src={session.user.image} alt={session.user.name}  width={100} height={100} className="rounded-full" />
        </Box>
        <Text className="font-bold text-3xl">{session.user.name}</Text>
      </Box>
    </Box>
  );
}
