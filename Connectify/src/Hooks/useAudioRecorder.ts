import { useState, useEffect } from 'react';

const useAudioRecorder = () => {
    let mediaRecorder: MediaRecorder;
    let audioChunks: BlobPart[] = []; // Declare audioChunks here

    const [audioURL, setAudioURL] = useState("");
    const [isRecording, setIsRecording] = useState(false);

    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);

        setIsRecording(true);
        mediaRecorder.start();

        mediaRecorder.addEventListener("dataavailable", event => {
            audioChunks.push(event.data);
            console.log(event.data); // log the chunk data
        });

        mediaRecorder.addEventListener("stop", () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/ogg' });
            const url = URL.createObjectURL(audioBlob);
            setAudioURL(url);

            audioChunks = []; // Empty the array when you're done with it
        });
    }

    const stopRecording = () => {
        if (mediaRecorder) {
            mediaRecorder.stop();
            setIsRecording(false);
        }
    };

    return { startRecording, stopRecording, audioURL, isRecording };
}

export default useAudioRecorder;