import  { useContext } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes"
import { ThemeContext } from "./context/theme";
import {MatchesProvider} from "./context/livematches/context"
import { Suspense } from "react";
import { ArticleProvider } from "./context/articles/context";
import { SportProvider } from "./context/sports/context";
import { TeamProvider } from "./context/teams/context";
const App = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={`h-full w-full mx-auto py-2 ${theme === "dark" ? "dark" : ""}`}
    >
      <SportProvider> 
        <TeamProvider>  
          <ArticleProvider>
              <MatchesProvider>
                <Suspense fallback={<>Loading...</>}>
                  <RouterProvider router={router} />
                </Suspense>
              </MatchesProvider>
          </ArticleProvider>
        </TeamProvider>
      </SportProvider>
    </div>
  );
};
export default App;