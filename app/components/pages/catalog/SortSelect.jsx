import { Group, Select, ActionIcon, createStyles } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { IconArrowsSort, IconAdjustmentsHorizontal, IconListDetails, IconLayoutGrid } from '@tabler/icons'

const useStyle = createStyles((theme) => ({
  icon: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.colors.dark[9],
  }
}));

export default function SortSelect({ layout, setLayout }) {
  const router = useRouter();
  const { classes } = useStyle();
  const [value, setValue] = useState(router.query.sort ? router.query.sort : "featured");

  useEffect(() => {
    const query = router.query;
    query.sort = value;
    router.push({
      pathname: `/catalog/${query.category_name}`,
      query: query,
    }, undefined, { shallow: true })
  }, [value])

  return (
    <Group className="md:justify-between justify-end" mb={16}>
      <Select
        radius="xl"
        color="red"
        value={value}
        w={165}
        className="hidden md:block"
        styles={(theme) => ({
          input: {
            border: theme.colorScheme === "dark" ? 'none' : ''
          },
          dropdown: {
            border: 'none',
            borderRadius: theme.radius.lg
          },
          item: {
            borderRadius: theme.radius.lg,
            '&[data-selected]': {
              '&, &:hover': {
                backgroundColor:
                  theme.colorScheme === 'dark' ? theme.colors.indigo[9] : theme.colors.indigo[1],
                color: theme.colorScheme === 'dark' ? theme.white : theme.colors.indigo[9],
              },
            },
          },
        })}
        placeholder="Not set"
        size="sm"
        onChange={setValue}
        data={[
          { value: "desc", label: "Price: high to low" },
          { value: "asc", label: "Price: low to high" },
          { value: "name", label: "Alphabetically" },
          { value: "featured", label: "Featured" },
        ]}
      />
      <Group spacing="xs">
        <ActionIcon
          className="md:hidden"
          size="xl"
          color='gray'
          variant="light"
          radius="xl"
        >
          <IconAdjustmentsHorizontal stroke={1.5} className={classes.icon} />
        </ActionIcon>
        <ActionIcon
          className="md:hidden"
          size="xl"
          color='gray'
          variant="light"
          radius="xl"
        >
          <IconArrowsSort stroke={1.5} className={classes.icon} />
        </ActionIcon>
        <ActionIcon
          size="xl"
          color='gray'
          variant="light"
          radius="xl"
          onClick={
            () => setLayout(!layout)
          }
        >
          {
            layout ?
              <IconLayoutGrid stroke={1.5} className={classes.icon} />
              :
              <IconListDetails stroke={1.5} className={classes.icon} />
          }
        </ActionIcon>
      </Group>
    </Group>
  )
}
