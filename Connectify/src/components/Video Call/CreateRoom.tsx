import { useState } from 'react';
import AgoraUIKit from 'agora-react-uikit';

const CreateRoom = ({onClose}) => {
  const [videoCall, setVideoCall] = useState(true);

  const rtcProps = {
    appId: '1d9b4d5e8c224e6895d2904de8db2e39',
    channel: 'nulll',
    token: '007eJxTYDA5sHDGSvuOlU+PPv5w5/u3f39Zdnv8DllW8XGZl5WKRcUXBYaUxORE45Q0M9PUtDSTJHPjxMRUIzMzw0RDy+TUVCPz1Gzu2pSGQEaG1r+XWRgZIBDEZ2XIK83JyWFgAAAd2CWB',
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