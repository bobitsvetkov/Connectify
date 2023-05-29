import React, { useState } from "react";
import { Input, Button, HStack, useToast } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import { useAddMessageToChatMutation, useAddMessageToChannelMutation } from "../../api/databaseApi";
import Emojis from "../ChatBox/Emojis/Emojis";
import { ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from "../../config/firebaseConfig";
import { getDownloadURL } from "firebase/storage";
import VoiceMessage from "../ChatBox/Voice Message/voiceMessage";
const ChatInput = ({ currUser, user, chatUserId, activeChatUser, isChat, teamId, channelId }) => {
  const [message, setMessage] = useState<string>("");
  const [emojiPickerState, SetEmojiPickerState] = useState<boolean>(false);
  const [addMessageToChat, { isLoading: isAddingMessage }] = useAddMessageToChatMutation();
  const [addMessageToChannel, { isLoading: isAddingMessageToChannel }] = useAddMessageToChannelMutation();
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  let chunks = []; 
  const toast = useToast();

  const handleSend = () => {
    if (message.trim().length > 0 && currUser && activeChatUser && user) {
      const userIds = [chatUserId, user.username];
      userIds.sort();
      const chatId = userIds.join("-");

      const newMessage = {
        uid: uuidv4(),
        user: currUser.uid,
        content: message,
        date: new Date().toISOString(),
      };

      if (isChat) {
        addMessageToChat({ chatId: chatId, message: newMessage });
      } else {
        addMessageToChannel({ teamId: teamId, channelId: channelId, message: newMessage })
      }

      setMessage("");
    }
  };

  const handleStart = () => {
    let chunks = [];

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

              const newMessage = {
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
  return (
    <HStack width="100%" spacing={4}>
      <Emojis
        message={message}
        setMessage={setMessage}
        emojiPickerState={emojiPickerState}
        setEmojiPickerState={SetEmojiPickerState}
      />
      <Input
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleSend();
          }
        }}
        flexGrow={1}
      />
      {message ? (
        <Button
          onClick={handleSend}
          isLoading={isAddingMessage || isAddingMessageToChannel}
          colorScheme="teal"
        >
          Send
        </Button>
      ) : (
        !recording ? (
          <Button
            onClick={handleStart}
            colorScheme="teal"
          >
            Record
          </Button>
        ) : (
          <>
            <Button
              onClick={handleSendAudio}
              colorScheme="blue"
            >
              Send Audio
            </Button>
          </>
        )
      )}
    </HStack>
  )
}

export default ChatInput;