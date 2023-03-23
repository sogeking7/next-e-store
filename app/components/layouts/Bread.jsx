import { Breadcrumbs, Anchor, Box, Text } from '@mantine/core';

import React from 'react'


function getItems(list) {
	return list.map((item, index) => (
		<Anchor href={item.href} key={index} >
			<Text size="md">{item.title}</Text>
		</Anchor>
	));
}

function Bread({list}) {
	return (
		<Box className="pb-4">
			<Breadcrumbs separator="/" color="green">{getItems(list)}</Breadcrumbs>
		</Box>
	)
}

export default Bread