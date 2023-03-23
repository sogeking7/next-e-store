import {createStyles, Container, Text, Box, Title, Flex} from '@mantine/core';
import {useRouter} from 'next/router'
import {useHover} from "@mantine/hooks";


const useStyles = createStyles((theme) => ({
  main: {
    color: theme.colorScheme === 'dark' ? theme.colors.red[5] : theme.colors.red[6]
  },
  title: {
    color: theme.colorScheme === 'dark' ? theme.colors.gray[4] : theme.colors.dark[6],
    fontSize: '50px'
  }
}));

export default function HeroTitle() {
  const {classes} = useStyles();
  const router = useRouter()
  const {hovered, ref} = useHover();
  return (
    <Box>
      <Container size="lg" className="pt-[6rem] pb-[3rem]">
        <Flex className="justify-center items-center">
          <Title className={classes.title}>
            A{' '}
            <Text component="span" className={classes.main} inherit>
              fully featured
            </Text>{' '}
            e&#8209;store
          </Title>
        </Flex>
      </Container>
    </Box>
  );
}