import * as React from 'react';
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
                            setEmojiPickerState(false);  // closes the picker after an emoji is selected
                        }}
                    />
                </Box>
            )}
        </>
    );
};

export default Emojis;