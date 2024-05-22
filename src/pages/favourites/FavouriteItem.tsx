/* eslint-disable @typescript-eslint/no-explicit-any */
// import React from "react";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { useSportState } from "../../context/sports/context";
import { useTeamState } from "../../context/teams/context";
import { useState } from "react";
import { useArticleState } from "../../context/articles/context";
import { GetArticle } from "../articles/Content";


export default function FavouriteItems() {
  
  const sportslist: any = useSportState();
  let favteam :any  , favarticle;

  const { sports} = sportslist;
  const {isLoadingsport, isErrorsport, errorMessagesport} = sportslist;

  const teamslist: any = useTeamState();
  const { teams} = teamslist;
  const {isLoadingteam, isErrorteam, errorMessageteam} = teamslist;

   
  const state: any = useArticleState();  
  const { articles } = state;
  const {isLoading, isError, errorMessage} = state;


  const [selectedSport, setSelectedSport] = useState(sports[0]);

  const [selectedTeam, setSelectedTeam] = useState(teams[0]);

  const [favouriteTeams , setFavouriteTeams] = useState([]);

  const [favouriteArticles , setFavouriteArticles] = useState([]);



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

  if(selectedSport===undefined && sports!==undefined){
    setSelectedSport(sports[0])
    return <span>Loading...</span>;
  }
  if(selectedTeam===undefined && teams!==undefined){
    setSelectedTeam(teams[0])
    return <span>Loading...</span>;
  }

  if(favouriteTeams.length===0){
    favteam = teams.filter((t:any) => {
        return t.plays === sports[0].name;
    })
    setFavouriteTeams(favteam)
    setSelectedTeam(favteam[0])
    
    favarticle = articles.filter((a:any)=>{
        if(a.teams.length>1){
        return ((favteam[0].name === a.teams[0].name)|| (favteam[0].name === a.teams[1].name))
        }
        if(a.teams.length===1){
            return ((favteam[0].name === a.teams[0].name))
         }
        if(a.teams.length==0){
            return ((favteam[0].plays === a.sport.name))
        }
    }) 

      setFavouriteArticles(favarticle)
}

  function filter(value:any){
    setSelectedSport(value)
      favteam = teams.filter((t:any) => {
        return t.plays === value.name;
      });
      setFavouriteTeams(favteam)
      setSelectedTeam(favteam[0])

      favarticle = articles.filter((a:any)=>{
        if(a.teams.length>1){
        return ((favteam[0].name === a.teams[0].name)|| (favteam[0].name === a.teams[1].name))
        }
        if(a.teams.length===1){
            return ((favteam[0].name === a.teams[0].name))
         }
        if(a.teams.length==0){
            return ((favteam[0].plays === a.sport.name))
        }
    }) 
      console.log(favarticle)
      setFavouriteArticles(favarticle)
  }


  function filterTeam(value:any){
    
      setSelectedTeam(value)

      favarticle = articles.filter((a:any)=>{
        if(a.teams.length>1){
        return ((value.name === a.teams[0].name)|| (value.name === a.teams[1].name))
        }
        if(a.teams.length===1){
            return ((value.name === a.teams[0].name))
         }
        if(a.teams.length==0){
            return ((value.plays === a.sport.name))
        }
    }) 

      console.log(favarticle)
      
      setFavouriteArticles(favarticle)
  }


 

  return (
    <>
      <div>
          <Listbox value={selectedSport}   onChange={(e)=>filter(e)}>
            <ListboxButton className="w-full h-12 border rounded-md py-2 px-3 my-2 ml-3 text-black-700 text-base text-left font-semibold ">{selectedSport.name}</ListboxButton>
            <ListboxOptions anchor="bottom" className="absolute mt-1 max-h-60 rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {sports.map((sport:any) => (
                <ListboxOption key={sport.id} value={sport} className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active
                      ? "bg-blue-100 text-blue-900"
                      : "text-gray-900"
                  }`
                }>
                  {sport.name}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Listbox>
      <br/>
          <Listbox value={selectedTeam}   onChange={(e)=>filterTeam(e)}>
            <ListboxButton className="w-full h-12 border rounded-md my-2 mb-2 ml-3 py-2 px-3  text-black-700 text-base text-left font-semibold ">{selectedTeam.name}</ListboxButton>
            <ListboxOptions anchor="bottom" className="absolute mt-1 max-h-60 rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {favouriteTeams.map((team:any) => (
                <ListboxOption key={team.id} value={team} className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active
                      ? "bg-blue-100 text-blue-900"
                      : "text-gray-900"
                  }`
                }>
                  {team.name}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Listbox>
      </div>

      <div className="mt-9">
        {favouriteArticles.map((article: any) => (
          <div key={article.id} className=" w-[300px] block bg-white border border-gray-200 roundedbackgroundImage:-lg shadow dark:bg-gray-800 dark:border-gray-700 m-3">
            <div className="p-5">
              <p className="m-1">{article.sport.name}</p>
              <p className="m-1">{article.title}</p>
              <div className="flex flex-row justify-between pr-5 mt-2">
                <p>{article.date.substring(0, 10)}</p>
                <GetArticle{...{id:article.id}}/>
              </div>
            </div>
          </div>
        ))}
      </div>  
    </>
  );
}