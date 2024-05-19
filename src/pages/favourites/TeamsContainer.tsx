import  { useEffect } from "react";
import { useTeamDispatch } from "../../context/teams/context";
import { fetchTeam } from "../../context/teams/actions";
import { Outlet } from "react-router-dom";

const TeamContainer = () => {
  const teamDispatch = useTeamDispatch();
  useEffect(() => {
    fetchTeam(teamDispatch);
  }, [teamDispatch]);
  return <Outlet />;
};

export default TeamContainer;