import { Box, createStyles, Group, Select, Stack } from "@mantine/core";
import ProductCard from "./ProductCard";

const layout = 0;
// 0 grid
// 1 flex

const useStyle = createStyles((theme) => ({
  wrapper: {
    // backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : '#fff',
    // border: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[3]
    //   }`,
    borderRadius: "8px",
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      // Type safe child reference in nested selectors via ref
      // [`& .${getRef('child')}`]: {
      //   fontSize: theme.fontSizes.xs,
      // },
      border: 'none'
    },
  },
}));

const grid =
  "grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-4 phone:grid-cols-3 mini:grid-cols-2 basic: grid-cols-1 md:gap-x-4 gap-x-2 gap-y-6";
const flex = "flex flex-col gap-4";

function ProductGrid({ products }) {
  const { classes } = useStyle();
  return (
    <Stack spacing="md" className="overflow-hidden w-full md:w-[80%] p-4">
      <Box className="md:block hidden">
        <Group position="right">
          <Select
            radius="md"
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
      </Box>

      <Box className={classes.wrapper}>
        <Box className="">
          <div className={layout ? flex : grid}>
            {products.map((product) => (
              <ProductCard key={product._id} product={product} layout={layout} />
            ))}
          </div>
        </Box>
      </Box>
    </Stack>
  );
}

export default ProductGrid;
