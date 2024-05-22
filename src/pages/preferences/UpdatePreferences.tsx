/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import React from "react";
//import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { useSportState } from "../../context/sports/context";
import { useTeamState } from "../../context/teams/context";
import {  Fragment, useState } from "react";
import { useArticleState } from "../../context/articles/context";
import { API_ENDPOINT } from "../../config/constants";
import { Dialog, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";

export default function PreferenceItems() {
  const authenticated = !!localStorage.getItem("authToken");
  
  const navigate = useNavigate() 

  const token = localStorage.getItem("authToken") ?? "";

  const sportslist: any = useSportState();

  const { sports} = sportslist;
  const {isLoadingsport, isErrorsport, errorMessagesport} = sportslist;

  const teamslist: any = useTeamState();
  const { teams} = teamslist;
  const {isLoadingteam, isErrorteam, errorMessageteam} = teamslist;

  const [isOpen, setIsOpen] = useState(false)

  const closeModal = () => {
    setIsOpen(false)
  }
  const openModal = () => {
    setIsOpen(true)
  }

  let [sportsState, setSportsState] = useState<any>([])

  let [teamsState, setTeamsState] = useState<any>([])

  const [userData, setUserData] = useState<any>(null)


  

   
  const state: any = useArticleState();  
  const { articles } = state;
  const {isLoading, isError, errorMessage} = state;



  if(!authenticated){
    return(
    <a href="/signin"><button
    type="button"
    id="newProjectBtn"
    className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
  >
    Preferences
  </button> </a>
    )
  }



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


  async function fetchPreferences(){

    try {
        
      const response = await fetch(`${API_ENDPOINT}/user`, {
        method: 'get',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      });
  
      if (!response.ok) {
        throw new Error('preferences get failed');
      }
  
      console.log('preferences get successful');
      
      const data = await response.json();
      console.log(data)
      yourPreferences(data.preferences);
      return data
     
    } catch (error) {
      console.error('preferences get failed:', error);
    }
  }



if(userData===null && sportsState.length>0 && teamsState.length>0){
setUserData(fetchPreferences())
}

function yourPreferences(data:any){
  sports.map((sport:any,index:any)=>{
    if(Object.values(data).includes(sport.name)){
      sportsState[index]=true
    }
  })
  setSportsState(sportsState)
  teams.map((team:any,index:any)=>{
    if(Object.values(data).includes(team.name)){
    teamsState[index]=true
    }
  })
  setTeamsState(teamsState)
}











const handleOnChange = (position:any) => {
    sportsState = sportsState.map((item:any, index:any) =>
      index === position ? !item : item
    );
    setSportsState(sportsState)
}

const handleOnChangeTeams = (position:any) => {
  teamsState = teamsState.map((item:any, index:any) =>
    index === position ? !item : item
  );
  setTeamsState(teamsState)
}

async function savePreferences(){
    let preferences:any;
    sportsState.map((val: boolean,index: string | number)=>{
      if (val===true){
        preferences={...preferences,[index]:sports[index].name}
      }
    })
    teamsState.map((val: boolean,index: string | number)=>{
      if (val===true){
        preferences={...preferences,[sports.length+index]:teams[index].name}
      }
    })
    if(preferences===undefined){
      preferences={}
    }

    console.log(preferences)

    try {
      
      const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ preferences }),
      });

      if (!response.ok) {
        throw new Error('preferences update failed');
      }

      console.log('preferences update successful');
      
      const data = await response.json();
      console.log(data)
      setUserData(data)

    } catch (error) {
      console.error('preferences update failed:', error);
    }
    navigate("/");
    closeModal();
    
}
 

  return (
    <>
    <div>
    <button
        type="button"
        id="newProjectBtn"
        onClick={openModal}
        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        Preferences
      </button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Create new project
                  </Dialog.Title>
                  <div className="mt-2">
                  <div>
                        {sports.map(( sport:any , index:any) => {
                            return (
                              <div key={index}>
                                <div className="toppings-list-item">
                                  <div className="left-section">
                                    <input
                                      type="checkbox"
                                      id={`custom-checkbox-${index}`}
                                      name={sport.name}
                                      value={sport.name}
                                      checked={sportsState[index]}
                                      onChange={() => handleOnChange(index)}
                                    />
                                    <label htmlFor={`custom-checkbox-${index}`}>{sport.name}</label>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                          <br/>
                        <div>
                        {teams.map((team:any , index:any) => {
                            return (
                              <div key={sports.length+index}>
                                <div className="toppings-list-item">
                                  <div className="left-section">
                                    <input
                                      type="checkbox"
                                      id={`custom-checkbox-${sports.length+index}`}
                                      name={team.name}
                                      value={team.name}
                                      checked={teamsState[index]}
                                      onChange={() => handleOnChangeTeams(index)}
                                    />
                                    <label htmlFor={`custom-checkbox-${sports.length+index}`}>{team.name}</label>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      <button type="submit" onClick={savePreferences} id='submitNewProjectBtn' className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 mr-2 text-sm font-medium text-white hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                        Save
                      </button>
                      <button type="submit" onClick={closeModal} className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                        Cancel
                      </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>    
    </div>
    </>
  );
}