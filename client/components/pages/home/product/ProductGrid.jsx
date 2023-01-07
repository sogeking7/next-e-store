import { Box, createStyles, Group, Select, Stack } from "@mantine/core";
import ProductCard from "./ProductCard";

const layout = 0;
// 0 grid
// 1 flex

const useStyle = createStyles((theme) => ({
  wrapper: {
    padding: "1rem",
    backgroundColor: 'white',
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[3]
    }`,
    borderRadius: "4px",
  },
}));

const grid =
  "grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-4 phone:grid-cols-3 mini:grid-cols-2 basic: grid-cols-1 md:gap-x-4 md:gap-y-8 gap-x-2 gap-y-6";
const flex = "flex flex-col gap-4";

function ProductGrid({ products }) {
  const { classes } = useStyle();
  return (
    <Stack spacing="sm" className="overflow-hidden w-full md:w-[80%]">
      <Group position="right">
        <Select
          className="w-[130px]"
          defaultValue="featured"
          placeholder="Not set"
          size="xs"
          data={[
            { value: "price descending", label: "Price: high to low" },
            { value: "price ascending", label: "Price: low to high" },
            { value: "alphabtically", label: "Alphabetically" },
            { value: "featured", label: "Featured" },
          ]}
        />
      </Group>

      <Box className={classes.wrapper}>
        <div className={layout ? flex : grid}>
          {products.map((product) => (
            <ProductCard key={product._id} product={product} layout={layout} />
          ))}
        </div>
      </Box>
    </Stack>
  );
}

export default ProductGrid;
