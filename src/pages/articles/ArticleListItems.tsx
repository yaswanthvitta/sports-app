/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
//import React from "react";
import { useArticleState } from "../../context/articles/context";
import { GetArticle } from "./Content";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { API_ENDPOINT } from "../../config/constants";
import { useSportState } from "../../context/sports/context";
import { useTeamState } from "../../context/teams/context";




export default function ArticleItems(this: any) {

  const authenticated = !!localStorage.getItem("authToken");
  const token = localStorage.getItem("authToken") ?? "";
  const[news,setnews]=useState([])

  const categories:any = [];



  const people = [
    { id: 1, name: 'Durward Reynolds' },
    { id: 2, name: 'Kenton Towne' },
    { id: 3, name: 'Therese Wunsch' },
    { id: 4, name: 'Benedict Kessler' },
    { id: 5, name: 'Katelyn Rohan' },
  ]
  
  const state: any = useArticleState();

  const [selectedPerson, setSelectedPerson] = useState<{id: number;name:string}>(people[0]);

 
  let { articles } = state;
  const {isLoading, isError, errorMessage} = state;

  const sportslist: any = useSportState();
  const { sports} = sportslist;
  const {isLoadingsport, isErrorsport, errorMessagesport} = sportslist;

  const teamslist: any = useTeamState();
  const { teams} = teamslist;
  const {isLoadingteam, isErrorteam, errorMessageteam} = teamslist;
  
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
    yourArticles(data);
    return data;
   
  } catch (error) {
    console.error('preferences get failed:', error);
  }
}














  function load (value:any){
    setSelectedPerson(value)
    if (value.name==='Durward Reynolds'){
    articles=articles.sort((a:any,b:any)=>a.date.localeCompare(b.date))
    }
    if (value.name==='Kenton Towne'){
      articles=articles.sort((a:any,b:any)=>a.title.localeCompare(b.title))
      }
  }
  

 

  if (articles.length === 0 && isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }

  if ((teams.length === 0 && isLoadingteam)||(sports.length===0 && isLoadingsport)||(articles.length === 0 && isLoading)) {
    return <span>Loading...</span>;
  }
 

  if(isErrorsport){
    return <span>{errorMessagesport}</span>;
  }

  if (isErrorteam) {
    return <span>{errorMessageteam}</span>;
  }


if(authenticated && (news.length===0||news.length===sports.length)){
  fetchPreferences()
}

function yourArticles(data:any){
  const x:any={};
  x["name"]="your news"
  x["posts"]=[]
  articles.map((article:any)=>{
    if (Object.values(data.preferences).includes(article.sport.name)){
      x["posts"].push(article)
    }
    else if((article.teams.length==1)&&(Object.values(data.preferences).includes(article.teams[0].name))){
      x["posts"].push(article)
    }
    else if((article.teams.length==2)&&((Object.values(data.preferences).includes(article.teams[1].name))||(Object.values(data.preferences).includes(article.teams[1].name)))){
      x["posts"].push(article)
    }
  })
  categories.push(x)
  setnews(categories)
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


 
  

  return (
    <>
     
        <Listbox value={selectedPerson}   onChange={(e)=>load(e)}>
          <ListboxButton className="w-[300px] h-12 border rounded-md py-2 px-3 my-2 ml-3 text-black-700 text-base text-left">{selectedPerson.name}</ListboxButton>
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
                    <TabList className="flex gap-5">
                      {news.map(({ name }) => (
                        <Tab
                          key={name}
                          className="w-[900px] rounded-full py-1 px-3 text-sm/6 font-semibold text-black focus:outline-none data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-black"
                        >
                          {name}
                        </Tab>
                      ))}
                    </TabList>
                    <TabPanels className="mt-1">
                      {news.map(({ name, posts }) => (
                        <TabPanel key={name} className="rounded-xl bg-white/5 p-3">
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

