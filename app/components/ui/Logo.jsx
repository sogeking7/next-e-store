import Link from "next/link"
import {Flex, Title} from "@mantine/core"

export default function Logo() {
  return (
    <Flex className="min-w-max mr-8 items-center gap-2">
      <Link href="/">
        <Title>
          e-store
        </Title>
      </Link>
    </Flex>
  )
}