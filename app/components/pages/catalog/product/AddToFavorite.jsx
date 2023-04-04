import { ActionIcon } from "@mantine/core";
import {IconHeart, IconShoppingCartPlus} from "@tabler/icons";

export const AddToFavorite = () => {
  return (
    <ActionIcon
      size="lg"
      variant="transparent"
      color="dark"
      // className=" absolute shadow-md top-2 right-2"
    >
      <IconShoppingCartPlus size={20} />
    </ActionIcon>
  );
};
