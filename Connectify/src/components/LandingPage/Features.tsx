import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import CaptionCarousel from "./FeatureCarousel";

export const Features = React.forwardRef((props, ref) => {
  return (
    <>
      <Flex
        direction={"column"}
        alignItems={"center"}
        bgGradient="linear-gradient(120deg, #de6262, #ffb88c)"
        pb={"5%"}
        width={"100%"}
        ref={ref}
      >
        <CaptionCarousel />
      </Flex>
    </>
  );
});

export default Features;
