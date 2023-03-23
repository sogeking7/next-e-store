import {Box, createStyles, Flex, Text, useMantineColorScheme} from "@mantine/core";
import React, {useState} from "react";
import {categories} from "../../data/categories";
import {useRouter} from "next/router";
import {useHover} from "@mantine/hooks";

const useStyles = createStyles((theme) => ({
  border: {
    paddingRight: '1rem',
    width: '100%',
    borderRight: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[4]
    }`,
    height: '100%'
  }
}));


export default function CategoryHoverCard() {
  const {classes} = useStyles();
  const router = useRouter();
  const {colorScheme, toggleColorScheme} = useMantineColorScheme();
  const {hovered, ref} = useHover();
  const [active, setActive] = useState(0);
  return (
    <Flex>
      <Box className="w-1/3">
        <Box className={classes.border}>
          <Flex className="flex-col">
            {categories.map((val, ind) => {
              return (
                // <Box >
                  <button
                    key={ind}
                    onMouseOver={()=>{
                      setActive(ind)
                    }}
                    onClick={() => {
                      router.push(`/catalog/${val.path}`)
                    }}
                    className={`text-l  eft rounded-lg text-sm ${colorScheme === 'dark' ? 'text-[#C1C2C5]' : 'text-[#1A1B1E]'} ${colorScheme === 'dark' ? 'bg-[#25262B]' : 'bg-white'} border-none  ${colorScheme === 'dark' ? 'hover:bg-[#1A1B1E]' : 'hover:bg-[#E9ECEF]'} py-[6px] px-2`}>
                    <Flex className="gap-3 items-center ">
                      {/*{val.icon}*/}
                      <Text className="text-[1rem]" weight={600}>{val.title}</Text>
                    </Flex>
                  </button>
                // </Box>
              )
            })}
          </Flex>
        </Box>
      </Box>
      <Box className="w-2/3 ml-4 ">
        <Text className="text-2xl" weight={600}>{categories[active].title}</Text>
      </Box>
    </Flex>
  )
}