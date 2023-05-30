import React, { useState } from "react";
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
} from "@chakra-ui/react";
import { BsEmojiSmile } from "react-icons/bs";

const EmojiReactions = ({ messageId, addReaction }) => {
  const defaultReactions = ["👍", "❤️", "😂", "😮"];
  const [isOpen, setIsOpen] = useState(false);

  const onEmojiClick = (event, emoji) => {
    addReaction(messageId, emoji);
    setIsOpen(false);
  };

  const handleIsOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Popover placement="bottom" closeOnBlur={false}>
      <PopoverTrigger>
        <Button onClick={handleIsOpen}>
          <BsEmojiSmile size="20px" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        sx={{
          maxWidth: "200px",
          padding: "0",
          boxShadow: "none",
        }}
      >
        <PopoverBody>
          {defaultReactions.map((emoji) => (
            <Button
              key={emoji}
              onClick={() => addReaction(emoji)}
              onClose={handleClose}
              size="sm"
            >
              {emoji}
            </Button>
          ))}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default EmojiReactions;
