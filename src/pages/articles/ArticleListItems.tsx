/* eslint-disable @typescript-eslint/no-explicit-any */
import { SetStateAction, useEffect, useState } from "react";
//import React from "react";
import { useArticleState } from "../../context/articles/context";
import { GetArticle } from "./Content";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'




export default function ArticleItems(this: any) {

  const authenticated = !!localStorage.getItem("authToken");

  const categories = [
    {
      name: 'Recent',
      posts: [
        {
          id: 1,
          title: 'Does drinking coffee make you smarter?',
          date: '5h ago',
          commentCount: 5,
          shareCount: 2,
        },
        {
          id: 2,
          title: "So you've bought coffee... now what?",
          date: '2h ago',
          commentCount: 3,
          shareCount: 2,
        },
      ],
    },
    {
      name: 'Popular',
      posts: [
        {
          id: 1,
          title: 'Is tech making coffee better or worse?',
          date: 'Jan 7',
          commentCount: 29,
          shareCount: 16,
        },
        {
          id: 2,
          title: 'The most innovative things happening in coffee',
          date: 'Mar 19',
          commentCount: 24,
          shareCount: 12,
        },
      ],
    },
    {
      name: 'Trending',
      posts: [
        {
          id: 1,
          title: 'Ask Me Anything: 10 answers to your questions about coffee',
          date: '2d ago',
          commentCount: 9,
          shareCount: 5,
        },
        {
          id: 2,
          title: "The worst advice we've ever heard about coffee",
          date: '4d ago',
          commentCount: 1,
          shareCount: 2,
        },
      ],
    },
  ]

  const people = [
    { id: 1, name: 'Durward Reynolds' },
    { id: 2, name: 'Kenton Towne' },
    { id: 3, name: 'Therese Wunsch' },
    { id: 4, name: 'Benedict Kessler' },
    { id: 5, name: 'Katelyn Rohan' },
  ]
  
  const state: any = useArticleState();

  const [selectedPerson, setSelectedPerson] = useState<{
    target: any;name:string
}>(people[0]);

 
  let { articles } = state;
  const {isLoading, isError, errorMessage} = state;

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

  

  

 
  

  return (
    <>
      {/* { authenticated && 
              <div className="flex w-full justify-center pt-24 px-4">
                <div className="w-full max-w-md">
                  <TabGroup>
                    <TabList className="flex gap-4">
                      {categories.map(({ name }) => (
                        <Tab
                          key={name}
                          className="rounded-full py-1 px-3 text-sm/6 font-semibold text-black focus:outline-none data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-black"
                        >
                          {name}
                        </Tab>
                      ))}
                    </TabList>
                    <TabPanels className="mt-3">
                      {categories.map(({ name, posts }) => (
                        <TabPanel key={name} className="rounded-xl bg-white/5 p-3">
                          <ul>
                            {posts.map((post) => (
                              <li key={post.id} className="relative rounded-md p-3 text-sm/6 transition hover:bg-white/5">
                                <a href="#" className="font-semibold text-black">
                                  <span className="absolute inset-0" />
                                  {post.title}
                                </a>
                                <ul className="flex gap-2 text-black/50" aria-hidden="true">
                                  <li>{post.date}</li>
                                  <li aria-hidden="true">&middot;</li>
                                  <li>{post.commentCount} comments</li>
                                  <li aria-hidden="true">&middot;</li>
                                  <li>{post.shareCount} shares</li>
                                </ul>
                              </li>
                            ))}
                          </ul>
                        </TabPanel>
                      ))}
                    </TabPanels>
                  </TabGroup>
                </div>
              </div>
      } */}
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

      <div className="">
        {articles.map((article: any) => (
          <div key={article.id} className="flex flex-row w-[900px] block bg-white border border-gray-200 roundedbackgroundImage:-lg shadow dark:bg-gray-800 dark:border-gray-700 m-3">
            <div className="mr-3">
              <img src={article.thumbnail} style={{ objectFit: "cover", objectPosition: "center" }} className="w-full h-[200px]" alt="Thumbnail" />
            </div>
            <div className="p-5">
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
      </div>
    </>
  );
}

