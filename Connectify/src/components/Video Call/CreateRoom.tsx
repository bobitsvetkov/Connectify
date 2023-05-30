import { useState } from "react";
import { Button } from "@chakra-ui/react";
import { FaPhone, FaVideo } from "react-icons/fa";
import VideoCall from "./VideoCall";

const CreateRoom = () => {
    const [isVideoCall, setIsVideoCall] = useState(true);
    const [callUrl, setCallUrl] = useState(null);

    const createCall = async (isVideoEnabled) => {
        try {
            const response = await fetch('https://api.daily.co/v1/rooms', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${'e25a6624f282752a924fde861e4fb4110cbada0efe6e758445b816a9adb23a44'}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ properties: { enable_screenshare: isVideoEnabled, enable_chat: true } })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const room = await response.json();
            setCallUrl(room.url);
            setIsVideoCall(isVideoEnabled);
            // TODO: Share this URL with the other user.
        } catch (err) {
            console.error(err);
        }
    };

    const createAudioCall = () => {
        createCall(false);
    };

    const createVideoCall = () => {
        createCall(true);
    };

    return (
        <>
            <Button leftIcon={<FaPhone />} onClick={createAudioCall}>
                Audio Call
            </Button>
            <Button leftIcon={<FaVideo />} onClick={createVideoCall}>
                Video Call
            </Button>
            {callUrl && <VideoCall callUrl={callUrl} isVideoCall={isVideoCall} />}
        </>
    );
};

export default CreateRoom;