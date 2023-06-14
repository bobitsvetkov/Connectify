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
    token: '007eJxTYLCXFF2W9E3N9Vv8iV97SjOdxavetCs/fcsnXeL0QLom2l6BISUxOdE4Jc3MNDUtzSTJ3DgxMdXIzMww0dAyOTXVyDx1lklXSkMgI4O3TzQzIwMEgvgsDCWpxSUMDAAt0B7v',
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