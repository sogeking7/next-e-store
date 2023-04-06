import {ActionIcon, Group} from "@mantine/core";
import {IconBrandGithub, IconBrandInstagram, IconBrandTelegram} from "@tabler/icons";

const data = [
  {
    icon: <IconBrandTelegram size={20} stroke={1.5}/>,
    title: 'Telegram',
    link: 'https://www.t.me/kair011a'
  },
  {
    icon: <IconBrandInstagram size={20} stroke={1.5}/>,
    title: 'Instagram',
    link: 'https://www.instagram.com/sogeking_7/'
  },
  {
    icon: <IconBrandGithub size={20} stroke={1.5}/>,
    title: 'Github',
    link: 'https://github.com/sogeking7'
  }
]

function SocialLinks() {
  return (
    <Group spacing={20} noWrap>
      {
        data.map((item, ind) => {
          return <ActionIcon component="a" title={item.title} href={item.link} key={ind} color='gray' variant="transparent">
            {item.icon}
          </ActionIcon>
        })
      }
    </Group>
  )
}

export default SocialLinks;