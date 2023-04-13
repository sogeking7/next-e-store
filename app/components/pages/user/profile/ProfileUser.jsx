import { Box, Skeleton, Title } from "@mantine/core";
import Image from "next/image";
import React from "react";

export const ProfileUser = ({ user, status }) => {
  if (status === 'loading') {
    return (
      <Box>
        <Box mb={8}>
          <Skeleton height={100} width={100} circle mb={20} />
        </Box>
        <Skeleton height={30} width={300} radius="md" />
      </Box>
    )
  }
  return (
    <Box>
      <Box mb={8}>
        <Image src={user.image} alt={user.name} width={100} height={100} className="rounded-full" />
      </Box>
      <Title>{user.name}</Title>
    </Box>
  )
}
