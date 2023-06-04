import { useState } from "react";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "../../../config/firebaseConfig";
import { useRemoveMessageFromChatMutation } from "../../../api/databaseApi";
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
} from "@chakra-ui/react";
import { Message } from "../../../api/databaseApi";
import { useRef } from 'react';

type RemoveMessageParams = {
    chatId: string;
    messageId: string;
    teamId?: string;
};

type DeleteMessageProps = {
    chatId: string;
    messageId: string;
    teamId?: string;
    isDeleting: boolean;
    setIsDeleting: (isDeleting: boolean) => void;
    message: Message;
};

function DeleteMessage({ chatId, messageId, teamId, isDeleting, setIsDeleting, message, }: DeleteMessageProps) {
    const [removeMessage] = useRemoveMessageFromChatMutation();
    const cancelRef = useRef();

    const handleRemoveMessage = async () => {
        // delete the message from the database
        const params: RemoveMessageParams = { chatId, messageId, teamId };
        removeMessage(params)
            .unwrap()
            .then(() => {
                let storagePath;
                // if message type is image or audio, delete it from Firebase storage
                if (message.type === 'image') {
                    storagePath = `images/${message.fileName}`;
                } else if (message.type === 'audio') {
                    storagePath = `audio/${message.fileName}`;
                }

                if (storagePath) {
                    const storageRef = ref(storage, storagePath);
                    deleteObject(storageRef).catch((error) => {
                        if (error.code === 'storage/object-not-found') {
                            console.error("The file does not exist in storage. Ignoring error.");
                        } else {
                            console.error("Failed to remove file from storage: ", error);
                        }
                    });
                }
                setIsDeleting(false);
            })
            .catch((error) => {
                console.error("Failed to remove message: ", error);
            });
    };

    return (
        <>
            <Modal isOpen={isDeleting} onClose={() => setIsDeleting(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Delete Message</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Are you sure you want to delete this message? This action cannot be undone.
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={() => setIsDeleting(false)}>Cancel</Button>
                        <Button colorScheme="red" onClick={handleRemoveMessage} ml={3}>
                            Delete
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default DeleteMessage;