import React, { Suspense } from "react";
import Favourites from "../favourites";
import ErrorBoundary from "../../components/ErrorBoundary";
const ArticleList = React.lazy(() => import("./ArticleList"));

const Article = () => {
  return (
    <>
      <ErrorBoundary>
        <Suspense fallback={<div className="suspense-loading">Loading...</div>}>
          <div className="flex flex-row">
          <ArticleList />
          <Favourites/>
          </div>
        </Suspense>
      </ErrorBoundary>

    </>
  );
};


export default Article;