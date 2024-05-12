/* eslint-disable @typescript-eslint/no-explicit-any */
// import React from "react";
import { useArticleState } from "../../context/articles/context";
import { GetArticle } from "./Content";





export default function ArticleItems() {
  
  const state: any = useArticleState();
  
  
 

  const { articles, isLoading, isError, errorMessage } = state;

  if (articles.length === 0 && isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }
  
  

  return (
    <div className="">
    {articles.map((article:any) => (
          <>
          <div className=" flex flex-row w-[900px] block  bg-white border border-gray-200 roundedbackgroundImage:-lg shadow  dark:bg-gray-800 dark:border-gray-700 m-3">
            <div className="mr-3">
                <img src={article.thumbnail} style={{ objectFit: "cover", objectPosition: "center" }} className="w-full h-[200px]" />
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
            </>   
        )) 
    }  
    </div>
  );
}