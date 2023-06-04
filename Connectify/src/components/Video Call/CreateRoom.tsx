import { Box, Button } from '@chakra-ui/react';
import { useState } from 'react';
import AgoraUIKit from 'agora-react-uikit';
import { FaVideo } from 'react-icons/fa';

const CreateRoom = () => {
  const [videoCall, setVideoCall] = useState(true);
  // const [showVideo, setShowVideo] = useState(false);

  const rtcProps = {
    appId: '1d9b4d5e8c224e6895d2904de8db2e39',
    channel: 'nulll',
    token: '007eJxTYDA5sHDGSvuOlU+PPv5w5/u3f39Zdnv8DllW8XGZl5WKRcUXBYaUxORE45Q0M9PUtDSTJHPjxMRUIzMzw0RDy+TUVCPz1Gzu2pSGQEaG1r+XWRgZIBDEZ2XIK83JyWFgAAAd2CWB',
  };

  const callbacks = {
    EndCall: () => {
      setVideoCall(false);
      // setShowVideo(false);
    },
  };

  const createVideoCall = () => {
    // setShowVideo(true);
    setVideoCall(true)
  }

  return (
    <>
      {/* <Button leftIcon={<FaVideo />} onClick={createVideoCall} /> */}

      { videoCall && (
        <Box display="flex" width="100%" height="600px">
          <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />
        </Box>
      )}
    </>
  );
};

export default CreateRoom;
