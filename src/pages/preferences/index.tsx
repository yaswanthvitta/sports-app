import React, { Suspense } from "react";
const PreferenceItems = React.lazy(() => import("./UpdatePreferences"));

const Preferences = () => {
  return (
    <>
        <Suspense fallback={<div className="suspense-loading">Loading...</div>}>
          <PreferenceItems />
        </Suspense>

    </>
  );
};


export default Preferences;