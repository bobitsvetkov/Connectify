import { useEffect, useState } from 'react';
import { ref, onValue, off } from "firebase/database";
import { getAuth } from "firebase/auth";
import { useGetTeamByIdQuery, useDeleteTeamMemberMutation } from "../../api/databaseApi";
import SingleUser from "../LeftList/SingleUser";
import { Text } from "@chakra-ui/react";
import { database } from "../../config/firebaseConfig";

function MemberList({ teamId }) {
    const [members, setMembers] = useState([]);
    const { data: team, isLoading: isTeamLoading, isError: isError } = useGetTeamByIdQuery(teamId);

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

    if (isTeamLoading) return <div>Loading...</div>;
    if (isError || !team) return <div>Error loading team</div>;

    return (
        <div>
            <Text mb={5}>{team.name} members:</Text>
            {members &&
                Object.entries(members).map(([userUid, isMember]) => {
                    if (isMember) {
                        return <SingleUser userUid={userUid} />
                    }
                })
            }
        </div>
    );
}

export default MemberList;
