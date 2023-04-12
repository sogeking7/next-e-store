import {Box, Skeleton, Title} from "@mantine/core";
import Image from "next/image";
import React from "react";
import {useQuery} from "react-query";
import {getSession} from "next-auth/react";

export const ProfileUser = () => {
  const {isLoading, error, data: session} = useQuery('session', async () => {
    return await getSession();
  })

  if (error) {
    return `An error has occurred: ${error.message}`;
  }

  return (
    <Box>
      <Box mb={8}>
        {
          isLoading ?
            <Skeleton height={100} width={100} circle mb={20}/> :
            <Image src={session.user.image} alt={session.user.name} width={100} height={100} className="rounded-full"/>
        }
      </Box>
      {
        isLoading ?
          <Skeleton height={30} width={300} radius="md"/> :
          <Title>{session.user.name}</Title>
      }
    </Box>
  )
}
