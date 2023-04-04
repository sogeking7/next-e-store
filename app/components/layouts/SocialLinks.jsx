import {ActionIcon, Group} from "@mantine/core";
import {data} from '../../data/social_links'

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