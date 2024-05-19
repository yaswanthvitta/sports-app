/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_ENDPOINT } from '../../config/constants';

export const fetchTeam = async (dispatch: any) => {
  const token = localStorage.getItem("authToken") ?? "";
  try {
    dispatch({ type: "FETCH_TEAM_REQUEST" });
    const response = await fetch(`${API_ENDPOINT}/teams`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${token}` },
    });

    const data = await response.json();

    dispatch({ type: "FETCH_TEAM_SUCCESS", payload: data });
  } catch (error) {
    console.log('Error fetching teams:', error);
    dispatch({ type: "FETCH_TEAM_FAILURE", payload: 'Unable to load teams' });
  }
};


