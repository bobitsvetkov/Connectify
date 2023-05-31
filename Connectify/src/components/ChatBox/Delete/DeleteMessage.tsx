import { useState } from "react";
import {
    useRemoveMessageFromChatMutation,
} from "../../../api/databaseApi";
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react";

type DeleteMessageProps = {
    chatId: string;
    messageId: string;
    teamId?: string;
    isDeleting: boolean;
    setIsDeleting: (isDeleting: boolean) => void;
};

function DeleteMessage({ chatId, messageId, teamId, isDeleting, setIsDeleting }: DeleteMessageProps) {
    const [removeMessage] = useRemoveMessageFromChatMutation();

    const handleRemoveMessage = () => {
        removeMessage({ chatId, messageId, teamId })
            .unwrap()
            .then(() => setIsDeleting(false))
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
                        <p>Are you sure you want to delete this message?</p>
                        <Button colorScheme="red" onClick={handleRemoveMessage} mt={4}>
                            Delete
                        </Button>
                        <Button variant="ghost" onClick={() => setIsDeleting(false)} mt={4}>
                            Cancel
                        </Button>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}

export default DeleteMessage;