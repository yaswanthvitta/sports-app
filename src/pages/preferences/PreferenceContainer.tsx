import  { useEffect } from "react";
import { usePreferencesDispatch } from "../../context/preferences/context";
import { fetchPreference } from "../../context/preferences/actions";
import { Outlet } from "react-router-dom";

const PreferenceContainer = () => {
  const preferenceDispatch = usePreferencesDispatch();
  useEffect(() => {
    fetchPreference(preferenceDispatch);
  }, [preferenceDispatch]);
  return <Outlet />;
};

export default PreferenceContainer;