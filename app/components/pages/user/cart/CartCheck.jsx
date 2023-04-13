import { Button, createStyles, Box, Flex, Title } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  wrapper: {
    width: '40%',
    ['@media (max-width: 767px)']: {
      width: '100%'
    },
    borderRadius: theme.radius.xl,
    padding: '1rem',
    height: 'min-content',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[1],
  },
}));
function CartCheck() {
  const { classes } = useStyles();
  return (
    <Box className={classes.wrapper}>
      <Flex mb={8} justify='space-between' align='center'>
        <Title order={3}>Total</Title>
        <Title order={2}>US $123</Title>
      </Flex>
      <Button w="100%" size="md" color="red.8" radius="xl">Checkout</Button>
    </Box>
  );
}

export default CartCheck;