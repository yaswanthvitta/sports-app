/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_ENDPOINT } from '../../config/constants';
//import { MatchesDispatch  } from './context';

export const fetchMatches = async (dispatch: any) => {
  const token = localStorage.getItem("authToken") ?? "";
  try {
    dispatch({ type: "FETCH_MATCHES_REQUEST" });
    const response = await fetch(`${API_ENDPOINT}/matches`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${token}` },
    });

    const data = await response.json();

    dispatch({ type: "FETCH_MATCHES_SUCCESS", payload: data.matches });
  } catch (error) {
    console.log('Error fetching matches:', error);
    dispatch({ type: "FETCH_MATCHES_FAILURE", payload: 'Unable to load matches' });
  }
};

// export const refreshMatches = async (
//     dispatch: MatchesDispatch,
//   ) => {
//     const token = localStorage.getItem("authToken") ?? "";
//     try {
//       dispatch({ type: "FETCH_MATCHES_REQUEST" });
//       const response = await fetch(
//         `${API_ENDPOINT}/matches`,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
  
//       if (!response.ok) {
//         throw new Error("Failed to fetch tasks");
//       }
  
//       const data = await response.json();

//       dispatch({
//         type: "FETCH_MATCHES_SUCCESS",
//         payload: data,
//       });
//       console.dir(data);
//     } catch (error) {
//       console.error("Operation failed:", error);
//       dispatch({
//         type: "FETCH_MATCHES_FAILURE",
//         payload: "Unable to load tasks",
//       });
//     }
//   };
  
