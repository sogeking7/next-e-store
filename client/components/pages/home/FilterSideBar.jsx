import { Box } from "@mantine/core";

import Filter from "./Filter";

function FilterSideBar() {
  return (
    <Box className="lg:w-[20%] md:w-[30%] md:block basic:hidden">
      <Filter />
    </Box>
  );
}

export default FilterSideBar;
