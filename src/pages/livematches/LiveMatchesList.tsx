import React from "react";
import LiveMatchItems from "./LiveMatchItems";
import Matchesandscores from "./Mtachesandscores";

const LiveMatchList: React.FC = () => {
  return (
    <div>
      <LiveMatchItems />
      <Matchesandscores/>
    </div>
  );
};

export default LiveMatchList;