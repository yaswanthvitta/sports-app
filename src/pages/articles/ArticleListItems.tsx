/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
//import React from "react";
import { useArticleState } from "../../context/articles/context";
import { GetArticle } from "./Content";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { useSportState } from "../../context/sports/context";
import { useTeamState } from "../../context/teams/context";
import { usePreferencesState } from "../../context/preferences/context";




export default function ArticleItems(this: any) {

  const authenticated = !!localStorage.getItem("authToken");

  const[news,setnews]=useState([])

  const categories:any = [];



  const people = [
    { id: 1, name: 'Date' },
    { id: 2, name: 'Title' },
    { id: 3, name: 'Sport' },
  ]
  
  const state: any = useArticleState();

  const [selectedPerson, setSelectedPerson] = useState<{id: number;name:string}>(people[0]);

  const [selectedPreferences, setSelectedPreferences] = useState<any>([]);

 
  const { articles } = state;
  const {isLoading, isError, errorMessage} = state;

  const sportslist: any = useSportState();
  const { sports} = sportslist;
  const {isLoadingsport, isErrorsport, errorMessagesport} = sportslist;

  const teamslist: any = useTeamState();
  const { teams} = teamslist;
  const {isLoadingteam, isErrorteam, errorMessageteam} = teamslist;

  const preference: any = usePreferencesState();
  const { preferences} = preference;
  const {isLoadingpref, isErrorpref, errorMessagepref} = preference;
  console.log(preferences)
  console.log('preference')

  
  



  function load (value:any){
    setSelectedPerson(value)
    if (value.name==='Date'){
      news.map(({name,posts})=>{
        const x:any={};
        x["name"]=name
        x["posts"]=Object.values(posts).sort((a:any,b:any)=>a.date.localeCompare(b.date))
        categories.push(x)
      })
      setnews(categories)
    }
    if (value.name==='Title'){
      news.map(({name,posts})=>{
        const x:any={};
        x["name"]=name
        x["posts"]=Object.values(posts).sort((a:any,b:any)=>a.title.localeCompare(b.title))
        categories.push(x)
      })
      setnews(categories)
      }
      if (value.name==='Sport'){
        news.map(({name,posts})=>{
          const x:any={};
          x["name"]=name
          x["posts"]=Object.values(posts).sort((a:any,b:any)=>a.sport.name.localeCompare(b.sport.name))
          categories.push(x)
        })
        setnews(categories)
        }
  }
  

 

  if (articles.length === 0 && isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }

  if ((preferences.length === 0 && isLoadingpref)||(teams.length === 0 && isLoadingteam)||(sports.length===0 && isLoadingsport)||(articles.length === 0 && isLoading)) {
    return <span>Loading...</span>;
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

  if(sports.length>0 && (news.length===1||news.length===0)){
    console.log(sports)
    sports.map((sport:any)=>{
      const x:any={};
      x["name"]=sport.name
      x["posts"]=[]
      articles.map((article:any)=>{
        if (article.sport.name===sport.name){
          x["posts"].push(article)
        }
      })
      categories.push(x)
      
    })
    categories.push(...news)
    setnews(categories)
  }


if(authenticated && (selectedPreferences!==preferences)){
  yourArticles(Object.values(preferences))
  setSelectedPreferences(preferences)
}

function yourArticles(data:any){
  const x:any={};
  x["name"]="your news"
  x["posts"]=[]
  articles.map((article:any)=>{
    if (data.includes(article.sport.name)){
      x["posts"].push(article)
    }
    else if((article.teams.length==1)&&(data.includes(article.teams[0].name))){
      x["posts"].push(article)
    }
    else if((article.teams.length==2)&&((data.includes(article.teams[0].name))||(data.includes(article.teams[1].name)))){
      x["posts"].push(article)
    }
  })
  
  categories.push(x)
  setnews(categories)
}

  




 
  

  return (
    <>
     
        <Listbox value={selectedPerson}   onChange={(e)=>load(e)}>
          <ListboxButton className="w-[300px] h-12 border rounded-md py-2 px-3 my-2 ml-3 text-black-700 text-base text-left font-semibold">{"Sort By :  "+selectedPerson.name}</ListboxButton>
          <ListboxOptions anchor="bottom" className="absolute mt-1 max-h-60 rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {people.map((person) => (
              <ListboxOption key={person.id} value={person} className={({ active }) =>
                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                  active
                    ? "bg-blue-100 text-blue-900"
                    : "text-gray-900"
                }`
              }>
                {person.name}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Listbox>

      <div className="w-[950px]"> 
              <div className="flex w-[900px] justify-start pt-3 px-1">
                <div className="w-[900px] max-w-md">
                  <TabGroup>
                    <TabList className="flex gap-5 mb-2">
                      {news.map(({ name }) => (
                        <Tab
                          key={name}
                          className="w-[900px] rounded-lg py-1 px-3 text-sm/6 font-semibold  focus:outline-none data-[selected]:bg-black/10 data-[hover]:bg-black/5 data-[selected]:data-[hover]:bg-black/10 data-[focus]:outline-1 data-[focus]:outline-none">
                          {name}
                        </Tab>
                      ))}
                    </TabList>
                    <TabPanels className="mt-1">
                      {news.map(({ name, posts }) => (
                        <TabPanel key={name} className="rounded-xl w-[950px] pt-3">
                            {Object.values(posts).map((article:any) => (
                              <div key={article.id} className="flex flex-row w-[900px] block bg-white border border-gray-200 roundedbackgroundImage:-lg shadow dark:bg-gray-800 dark:border-gray-700 m-3">
                              <div className="mr-3 ">
                                <img src={article.thumbnail} style={{ objectFit: "cover", objectPosition: "center" }} className="w-[170px] h-[200px]" alt="Thumbnail" />
                              </div>
                              <div className="p-5 flex-1">
                                <p className="m-1">{article.sport.name}</p>
                                <p className="m-1">{article.title}</p>
                                <p className="m-1">{article.summary}.....</p>
                                <div className="flex flex-row justify-between pr-5 mt-2">
                                  <p>{article.date.substring(0, 10)}</p>
                                  <GetArticle{...{id:article.id}}/>
                                </div>
                              </div>
                            </div>
                            ))}
                        </TabPanel>
                      ))}
                    </TabPanels>
                  </TabGroup>
                </div>
              </div>
      </div>
      

      {/* <div className="">
        {articles.map((article: any) => (
          <div key={article.id} className="flex flex-row w-[900px] block bg-white border border-gray-200 roundedbackgroundImage:-lg shadow dark:bg-gray-800 dark:border-gray-700 m-3">
            <div className="mr-3 ">
              <img src={article.thumbnail} style={{ objectFit: "cover", objectPosition: "center" }} className="w-[170px] h-[200px]" alt="Thumbnail" />
            </div>
            <div className="p-5 flex-1">
              <p className="m-1">{article.sport.name}</p>
              <p className="m-1">{article.title}</p>
              <p className="m-1">{article.summary}.....</p>
              <div className="flex flex-row justify-between pr-5 mt-2">
                <p>{article.date.substring(0, 10)}</p>
                <GetArticle{...{id:article.id}}/>
              </div>
            </div>
          </div>
        ))}
      </div> */}
    </>
  );
}

