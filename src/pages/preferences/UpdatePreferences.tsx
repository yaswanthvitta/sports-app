/* eslint-disable @typescript-eslint/no-explicit-any */
// import React from "react";
//import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { useSportState } from "../../context/sports/context";
import { useTeamState } from "../../context/teams/context";
import { useState } from "react";
import { useArticleState } from "../../context/articles/context";
//import { GetArticle } from "../articles/Content";


export default function PreferenceItems() {
  
  let updatedCheckedState:any;
  const sportslist: any = useSportState();
  const { sports} = sportslist;
  const {isLoadingsport, isErrorsport, errorMessagesport} = sportslist;

  const teamslist: any = useTeamState();
  const { teams} = teamslist;
  const {isLoadingteam, isErrorteam, errorMessageteam} = teamslist;

  

  let [sportsState, setSportsState] = useState<any>([])

  let [teamsState, setTeamsState] = useState<any>([])


  

   
  const state: any = useArticleState();  
  const { articles } = state;
  const {isLoading, isError, errorMessage} = state;


  



  if ((teams.length === 0 && isLoadingteam)||(sports.length===0 && isLoadingsport)||(articles.length === 0 && isLoading)) {
    return <span>Loading...</span>;
  }
 
  if (isError) {
    return <span>{errorMessage}</span>;
  }

  if(isErrorsport){
    return <span>{errorMessagesport}</span>;
  }

  if (isErrorteam) {
    return <span>{errorMessageteam}</span>;
  }

  if(sports.length>0 && sportsState.length===0){
    setSportsState(new Array(sports.length).fill(false))
  }

  if(teams.length>0 && teamsState.length===0){
    setTeamsState(new Array(teams.length).fill(false))
  }

const handleOnChange = (position:any) => {
    sportsState = sportsState.map((item:any, index:any) =>
      index === position ? !item : item
    );
    setSportsState(sportsState)
    console.log(sportsState)
}
 

  return (
    <>
      <div>
      {sports.map(({ name }, index) => {
          return (
            <div key={index}>
              <div className="toppings-list-item">
                <div className="left-section">
                  <input
                    type="checkbox"
                    id={`custom-checkbox-${index}`}
                    name={name}
                    value={name}
                    checked={sportsState[index]}
                    onChange={() => handleOnChange(index)}
                  />
                  <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}