import React, { lazy, Suspense } from "react";
import { render } from "react-dom";
import { Link, Router } from "@reach/router";
import { Provider } from "react-redux";
import SearchParams from "./SearchParams";
import store from "./store";
// import ThemeContext from "./ThemeContext"; not using context, but redux now

const Details = lazy(() => import("./Details"));

const App = () => {
  // const themeHook = useState("darkblue");

  return (
    // <React.StrictMode>
    //   <ThemeContext.Provider value={themeHook}>
    //     <div>
    //       <header>
    //         <Link to="/">Adopt Me!</Link>
    //       </header>
    //       <Suspense fallback={<h1>loading route...</h1>}>
    //         <Router>
    //           <SearchParams path="/" />
    //           <Details path="/details/:id" />
    //         </Router>
    //       </Suspense>
    //     </div>
    //   </ThemeContext.Provider>
    // </React.StrictMode>
    <Provider store={store}>
      <div>
        <header>
          <Link to="/">Adopt Me!</Link>
        </header>
        <Suspense fallback={<h1>loading route...</h1>}>
          <Router>
            <SearchParams path="/" />
            <Details path="/details/:id" />
          </Router>
        </Suspense>
      </div>
    </Provider>
  );
};

render(<App />, document.getElementById("root"));
