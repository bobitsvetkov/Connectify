import { useState } from 'react';
import { ref, uploadBytesResumable } from 'firebase/storage';
import { getDownloadURL } from 'firebase/storage';
import { storage } from '../config/firebaseConfig';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../types/interfaces';

interface Message {
    uid: string,
    user: string,
    content: string,
    type: 'audio',
    date: string
}

interface AddMessageToChat {
    chatId: string,
    message: Message
}

interface AddMessageToChannel {
    teamId: string,
    channelId: string,
    message: Message
}

type ToastOptions = {
    title: string,
    description: string,
    status: "info" | "error",
    duration: number,
    isClosable: boolean
};

const useVoiceMessages = (
    currUser: User,
    user: User,
    chatUserId: string,
    isChat: boolean,
    teamId: string,
    channelId: string,
    addMessageToChat: (data: AddMessageToChat) => void,
    addMessageToChannel: (data: AddMessageToChannel) => void,
    toast: (options: ToastOptions) => void
) => {
    const [recording, setRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);

    const handleStart = () => {
        let chunks: Blob[] = [];

        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                const mediaRecorder = new MediaRecorder(stream);

                setRecording(true);
                mediaRecorder.start();

                mediaRecorder.ondataavailable = function (e) {
                    if (e.data.size > 0) {
                        chunks.push(e.data);
                    }
                };
                mediaRecorder.onstop = () => {
                    // Create blob from chunks
                    const blob = new Blob(chunks, { type: 'audio/webm' });

                    // Upload to Firebase
                    const audioRef = ref(storage, `audio/${Date.now()}.webm`);
                    const uploadTask = uploadBytesResumable(audioRef, blob);

                    uploadTask.on('state_changed', (snapshot) => {
                        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        toast({
                            title: "Uploading...",
                            description: `Upload is ${progress}% done`,
                            status: "info",
                            duration: 5000,
                            isClosable: true,
                        });
                    }, (error) => {
                        toast({
                            title: "Upload failed",
                            description: "There was an error uploading the audio.",
                            status: "error",
                            duration: 5000,
                            isClosable: true,
                        });
                    }, () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            const userIds = [chatUserId, user.username];
                            userIds.sort();
                            const chatId = userIds.join("-");

                            const newMessage: Message = {
                                uid: uuidv4(),
                                user: currUser.uid,
                                content: downloadURL,
                                type: 'audio',
                                date: new Date().toISOString(),
                            };

                            if (isChat) {
                                addMessageToChat({ chatId: chatId, message: newMessage });
                            } else {
                                addMessageToChannel({ teamId: teamId, channelId: channelId, message: newMessage })
                            }
                        });

                        setRecording(false);
                        setMediaRecorder(null);
                    });

                    setMediaRecorder(mediaRecorder);
                }

                setMediaRecorder(mediaRecorder);
            })
            .catch(err => {
                console.log('Error getting audio', err);
            });
    };

    const handleSendAudio = () => {
        if (mediaRecorder) {
            mediaRecorder.stop();
        }
        setRecording(false);
    };

    return { recording, handleStart, handleSendAudio };
};

export default useVoiceMessages;