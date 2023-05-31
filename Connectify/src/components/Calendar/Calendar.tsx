import { useState, useEffect } from "react";
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
  Text,
} from "@chakra-ui/react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getAuth } from "firebase/auth";
import { database } from "../../config/firebaseConfig";
import { ref, push, set, onValue } from "firebase/database";
import { useGetUserByIdQuery } from "../../api/databaseApi";
import { FiCalendar } from "react-icons/fi";
import EventComponent from "./Event";
import { Event } from "../../types/interfaces";
import { Navigate, useNavigate } from "react-router-dom";
import { remove } from "firebase/database";

const CalendarApp: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [eventTitle, setEventTitle] = useState("");
  const [selectedRange, setSelectedRange] = useState({ start: "", end: "" });
  const localizer = momentLocalizer(moment);
  const navigate = useNavigate();
  const auth = getAuth();
  const currUser = auth.currentUser;
  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useGetUserByIdQuery(currUser && currUser.uid);

  // const handleClick = () => {
  //   navigate("calendar");
  // };
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleEventModal = () => {
    setIsEventModalOpen(!isEventModalOpen);
  };

  const handleSelect = ({ start, end }: { start: any; end: any }) => {
    setSelectedRange({ start: start.toString(), end: end.toString() });
    toggleEventModal();
  };

  const handleEventSubmit = () => {
    if (eventTitle) {
      const eventsRef = ref(database, `users/${user.uid}/events`);
      const newEventRef = push(eventsRef);
      const newEvent: Event = {
        start: selectedRange.start,
        end: selectedRange.end,
        title: eventTitle,
        id: newEventRef.key,
      };
      set(newEventRef, newEvent);
      setEventTitle("");
      toggleEventModal();
    }
  };
  useEffect(() => {
    if (user) {
      const eventsRef = ref(database, `users/${user.uid}/events`);
      onValue(eventsRef, (snapshot) => {
        const dbEvents = snapshot.val();
        if (dbEvents) {
          const formattedEvents = Object.keys(dbEvents).map((id) => {
            return {
              id,
              ...dbEvents[id],
              start: new Date(dbEvents[id].start),
              end: new Date(dbEvents[id].end),
            };
          });
          setEvents(formattedEvents);
        }
      });
    }
  }, [user]);

  const handleDeleteEvent = (eventToDelete: Event) => {
    const eventRef = ref(
      database,
      `users/${user.uid}/events/${eventToDelete.id}`
    );
    remove(eventRef)
      .then(() => {
        setEvents((prevEvents) =>
          prevEvents.filter((event) => event.id !== eventToDelete.id)
        );
      })
      .catch((error) => {
        console.error("Error deleting event:", error);
      });
  };

  return (
    <>
      <Button variant="ghost" onClick={toggleModal}>
        <FiCalendar />
      </Button>
      <Modal isOpen={isModalOpen} onClose={toggleModal} size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Calendar</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              selectable
              onSelectSlot={handleSelect}
              style={{ height: 500 }}
              components={{
                event: (props) => (
                  <EventComponent
                    event={props.event}
                    onDelete={() => handleDeleteEvent(props.event)}
                  />
                ),
              }}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={toggleModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isEventModalOpen} onClose={toggleEventModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Event</ModalHeader>
          <ModalCloseButton />
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
            <Button onClick={handleEventSubmit} colorScheme="blue">
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CalendarApp;
