import {ActionIcon, Tooltip} from "@mantine/core";
import {IconTrash} from "@tabler/icons";
import {useState} from "react";
import axios from "axios";

export const RemoveFromWishlistBtn = ({productId}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = () => {
    setIsDeleting(true);
    axios.delete(`/api/user/wishlist/${productId}`)
      .then(() => {
        setIsDeleting(false);
        console.log(`Item ${productId} deleted successfully!`);
      })
      .catch(error => {
        setIsDeleting(false);
        console.log(`Error deleting item ${productId}:`, error);
      });
  };

  return (
    <Tooltip
      label="Delete item"
      position="top"
      withArrow
      color="red"
    >
      <ActionIcon
        size="lg"
        variant="subtle"
        className='hover:text-red-500 text-gray-500'
        onClick={handleDeleteClick}
      >
        <IconTrash size={20}/>
      </ActionIcon>
    </Tooltip>
  );
};
