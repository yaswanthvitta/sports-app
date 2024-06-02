import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import AccountLayout from "../pages/layout/account";
import Logout from "../pages/logout";
import MatchContainer from "../pages/livematches/LiveMatchContainer";
import LiveMatches from "../pages/livematches";
import ArticleContainer from "../pages/articles/ArticleContainer";
import Article from "../pages/articles";
import SportContainer from "../pages/favourites/SportsContainer";
import TeamContainer from "../pages/favourites/TeamsContainer";
const Updatepass = React.lazy(() => import("../pages/password"));
import ProtectedRoute from "./ProtectedRoute";
import PreferenceContainer from "../pages/preferences/PreferenceContainer";


const Signin = React.lazy(() => import("../pages/signin"));
const Signup = React.lazy(() => import("../pages/signup"));



const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/matches" replace /> },
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
    element:(
    <ProtectedRoute>
     <Logout />
    </ProtectedRoute>
  ) 
  },
  { 
    path: "/updatepass", 
    element:( 
    <ProtectedRoute>
      <Updatepass />
    </ProtectedRoute> )
  },
  
  {
    path: "/",
    element: (
      <>
        <AccountLayout/>
        </>
    ),
    ErrorBoundary: () => <>Failed to load the page</>,
     children:[
      {
        path: "/matches",
        element:( 
        <>
        <MatchContainer/>
        <SportContainer/>
        <TeamContainer/>
        <PreferenceContainer/>
        <LiveMatches/>
        <ArticleContainer/>
        <Article/>
        </> ),
      },

    ],
  }
]);

export default router;