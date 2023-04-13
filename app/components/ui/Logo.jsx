import Link from "next/link"
import {Title} from "@mantine/core";

export default function Logo() {
  return (
    <Link href="/">
      <Title className="cursor-pointer">
        e-store
      </Title>
    </Link>
  )
}