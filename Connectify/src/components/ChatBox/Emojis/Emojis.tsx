import React from 'react';
import EmojiPicker from 'emoji-picker-react';
import { IconButton, Box } from '@chakra-ui/react';
import { FaSmile } from "react-icons/fa";

interface EmojiProps {
    message: string;
    setMessage: (message: string) => void;
    emojiPickerState: boolean;
    setEmojiPickerState: (state: boolean) => void;
}

const Emojis: React.FC<EmojiProps> = ({ message, setMessage, emojiPickerState, setEmojiPickerState }) => {
    let emojiPicker;
    if (emojiPickerState) {
        emojiPicker = (
            <EmojiPicker
                onEmojiClick={(emojiObject) => {
                    setMessage(message + emojiObject.emoji);
                }}
            />
        );
    }

    return (
        <>
            <IconButton
                aria-label="emoji picker"
                icon={<FaSmile />}
                onClick={() => setEmojiPickerState(!emojiPickerState)}
            />
            {emojiPickerState && (
                <Box position="absolute" bottom="50px" zIndex="dropdown">
                    <EmojiPicker
                        onEmojiClick={(emojiObject) => {
                            setMessage(message + emojiObject.emoji);
                        }}
                    />
                </Box>
            )}
        </>
    );
};

export default Emojis;