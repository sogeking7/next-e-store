import Link from "next/link"
import { createStyles, Title } from "@mantine/core"

const useStyles = createStyles((theme) => ({
	logo: {
		color: theme.colorScheme == 'dark' ? theme.white : theme.black
	}
}))

export default function Logo() {
	const {classes} = useStyles();
	return (<Link href="/" >
		<Title className="min-w-max mr-8 inline cursor-pointer " order={1}>
			<span className={classes.logo}>e-store</span>
		</Title>
	</Link>)
}