import {createStyles, Text, Title} from '@mantine/core';

const useStyles = createStyles((theme) => ({
  featured: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.white,
    backgroundImage: theme.colorScheme === 'dark' ? theme.fn.gradient({ from: 'red', to: 'violet', deg: 45 }) : theme.fn.gradient({ from: 'red', to: 'violet', deg: 45 })
  },
  title: {
    color: theme.colorScheme === 'dark' ? theme.colors.gray[4] : theme.colors.dark[6],
    fontSize: '50px'
  }
}));

export default function HeroTitle() {
  const {classes} = useStyles();
  return (
    <div className="max-w-5xl mx-auto p-4 py-32">
      <Title className={classes.title}>
        A{' '}
        <Text component="span" className={classes.featured} inherit>
          fully featured
        </Text>{' '}
        e&#8209;store
      </Title>
    </div>
  );
}