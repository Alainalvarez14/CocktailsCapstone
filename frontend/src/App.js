import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
// import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormModal";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import CreateCocktailForm from "./components/CreateCocktailForm/CreateCocktailForm";
import SingleCocktail from "./components/SingleCocktail/SingleCocktail";
import MyCreatedCocktailList from "./components/MyCreatedCocktailList/MyCreatedCocktailList";
import SpecificCocktail from "./components/SpecificCocktail/SpecificCocktail";
import CollectionsContainer from "./components/Collections/CollectionsContainer";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          {/* <Route path="/login">
            <LoginFormPage />
          </Route> */}
          {/* <Route path="/signup">
            <SignupFormPage />
          </Route> */}
          <Route path="/drink/:drinkId">
            <SpecificCocktail />
          </Route>
          <Route path="/">
            <CreateCocktailForm />
            <MyCreatedCocktailList />
            <SingleCocktail />
            <CollectionsContainer />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
