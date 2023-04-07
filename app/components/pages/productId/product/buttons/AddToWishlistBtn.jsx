import {ActionIcon} from "@mantine/core";
import {IconHeart} from "@tabler/icons";
import React, {useState} from "react";
import axios from "axios";
import {useMutation, useQueryClient} from "react-query";
import {showNotification} from "@mantine/notifications";
import {IconHeartFilled} from "@tabler/icons-react";
import {useDeleteItemFromWishlist} from "../../../catalog/product/buttons/RemoveFromWishlistBtn";

export const useAddItemToWishlist = (setDeletionError) => {
  const queryClient = useQueryClient();
  return useMutation(
    async (id) => {
      return await axios.post(`/api/user/wishlist/${id}`);
    },
    {
      onSuccess: async () => {
        await queryClient.cancelQueries(["wishlist"]);
        await queryClient.invalidateQueries(["wishlist"]);
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

export const AddToWishlistBtn = ({productId, inWishlist}) => {
  const [active, setActive] = useState(inWishlist);

  const {mutate:mutateDelete, isLoading: isDeleting} = useDeleteItemFromWishlist();
  const handleDeleteClick = (id) => {
    mutateDelete(id);
  }

  const {mutate:mutateAdd, isLoading: isAdding} = useAddItemToWishlist();
  const handleAddClick = (id) => {
    mutateAdd(id);
  }

  return (
    <ActionIcon
      size="lg"
      radius="md"
      variant="subtle"
      className={active ? 'hover:text-red-500 text-red-500' : 'hover:text-red-500 text-gray-500'}
      onClick={() => {
        active ? handleDeleteClick(productId) :handleAddClick(productId)
        setActive(!active);
      }}
      loading={isAdding || isDeleting}
    >
      {active ? <IconHeartFilled size={20}/> : <IconHeart size={20}/>}
    </ActionIcon>
  );
};
