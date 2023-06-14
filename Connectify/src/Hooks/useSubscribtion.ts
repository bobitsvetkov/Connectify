import { useState, useEffect } from "react";
import { onValue, ref } from "firebase/database";
import { database } from "../config/firebaseConfig";
import { User, Message } from "../types/interfaces";

type UseSubscriptionProps = {
  user: User | undefined;
  teamId: string | undefined;
  channelId: string | undefined;
  chatUserId: string | undefined;
  isChat: boolean;
};

export const useSubscription = ({
  user,
  teamId,
  channelId,
  chatUserId,
  isChat,
}: UseSubscriptionProps) => {
  const [chatData, setChatData] = useState<Message[] | undefined>(undefined);
  const activeChatId =
    user && chatUserId ? [user.username, chatUserId].sort().join("-") : undefined;


  useEffect(() => {
    let chatRef;
    if (activeChatId && isChat) {
      chatRef = ref(database, `chats/${activeChatId}`);
    } else if (teamId && channelId) {
      chatRef = ref(database, `teams/${teamId}/channels/${channelId}`);
    }

    if (chatRef) {
      const unsubscribe = onValue(chatRef, (snapshot) => {
        setChatData(snapshot.val());
      });

      return () => unsubscribe();
    }
  }, [activeChatId, teamId, channelId, isChat]);

  return { chatData, activeChatId };
};
