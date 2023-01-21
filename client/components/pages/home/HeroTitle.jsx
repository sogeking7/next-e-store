import { createStyles, Container, Text, Button, Group } from '@mantine/core';
// import { GithubIcon } from '@mantine/core';
import { IconBrandGithub } from '@tabler/icons';


import { useRouter } from 'next/router'

const BREAKPOINT = '@media (  max-width: 755px)';

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    height: '100vh',
    boxSizing: 'border-box',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
  },

  inner: {
    position: 'relative',
    paddingTop: 200,
    paddingBottom: 120,

    [BREAKPOINT]: {
      paddingBottom: 80,
      paddingTop: 80,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 62,
    fontWeight: 900,
    lineHeight: 1.1,
    margin: 0,
    padding: 0,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,

    [BREAKPOINT]: {
      fontSize: 42,
      lineHeight: 1.2,
    },
  },

  description: {
    marginTop: theme.spacing.xl,
    fontSize: 24,

    [BREAKPOINT]: {
      fontSize: 18,
    },
  },

  controls: {
    marginTop: theme.spacing.xl * 2,

    [BREAKPOINT]: {
      marginTop: theme.spacing.xl,
    },
  },

  control: {
    height: 54,
    paddingLeft: 38,
    paddingRight: 38,

    [BREAKPOINT]: {
      height: 54,
      paddingLeft: 18,
      paddingRight: 18,
      flex: 1,
    },
  },
}));

export default function HeroTitle() {
  const { classes } = useStyles();
  const router = useRouter()
  return (
    <div className={classes.wrapper}>
      <Container size="lg" className={classes.inner}>
        <h1 className={classes.title}>
          A{' '}
          <Text component="span" variant="gradient" gradient={{ from: 'indigo', to: 'green' }} inherit>
            fully featured
          </Text>{' '}
          Ecommerce Store
        </h1>

        <Text className={classes.description} color="dimmed">
          Shop the latest trends and styles at our e-store
        </Text>

        <Group className={classes.controls}>
          <Button
            size="xl"
            className={classes.control}
            variant="gradient"
            radius="md"
            onClick={() => router.push('/catalog')}
            gradient={{ from: 'indigo', to: 'green' }}
          >
            Go to Market
          </Button>

          <Button
            component="a"
            href="https://github.com/sogeking7/next-e-store"
            size="xl"
            radius="md"
            variant="default"
            className={classes.control}
            leftIcon={<IconBrandGithub size={20} />}
          >
            GitHub
          </Button>
        </Group>
      </Container>
    </div>
  );
}