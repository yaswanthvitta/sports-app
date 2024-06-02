import React, { Suspense } from "react";
import ErrorBoundary from "../../components/ErrorBoundary";
const LiveMatchList = React.lazy(() => import("./LiveMatchesList"));

const LiveMatches = () => {
  return (
    <>
      <ErrorBoundary>
        <Suspense fallback={<div className="suspense-loading">Loading...</div>}>
          <LiveMatchList />
        </Suspense>
      </ErrorBoundary>

    </>
  );
};


export default LiveMatches;