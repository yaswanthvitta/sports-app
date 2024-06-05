/* eslint-disable @typescript-eslint/no-explicit-any */
// import React from "react";

import { useMatchesState } from "../../context/livematches/context";
import { GetMatch } from "./LiveMatch";
import "../../assets/matches.css"
import { useState } from "react";
import { usePreferencesState } from "../../context/preferences/context";



export default function LiveMatchItems() {
  
  const state: any = useMatchesState();

  const authenticated = !!localStorage.getItem("authToken");


  const { matches, isLoading, isError, errorMessage } = state;
  console.log(matches);
  console.log('matches');

  const preference: any = usePreferencesState();
  const { preferences} = preference;
  const {isLoadingpref, isErrorpref, errorMessagepref} = preference;



  const [selectedMatches, setSelectedMatches] = useState<any>(matches);

  const [selectedPreferences, setSelectedPreferences] = useState<any>([]);

  if ((preferences.length === 0 && isLoadingpref)|| (matches.length === 0 && isLoading)) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }

  if (isErrorpref) {
    return <span>{errorMessagepref}</span>;
  }

  if(!authenticated && (selectedMatches.length !== matches.length)){
    setSelectedMatches(matches)
  }


  if(authenticated && (selectedPreferences!==preferences)){
    const pmatches = matches.filter((t:any)=>{
      return ((Object.values(preferences).includes(t.sportName))||(Object.values(preferences).includes(t.teams[0].name))||(Object.values(preferences).includes(t.teams[1].name)))
    })
    const lmatches = pmatches.filter((t:any)=>{
      return t.isRunning
    })
    if(lmatches.length==0){
      return (<>
      <h1 className="font-semibold text-lg">Live Matches</h1>
      <p className="mb-2 font-semibold">No live matchec according to your preferences</p>
      </>)
    }
    setSelectedMatches(pmatches)
    setSelectedPreferences(preferences)
  }

 
 

  return (
    <div>
      <h1 className="font-semibold text-lg">Live Matches</h1>
    <div className="flex flex-row">
      {selectedMatches
        .filter((match:any) => {
          return match.isRunning === true;
        })
        .map((match:any) => (
          <div key={match.id}>
          <GetMatch{...{id:match.id}}/>
          </div>
          
        )) 
      }
      </div>
      </div>
  );
}