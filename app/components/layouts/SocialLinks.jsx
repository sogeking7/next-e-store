import {ActionIcon, createStyles, Group} from "@mantine/core";
import {IconBrandGithub, IconBrandInstagram, IconBrandTelegram} from "@tabler/icons";


const useStyles = createStyles((theme) => ({
  links: {
    [theme.fn.smallerThan("xs")]: {
      marginTop: theme.spacing.md,
    },
  },
}));

function SocialLinks(){
  const { classes } = useStyles();
  return(
    <Group spacing={0} className={classes.links} position="right" noWrap>
      <ActionIcon size="lg" color='dark'
                  variant="transparent">
        <IconBrandTelegram size={18} stroke={1.5} />
      </ActionIcon>
      <ActionIcon size="lg" color='dark'
                  variant="transparent">
        <IconBrandGithub size={18} stroke={1.5} />
      </ActionIcon>
      <ActionIcon size="lg" color='dark'
                  variant="transparent">
        <IconBrandInstagram size={18} stroke={1.5} />
      </ActionIcon>
    </Group>
  )
}
export default SocialLinks;