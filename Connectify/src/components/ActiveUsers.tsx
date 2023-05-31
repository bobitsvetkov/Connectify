import React, { useEffect, useState } from "react";
import { database } from "../config/firebaseConfig";
import { ref, onValue } from "firebase/database";
import { Box } from "@chakra-ui/layout";

function ActiveUsers() {
  const [userCount, setUserCount] = useState(null);

  useEffect(() => {
    const usersRef = ref(database, "users");

    onValue(usersRef, (snapshot) => {
      const count = snapshot.size;
      setUserCount(count);
    });
  }, []);

  return (
    <Box>
      {userCount} Customers are already chatting with their friends and
      colleagues
    </Box>
  );
}

export default ActiveUsers;
