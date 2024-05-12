/* eslint-disable @typescript-eslint/no-explicit-any */
// import React from "react";
import { useMatchesState } from "../../context/livematches/context";
import { GetMatch } from "./LiveMatch";



export default function LiveMatchItems() {
  
  const state: any = useMatchesState();


  const { matches, isLoading, isError, errorMessage } = state;
  console.log(matches);
  console.log('matches');

  if (matches.length === 0 && isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }


 
 

  return (
    <div className="flex flex-row">
      {matches
        .filter((match:any) => {
          return match.isRunning === true;
        })
        .map((match:any) => (

          <div> {GetMatch(match.id)} </div>
          
        )) 
      }
      </div>
  );
}