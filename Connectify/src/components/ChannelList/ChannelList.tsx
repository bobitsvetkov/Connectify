import { useState, useEffect } from 'react';
import { useCreateChannelMutation } from '../../api/databaseApi';
import { v4 as uuidv4 } from "uuid";
import { ref, onValue, DataSnapshot } from "firebase/database";
import { database } from '../../config/firebaseConfig';
import { Box, Flex, Input, IconButton, HStack } from "@chakra-ui/react";
import { AddIcon, CheckIcon } from "@chakra-ui/icons";
import { useNavigate } from 'react-router-dom';
import { Team, Channel } from '../../types/interfaces';

function ChannelList({ team }: { team: Team }) {

    const navigate = useNavigate();
    const [isAddingChannel, setIsAddingChannel] = useState(false);
    const [newChannelName, setNewChannelName] = useState("");
    const [createChannel] = useCreateChannelMutation();
    const teamId = team.uid;
    const channels = team.channels ? team.channels : {};
    const [channelsData, setChannelsData] = useState(channels);
    const [currentChannelId, setCurrentChannelId] = useState("");

    useEffect(() => {
        const channelsRef = ref(database, `teams/${teamId}/channels`);

        const handleValueChange = (snapshot: DataSnapshot) => {
            setChannelsData(snapshot.val());
        };

        const unsubscribe = onValue(channelsRef, handleValueChange);

        return () => {
            unsubscribe();
        };
    }, [teamId]);

    const handleCreateChannel = async (e: React.FormEvent) => {
        e.preventDefault();

        if (newChannelName.trim() === "") {
            alert("Channel name cannot be empty");
            return;
        }

        const channel: Channel = {
            uid: uuidv4(),
            name: newChannelName,
            messages: {},
        };

        try {
            await createChannel({ teamId, channel });
            setNewChannelName("");
            setIsAddingChannel(false);
        } catch (error) {
            console.error("Failed to create channel: ", error);
        }
    };

    const handleChannelClick = (channel: Channel) => {
        setCurrentChannelId(channel.uid);
        navigate(`/${teamId}/${channel.uid}`);
    };

    return (
        <Box>
            <Flex justify="space-between" align="center" p="1rem" borderBottom="1px solid #EEE">
                <HStack>
                    <IconButton
                        aria-label="Add channel"
                        icon={<AddIcon />}
                        variant="outline"
                        size="sm"
                        onClick={() => setIsAddingChannel(!isAddingChannel)}
                    />
                    {isAddingChannel && (
                        <><Input
                            size="sm"
                            placeholder="New Channel"
                            value={newChannelName}
                            onChange={(e) => setNewChannelName(e.target.value)}
                        />
                            <IconButton
                                aria-label="Create channel"
                                icon={<CheckIcon />}
                                variant="outline"
                                size="sm"
                                onClick={handleCreateChannel}
                            />
                        </>
                    )}

                </HStack>
            </Flex>
            <Box>
                {Object.values(channelsData || {}).map((channel: Channel, index: number) => (
                    <Box
                        key={index}
                        onClick={() => handleChannelClick(channel)}
                        cursor="pointer"
                        p="0.5rem 1rem"
                        fontWeight={channel.uid === currentChannelId ? "bold" : "normal"}
                        _hover={{
                            backgroundColor: "#f5f6f6",
                            fontWeight: "bold"
                        }}
                    >
                        #{channel.name}
                    </Box>
                ))}
            </Box>
        </Box>
    );
}

export default ChannelList;
