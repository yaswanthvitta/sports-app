import  { useEffect } from "react";
import { useMatchesDispatch } from "../../context/livematches/context";
import { fetchMatches } from "../../context/livematches/actions";
import { Outlet } from "react-router-dom";

const MatchContainer = () => {
  const matchDispatch = useMatchesDispatch();
  useEffect(() => {
    fetchMatches(matchDispatch);
  }, [matchDispatch]);
  return <Outlet />;
};

export default MatchContainer;