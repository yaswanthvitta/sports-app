/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { API_ENDPOINT } from "../../config/constants";
import { ArrowPathRoundedSquareIcon } from "@heroicons/react/24/outline";


export interface Match {
  id: number
  name: string
  location: string
  sportName: string
  endsAt: Date
  isRunning: boolean
  playingTeamID: number
  score: Score[]
  story: string
  teams: Team[]
}

export type Score = Record<string, string>

export interface Team {
  id: number
  name: string
}

export const  GetMatch = (props:any)  => {

  const {id}=props
  const [List, setListing] = useState<any|null>(null);

  const fetchData = async (id:number) => {
    const response = await fetch(`${API_ENDPOINT}/matches/${id}`);
    const json = await response.json();
    console.log(json)
    console.log('json')
    setListing(json);
    };
      
  const  FetchMatch = (id : number)  => {
          useEffect(() => {
              fetchData(id);
          }, [id]);
    }
  
  const  refresh = (id : number)  => {
    setListing(null)
    fetchData(id);
  }
  
   FetchMatch(id)
  
    if(List==null){
      return (
        <div className=" w-[300px] block p-6 bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700 m-3">
            <p><span>Loading ...</span></p>
        </div>
    )
   }
   
   return(
        <div
        key={List.id}
        className=" w-[300px] block p-6 bg-[#FFAD42] border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700 m-3"
      >
        <div className="flex flex-row justify-between mb-5 ">
          <p className="text-white font-bold">{List.sportName}</p>
          <ArrowPathRoundedSquareIcon className="h-6 w-6 text-gray-500 cursor-pointer" onClick={()=>refresh(List.id)}/>
        </div>
        <div className="flex flex-row justify-between">
          <div className="">
            <p className=" text-white">{List.teams[0].name}</p>
            <p className=" text-white">{List.teams[1].name}</p>
          </div>
          <div className="">
            <p className=" text-white">{List.score[List.teams[0].name]}</p>
            <p className=" text-white">{List.score[List.teams[1].name]}</p>
          </div>
        </div>
        </div>
    )
                  
    } 

