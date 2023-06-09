import { useState, useEffect } from 'react';
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
} from '@chakra-ui/react';
import { ImImages } from 'react-icons/im';
import { CloseIcon } from '@chakra-ui/icons'; 

interface Gif {
  id: string;
  title: string;
  images: {
    fixed_height: {
      url: string;
    }
  };
}

type GiphyDropdownProps = {
  onGifSelect: (gifUrl: string) => void;
};

const GiphyDropdown: React.FC<GiphyDropdownProps> = ({ onGifSelect }) => {
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const GIPHY_API_KEY = 'OvghlS9FP4Hqqyo8t5kKp2LeLufHyPct';

  const fetchTrendingGifs = () => {
    fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${GIPHY_API_KEY}&limit=12`)
      .then((res) => res.json())
      .then((data) => setGifs(data.data))
      .catch((err) => console.error(err));
  };

  const fetchSearchGifs = () => {
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${searchTerm}&limit=12`)
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
    setSearchTerm(''); 
  };

  const handleGifClick = (gifUrl: string) => {
    console.log('GIF clicked: ', gifUrl);
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