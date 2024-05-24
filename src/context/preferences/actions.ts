/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_ENDPOINT } from '../../config/constants';


export const fetchPreference = async (dispatch: any) => {
  const token = localStorage.getItem("authToken") ?? "";
  try {
    dispatch({ type: "FETCH_PREFERENCES_REQUEST" });
    const response = await fetch(`${API_ENDPOINT}/user`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      });

    const data = await response.json();
    console.log(Object.values(data.preferences))
    console.log('data')

    dispatch({ type: "FETCH_PREFERENCES_SUCCESS", payload: Object.values(data.preferences) });
  } catch (error) {
    console.log('Error fetching preferences:', error);
    dispatch({ type: "FETCH_PREFERENCES_FAILURE", payload: 'Unable to load preferences' });
  }
};

export const refreshTasks = async (
    dispatch:any,
  ) => {
    const token = localStorage.getItem("authToken") ?? "";
    try {
      dispatch({ type: "FETCH_PREFERENCES_REQUEST" });
      const response = await fetch(
        `${API_ENDPOINT}/user/preferences`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }
      const data = await response.json();
      dispatch({
        type: "FETCH_PREFERENCES_SUCCESS",
        payload: data.preferences,
      });
      console.dir(data);
    } catch (error) {
      console.error("Operation failed:", error);
      dispatch({
        type: "FETCH_PREFERENCES_FAILURE",
        payload: "Unable to load tasks",
      });
    }
  };


export const updatePreferences = async (
    dispatch: any,
    preferences:any
  ) => {
    const token = localStorage.getItem("authToken") ?? "";
    try {
      dispatch({ type: "UPDATE_PREFERENCES_REQUEST" });
      const response = await fetch(`${API_ENDPOINT}/user/preferences`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({preferences}),
        }
      );
      const data = await response.json();
      console.log(data)
      console.log("pppppp")
  
      if (!response.ok) {
        throw new Error("Failed to update preferences");
      }
      dispatch({ type: "UPDATE_PREFERENCES_SUCCESS" });
    refreshTasks(dispatch);
    } catch (error) {
      console.error("Operation failed:", error);
      dispatch({
        type: "UPDATE_PREFERENCES_FAILURE",
        payload: "Unable to update preferences",
      });
    }
  };


