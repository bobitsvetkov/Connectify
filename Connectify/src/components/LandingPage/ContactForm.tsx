import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Textarea,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { useRef } from "react";
import { BsPerson } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";
import emailjs from "emailjs-com";

const ContactForm: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_awez2l8",
        "template_dbkcyco",
        form.current!,
        "G4ygDkR19cJOVq4OR"
      )
      .then(
        (_) => {
          alert("Email sent successfully");
          form.current!.reset();
        },
        (error) => {
          console.error("Error sending email:", error);
          alert(`Error sending email: ${error.message}`);
        }
      );
  };

  return (
    <Flex
      bg={useColorModeValue("#gray", "gray.800")}
      justify="center"
      css={{
        backgroundAttachment: "fixed",
      }}
      id="contact"
    >
      <Box position={"relative"} height={"500px"} width={"full"}>
        <Box>
          <VStack spacing={{ base: 4, md: 8, lg: 20 }}>
            <Heading
              fontSize={{
                base: "xl",
                md: "2xl",
              }}
            >
              Contact Us
            </Heading>

            <Stack
              spacing={{ base: 4, md: 8, lg: 20 }}
              direction={{ base: "column", md: "row" }}
            >
              <Box
                bg={useColorModeValue("#f57c73", "gray.700")}
                borderRadius={"20px"}
                p={8}
                color={useColorModeValue("gray.700", "whiteAlpha.900")}
                shadow="base"
              >
                <VStack spacing={5}>
                  <form ref={form}>
                    <FormControl isRequired>
                      <FormLabel>Name</FormLabel>

                      <InputGroup>
                        <InputLeftElement children={<BsPerson />} />
                        <Input
                          type="text"
                          name="name"
                          placeholder="Your Name"
                          _placeholder={{ color: "white" }}
                        />
                      </InputGroup>
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel>Email</FormLabel>

                      <InputGroup>
                        <InputLeftElement children={<MdOutlineEmail />} />
                        <Input
                          type="email"
                          name="email"
                          placeholder="Your Email"
                          _placeholder={{ color: "white" }}
                        />
                      </InputGroup>
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel>Message</FormLabel>

                      <Textarea
                        name="message"
                        placeholder="Your Message"
                        _placeholder={{ color: "white" }}
                        rows={6}
                        resize="none"
                      />
                    </FormControl>
                  </form>
                  <Button
                    variant={"ghost"}
                    color={"white"}
                    _hover={{
                      bg: useColorModeValue("gray.600", "#f57c73"),
                    }}
                    borderRadius={"20px"}
                    onClick={sendEmail}
                  >
                    Send Message
                  </Button>
                </VStack>
              </Box>
            </Stack>
          </VStack>
        </Box>
      </Box>
    </Flex>
  );
};
export default ContactForm;
