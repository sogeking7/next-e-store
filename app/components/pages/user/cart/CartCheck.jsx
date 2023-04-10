import {Button, createStyles, Flex, Title} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  wrapper: {
    width: '40%',
    ['@media (max-width: 767px)']: {
      width: '100%'
    },
    borderRadius: '8px',
    padding: '1rem',
    height: 'min-content',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
  },
}));
function CartCheck() {
  const {classes} = useStyles();
  return (
    <div className={classes.wrapper}>
      <Flex mb={8} justify='space-between' align='center'>
        <Title order={3}>Total</Title>
        <Title order={2}>US $123</Title>
      </Flex>

      <Button className="w-full" size="md" color="indigo.5" radius="xl">Checkout</Button>
    </div>
  );
}

export default CartCheck;