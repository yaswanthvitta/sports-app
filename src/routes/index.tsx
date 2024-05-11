import React from "react";
import { createBrowserRouter } from "react-router-dom";
import AccountLayout from "../pages/layout/account";
import Logout from "../pages/logout";
import MatchContainer from "../pages/livematches/LiveMatchContainer";
import LiveMatches from "../pages/livematches";


const Signin = React.lazy(() => import("../pages/signin"));
const Signup = React.lazy(() => import("../pages/signup"));



const router = createBrowserRouter([
  {
    path: "/signin", 
    element: <Signin />
  },
  {
    path: "/signup", 
    element: <Signup />
  },
  { 
    path: "/logout", 
    element: <Logout /> 
  },
  {
    path: "/",
    element: (
        <AccountLayout/>
    ),
     children:[
      {
        path: "matches",
        element:( 
        <>
        <MatchContainer/>
        <LiveMatches/>
        </> )
      }
    ],
  }
]);

export default router;