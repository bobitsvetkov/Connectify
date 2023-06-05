import {
    Box,
    Flex,
    Heading,
    Text,
    Stack,
    Container,
    Avatar,
    useColorModeValue,
} from '@chakra-ui/react';

const testimonialData = [
    {
        heading: "Innovative Features",
        text: "In the vast wasteland of communication tools, where every second platform purports to be 'revolutionary' yet offers the same recycled features, Connectify actually manages to impress me. And let me tell you, it takes a lot to impress a 10x developer.",
        avatar: "https://i.imgur.com/6AcAkmN.png",
        name: "Denis Antonov",
        title: "CEO at Team DaVinci and 10x developer",
    },
    {
        heading: "Designer's Delight",
        text: "As a designer, it's rare to find an app that respects aesthetics while being highly functional.Connectify App's layout, coupled with features like chat bot with personality and voice messages, makes it a refreshing presence in the market.",
        avatar: "https://images.unsplash.com/photo-1621252179027-94459d278660?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        name: "Gosho",
        title: "Junior Designer at Judge",
    },
    {
        heading: "Gamer's Best Friend",
        text: "For a regular guy who's a junior frontend developer by day and a Diablo 4 player by night, the Connectify App is a godsend. It's got everything - voice messages, GIFs, and a chat bot that's more interesting than most people I know. If it started finding legendary items for me in Diablo 4, I might as well call it my best friend.",
        avatar: "https://images.unsplash.com/photo-1604307410297-081e0677d3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        name: "Pesho",
        title: "Junior Developer at Judge",
    },
    
];

export default function Testimonials() {
    return (
        <Flex
            direction="column"
            align="center"
            justify="center"
            bg={useColorModeValue('gray.100', 'gray.900')} // Changed the color for dark mode
            p={16}
            width="100%"
        >
            <Stack spacing={0} align={'center'} justify={'center'} mb={10}>
                <Heading color={useColorModeValue('gray.700', 'gray.200')}>Our Clients Speak</Heading>
                <Text color={useColorModeValue('gray.600', 'gray.300')}>We have been working with clients around the world</Text>
            </Stack>
            <Flex
                direction={{ base: 'column', md: 'row' }}
                justify="space-between"
                align="stretch"
                spacing={{ base: 10, md: 4, lg: 10 }}
                wrap="wrap"
            >
                {testimonialData.map((testimonial, index) => (
                    <Flex
                        key={index}
                        direction="column"
                        align="center"
                        justify="space-between"
                        maxW={{ base: 'full', md: '30%' }}
                        mb={10}
                        spacing={4}
                        bg={useColorModeValue('white', 'gray.700')} // Changed the color for dark mode
                        p={5}
                        rounded={'md'}
                    >
                        <Stack>
                            <Heading textAlign={'center'} color={useColorModeValue('gray.700', 'gray.200')}>{testimonial.heading}</Heading>
                            <Text color={useColorModeValue('gray.600', 'gray.300')}>{testimonial.text}</Text>
                        </Stack>
                        <Flex
                            align={'center'}
                            mt={8}
                            direction={'column'}
                        >
                            <Avatar src={testimonial.avatar} name={testimonial.name} mb={2} />
                            <Stack spacing={-1} align={'center'}>
                                <Text fontWeight={600} color={useColorModeValue('gray.700', 'gray.200')}>{testimonial.name}</Text>
                                <Text fontSize={'sm'} color={useColorModeValue('gray.600', 'gray.400')}>
                                    {testimonial.title}
                                </Text>
                            </Stack>
                        </Flex>
                    </Flex>
                ))}
            </Flex>
        </Flex>
    );
}