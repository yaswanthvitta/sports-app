import React from "react";
import LiveMatchItems from "./LiveMatchItems";

const LiveMatchList: React.FC = () => {
  return (
    <div className="grid gap-4 grid-cols-4 mt-5">
      <LiveMatchItems />
    </div>
  );
};

export default LiveMatchList;