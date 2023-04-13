import {ActionIcon, Modal} from "@mantine/core";
import {IconHeart} from "@tabler/icons";
import React, {useState} from "react";
import axios from "axios";
import {useMutation, useQueryClient} from "react-query";
import {showNotification} from "@mantine/notifications";
import {IconHeartFilled} from "@tabler/icons-react";
import {useDeleteItemFromWishlist} from "../../../user/wishlist/RemoveFromWishlistBtn";
import {useDisclosure} from "@mantine/hooks";
import {AuthenticationForm} from "../../../auth/AuthentificationForm";
import {signIn, useSession} from "next-auth/react";

export const useAddItemToWishlist = (setDeletionError) => {
  const queryClient = useQueryClient();
  return useMutation(
    async (id) => {
      return await axios.post(`/api/user/wishlist/${id}`);
    },
    {
      onSuccess: async () => {
        await queryClient.cancelQueries(["user/wishlist"]);
        await queryClient.invalidateQueries(["user/wishlist"]);
        await showNotification({
          id: 'load-data',
          color: 'teal',
          title: 'Added To Wishlist',
          autoClose: 2000,
        })
      },
      onError: ({message}) => {
        setDeletionError(message);
      },
    }
  );
};

export const AddToWishlistBtn = ({productId, inWishlist, status}) => {
  const [active, setActive] = useState(inWishlist);
  const [opened, {open, close}] = useDisclosure(false);


  const {mutate: mutateDelete, isLoading: isDeleting} = useDeleteItemFromWishlist();
  const handleDeleteClick = (id) => {
    mutateDelete(id);
  }

  const {mutate: mutateAdd, isLoading: isAdding} = useAddItemToWishlist();
  const handleAddClick = (id) => {
    mutateAdd(id);
  }

  return (
    <>
      <Modal opened={opened} onClose={close} size="sm" radius="xl">
        <AuthenticationForm signIn={signIn}/>
      </Modal>
      <ActionIcon
        size="xl"
        radius="xl"
        variant="subtle"
        className={active ? 'hover:text-red-500 text-red-500' : 'hover:text-red-500'}
        onClick={() => {
          if (status === 'unauthenticated') {
            open();
            return;
          }
          active ? handleDeleteClick(productId) : handleAddClick(productId)
          setActive(!active);
        }}
        loading={isAdding || isDeleting}
      >
        {active ? <IconHeartFilled size={30} stroke={1.5}/> : <IconHeart size={30} stroke={1.5}/>}
      </ActionIcon>
    </>
  );
};
