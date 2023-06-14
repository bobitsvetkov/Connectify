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
    token: '007eJxTYKjwS5qofMr9iGrLxgWfLtqbbzuTJvHgzrstm+PKviaFvBBRYEhJTE40TkkzM01NSzNJMjdOTEw1MjMzTDS0TE5NNTJPjW2oTWkIZGRIy0pkZGSAQBCfhaEktbiEgQEABckh6w==',
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