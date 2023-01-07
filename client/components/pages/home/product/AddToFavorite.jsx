import { ActionIcon } from "@mantine/core";
import { IconHeart } from "@tabler/icons";

export const AddToFavorite = () => {
  return (
    <ActionIcon
      size="lg"
      variant="light"
      color="gray.9"
      radius="xl"
      className="bg-white absolute shadow-md top-2 right-2"
    >
      <IconHeart size={16} />
    </ActionIcon>
  );
};
