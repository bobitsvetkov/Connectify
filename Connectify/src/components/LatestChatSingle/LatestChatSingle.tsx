import { HStack, VStack, Text, Box } from "@chakra-ui/layout";
import { useGetUserByIdQuery, useGetChannelByIdQuery, useGetTeamByIdQuery } from "../../api/databaseApi";
import { getAuth } from "@firebase/auth";
import { Avatar } from "@chakra-ui/avatar";

function LatestChatSingle({ chat, handleChatClick, handleChannelClick }) {
    const authorResult = useGetUserByIdQuery(chat.user);
    const userChattingWithResult = useGetUserByIdQuery(chat.userChatting);
    const channelResult = useGetChannelByIdQuery({ teamId: chat.teamId, channelId: chat.channelId });
    const teamResult = useGetTeamByIdQuery(chat.teamId);

    let author, userChattingWith, team, channel;

    if (chat.isChat) {
        if (!authorResult.isLoading && !authorResult.isError) {
            author = authorResult.data;
        }
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

    const currUserUid = getAuth().currentUser?.uid;

    return chat.isChat ?
        <Box _hover={{ backgroundColor: "gray.100" }} cursor="pointer" onClick={() => handleChatClick(userChattingWith) }>
            <HStack ml={2} mb={2}>
                <Avatar name={`${userChattingWith?.firstName} ${userChattingWith?.lastName}`} src={userChattingWith?.photoURL} />
                <VStack align="start" spacing={1}>
                    <Text>{`${userChattingWith?.firstName} ${userChattingWith?.lastName}`}</Text>
                    {currUserUid === chat.user ?
                        <Text>You: {chat.content}</Text> :
                        <Text>{`${author?.firstName} ${author?.firstName}: ${chat.content}`}</Text>}
                </VStack>
            </HStack>
        </Box>
        :
        <Box  _hover={{ backgroundColor: "gray.100" }} cursor="pointer" onClick={() => handleChannelClick(team.uid, channel.uid)}>
            <HStack ml={2} mb={2}>
                <Avatar name={team?.name} src={team?.photoUrl} borderRadius="6" />
                <VStack align="start" spacing={1}>
                    <Text>{`${team?.name} ${channel?.name}`}</Text>
                    {currUserUid === chat.user ?
                        <Text>You: {chat.content}</Text> :
                        <Text>{`${author?.firstName} ${author?.firstName}: ${chat.content}`}</Text>}
                </VStack>
            </HStack>
        </Box>
}

export default LatestChatSingle;
