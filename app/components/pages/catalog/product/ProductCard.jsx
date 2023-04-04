import { Text, Button, createStyles, Rating, Group, Box } from "@mantine/core";
import Link from "next/link";
import { AddToFavorite } from "./AddToFavorite";
import {useRouter} from "next/router";

const useStyles = createStyles((theme) => ({
  wrapper: {
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    padding: '1rem .75rem',
    border: theme.colorScheme === "dark" ? `` : `1px solid ${theme.colors.gray[4]}`,
    borderRadius: theme.radius.md,
    ['@media (max-width: 768px)']: {
      padding: '1rem .5rem',
    }
  }
}));

function ProductCard({layout, product}) {
  const router = useRouter();

  const { title, images, price, rating, id } = product;
  const { classes } = useStyles();

  const routerHandler = (id) => {
    const query = router.query;
    query.id = id;
    router.push(`/catalog/${router.query.category_name}/item/${id}`)
   }

  return (
    <Box className={layout ? "flex flex-row gap-4" : "flex flex-col gap-2"}>
      <div className={classes.wrapper}>
        <div className={layout ? "w-1/2" : "aspect-square flex items-center bg-white mb-2"}>
          <img
            onClick={() => routerHandler(id)}
            className={layout ? 'object-contain' : 'object-contain h-[160px] w-full'}
            src={images[0]}
            alt={null}
          />
        </div>
        <Box className={layout ? "" : "flex flex-col gap-2"}>
          <Box>
            <Text onClick={() => routerHandler(id)} lineClamp={2} size='sm' className="cursor-pointer hover:text-[#228be6]">
              {title}
            </Text>
            <Link href="/">
              <Rating defaultValue={rating} size="xs" fractions={2} readOnly className="" />
            </Link>
          </Box>
          <div className="flex justify-between">
            <Text weight="bold">
              {price}$
            </Text>
            <AddToFavorite/>
          </div>
        </Box>
      </div>
    </Box>
  );
}

export default ProductCard;
