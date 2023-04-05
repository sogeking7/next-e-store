import {ActionIcon, Tooltip} from "@mantine/core";
import {IconHeart, IconTrash} from "@tabler/icons";
import {useState} from "react";
import axios from "axios";

export const AddToWishlistBtn = ({productId}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddClick = () => {
    setIsLoading(true);
    axios.post(`/api/user/wishlist/${productId}`)
      .then(() => {
        setIsLoading(false);
        console.log(`Item ${productId} deleted successfully!`);
      })
      .catch(error => {
        setIsLoading(false);
        console.log(`Error deleting item ${productId}:`, error);
      });
  };

  return (
    <Tooltip
      label="Add to wishlist"
      position="top"
      withArrow
      color="red"
    >
      <ActionIcon
        size="lg"
        radius="md"
        variant="subtle"
        className='h-[36px] hover:text-red-500 text-gray-500'
        onClick={handleAddClick}
        disabled={isLoading}
      >
        <IconHeart size={24}/>
      </ActionIcon>
    </Tooltip>
  );
};
