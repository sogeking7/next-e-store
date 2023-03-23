import {
  createStyles,
  Container,
  Group,
  ActionIcon, Title,
} from "@mantine/core";

import {
  IconBrandTelegram,
  IconBrandInstagram,
  IconBrandGithub,
} from "@tabler/icons";

import Logo from "../ui/Logo";
import SocialLinks from "./SocialLinks";
import Link from "next/link";

const useStyles = createStyles((theme) => ({
  icon: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[0],
  },
  logo: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[0],
  },
  footer: {
    width: '100%',
    position: 'absolute',
    bottom: '0',
    paddingTop: 60,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,

    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column",
    },
  },

}));

export default function Footer() {
  const { classes } = useStyles();

  return (
    <div className={classes.footer}>
      <Container className={classes.inner} size="lg">
        <Logo isFooterOn={true}/>
        <SocialLinks/>
      </Container>
    </div>
  );
}
