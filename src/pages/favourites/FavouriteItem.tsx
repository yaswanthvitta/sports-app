/* eslint-disable @typescript-eslint/no-explicit-any */
// import React from "react";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { useSportState } from "../../context/sports/context";
import { useTeamState } from "../../context/teams/context";
import { useState } from "react";
import { useArticleState } from "../../context/articles/context";
import { GetArticle } from "../articles/Content";
import { usePreferencesState } from "../../context/preferences/context";


export default function FavouriteItems() {
  const authenticated = !!localStorage.getItem("authToken");
  
  const sportslist: any = useSportState();
  let favteam :any ,noTeam:any  , favarticle;

  const { sports} = sportslist;
  const {isLoadingsport, isErrorsport, errorMessagesport} = sportslist;

  const teamslist: any = useTeamState();
  const { teams} = teamslist;
  const {isLoadingteam, isErrorteam, errorMessageteam} = teamslist;

  const [selectedPreferences, setSelectedPreferences] = useState<any>([]);
   
  const state: any = useArticleState();  
  const { articles } = state;
  const {isLoading, isError, errorMessage} = state;

  const preference: any = usePreferencesState();
  const { preferences} = preference;
  const {isLoadingpref, isErrorpref, errorMessagepref} = preference;

  const [favouriteSports , setFavouriteSports] = useState<any>([]);

  const [selectedSport, setSelectedSport] = useState<any>();
  console.log(selectedSport)
  console.log("2")

  const [selectedTeam, setSelectedTeam] = useState<any>();
  console.log(selectedTeam)
  console.log("1p")

  


  const [favouriteTeams , setFavouriteTeams] = useState([]);

  const [favouriteArticles , setFavouriteArticles] = useState([]);



  if ((preferences.length === 0 && isLoadingpref)||(teams.length === 0 && isLoadingteam)||(sports.length===0 && isLoadingsport)||(articles.length === 0 && isLoading)) {
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

  if (isErrorpref) {
    return <span>{errorMessagepref}</span>;
  }

 if(!authenticated && (favouriteSports.length!==sports.length)){
  setFavouriteSports(sports)
 }

  if(authenticated && Object.values(preferences).length===0){
      return <p className="mt-9 font-semibold">No Favourites according to your preferences</p>
  }

  if((selectedPreferences!==preferences) && authenticated){
    const psports = sports.filter((t:any) => {
      return Object.values(preferences).includes(t.name);
  })
  teams.map((t:any)=>{
    if(Object.values(preferences).includes(t.name) && !Object.values(preferences).includes(t.plays))
      sports.map((s:any)=>{
       if(s.name===t.plays){
        psports.push(s)
       }
    })
  })
  
  if(Object.values(psports).length===0){
    return <span>Select any sport as preferences to view Favourites according to your preferences</span>
  }
    
    setFavouriteSports(psports)
    setSelectedSport({...psports[0]})

    

    favteam = teams.filter((t:any) => {
      return t.plays === psports[0].name && Object.values(preferences).includes(t.name);
  })
    if(Object.values(favteam).length===0){
      
      noTeam =teams.filter((t:any) => {
        return t.plays === psports[0].name;
      });
        setFavouriteTeams(noTeam)
        setSelectedTeam(noTeam[0])

        favarticle = articles.filter((a:any)=>{
          if(a.teams.length>1){
          return ((noTeam[0].name === a.teams[0].name)|| (noTeam[0].name === a.teams[1].name))
          }
          if(a.teams.length===1){
              return ((noTeam[0].name === a.teams[0].name))
           }
          if(a.teams.length==0){
              return ((noTeam[0].plays === a.sport.name))
          }
      }) 

      }
      else{
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

      }

    
    setFavouriteArticles(favarticle)
    setSelectedPreferences(preferences)
    
  }

  console.log("hi if cond" + selectedSport)

  if( selectedSport===undefined && sports.length!==0 && !authenticated){
    setSelectedSport(sports[0])
    return <span>Loading...</span>;
  }
  if( selectedTeam===undefined && teams.length!==0 ){

    setSelectedTeam(teams[0])
    if(authenticated){
    setSelectedTeam(favouriteTeams[0])
    }
    console.log(teams[0])
    return <span>Loading...</span>;
  }

  if( favouriteTeams.length===0){
    favteam = teams.filter((t:any) => {
        return t.plays === sports[0].name && Object.values(preferences).includes(t.name);
    })

    if(Object.values(favteam).length===0){
      noTeam =teams.filter((t:any) => {
        return t.plays === sports[0].name;
      });
      setFavouriteTeams(noTeam)
        setSelectedTeam(noTeam[0])
        


        favarticle = articles.filter((a:any)=>{
          if(a.teams.length>1){
          return ((noTeam[0].name === a.teams[0].name)|| (noTeam[0].name === a.teams[1].name))
          }
          if(a.teams.length===1){
              return ((noTeam[0].name === a.teams[0].name))
           }
          if(a.teams.length==0){
              return ((noTeam[0].plays === a.sport.name))
          }
      }) 

      }
      else{
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

      }

      setFavouriteArticles(favarticle)
}

  function filter(value:any){

    setSelectedSport(value)
    console.log(selectedSport)
      favteam = teams.filter((t:any) => {
        return t.plays === value.name && Object.values(preferences).includes(t.name);
      });

      if(Object.values(favteam).length===0){
        noTeam =teams.filter((t:any) => {
          return t.plays === value.name;
        });
        setFavouriteTeams(noTeam)
        setSelectedTeam(noTeam[0])
        


        favarticle = articles.filter((a:any)=>{
          if(a.teams.length>1){
          return ((noTeam[0].name === a.teams[0].name)|| (noTeam[0].name === a.teams[1].name))
          }
          if(a.teams.length===1){
              return ((noTeam[0].name === a.teams[0].name))
           }
          if(a.teams.length==0){
              return ((noTeam[0].plays === a.sport.name))
          }
      }) 

      }
      else{
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

      }

      
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
            <ListboxButton className="w-full h-12 border rounded-md py-2 px-3 my-2 ml-3 text-black-700 text-base text-left font-semibold ">{selectedSport!.name}</ListboxButton>
            <ListboxOptions anchor="bottom" className="absolute mt-1 max-h-60 rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {favouriteSports.map((sport:any) => (
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
            <ListboxButton className="w-full h-12 border rounded-md my-2 mb-2 ml-3 py-2 px-3  text-black-700 text-base text-left font-semibold ">{selectedTeam!.name}</ListboxButton>
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

      <div className="mt-9 ">
        {favouriteArticles.map((article: any) => (
          <div key={article.id} className="relative w-[350px] h-[200px] block bg-[#FBD3B7] border border-gray-200 roundedbackgroundImage:-lg shadow dark:bg-gray-800 dark:border-gray-700 m-3">
            <div className="p-5 ">
              <div>
              <p className="m-1 font-semibold">{article.sport.name}</p>
              <p className="m-1 font-semibold text-lg">{article.title} !!!</p>
              </div>
              <div className=" absolute bottom-0 right-1  pr-5 mb-4">
                <GetArticle{...{id:article.id}}/>
              </div>
            </div>
          </div>
        ))}
      </div>  
    </>
  );
}