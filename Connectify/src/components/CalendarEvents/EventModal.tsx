import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import SearchInput from "../Search/SearchInput";
import EventUserSearch from "./EventUserSearch";
import EventUserDisplay from "./EventUserDisplay";
import { useState } from "react";
import { database } from "../../config/firebaseConfig";
import { ref, set, push } from "firebase/database";
const EventModal = ({
  isOpen,
  onClose,
  eventTitle,
  setEventTitle,
  selectedRange,
  handleSelect,
  user,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleSelectUser = (user: any) => {
    setSelectedUsers((prevUsers) => [...prevUsers, user]);
  };

  const handleEventSubmit = () => {
    if (eventTitle && selectedUsers.length > 0) {
      const eventsRef = ref(database, `users/${user.uid}/events`);
      const newEventRef = push(eventsRef);
      const newEvent: Event = {
        start: selectedRange.start,
        end: selectedRange.end,
        title: eventTitle,
        id: newEventRef.key,
        users: selectedUsers.map((u) => u.uid),
      };
      set(newEventRef, newEvent)
        .then(() => {
          setEventTitle("");
          setSelectedUsers([]);
          onClose();

          selectedUsers.forEach((selectedUser) => {
            const selectedUserEventsRef = ref(
              database,
              `users/${selectedUser.uid}/events`
            );
            const newEventRefForSelectedUser = push(selectedUserEventsRef);
            set(newEventRefForSelectedUser, newEvent).catch((error) => {
              console.error(
                "Error adding event to selected user's database:",
                error
              );
            });
          });
        })
        .catch((error) => {
          console.error("Error adding event:", error);
        });
    }
  };

  const handleRemoveUser = (uid: string) => {
    setSelectedUsers((prevUsers) =>
      prevUsers.filter((user) => user.uid !== uid)
    );
  };

  const handleSearch = (results: any[]) => {
    setSearchResults(results);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Event</ModalHeader>
        <SearchInput onSearch={handleSearch} />
        <EventUserSearch
          results={searchResults}
          searchQuery={searchQuery}
          onSelectUser={handleSelectUser}
        />
        <ModalCloseButton />
        <EventUserDisplay
          selectedUsers={selectedUsers}
          handleRemoveUser={handleRemoveUser}
        />
        <ModalBody>
          <FormControl>
            <FormLabel>Event Title</FormLabel>
            <Input
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleEventSubmit} variant="ghost">
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EventModal;
