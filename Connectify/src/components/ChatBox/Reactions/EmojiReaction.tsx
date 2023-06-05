import { useState } from "react";
import {
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
        <span onClick={handleIsOpen}>
          <BsEmojiSmile size="10px" />
        </span>
      </PopoverTrigger>
      <PopoverContent
        sx={{
          maxWidth: "115px",
          padding: "0",
          boxShadow: "none",
          background: "white",
        }}
      >
        <PopoverBody>
          {defaultReactions.map((emoji) => (
            <span
              key={emoji}
              onClick={() => addReaction(emoji)}
              onClose={handleClose}
              style={{ cursor: "pointer" }}
            >
              {emoji}
            </span>
          ))}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default EmojiReactions;
