import {Button, Modal} from "@mantine/core";
import React, {useState} from "react";
import axios from "axios";
import {useMutation, useQueryClient} from "react-query";
import {showNotification} from "@mantine/notifications";
import {signIn, useSession} from "next-auth/react";
import {useDisclosure} from "@mantine/hooks";
import {AuthenticationForm} from "../../../auth/AuthentificationForm";

export const useAddItemToCart = (setDeletionError) => {
  const queryClient = useQueryClient();
  return useMutation(
    async (id) => {
      return await axios.post(`/api/user/cart/${id}`);
    },
    {
      onSuccess: async () => {
        await queryClient.cancelQueries(["user/cart"]);
        await queryClient.invalidateQueries(["user/cart"]);
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

export const AddToCartBtn = ({productId, inCart, status}) => {
  const [active, setActive] = useState(inCart);
  const [opened, {open, close}] = useDisclosure(false);

  // const {mutate:mutateDelete, isLoading: isDeleting} = useDeleteItemFromCart();
  // const handleDeleteClick = (id) => {
  //   mutateDelete(id);
  // }

  const {mutate: mutateAdd, isLoading: isAdding} = useAddItemToCart();
  const handleAddClick = (id) => {
    mutateAdd(id);
  }

  return (
    <>
      <Modal opened={opened} onClose={close} size="sm" radius="xl">
        <AuthenticationForm signIn={signIn}/>
      </Modal>
      <Button
        size="md"
        radius="xl"
        className='w-full'
        color='indigo.5'
        // className={active ? 'hover:text-red-500 text-red-500' : 'hover:text-red-500'}
        onClick={() => {
          if (status === 'unauthenticated') {
            open();
            return;
          }
          handleAddClick(productId)
          // active ? handleDeleteClick(productId) :handleAddClick(productId)
          setActive(!active);
        }}
        disabled={inCart}
        // loading={isAdding || isDeleting}
        loading={isAdding}
      >
        Add To Cart
      </Button>
    </>
  );
};
