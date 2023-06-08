import { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
} from "@chakra-ui/react";
import { BsEmojiSmile } from "react-icons/bs";


interface EmojiReactionsProps {
  messageId: string;
  addReaction: (messageId: string, emoji: string) => void;
}

const EmojiReactions: React.FC<EmojiReactionsProps> = ({ messageId, addReaction }) => {
  const defaultReactions = ["👍", "❤️", "😂", "😮"];
  const [isOpen, setIsOpen] = useState(false);

  const onEmojiClick = (emoji: string) => {
    addReaction(messageId, emoji);
    setIsOpen(false);
  };

  return (
    <Popover placement="bottom" closeOnBlur={false} isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <PopoverTrigger>
        <span onClick={() => setIsOpen(true)}>
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
              onClick={() => onEmojiClick(emoji)}
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