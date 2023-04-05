import {ActionIcon, Tooltip} from "@mantine/core";
import {IconShoppingCartPlus, IconTrash} from "@tabler/icons";

export const RemoveFromWishlistBtn = () => {
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
      >
        <IconTrash size={20} />
      </ActionIcon>
    </Tooltip>
  );
};
