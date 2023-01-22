import {
  createStyles,
  Container,
  Group,
  ActionIcon,
} from "@mantine/core";

import {
  IconBrandTelegram,
  IconBrandInstagram,
  IconBrandGithub,
} from "@tabler/icons";

import Logo from "../ui/Logo";

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: 120,
    backgroundColor: theme.colors.dark[7],
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

  links: {
    [theme.fn.smallerThan("xs")]: {
      marginTop: theme.spacing.md,
    },
  },
}));

export default function Footer() {
  const { classes } = useStyles();

  return (
    <div className={classes.footer}>
      <Container className={classes.inner} size="lg">
        <div className="text-white">
        <Logo />
        </div>
        <Group spacing={0} className={classes.links} position="right" noWrap>
          <ActionIcon size="lg">
            <IconBrandTelegram size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg">
            <IconBrandGithub size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg">
            <IconBrandInstagram size={18} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </div>
  );
}
