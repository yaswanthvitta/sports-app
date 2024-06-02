import React, { Suspense } from "react";
import ErrorBoundary from "../../components/ErrorBoundary";
const FavouriteList = React.lazy(() => import("./FavouriteList"));

const Favourites = () => {
  return (
    <>  
      <ErrorBoundary>
        <Suspense fallback={<div className="suspense-loading">Loading...</div>}>
          <FavouriteList />
        </Suspense>
      </ErrorBoundary>

    </>
  );
};


export default Favourites;