import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Thumb } from "./EmblaCarouselThumbsButton";
import { Text } from "@mantine/core";
// import imageByIndex from "./ImageByIndex";

const EmblaCarousel = (props) => {
  const { slides, options, setOpened } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      if (emblaThumbsApi.clickAllowed()) emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on("select", onSelect);
    emblaMainApi.on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  return (
    <div className="embla md:w-2/3 w-full rounded pb-4">
      <div
        className="embla__viewport md:pt-4 md:px-16 md:pb-28"
        ref={emblaMainRef}
      >
        <div className="embla__container mb-4 ">
          {slides.map((image, index) => (
            <div className="embla__slide" key={index}>
              <img
                onClick={() => setOpened(true)}
                className="embla__slide__img w-full h-full object-contain hover:cursor-zoom-in"
                src={image}
                alt="Your alt text"
              />
            </div>
          ))}
        </div>
        <Text className="text-center cursor-default" size="sm" color="dimmed">
          To enlarge, click on the picture
        </Text>
      </div>

      <div className="embla-thumbs">
        <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
          <div className="embla-thumbs__container px-5">
            {slides.map((image, index) => (
              <Thumb
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
                index={index}
                className="object-contain w-full h-full"
                imgSrc={image}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
