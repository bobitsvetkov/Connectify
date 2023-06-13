import { useState, useEffect } from "react";
import { getAuth } from "@firebase/auth";
import { onValue, ref, DataSnapshot } from "@firebase/database";
import { database } from "../../config/firebaseConfig";
import LatestChatSingle from "../LatestChatSingle/LatestChatSingle";
import { useNavigate } from "react-router";
import { selectUser } from "../../features/ActiveUserSlice";
import { useDispatch } from "react-redux";
import { User } from "../../api/databaseApi";
import { latestChat } from "../../types/interfaces";

const LatestChatsList = () => {
  const [latestChats, setLatestChats] = useState<latestChat[]>([]);
  const dispatch = useDispatch();
  const currUserUid = getAuth().currentUser?.uid;

  useEffect(() => {
    if (currUserUid) {
      const chatsRef = ref(database, `users/${currUserUid}/latestChats`);

      const handleValueChange = (snapshot: DataSnapshot) => {
        const chatsArray: latestChat[] = Object.values(snapshot.val() || {}).map(chat => chat as latestChat);
        chatsArray.sort((a: latestChat, b: latestChat) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setLatestChats(chatsArray);
      };

      const unsubscribe = onValue(chatsRef, handleValueChange);

      return () => {
        unsubscribe();
      };
    }
  }, [currUserUid]);

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
        latestChats.map((chat: latestChat) => {
          return <LatestChatSingle key={chat.uid} chat={chat} handleChatClick={handleChatClick} handleChannelClick={handleChannelClick} />
        })
      }
    </div >
  );
}

export default LatestChatsList;
