import { HStack, VStack, Text, Box, Spacer } from "@chakra-ui/layout";
import { useGetUserByIdQuery, useGetChannelByIdQuery, useGetTeamByIdQuery, User, Team, Channel, Chat } from "../../api/databaseApi";
import { getAuth } from "@firebase/auth";
import { Avatar, AvatarBadge } from "@chakra-ui/avatar";

interface LatestChatSingleProps {
    chat: Chat;
    handleChatClick: (user: User) => void;
    handleChannelClick: (teamId: string, channelId: string) => void;
}

const LatestChatSingle: FC<LatestChatSingleProps> = ({ chat, handleChatClick, handleChannelClick }) => {
    const authorResult = useGetUserByIdQuery(chat.user);
    const userChattingWithResult = useGetUserByIdQuery(chat.userChatting);
    const channelResult = useGetChannelByIdQuery({ teamId: chat.teamId, channelId: chat.channelId });
    const teamResult = useGetTeamByIdQuery(chat.teamId);

    let author, userChattingWith, team, channel;

    if (!authorResult.isLoading && !authorResult.isError) {
        author = authorResult.data;
    }

    if (chat.isChat) {
        if (!userChattingWithResult.isLoading && !userChattingWithResult.isError) {
            userChattingWith = userChattingWithResult.data;
        }
    } else {
        if (!teamResult.isLoading && !teamResult.isError) {
            team = teamResult.data;
        }
        if (!channelResult.isLoading && !channelResult.isError) {
            channel = channelResult.data;
        }
    }

    const formatDate = (dateString: string) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'online':
                return 'green.500';
            case 'offline':
                return 'gray.500';
            case 'busy':
                return 'red.500';
            default:
                return 'gray.500';
        }
    }

    const currUserUid = getAuth().currentUser?.uid;

    return chat.isChat ?
        <Box _hover={{ backgroundColor: "gray.100" }} cursor="pointer" onClick={() => handleChatClick(userChattingWith)}>
            <HStack ml={2} mb={2}>
                <Avatar name={`${userChattingWith?.firstName} ${userChattingWith?.lastName}`} src={userChattingWith?.photoURL}>
                    <AvatarBadge boxSize="1.25em" bg={getStatusColor(userChattingWith?.status)} />
                </Avatar>
                <VStack align="start" spacing={1}>
                    <Text>{`${userChattingWith?.firstName} ${userChattingWith?.lastName}`}</Text>
                    <HStack width="100%">
                        {currUserUid === chat.user ?
                            <Text>You: {chat.content}</Text> :
                            <Text>{`${author?.firstName} ${author?.firstName}: ${chat.content}`}</Text>}
                        <Spacer />
                        <Text fontSize="sm" color="gray.500">{formatDate(chat.date)}</Text>
                    </HStack>
                </VStack>
            </HStack>
        </Box>
        :
        <Box _hover={{ backgroundColor: "gray.100" }} cursor="pointer" onClick={() => handleChannelClick(team.uid, channel.uid)}>
            <HStack ml={2} mb={2}>
                <Avatar name={team?.name} src={team?.photoUrl} borderRadius="6" />
                <VStack align="start" spacing={1}>
                    <Text>{`${team?.name} #${channel?.name}`}</Text>
                    <HStack width="100%">
                        {currUserUid === chat.user ?
                            <Text>You: {chat.content}</Text> :
                            <Text>{`${author?.firstName} ${author?.firstName}: ${chat.content}`}</Text>}
                        <Spacer />
                        <Text fontSize="sm" color="gray.500">{formatDate(chat.date)}</Text>
                    </HStack>
                </VStack>
            </HStack>
        </Box>
}

export default LatestChatSingle;
