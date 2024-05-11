/* eslint-disable @typescript-eslint/no-explicit-any */
// import React from "react";
import { useMatchesState } from "../../context/livematches/context";
import fetchMatch from "./LiveMatch";


export default function LiveMatchItems() {
  const state: any = useMatchesState();

  

  const { matches, isLoading, isError, errorMessage } = state;
  console.log(matches);

  if (matches.length === 0 && isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }

  return (
    <>
      {matches
        .filter((match:any) => {
          return match.isRunning === true;
        })
        .map((match:any) => (
             fetchMatch(match.id)
        )) 
      }
    </>
  );
}