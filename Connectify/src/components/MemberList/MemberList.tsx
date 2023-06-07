import { Button, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, useDisclosure, IconButton, Flex, Spacer } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { useEffect, useState, useRef } from 'react';
import { ref, onValue, off } from "firebase/database";
import { getAuth } from "firebase/auth";
import { useGetTeamByIdQuery, useDeleteTeamMemberMutation } from "../../api/databaseApi";
import SingleUser from "../LeftList/SingleUser";
import { Text } from "@chakra-ui/react";
import { database } from "../../config/firebaseConfig";

function MemberList({ teamId }) {
    const [members, setMembers] = useState([]);
    const { data: team, isLoading: isTeamLoading, isError: isError } = useGetTeamByIdQuery(teamId);
    const [deleteTeamMember] = useDeleteTeamMemberMutation();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef();
    const [selectedMember, setSelectedMember] = useState(null);

    useEffect(() => {
        const membersRef = ref(database, `teams/${teamId}/participants`);
        const handleValueChange = (snapshot) => {
            const membersObject = snapshot.val() || {};
            setMembers(membersObject);
        };
        onValue(membersRef, handleValueChange);
        return () => {
            off(membersRef, handleValueChange);
        };
    }, [teamId]);

    const currUserUid = getAuth().currentUser?.uid;
    const isOwner = team?.owner === currUserUid;

    const handleRemoveClick = (userUid) => {
        setSelectedMember(userUid);
        onOpen();
    }

    const handleRemoveConfirm = () => {
        deleteTeamMember({ userUid: selectedMember, teamId: teamId });
        onClose();
    }

    if (isTeamLoading) return <div>Loading...</div>;
    if (isError || !team) return <div>Error loading team</div>;

    return (
        <div>
            <Text mb={5}>{team.name} members:</Text>
            {members &&
                Object.entries(members).map(([userUid, isMember]) => {
                    if (isMember) {
                        return (
                            <Flex align="center">
                                <SingleUser userUid={userUid} />
                                <Spacer />
                                {isOwner && <IconButton colorScheme="red" icon={<CloseIcon />} variant="ghost" onClick={() => handleRemoveClick(userUid)} />}
                            </Flex>
                        );
                    }
                })
            }
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Remove Member
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure? This action cannot be undone.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme="red" onClick={handleRemoveConfirm} ml={3}>
                                Remove
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </div>
    );
}

export default MemberList;
