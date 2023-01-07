import Link from "next/link"
import { Title } from "@mantine/core"

export default function Logo() {
	return (<Link href="/" >
		<Title className="min-w-max mr-8 inline cursor-pointer" order={1}>
			e-store
		</Title>
	</Link>)
}