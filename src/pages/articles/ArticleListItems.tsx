/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import React from "react";
import { useArticleState } from "../../context/articles/context";
import { GetArticle } from "./Content";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'




const ArticleItems : React.FC = () => {
  
  const people = [
    { id: 1, name: 'Durward Reynolds' },
    { id: 2, name: 'Kenton Towne' },
    { id: 3, name: 'Therese Wunsch' },
    { id: 4, name: 'Benedict Kessler' },
    { id: 5, name: 'Katelyn Rohan' },
  ]
  
  const state: any = useArticleState();
  const [selectedPerson, setSelectedPerson] = useState(people[0]);
  
 
  let { articles } = state;
  const {isLoading, isError, errorMessage} = state;

  function load(){
    articles=articles.sort((a:any,b:any)=>a.date.localeCompare(b.date))
  }

 

  if (articles.length === 0 && isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }

  




 
  

  return (
    <>
      <Listbox value={selectedPerson} onChange={setSelectedPerson}>
        <ListboxButton>{selectedPerson.name}</ListboxButton>
        <ListboxOptions anchor="bottom">
          {people.map((person) => (
            <ListboxOption key={person.id} value={person} className="data-[focus]:bg-blue-100">
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
                <p>{GetArticle(article.id)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ArticleItems;