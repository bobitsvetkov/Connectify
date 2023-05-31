import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Text,
    Input,
    Box,
    Center,
} from '@chakra-ui/react';
import { getAuth } from '@firebase/auth';
import { useGetUserByIdQuery } from '../../api/databaseApi';
import { useCreateTeamMutation } from '../../api/databaseApi';
import { useRef } from "react";
import { v4 as uuidv4 } from "uuid";
interface CreateTeamModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CreateTeamModal: React.FC<CreateTeamModalProps> = ({ isOpen, onClose }) => {
    const auth = getAuth();
    const currUser = auth.currentUser;
    const { data: user, isLoading: isUserLoading, isError: isUserError } = useGetUserByIdQuery(currUser && currUser.uid);
    const [createTeam, { isLoading: isCreatingTeam }] = useCreateTeamMutation()
    const teamName = useRef();
    if (isUserLoading) return <Text>Loading...</Text>;
    if (isUserError) return <Text>An error has occurred.</Text>;
    const placeholderText = user?.username ? `${user.username}'s Team` : 'Enter team name';
    
    const handleCreate = () => {
        const teamNameValue = teamName.current.value;

        const newTeam = {
            name: teamNameValue,
            owner: user.uid,
            uid: uuidv4(),
            participants: { [user.uid]: true },
            messages: {},
            photoUrl: '', //shte se promeni na url-a na snimkata kato se navurje s firebase storage-a
        }
        createTeam(newTeam);
        onClose();
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Create new team</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text>Create a new team and customize it with a name and an icon!</Text>
                    <Center>
                        <Box as="label" htmlFor="team-icon-upload" cursor="pointer" bg="teal.400" color="white" p={2} borderRadius="md">
                            Upload Team Icon
                        </Box>
                        <Input id="team-icon-upload" type="file" hidden onChange={(e) => console.log(e.target.files)} />
                    </Center>
                    <Text mt={4}>Team Name</Text>
                    <Input type='text' placeholder={placeholderText} ref={teamName}/>
                </ModalBody>
                <ModalFooter>
                    <Button variant='ghost' onClick={onClose}>Close</Button>
                    <Button colorScheme='blue' mr={3} onClick={handleCreate}>
                        Create
                    </Button>

                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default CreateTeamModal;
