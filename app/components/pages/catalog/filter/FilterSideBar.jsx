import { Box } from "@mantine/core";

import Filter from "./Filter";

function FilterSideBar() {
  return (
    <Box className="md:w-1/2 lg:w-1/3 md:block basic:hidden mr-8">
      <Filter />
    </Box>
  );
}

export default FilterSideBar;
