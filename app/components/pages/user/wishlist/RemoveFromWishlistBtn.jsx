import {ActionIcon} from "@mantine/core";
import {IconTrash} from "@tabler/icons";
import axios from "axios";
import {useMutation, useQueryClient} from "react-query";
import React from "react";
import {showNotification, updateNotification} from "@mantine/notifications";

export const useDeleteItemFromWishlist = (setDeletionError) => {
  const queryClient = useQueryClient();
  return useMutation(
    async (id) => {
      return await axios.delete(`/api/user/wishlist/${id}`);
    },
    {
      onSuccess: async () => {
        await queryClient.cancelQueries(["wishlist"]);
        await queryClient.invalidateQueries(["wishlist"]);
        await showNotification({
          id: 'load-data',
          color: 'teal',
          title: 'Deleted From Wishlist',
          autoClose: 2000,
        })
      },
      onError: ({message}) => {
        setDeletionError(message);
      },
    }
  );
};

export const RemoveFromWishlistBtn = ({productId}) => {

  const {mutate, isLoading} = useDeleteItemFromWishlist();
  const handleDeleteClick = (id) => {
    mutate(id);
  };

  return (
    <ActionIcon
      size="lg"
      variant="subtle"
      radius="md"
      className='hover:text-red-500 text-gray-500'
      onClick={() => handleDeleteClick(productId)}
      loading={isLoading}
    >
      <IconTrash size={20} stroke-width='1.5'/>
    </ActionIcon>

  );
};
