import { Box, createStyles, Text, Title } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  featured: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.white,
    backgroundImage: theme.colorScheme === 'dark' ? theme.fn.gradient({ from: 'red', to: 'violet', deg: 45 }) : theme.fn.gradient({ from: 'red', to: 'violet', deg: 45 })
  },
  title: {
    color: theme.colorScheme === 'dark' ? theme.colors.gray[4] : theme.colors.dark[6],
  }
}));

export default function HeroTitle() {
  const { classes } = useStyles();
  return (
    <Box maw={1024} mx="auto" p={16} py={128}>
      <Title className={classes.title} size={50}>
        A{' '}
        <Text component="span" className={classes.featured} inherit>
          fully featured
        </Text>{' '}
        e&#8209;store
      </Title>
    </Box>
  );
}