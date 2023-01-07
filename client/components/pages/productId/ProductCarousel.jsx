import { Image, createStyles, Box, Flex } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { IconArrowRight, IconArrowLeft } from "@tabler/icons";

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
    width: 7,
    height: 7,
    // transition: "width 250ms ease",
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
    <Carousel.Slide key={image} className="max-h-[600px]">
      <Box className="w-full h-full">
        <img src={image} alt={image} className="object-contain w-full h-full" />
      </Box>
    </Carousel.Slide>
  ));
  return (
    <div className="w-full">
      <Carousel
        draggable={false}
        controlSize={50}
        controlsOffset="xs"
        nextControlIcon={<IconArrowRight size={32} />}
        previousControlIcon={<IconArrowLeft size={32} />}
        classNames={{
          root: classes.carousel,
          controls: classes.carouselControls,
          indicator: classes.carouselIndicator,
        }}
      >
        {slides}
      </Carousel>
    </div>
  );
}

export default ProductCarousel;
