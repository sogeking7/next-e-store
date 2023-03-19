import Link from "next/link"
import { Title } from "@mantine/core"
import {DarkModeButton} from "./DarkModeButton";

export default function Logo() {
	return (
		<Link href="/" >
			<Title className="flex items-center gap-2 min-w-max mr-8 cursor-pointer " >
				e-store
				<DarkModeButton/>
			</Title>
		</Link>
	)
}