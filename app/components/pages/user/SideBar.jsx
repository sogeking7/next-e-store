import {Box, createStyles, Text, Flex, Stack} from "@mantine/core";
import {useRouter} from "next/router";
import {IconBox, IconChevronRight, IconHeart, IconLogout} from "@tabler/icons";
import {signOut} from "next-auth/react";

const useStyles = createStyles((theme) => ({
  link: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: theme.radius.xl,
    padding: '.5rem',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
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
      <Stack className="w-full">
        <Flex direction="column">
          {links.map((val, ind) => {
            return (
              <a
                key={ind}
                onClick={() => router.push({pathname: val.path})}
                className={cx(classes.link, {[classes.linkActive]: val.path === router.pathname.split('/')[2]})}>
                <Flex className="gap-3 items-center cursor-default">
                  {val.icon}
                  <Text>{val.name}</Text>
                </Flex>
                  <IconChevronRight className="md:hidden"/>
              
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
            <Flex className="gap-3 items-center cursor-default">
              <IconLogout size={22}/>
              <Text>Sign out</Text>
            </Flex>
          </a>
        </Flex>
      </Stack>
    
  );
}

export default SideBar;
