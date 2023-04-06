import {Alert, Button, Flex, Group, Text} from "@mantine/core";

export const AlertBox = () => {
  return (
    <Alert color="gray" radius="md">
      <Flex className="justify-between gap-4 md:flex-row flex-col">
        <Text>
          Add your dream products
        </Text>
        <Group position="right">
          <Button color="dark.5">
            Go to catalog
          </Button> 
        </Group>
      </Flex>
    </Alert>
  )
}