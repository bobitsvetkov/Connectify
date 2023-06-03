import {useState} from 'react';
import AgoraUIKit from 'agora-react-uikit';

const CreateRoom = () => {
  const [videoCall, setVideoCall] = useState(true);
  const rtcProps = {
    appId: '1d9b4d5e8c224e6895d2904de8db2e39', 
    channel: 'test', // your agora channel
    token: null // use null or skip if using app in testing mode
  };
  const callbacks = {
    EndCall: () => setVideoCall(false),
  };

  
  return videoCall ? (
    <div style={{display: 'flex', width: '100vw', height: '100vh'}}>
      <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />
    </div>
  ) : (
    <h3 onClick={() => setVideoCall(true)}>Start Call</h3>
  );
};

export default CreateRoom;
