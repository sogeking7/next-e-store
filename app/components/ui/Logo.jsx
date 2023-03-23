import Link from "next/link"
import {createStyles, Flex, Title} from "@mantine/core"
import {DarkModeButton} from "./DarkModeButton";

const useStyle = createStyles((theme) => ({
  title: {
    cursor: 'pointer',
    color: theme.colorScheme === 'dark' ? theme.colors.gray[4] : theme.colors.dark[6],
  }
}));

export default function Logo({isFooterOn}) {
  const {classes} = useStyle();
  return (
    <Flex className={`min-w-max ${isFooterOn ? '' : 'mr-8'} items-center gap-2`}>
      <Link href="/">
        <Title className={classes.title}>
          e-store
        </Title>
      </Link>
      {isFooterOn ? <></> :
        <DarkModeButton/>}
    </Flex>
  )
}