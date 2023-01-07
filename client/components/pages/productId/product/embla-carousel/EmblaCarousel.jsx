import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Thumb } from "./EmblaCarouselThumbsButton";
import { ActionIcon, Group, Text } from "@mantine/core";
import { IconArrowsDiagonal, IconZoomIn } from "@tabler/icons";

const EmblaCarousel = (props) => {
  const { slides, options, setOpened } = props;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel();
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
    <div className="embla md:w-2/3 rounded">
      <div
        className="embla__viewport"
        ref={emblaMainRef}
      >
        <div className="embla__container py-8 ">
          {slides.map((image, index) => (
            <div className="embla__slide max-h-[300px]" key={index}>
              <img
                className="w-full h-full object-contain"
                src={image}
                alt="Your alt text"
              />
            </div>
          ))}
        </div>
        <Group position="right" className="p-4">
          <ActionIcon onClick={() => setOpened(true)}>
            <IconZoomIn />
          </ActionIcon>
        </Group>
      </div>

      <div className="embla-thumbs m-4">
        <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
          <div className="embla-thumbs__container">
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
