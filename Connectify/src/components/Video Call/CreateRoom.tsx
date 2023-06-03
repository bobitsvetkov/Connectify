import { Box } from '@chakra-ui/react';
import { useState } from 'react';
import AgoraUIKit from 'agora-react-uikit';
import { Button } from '@chakra-ui/react';
import { FaVideo } from 'react-icons/fa';

const CreateRoom = () => {
  const [videoCall, setVideoCall] = useState(true);
  const [showVideo, setShowVideo] = useState(false);

  const rtcProps = {
    appId: '1d9b4d5e8c224e6895d2904de8db2e39',
    channel: 'test',
    token: null
  };
  const callbacks = {
    EndCall: () => {
      setVideoCall(false);
      setShowVideo(false);
    },
  };

  const createVideoCall = () => {
    setShowVideo(true);
    setVideoCall(true)
  }
  return (
    <>
      <Button leftIcon={<FaVideo />} onClick={createVideoCall} />

      {showVideo && videoCall && (
        <div style={{ display: 'flex', width: '80vw', height: '80vh', alignSelf: 'left', justifyContent: 'center'}}>
          <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />
        </div>
      )}
    </>
  );
};

export default CreateRoom;