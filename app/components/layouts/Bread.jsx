import { Breadcrumbs, Anchor, Box, Text } from '@mantine/core';

function getItems(list) {
	return list.map((item, index) => (
		<Anchor href={item.href} key={index} color='indigo.4' >
			<Text size="md">{item.title}</Text>
		</Anchor>
	));
}

function Bread({list}) {
	return (
		<Box pb="md">
			<Breadcrumbs separator="/" >{getItems(list)}</Breadcrumbs>
		</Box>
	)
}

export default Bread