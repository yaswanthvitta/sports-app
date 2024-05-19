import React, { Suspense } from "react";
import Favourites from "../favourites";
const ArticleList = React.lazy(() => import("./ArticleList"));

const Article = () => {
  return (
    <>
        <Suspense fallback={<div className="suspense-loading">Loading...</div>}>
          <div className="flex flex-row">
          <ArticleList />
          <Favourites/>
          </div>
        </Suspense>

    </>
  );
};


export default Article;