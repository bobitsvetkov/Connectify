import { Box, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useDispatch } from "react-redux";
import { getAuth } from "@firebase/auth";
import { useUpdateUserStatusMutation } from "../api/databaseApi";
import { setStatus as updateStatus } from "../features/UsersSlice";
import { Button } from "@chakra-ui/react";
import { useState } from "react";
const ProfileStatus: React.FC = () => {
  const [status, setStatus] = useState<string>("Available");
  const auth = getAuth();
  const currUser = auth.currentUser;
  const dispatch = useDispatch();

  const [updateUserStatus] = useUpdateUserStatusMutation();

  const handleChangeStatus = async (status: string) => {
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
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronRightIcon />}>
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
