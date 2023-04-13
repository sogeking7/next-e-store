import {Box, createStyles, Flex, Text} from "@mantine/core";
import {useState} from "react";
import {data} from "../../data/categories";
import {useRouter} from "next/router";

const useStyles = createStyles((theme) => ({
  border: {
    paddingRight: '1rem',
    width: '100%',
    height: '100%',
    borderRight: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[4]}`
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: theme.radius.md,
    padding: '.5rem',
    cursor: 'pointer',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[1],
    },
  },
}));

export default function CategoryHoverCard() {
  const {classes} = useStyles();
  const router = useRouter();
  const [active, setActive] = useState(0);
  return (
    <Flex>
      <Box w="33.33%">
        <Box className={classes.border}>
          <Flex direction="column">
            {
              data.map((category, ind) => {
                return (
                  <a
                    key={ind}
                    onMouseOver={() => setActive(ind)}
                    className={classes.link}
                    onClick={() => router.push(`/catalog/${category.path}`)}
                  >
                    <Flex items="center" gap="xs">
                      <Text size={16} weight={600}>{category.title}</Text>
                    </Flex>
                  </a>
                )
              })
            }
          </Flex>
        </Box>
      </Box>
      <Box w="66.66%" ml={16}>
        <Text size={24} weight={600}>{data[active].title}</Text>
      </Box>
    </Flex>
  )
}