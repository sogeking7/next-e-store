import illustration from '../../../public/design-workflow-web-graphic-website-layout-teamwork-team-effort-wyauwzntwl.png'
import {createStyles, Container, Text, Box, Title, Flex} from '@mantine/core';
import { useRouter } from 'next/router'
import Image from "next/image";
import {useHover} from "@mantine/hooks";


const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    boxSizing: 'border-box',
    background: theme.colorScheme === 'dark' ? theme.colors.dark[7] : '#fff'
  },
  main: {
    color: theme.colorScheme === 'dark' ? theme.colors.red[5] : theme.colors.red[7]
  },

}));

export default function HeroTitle() {
  const { classes } = useStyles();
  const router = useRouter()
  const { hovered, ref } = useHover();
  return (
    <div className={classes.wrapper}>
      <Container size="lg" className="py-[2rem]">
        <Flex>
          <Flex className="w-[60%] justify-left items-center">
            <Title className="text-5xl">
              A{' '}
              <Text component="span" className={classes.main} inherit>
                fully featured
              </Text>{' '}
              e-store
            </Title>
          </Flex>
          <Box className="w-[40%]">
            <Image src={illustration} />
          </Box>

        </Flex>
      </Container>
    </div>
  );
}