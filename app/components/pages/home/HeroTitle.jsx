import {createStyles, Text, Title} from '@mantine/core';

const useStyles = createStyles((theme) => ({
  featured: {
    color: theme.colorScheme === 'dark' ? theme.colors.red[5] : theme.colors.red[6]
  },
  title: {
    color: theme.colorScheme === 'dark' ? theme.colors.gray[4] : theme.colors.dark[6],
    fontSize: '50px'
  }
}));

export default function HeroTitle() {
  const {classes} = useStyles();
  return (
    <div className="max-w-5xl mx-auto px-4 pt-16 pb-16">
      <div className="w-full">
        <Title className={classes.title}>
          A{' '}
          <Text component="span" className={classes.featured} inherit>
            fully featured
          </Text>{' '}
          e&#8209;store
        </Title>
      </div>
    </div>
  );
}