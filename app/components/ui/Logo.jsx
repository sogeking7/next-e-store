import Link from "next/link"
import {Flex, Title} from "@mantine/core"
import {DarkModeButton} from "./DarkModeButton";

export default function Logo() {
  return (
    <Flex className="min-w-max mr-8 items-center gap-2">
      <Link href="/">
        <Title className="cursor-pointer ">
          e-store
        </Title>
      </Link>
      <DarkModeButton/>
    </Flex>
  )
}