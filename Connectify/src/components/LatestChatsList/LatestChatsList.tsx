import { getAuth } from "@firebase/auth";
import { onValue, off, ref } from "@firebase/database";
import { database } from "../../config/firebaseConfig";
import { useState, useEffect } from "react";
import LatestChatSingle from "../LatestChatSingle/LatestChatSingle";
import { useNavigate } from "react-router";
import { selectUser } from "../../features/ActiveUserSlice";
import { useDispatch } from "react-redux";
import { User, Team, Channel, Chat } from "../../api/databaseApi";

interface LatestChatsListProps {
  setUserListOpen: (open: boolean) => void;
}

const LatestChatsList: FC<LatestChatsListProps> = ({ setUserListOpen }) => {
  const [latestChats, setLatestChats] = useState<Chat[]>([]);
  const dispatch = useDispatch();
  const currUserUid = getAuth().currentUser?.uid;


  useEffect(() => {
    const teamsRef = ref(database, `users/${currUserUid}/latestChats`);
    const handleValueChange = (snapshot) => {
      const chatsArray = Object.values(snapshot.val() || {});
      chatsArray.sort((a, b) => new Date(b.date) - new Date(a.date));
      setLatestChats(chatsArray);
    };
    onValue(teamsRef, handleValueChange);
    return () => {
      off(teamsRef, handleValueChange);
    };
  }, []);

  const navigate = useNavigate();

  const handleChatClick = (user: User) => {
    dispatch(selectUser(user));
    navigate(`/chat/${user.username}`);
  }

  const handleChannelClick = (teamId: string, channelId: string) => {
    navigate(`/${teamId}/${channelId}`);
  }

  return (
    <div >
      {
        latestChats.map((chat) => {
          return <LatestChatSingle key={chat.uid} chat={chat} handleChatClick={handleChatClick} handleChannelClick={handleChannelClick} />
        })
      }
    </div >
  );
}

export default LatestChatsList;
