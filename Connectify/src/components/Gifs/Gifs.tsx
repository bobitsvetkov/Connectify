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
} from "@chakra-ui/react";
import { ImImages } from "react-icons/im";

type GiphyDropdownProps = {
  onGifSelect: (gifUrl: string) => void;
};


const GiphyDropdown: React.FC<GiphyDropdownProps> = ({ onGifSelect }) => {
  const [gifs, setGifs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const GIPHY_API_KEY = "OvghlS9FP4Hqqyo8t5kKp2LeLufHyPct";

  useEffect(() => {
    fetch(
      `https://api.giphy.com/v1/gifs/trending?api_key=${GIPHY_API_KEY}&limit=10`
    )
      .then((res) => res.json())
      .then((data) => setGifs(data.data))
      .catch((err) => console.error(err));
  }, []);

  const searchGifs = (e) => {
    e.preventDefault();
    if (!searchTerm) return;
    fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${searchTerm}&limit=10`
    )
      .then((res) => res.json())
      .then((data) => setGifs(data.data))
      .catch((err) => console.error(err));
  };

  const handleGifClick = (gifUrl: string) => {
    console.log("GIF clicked: ", gifUrl);
    onGifSelect(gifUrl);
  };
  

  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="ghost">
          <ImImages />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Search GIFs</PopoverHeader>
        <PopoverBody>
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search GIFs"
            mb={4}
          />
          <Button onClick={searchGifs}>Search</Button>
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