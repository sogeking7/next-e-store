import {Button, Group} from "@mantine/core";
import {IconSquareRoundedPlus} from "@tabler/icons";
import React, {useState} from "react";
import axios from "axios";
import {useMutation, useQueryClient} from "react-query";
import {showNotification} from "@mantine/notifications";
import {IconSquareRoundedCheckFilled} from "@tabler/icons-react";

export const useAddItemToCart = (setDeletionError) => {
  const queryClient = useQueryClient();
  return useMutation(
    async (id) => {
      return await axios.post(`/api/user/cart/${id}`);
    },
    {
      onSuccess: async () => {
        await queryClient.cancelQueries(["cart"]);
        await queryClient.invalidateQueries(["cart"]);
        await showNotification({
          id: 'load-data',
          color: 'teal',
          title: 'Added To Cart',
          autoClose: 2000,
        })
      },
      onError: ({message}) => {
        setDeletionError(message);
      },
    }
  );
};
export const useDeleteItemFromCart = (setDeletionError) => {
  const queryClient = useQueryClient();
  return useMutation(
    async (id) => {
      return await axios.delete(`/api/user/cart/${id}`);
    },
    {
      onSuccess: async () => {
        await queryClient.cancelQueries(["cart"]);
        await queryClient.invalidateQueries(["cart"]);
        await showNotification({
          id: 'load-data',
          color: 'red',
          title: 'Deleted From Cart',
          autoClose: 2000,
        })
      },
      onError: ({message}) => {
        setDeletionError(message);
      },
    }
  );
};

export const AddToCartBtn = ({productId, inCart}) => {
  const [active, setActive] = useState(inCart);


  const {mutate: mutateAdd, isLoading: isAdding} = useAddItemToCart();
  const handleAddClick = (id) => {
    mutateAdd(id);
  }
  const {mutate, isLoading: isDeleting} = useDeleteItemFromCart();
  const handleDeleteClick = (id) => {
    mutate(id);
  };

  return (
    <Group>
      <Button
        rightIcon={active ? <IconSquareRoundedCheckFilled size={20}/> : <IconSquareRoundedPlus size={20}/>}
        size="xs"
        radius="xl"
        color={active ? "green.5" : "indigo.5"}
        onClick={() => {
          active ? handleDeleteClick(productId) : handleAddClick(productId)
          setActive(!active);
        }}
        loading={isAdding || isDeleting}
        loaderPosition="right"
      >
        {
          active ? 'Added to Cart' : 'Add to Cart'
        }
      </Button>
    </Group>
  );
};
