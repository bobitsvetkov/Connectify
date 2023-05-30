import { useGetTeamByIdQuery } from "../../api/databaseApi";
import SingleUser from "../LeftList/SingleUser";

function MemberList({teamId}) {

    const {data: team, isLoading: isTeamLoading, isError: isError} = useGetTeamByIdQuery(teamId);

    if (isTeamLoading) return <div>Loading...</div>;
    if (isError || !team) return <div>Error loading user</div>;

    return (
        <div>
            {team.participants && 
                Object.values(team.participants).map((userUid) => {
                    return <SingleUser userUid={userUid}/>
                })
            }
        </div>
    );
}

export default MemberList;