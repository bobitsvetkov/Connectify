
import { getAuth } from "@firebase/auth";
import { onValue, off, ref } from "@firebase/database";
import { database } from "../../config/firebaseConfig";
import { useState, useEffect } from "react";
import { VStack } from "@chakra-ui/layout";
import LatestChatSingle from "../LatestChatSingle/LatestChatSingle";



function LatestChatsList({ setUserListOpen }) {
    const [latestChats, setLatestChats] = useState({});
    const currUserUid = getAuth().currentUser?.uid;

    useEffect(() => {
        const teamsRef = ref(database, `users/${currUserUid}/latestChats`);
        const handleValueChange = (snapshot) => {
          setLatestChats(snapshot.val());
        };
        onValue(teamsRef, handleValueChange);
        return () => {
          off(teamsRef, handleValueChange);
        };
      }, []);
      
    return (
            <VStack>
                {Object.values(latestChats).map((chat) => {
                  return <LatestChatSingle chat={chat} />
                })}
            </VStack>
    );
}

export default LatestChatsList;