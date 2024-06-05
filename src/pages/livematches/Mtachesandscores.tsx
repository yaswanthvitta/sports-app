/* eslint-disable @typescript-eslint/no-explicit-any */
// import React from "react";

import { useMatchesState } from "../../context/livematches/context";
import { GetMatch } from "./LiveMatch";
import "../../assets/matches.css"




export default function Matchesandscores() {
  
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
    <div>
      <h1 className="font-semibold text-lg">Matches & scores</h1>
      <div className="ml-2"  style={{overflow:"hidden"}}>
      <div className="flex flex-row wrapper p-2">
      {matches
        .filter((match:any) => {
          return match.isRunning === false;
        })
        .map((match:any) => (
          <div key={match.id}>
          <GetMatch{...{id:match.id}}/>
          </div>
          
        )) 
      }
      </div>
      </div>
      </div>
  );
}