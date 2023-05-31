import { useState } from "react";
import {
    useUpdateMessageInChatMutation,
} from "../../../api/databaseApi";
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Input,
} from "@chakra-ui/react";

type EditMessageProps = {
    chatId: string;
    messageId: string;
    teamId?: string;
    initialMessageContent: string;
    isEditing: boolean;
    setIsEditing: (isEditing: boolean) => void;
};


function EditMessage({
    chatId,
    messageId,
    teamId,
    initialMessageContent,
    isEditing,
    setIsEditing
}: EditMessageProps) {
    const [updateMessage] = useUpdateMessageInChatMutation();
    const [newMessageContent, setNewMessageContent] = useState(
        initialMessageContent
    );

    const handleUpdateMessage = () => {
        updateMessage({ chatId, messageId, newMessageContent, teamId })
            .unwrap()
            .then(() => setIsEditing(false))
            .catch((error) => {
                console.error("Failed to update message: ", error);
            });
    };

    return (
        <>
            

            <Modal isOpen={isEditing} onClose={() => setIsEditing(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Message</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input
                            value={newMessageContent}
                            onChange={(e) => setNewMessageContent(e.target.value)}
                        />
                        <Button
                            onClick={handleUpdateMessage}
                            mt={4}
                            colorScheme="blue"
                            isDisabled={!newMessageContent} // Disable the button if newMessageContent is empty
                        >
                            Save Changes
                        </Button>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}

export default EditMessage;