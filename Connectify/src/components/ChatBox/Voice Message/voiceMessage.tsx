const VoiceMessage = ({ url }) => (
    <audio controls>
        <source src={url} type="audio/webm" />
        Your browser does not support the audio element.
    </audio>
);

export default VoiceMessage;