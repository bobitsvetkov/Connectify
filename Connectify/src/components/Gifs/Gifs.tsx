import { useState, useEffect } from "react";
import {
  Input,
  Button,
  SimpleGrid,
  Image,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  PopoverHeader,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { AiOutlineGif } from "react-icons/ai";

interface Gif {
  id: string;
  title: string;
  images: {
    fixed_height: {
      url: string;
    };
  };
}

type GiphyDropdownProps = {
  onGifSelect: (gifUrl: string) => void;
};

const GiphyDropdown: React.FC<GiphyDropdownProps> = ({ onGifSelect }) => {
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const GIPHY_API_KEY = "OvghlS9FP4Hqqyo8t5kKp2LeLufHyPct";

  const fetchTrendingGifs = () => {
    fetch(
      `https://api.giphy.com/v1/gifs/trending?api_key=${GIPHY_API_KEY}&limit=12`
    )
      .then((res) => res.json())
      .then((data) => setGifs(data.data))
      .catch((err) => console.error(err));
  };

  const fetchSearchGifs = () => {
    fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${searchTerm}&limit=12`
    )
      .then((res) => res.json())
      .then((data) => setGifs(data.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchTrendingGifs();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      fetchSearchGifs();
    } else {
      fetchTrendingGifs();
    }
  }, [searchTerm]);

  const handleReset = () => {
    setSearchTerm("");
  };

  const handleGifClick = (gifUrl: string) => {
    console.log("GIF clicked: ", gifUrl);
    onGifSelect(gifUrl);
  };

  return (
    <Popover>
      <PopoverTrigger>
        <IconButton
          aria-label="gif picker"
          variant={"ghost"}
          icon={<AiOutlineGif size={25} />}
        ></IconButton>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Search GIFs</PopoverHeader>
        <PopoverBody>
          <InputGroup size="md" mb={4}>
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search GIFs"
            />
            <InputRightElement width="4.5rem">
              <Button size="sm" onClick={handleReset}>
                <CloseIcon />
              </Button>
            </InputRightElement>
          </InputGroup>
          <SimpleGrid columns={3} spacing={4} mt={4}>
            {gifs.map((gif) => (
              <Image
                key={gif.id}
                src={gif.images.fixed_height.url}
                alt={gif.title}
                onClick={() => handleGifClick(gif.images.fixed_height.url)}
              />
            ))}
          </SimpleGrid>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default GiphyDropdown;
