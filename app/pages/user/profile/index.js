import {Box, Container, createStyles, Flex, Text, Title} from "@mantine/core";
import React, {useState} from "react";
import SideBar from "../../../components/pages/user/SideBar";
import {useQuery} from "react-query";
import {getSession} from "next-auth/react";
import Loader from "../../../components/ui/Loader";
import Image from "next/image";

const useStyle = createStyles((theme) => ({}));

function Main() {
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
    <Box className="w-[80%] md:px-4 pt-4">

      <Box mb={2}>
        <Box mb={8}>
          <Image src={session.user.image} alt={session.user.name} width={100} height={100} className="rounded-full"/>
        </Box>
        <Title>{session.user.name}</Title>
      </Box>

    </Box>
  );
}

function Profile() {
  return (
    <>
      <div className="max-w-7xl mx-auto flex p-4">
        <SideBar/>
        <Main/>
      </div>
    </>
  );
}

export default Profile;
