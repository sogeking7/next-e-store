import { Breadcrumbs, Anchor, Box, Text, createStyles } from '@mantine/core';

import React from 'react'

const items = [
	{ title: 'e-store', href: '#' },
	{ title: 'CategoryName', href: '#' },
	{ title: 'ProductName/Id', href: '#' },
].map((item, index) => (
	<Anchor href={item.href} key={index}>
		<Text size="sm">{item.title}</Text>
	</Anchor>
));

const useStyles = createStyles((theme) => ({
	bread: {
		padding: '1rem',
		borderBottom: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[4]
	}`
	}
}))

function Bread() {
	const {classes} = useStyles()
	return (
		<Box className={classes.bread}>
			<Breadcrumbs separator="/">{items}</Breadcrumbs>
		</Box>
	)
}

export default Bread