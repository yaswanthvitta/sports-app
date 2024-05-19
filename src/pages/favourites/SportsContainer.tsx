import  { useEffect } from "react";
import { useSportDispatch } from "../../context/sports/context";
import { fetchSport } from "../../context/sports/actions";
import { Outlet } from "react-router-dom";

const SportContainer = () => {
  const sportDispatch = useSportDispatch();
  useEffect(() => {
    fetchSport(sportDispatch);
  }, [sportDispatch]);
  return <Outlet />;
};

export default SportContainer;