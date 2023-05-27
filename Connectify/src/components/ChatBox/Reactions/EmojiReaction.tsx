import React, { useState } from 'react';
import { Button, Box } from "@chakra-ui/react";
import Picker from 'emoji-picker-react';

const EmojiReactions = ({ messageId, addReaction }) => {
  const [isPickerVisible, setPickerVisible] = useState(false);

  const defaultReactions = ['👍', '❤️', '😂', '😮'];
  
  const onEmojiClick = (event, emojiObject) => {
    addReaction(messageId, emojiObject.emoji);
    setPickerVisible(false);
  };

  return (
    <Box>
      {defaultReactions.map(emoji => (
          <Button key={emoji} onClick={() => addReaction(emoji)}>
              {emoji}
          </Button>
      ))}
      <Button onClick={() => setPickerVisible(!isPickerVisible)}>+</Button>
      {isPickerVisible && <Picker onEmojiClick={onEmojiClick} />}
    </Box>
  );
};

export default EmojiReactions;