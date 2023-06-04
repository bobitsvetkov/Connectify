import React from "react";
import {
  Box,
  IconButton,
  useBreakpointValue,
  Stack,
  Heading,
  Text,
  Container,
} from "@chakra-ui/react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import Slider from "react-slick";
import { Image } from "@chakra-ui/react";

const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export default function TeamCarousel() {
  const [slider, setSlider] = React.useState(null);
  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const side = useBreakpointValue({ base: "30px", md: "40px" });

  const cards = [
    {
      title: "Radina Georgieva",
      text: "Junior JacaScript Front End Developer /Telerik Academy Student/",
      image: "https://i.ibb.co/2FRLZfk/radi-3.jpg",
    },
    {
      title: "Viktor Lomliev",
      text: "Junior JavaScript Full-Stack Developer /Telerik Academy Student/ ",
      image: "https://i.ibb.co/1GJsYRF/DSC-0984.jpg",
    },
    {
      title: "Borislav Tsvetkov",
      text: "Junior JavaScript Full-Stack Developer /Telerik Academy Student/",
      image: "https://i.ibb.co/XjGfVbk/1661515068516-1.jpg",
    },
  ];
  const settings = {
    dots: false,
  };
  return (
    <Box position={"relative"} height={"600px"} width={"full"}>
      <Heading
        fontSize={{
          base: "xl",
          md: "2xl",
        }}
        align={"center"}
      >
        Connectify Team
      </Heading>
      <link
        rel="stylesheet"
        type="text/css"
        charSet="UTF-8"
        // href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        // href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      <IconButton
        aria-label="left-arrow"
        variant="ghost"
        position="absolute"
        left={side}
        top={top}
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => slider?.slickPrev()}
      >
        <BiLeftArrowAlt size="40px" />
      </IconButton>
      <IconButton
        aria-label="right-arrow"
        variant="ghost"
        position="absolute"
        right={side}
        top={top}
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => slider?.slickNext()}
      >
        <BiRightArrowAlt size="40px" />
      </IconButton>
      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {cards.map((card, index) => (
          <Box key={index} height={"auto"} position="relative">
            <Container
              mt={20}
              size="container.lg"
              height="auto"
              position="relative"
              align={"center"}
            >
              <Image
                borderRadius={"20px"}
                boxSize="400px"
                objectFit="cover"
                src={card.image}
                alt={card.title}
                mb={4}
              />
              <Stack spacing={6} w={"full"} maxW={"lg"} position="relative">
                <Heading fontSize={{ base: "sm", md: "sm", lg: "sm" }}>
                  {card.title}
                </Heading>
                <Text fontSize={{ base: "md", lg: "lg" }} color="GrayText">
                  {card.text}
                </Text>
                <Text fontSize={{ base: "md", lg: "lg" }} color="GrayText">
                  {card.additionalText}
                </Text>
              </Stack>
            </Container>
          </Box>
        ))}
      </Slider>
    </Box>
  );
}
