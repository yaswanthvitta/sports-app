import React, { Suspense } from "react";
const LiveMatchList = React.lazy(() => import("./LiveMatchesList"));

const LiveMatches = () => {
  return (
    <>
        <Suspense fallback={<div className="suspense-loading">Loading...</div>}>
          <LiveMatchList />
        </Suspense>

    </>
  );
};


export default LiveMatches;