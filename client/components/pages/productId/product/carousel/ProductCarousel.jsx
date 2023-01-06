import { Image, createStyles, Box } from "@mantine/core";
import { Carousel } from "@mantine/carousel";

const useStyles = createStyles((theme, _params, getRef) => ({
  price: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
  },

  carousel: {
    "&:hover": {
      [`& .${getRef("carouselControls")}`]: {
        opacity: 1,
      },
    },
  },

  carouselControls: {
    ref: getRef("carouselControls"),
    transition: "opacity 150ms ease",
    opacity: 0,
  },

  carouselIndicator: {
    width: 6,
    height: 6,
    transition: "width 250ms ease",
    backgroundColor: `${
      theme.colorScheme === "dark" ? theme.colors.gray[5] : theme.colors.gray[6]
    }`,
    "&[data-active]": {
      backgroundColor: `${
        theme.colorScheme === "dark"
          ? theme.colors.blue[5]
          : theme.colors.blue[6]
      }`,
    },
  },
}));

function ProductCarousel({ images }) {
  const { classes } = useStyles();
  const slides = images.map((image) => (
    <Carousel.Slide key={image} className="flex mb-10 items-center">
      <Image src={image} alt={image} radius="md" />
    </Carousel.Slide>
  ));
  return (
    <Box className="md:max-w-[500px] w-full rounded-md">
      <Carousel
        withIndicators
        loop
        slideGap="md"
        classNames={{
          root: classes.carousel,
          controls: classes.carouselControls,
          indicator: classes.carouselIndicator,
        }}
      >
        {slides}
      </Carousel>
    </Box>
  );
}

export default ProductCarousel;
