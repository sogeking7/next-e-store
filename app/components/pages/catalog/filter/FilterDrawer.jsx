import { createStyles, Drawer, Text } from "@mantine/core";
import { Filter } from "./Filter";

const useStyles = createStyles((theme) => ({
  drawer: {
    borderTopLeftRadius: theme.radius.xl,
    borderTopRightRadius: theme.radius.xl,
    [`@media (min-width: 767px)`]: {
      display: 'none'
    }
  }
}));

export const FilterDrawer = ({ opened, setOpened }) => {
  const { classes } = useStyles();
  return (
    <Drawer
      opened={false}
      title={<Text weight={700} size={32}>Filters</Text>}
      onClose={() => setOpened(!opened)}
      position="bottom"
      padding="xl"
      className={classes.drawer}
      size="full"
    >
      <Filter />
    </Drawer>
  );
}
