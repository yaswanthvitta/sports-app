import React, { Suspense } from "react";
const ArticleList = React.lazy(() => import("./ArticleList"));

const Article = () => {
  return (
    <>
        <Suspense fallback={<div className="suspense-loading">Loading...</div>}>
          <ArticleList />
        </Suspense>

    </>
  );
};


export default Article;