import * as React from 'react';
import {
  Box,
  IconButton,
  useBreakpointValue,
  Stack,
  Heading,
  Text,
  Container,
  Image,
} from "@chakra-ui/react";

import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";

import Slider from "react-slick";

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

export default function CaptionCarousel() {

  const [slider, setSlider] = React.useState<Slider | null>(null);

  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const side = useBreakpointValue({ base: "30%", md: "40px" });


  const cards = [
    {
      title: "Chat messages",
      text: " Instant, direct, and efficient communication. Exchange thoughts, information, and engage in real-time",
      image:
        "https://img.freepik.com/free-vector/messaging-application-abstract-concept-illustration_335657-2231.jpg?w=740&t=st=1685876348~exp=1685876948~hmac=4125393f513920052820b19f95f3c5451eaaa93c51183b00818d0efa4712b775",
    },
    {
      title: "Calendar Planner",
      text: "Stylish and intuitive personal assistant for effortless organization",
      image:
        "https://img.freepik.com/free-vector/time-management-marketers-teamwork_335657-3008.jpg?w=996&t=st=1685876414~exp=1685877014~hmac=d748e0d397353ab3a0d5442f6b748e105196d0efaba829a051ab7e3539f3a0e8",
    },
    {
      title: "Voice Messages",
      text: "Unleash the power of your voice with voice messages, where conversations take on a whole new dimension",
      image:
        "https://img.freepik.com/free-vector/users-buying-smart-speaker-applications-online-smart-assistant-applications-online-store-voice-activated-digital-assistants-apps-market-concept-vector-isolated-illustration_335657-2173.jpg?w=996&t=st=1685876211~exp=1685876811~hmac=c84a684cd960561968aa81f20247c8e9b7f812e4155a0bc1cac953ceee70f232",
    },
    {
      title: "Video Calls",
      text: "Step into a virtual realm of connection and engagement with video calls, where distance disappears",
      image:
        "https://img.freepik.com/free-vector/students-watching-online-training-video-with-teacher-chart-tablet_335657-3286.jpg?w=996&t=st=1685907514~exp=1685908114~hmac=b16d6f22220b117a2540c5962d4bdd35af108605c27c50885d7562e802990e18",
    },
    {
      title: "AI Chat",
      text: "Embark on an extraordinary journey of conversation with AI chat",
      image:
        "https://img.freepik.com/free-vector/dialog-with-chatbot-artificial-intelligence-reply-question-tech-support-instant-messaging-hotline-operator-ai-assistant-client-bot-consultant-vector-isolated-concept-metaphor-illustration_335657-1995.jpg?w=740&t=st=1685907475~exp=1685908075~hmac=f3c521ba03bc969bfcef7f1695c6c797479084767ad8d7d08277c05fd83f705a",
    },
  ];

  return (
    <Box
      position={"relative"}
      height={"600px"}
      width={"full"}
      overflow={"hidden"}
    >
      <link
        rel="stylesheet"
        type="text/css"
        charSet="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
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
              textAlign={"center"}
            >
              <Image
                w={{ base: "350px", md: "500px", lg: "800px" }} 
                h={{ base: "200px", md: "300px", lg: "400px" }}
                objectFit="cover"
                src={card.image}
                alt={card.title}
                mb={4}
                borderRadius={"20px"}
              />
              <Stack
                spacing={6}
                w={"full"}
                maxW={"lg"}
                position="relative"
                color={"#616161"}
              >
                <Heading fontSize={{ base: "lg", md: "md", lg: "lg" }}>
                  {card.title}
                </Heading>
                <Text fontSize={{ base: "md", lg: "lg" }}>{card.text}</Text>
              </Stack>
            </Container>
          </Box>
        ))}
      </Slider>
    </Box>
  );
}
