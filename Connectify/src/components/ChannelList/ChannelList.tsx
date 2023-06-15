import { useState, useEffect, useRef } from 'react';
import { useCreateChannelMutation, useDeleteChannelMutation } from '../../api/databaseApi';
import { v4 as uuidv4 } from "uuid";
import { ref, onValue, DataSnapshot } from "firebase/database";
import { database } from '../../config/firebaseConfig';
import { useColorMode, useDisclosure, Button, Box, Flex, Input, IconButton, HStack, Text, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay } from "@chakra-ui/react";
import { AddIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { useNavigate } from 'react-router-dom';
import { Team, Channel } from '../../types/interfaces';

function ChannelList({ team }: { team: Team }) {
    const { colorMode } = useColorMode();
    const borderColor = { light: "#EEE", dark: "#1A202C" };
    const hoverColor = { light: "#f5f6f6", dark: "#2D3748" };

    const navigate = useNavigate();
    const [isAddingChannel, setIsAddingChannel] = useState(false);
    const [newChannelName, setNewChannelName] = useState("");
    const [createChannel] = useCreateChannelMutation();
    const teamId = team.uid;
    const channels = team.channels ? team.channels : {};
    const [channelsData, setChannelsData] = useState(channels);
    const [currentChannelId, setCurrentChannelId] = useState("");
    const [deleteChannel, { isLoading: isDeleting }] = useDeleteChannelMutation();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef(null);
    const [channelToDelete, setChannelToDelete] = useState("");

    const handleDelete = (channelId: string) => {
        setChannelToDelete(channelId);
        onOpen();
    };

    const confirmDelete = async () => {
        try {
            await deleteChannel({ teamId: team.uid, channelId: channelToDelete });
            console.log("Deleted channel: ", channelToDelete);
        } catch (error) {
            console.error("Failed to delete channel: ", error);
        } finally {
            onClose();
        }
    };

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
            <Text fontSize="xl" p="1rem">Channels</Text>
            <Flex justify="space-between" align="center" p="1rem" borderBottom={`1px solid ${borderColor[colorMode]}`}>
                <HStack>
                    <IconButton
                        aria-label="Add channel"
                        icon={<AddIcon />}
                        variant="outline"
                        size="sm"
                        onClick={() => setIsAddingChannel(!isAddingChannel)}
                    />
                    {isAddingChannel && (
                        <Flex wrap="wrap">
                            <Input
                                size="sm"
                                placeholder="New Channel"
                                width="70%"
                                value={newChannelName}
                                onChange={(e) => setNewChannelName(e.target.value)}
                            />
                            <IconButton
                                aria-label="Create channel"
                                icon={<CheckIcon />}
                                variant="outline"
                                size="sm"
                                onClick={handleCreateChannel}
                                ml="1rem"
                            />
                        </Flex>
                    )}

                </HStack>
            </Flex>
            <Box>
                {
                    Object.values(channelsData || {}).length > 0 ?
                        Object.values(channelsData || {}).map((channel: Channel) => (
                            <HStack>
                                 <Box
                                    onClick={() => handleChannelClick(channel)}
                                    cursor="pointer"
                                    p="0.5rem 1rem"
                                    fontWeight={channel.uid === currentChannelId ? "bold" : "normal"}
                                    _hover={{
                                        backgroundColor: hoverColor[colorMode]
                                    }}
                                >
                                    #{channel.name}
                                </Box>
                                <IconButton
                                    aria-label="Delete Channel"
                                    icon={<CloseIcon />}
                                    size="xs"
                                    variant="unstyled"
                                    onClick={() => handleDelete(channel.uid)}
                                    alignSelf="flex-end"
                                    opacity="0.7"
                                    _hover={{ opacity: "1" }}
                                    mb={2}
                                />
                            </HStack>
                        ))
                        :
                        <Text ml={3} color={colorMode === 'light' ? 'black' : 'white'}>No channels found</Text>
                }
            </Box>

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Delete Channel
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure? You can't undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme="red" onClick={confirmDelete} ml={3} isLoading={isDeleting}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </Box>
    );
}

export default ChannelList;
