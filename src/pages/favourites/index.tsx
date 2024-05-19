import React, { Suspense } from "react";
const FavouriteList = React.lazy(() => import("./FavouriteList"));

const Favourites = () => {
  return (
    <>
        <Suspense fallback={<div className="suspense-loading">Loading...</div>}>
          <FavouriteList />
        </Suspense>

    </>
  );
};


export default Favourites;