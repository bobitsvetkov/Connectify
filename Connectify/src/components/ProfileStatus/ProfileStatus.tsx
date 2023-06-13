import { Box, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useDispatch } from "react-redux";
import { getAuth } from "@firebase/auth";
import { useUpdateUserStatusMutation } from "../../api/databaseApi";
import { setStatus as updateStatus } from "../../features/UsersSlice";
import { Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";

const ProfileStatus: React.FC = () => {
  const [status, setStatus] = useState<string>(() => {
    const storedStatus = localStorage.getItem("userStatus");
    return storedStatus || "Available";
  });
  const auth = getAuth();
  const currUser = auth.currentUser;
  const dispatch = useDispatch();

  const [updateUserStatus] = useUpdateUserStatusMutation();

  useEffect(() => {
    localStorage.setItem("userStatus", status);
  }, [status]);

  const handleChangeStatus = async (status: string) => {
    if (!currUser) {
      console.error('User not signed in');
      return;
    }
    try {
      await updateUserStatus({ uid: currUser.uid, status });
      dispatch(updateStatus({ uid: currUser.uid, status }));
      setStatus(status);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box>
      <Menu placement="left">
        <MenuButton
          as={Button}
          variant={"ghost"}
          color={"#57c73"}
          rightIcon={<ChevronRightIcon />}
        >
          Status: {status}
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => handleChangeStatus("Available")}>
            Available
          </MenuItem>
          <MenuItem onClick={() => handleChangeStatus("Busy")}>Busy</MenuItem>
          <MenuItem onClick={() => handleChangeStatus("In a meeting")}>
            In a meeting
          </MenuItem>
          <MenuItem onClick={() => handleChangeStatus("Away")}>Away</MenuItem>
          <MenuItem onClick={() => handleChangeStatus("Offline")}>
            Offline
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default ProfileStatus;
