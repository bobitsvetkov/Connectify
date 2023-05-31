import { useGetTeamByIdQuery } from "../../api/databaseApi";
import SingleUser from "../LeftList/SingleUser";
import { Text } from "@chakra-ui/react";

function MemberList({ teamId }) {

    const { data: team, isLoading: isTeamLoading, isError: isError } = useGetTeamByIdQuery(teamId);

    if (isTeamLoading) return <div>Loading...</div>;
    if (isError || !team) return <div>Error loading user</div>;

    return (
        <div>
            <Text mb={5}>{team.name} members:</Text>
            {team.participants &&
                Object.entries(team.participants).map(([userUid, isMember]) => {
                    if (isMember) {
                        return <SingleUser userUid={userUid} />
                    }
                })
            }
        </div>
    );
}

export default MemberList;