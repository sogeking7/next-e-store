import {Box, createStyles, Text, Flex, Stack} from "@mantine/core";
import {useRouter} from "next/router";
import {IconBox, IconHeart, IconLogout} from "@tabler/icons";
import {signOut} from "next-auth/react";

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingRight: '1rem',
    borderRight: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[4]}`,
    height: '100%'
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: '8px',
    padding: '.5rem',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
    },
  },
  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[3],
    },
  }
}));

const links = [
  {
    name: 'Orders',
    path: 'orders',
    icon: <IconBox size={22}/>
  },
  {
    name: 'Wishlist',
    path: 'wishlist',
    icon: <IconHeart size={22}/>
  }
]

function SideBar() {
  const {classes, cx} = useStyles();
  const router = useRouter();

  console.log(router.pathname.split('/'))
  return (
    <Box className="md:w-1/3 lg:w-1/4 md:block basic:hidden">
      <Stack className={classes.wrapper}>
        <Flex direction="column">
          {links.map((val, ind) => {
            return (
              <a
                key={ind}
                onClick={() => router.push({pathname: val.path})}
                className={cx(classes.link, {[classes.linkActive]: val.path === router.pathname.split('/')[2]})}>
                <Flex className="gap-3 items-center">
                  {val.icon}
                  <Text className="text-[1rem]" weight={500}>{val.name}</Text>
                </Flex>
              </a>
            )
          })}
        </Flex>
        <Flex direction="column">
          <a
            onClick={() => {
              router.push({pathname: '/'}).then(() => signOut())
            }}
            className={classes.link}>
            <Flex className="gap-3 items-center">
              <IconLogout size={22}/>
              <Text className="text-[1rem]" weight={500}>Sign out</Text>
            </Flex>
          </a>
        </Flex>
      </Stack>
    </Box>
  );
}

export default SideBar;
