import { Select, Stack } from "@mantine/core";
import ProductCard from "./ProductCard";

function ProductGrid({ products }) {
  return (
    <Stack spacing="xl" className="overflow-hidden basic:w-full md:w-[80%]">
      <Select
        className="w-[130px]"
        radius="md"
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
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-4 phone:grid-cols-3 mini:grid-cols-2 basic: grid-cols-1 md:gap-x-4 md:gap-y-8 gap-x-2 gap-y-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </Stack>
  );
}

export default ProductGrid;
