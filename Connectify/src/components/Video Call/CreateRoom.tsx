import { useState } from 'react';
import AgoraUIKit from 'agora-react-uikit';
interface CreateRoomProps {
  onClose: () => void;
}

const CreateRoom: React.FC<CreateRoomProps> = ({ onClose }) => {
  const [videoCall, setVideoCall] = useState(true);

  const rtcProps = {
    appId: '1d9b4d5e8c224e6895d2904de8db2e39',
    channel: 'test',
    token: '007eJxTYBBt+yu8bp53l9DZc3PEz523fnz32xets3O47kfKTlwrMllcgSElMTnROCXNzDQ1Lc0kydw4MTHVyMzMMNHQMjk11cg89W9nd0pDICPDvOIgVkYGCATxWRhKUotLGBgA7/giBA==',
  };

  const callbacks = {
    EndCall: () => {
      setVideoCall(false);
      onClose()
    },
  };

  

  return (
    <>
      {videoCall && (
        <div style={{ display: 'flex', width: '100%', height: '75vh', alignSelf: 'left', justifyContent: 'center', overflow: "auto "}}>
          <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />
        </div>
      )}
    </>
  );
};

export default CreateRoom;