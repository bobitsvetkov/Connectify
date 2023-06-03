import { useState } from "react";
import { Event } from "../../types/interfaces";
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
import { Text } from "@chakra-ui/react";

interface EventComponentProps {
  event: Event;
  onDelete: () => void;
}

const EventComponent: React.FC<EventComponentProps> = ({ event, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleDelete = () => {
    onDelete();
    toggleModal();
  };
  const isPast = new Date(event.end) < new Date();

  return (
    <div style={{ textDecoration: isPast ? "line-through" : "none" }}>
      <div onClick={toggleModal}>{event.title}</div>
      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Event Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div>
              <Text>Title:</Text> {event.title}
            </div>
            <div>
              <Text>Start:</Text> {event.start.toString()}
            </div>
            <div>
              <Text>End:</Text> {event.end.toString()}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={handleDelete}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EventComponent;
