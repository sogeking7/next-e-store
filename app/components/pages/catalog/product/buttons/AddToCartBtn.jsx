import {ActionIcon, Tooltip} from "@mantine/core";
import {IconShoppingCartPlus} from "@tabler/icons";

export const AddToCartBtn = () => {
  return (
    <Tooltip
      label="Add to Cart"
      position="top"
      withArrow
      color="blue"
    >
      <ActionIcon
        size="lg"
        variant="transparent"
        color="dark"
      >
        <IconShoppingCartPlus size={20}/>
      </ActionIcon>
    </Tooltip>
  );
};
