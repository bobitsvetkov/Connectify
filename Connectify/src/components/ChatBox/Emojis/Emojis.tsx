import React from 'react';
import EmojiPicker from 'emoji-picker-react';
import { Button } from '@chakra-ui/react';

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
            <Button onClick={() => setEmojiPickerState(!emojiPickerState)}>Emoji</Button>
            {emojiPicker}
        </>
    );
};

export default Emojis;