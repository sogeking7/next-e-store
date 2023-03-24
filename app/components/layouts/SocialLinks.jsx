import {ActionIcon, Group} from "@mantine/core";
import {IconBrandGithub, IconBrandInstagram, IconBrandTelegram} from "@tabler/icons";

const links = [
  {
    icon: <IconBrandTelegram size={20} stroke={1.5}/>,
    title: 'Telegram'
  },
  {
    icon: <IconBrandInstagram size={20} stroke={1.5}/>,
    title: 'Instagram'
  },
  {
    icon: <IconBrandGithub size={20} stroke={1.5}/>,
    title: 'Github'
  }
]

function SocialLinks() {
  return (
    <Group spacing={20} noWrap>
      {
        links.map((item, ind) => {
          return <ActionIcon key={ind} color='gray' variant="transparent">
            {item.icon}
          </ActionIcon>
        })
      }
    </Group>
  )
}

export default SocialLinks;