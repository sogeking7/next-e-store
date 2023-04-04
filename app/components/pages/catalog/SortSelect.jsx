import {Group, Select} from "@mantine/core";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";

export default function SortSelect() {
  const router = useRouter();
  const [value, setValue] = useState(router.query.sort ? router.query.sort : "featured");

  useEffect(() => {
    const query = router.query;
    query.sort = value;
    router.push({
      pathname: `/catalog/${query.category_name}`,
      query: query,
    }, undefined,  { shallow: true })
  }, [value])

  return (
    <Group position="left" className="mb-4 md:block hidden">
      <Select
        radius="md"
        value={value}
        className="w-[140px]"
        placeholder="Not set"
        size="xs"
        onChange={setValue}
        data={[
          {value: "desc", label: "Price: high to low"},
          {value: "asc", label: "Price: low to high"},
          {value: "name", label: "Alphabetically"},
          {value: "featured", label: "Featured"},
        ]}
      />
    </Group>
  )
}