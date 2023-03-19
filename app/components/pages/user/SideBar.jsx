import {Box, Button, createStyles, Text, Flex, Stack, useMantineColorScheme} from "@mantine/core";
import {useRouter} from "next/router";
import {IconBox, IconHeart, IconLogout} from "@tabler/icons";
import {signOut} from "next-auth/react";

const useStyles = createStyles((theme) => ({
  wrapper: {
    padding: '1rem 1rem 1rem 0',
    borderRight: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[4]
    }`,
    height: '100%'
  }
}));

const emptyArr = [
  {
    name: 'Orders',
    path: 'orders',
    icon: <IconBox size={20}/>
  },
  {
    name: 'Wishlist',
    path: 'wishlist',
    icon: <IconHeart size={20}/>
  }
]
function SideBar() {
  const {classes} = useStyles();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const router = useRouter();

  console.log(router.pathname.split('/'))
  return (
      <Box className="md:w-1/3 lg:w-1/4 md:block basic:hidden">
        <Stack className={classes.wrapper}>
          <Flex className="flex-col">
            {emptyArr.map((val, ind) => {
              return (
                <button
                  key={ind}
                  onClick={() => {
                    router.push({pathname: val.path})
                  }}
                  className={`${val.path == router.pathname.split('/')[2] ? `text-left rounded-full text-sm ${colorScheme === 'dark' ? 'text-[#C1C2C5]' : 'text-[#1A1B1E]'} border-none font-bold ${colorScheme === 'dark' ? 'bg-[#25262B]' : 'bg-[#E9ECEF]'} py-[6px] px-2` : `text-left rounded-full text-sm ${colorScheme === 'dark' ? 'text-[#C1C2C5]' : 'text-[#1A1B1E]'} ${colorScheme === 'dark' ? 'bg-[#141517]' : 'bg-white'} border-none  ${colorScheme === 'dark' ? 'hover:bg-[#25262B]' : 'hover:bg-[#E9ECEF]'} py-[6px] px-2`}`}>
                  <Flex className="gap-3 items-center ">
                    {val.icon}
                    <Text className="text-[1rem]" weight={500}>{val.name}</Text>
                  </Flex>
                </button>
              )
            })}
          </Flex>
          <Flex className="flex-col">
            <button
              onClick={()=>{
                router.push({
                  pathname: '/'
                }).then(()=>{
                  signOut()
                })
              }}
              className={`text-left rounded-full text-sm ${colorScheme === 'dark' ? 'text-[#C1C2C5]' : 'text-[#1A1B1E]'} ${colorScheme === 'dark' ? 'bg-[#141517]' : 'bg-white'} border-none  ${colorScheme === 'dark' ? 'hover:bg-[#25262B]' : 'hover:bg-[#E9ECEF]'} py-[6px] px-2`}>
              <Flex className="gap-3 items-center ">
                <IconLogout size={20}/>
                <Text className="text-[1rem]" weight={500}>Sign out</Text>
              </Flex>
            </button>
          </Flex>
        </Stack>
      </Box>
  );
}

export default SideBar;
