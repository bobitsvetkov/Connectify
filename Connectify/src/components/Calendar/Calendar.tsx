import { useState, useEffect } from "react";
import { Button } from "@chakra-ui/react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { database } from "../../config/firebaseConfig";
import { ref, push, set, onValue } from "firebase/database";
import { FiCalendar } from "react-icons/fi";
import EventComponent from "../CalendarEvents/Event";
import { Event } from "../../types/interfaces";
import { remove } from "firebase/database";
import "./Calendar.css";
import { useCurrentUser } from "../../AuthUtils";
import EventModal from "../CalendarEvents/EventModal";
import ModalWindowForCalendar from "./ModalWindowForCalendar";

const CalendarApp: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [eventTitle, setEventTitle] = useState("");
  const [selectedRange, setSelectedRange] = useState({ start: "", end: "" });
  const { user, isUserLoading, isUserError } = useCurrentUser();

  const localizer = momentLocalizer(moment);

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

  useEffect(() => {
    if (user) {
      const eventsRef = ref(database, `users/${user.uid}/events`);
      onValue(eventsRef, (snapshot) => {
        const dbEvents = snapshot.val();
        if (dbEvents) {
          const formattedEvents = Object.keys(dbEvents).map((id) => {
            const event = dbEvents[id];
            const users = event.users || [];
            const formattedUsers = users.map((userId) => {
              return {
                uid: userId,
                ...dbEvents[userId],
              };
            });
            return {
              id,
              ...event,
              start: new Date(event.start),
              end: new Date(event.end),
              users: formattedUsers,
            };
          });
          setEvents(formattedEvents);
        }
      });
    }
  }, [user]);

  return (
    <>
      <Button variant="ghost" onClick={toggleModal}>
        <FiCalendar />
      </Button>
      <ModalWindowForCalendar
        isOpen={isModalOpen}
        onClose={toggleModal}
        title="Calendar"
      >
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
      </ModalWindowForCalendar>
      <EventModal
        isOpen={isEventModalOpen}
        onClose={toggleEventModal}
        eventTitle={eventTitle}
        setEventTitle={setEventTitle}
        selectedRange={selectedRange}
        handleSelect={handleSelect}
        user={user}
      />
    </>
  );
};

export default CalendarApp;
