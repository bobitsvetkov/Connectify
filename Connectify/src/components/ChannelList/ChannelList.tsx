import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCreateChannelMutation } from '../../api/TeamsApi';
import { v4 as uuidv4 } from "uuid";
import { ref, onValue, off } from "firebase/database";
import { database } from '../../config/firebaseConfig';
import { Input, Button, Box, UnorderedList, ListItem } from "@chakra-ui/react";

function ChannelList({ teamId, channels }) {

    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(true);
    const [newChannelName, setNewChannelName] = useState("");
    const [createChannel] = useCreateChannelMutation();
    const [channelsData, setChannelsData] = useState(channels);

    useEffect(() => {
        const channelsRef = ref(database, `teams/${teamId}/channels`);
        const handleValueChange = (snapshot) => {
            setChannelsData(snapshot.val());
        };
        onValue(channelsRef, handleValueChange);
        return () => {
            off(channelsRef, handleValueChange);
        };
    }, [teamId]);

    const handleCreateChannel = async (e) => {
        e.preventDefault();
        
        if (newChannelName.trim() === "") {
            alert("Channel name cannot be empty");
            return;
        }
    
        const channel = {
            id: uuidv4(),
            name: newChannelName,
            messages: {},
        };
    
        try {
            await createChannel({ teamId, channel });
            setNewChannelName("");
        } catch (error) {
            console.error("Failed to create channel: ", error);
        }
    };

    const handleChannelClick = (channel) => {
        navigate(`/${teamId}/${channel.name}`);
    };

    const handleTransitionEnd = () => {
        if (!isOpen) {
            setIsOpen(true);
        }
    };

    return (
        <Box
            className={`user-list ${isOpen ? "open" : "closed"}`}
            onTransitionEnd={handleTransitionEnd}
        >
            {isOpen && (
                <>
                <Box as="h2">Channels</Box>
                <UnorderedList>
                    {Object.values(channelsData || {}).map((channel, index) => (
                        <ListItem
                            key={index}
                            onClick={() => handleChannelClick(channel)}
                            style={{ cursor: "pointer" }}
                        >
                            {channel.name}
                        </ListItem>
                    ))}
                </UnorderedList>
                <form onSubmit={handleCreateChannel}>
                    <Input
                        type="text"
                        placeholder="New channel"
                        value={newChannelName}
                        onChange={(e) => setNewChannelName(e.target.value)}
                    />
                    <Button type="submit">+</Button>
                </form>
                </>
            )}
        </Box>
    );
}

export default ChannelList;
