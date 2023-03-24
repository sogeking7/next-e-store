import Link from "next/link"
import {Title} from "@mantine/core";

export default function Logo() {
  return (
    <div className="min-w-max mr-8 items-center gap-2">
      <Link href="/">
        <Title className="cursor-pointer">
          e-store
        </Title>
      </Link>
    </div>
  )
}