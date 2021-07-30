import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import Splash from './components/Splash/Splash'
import BusinessPage from "./components/BusinessPage/BusinessPage";
import EditReview from './components/BusinessPage/EditReview'
import AddReview from './components/BusinessPage/AddReview'
import SearchResults from './components/Splash/SearchResults'
import Footer from './components/Footer';
import { authenticate } from "./store/session";
import './index.css'

import EditBusiness from "./components/BusinessPage/EditBusiness";
import AddBusiness from "./components/BusinessPage/AddBusiness";
function App() {
  // const [authenticated, setAuthenticated] = useState(false);
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  const myStyle = {

    height: "100%",
    width: "100%",
    display: "block"
  };

  return (
    <BrowserRouter>
      <NavBar />
      <div className='main__container' style={myStyle}>
        <Switch>
          <Route path="/login" exact={true}>
            <LoginForm />
          </Route>
          <Route path="/sign-up" exact={true}>
            <SignUpForm />
          </Route>
          <Route path='/business/:businessId' exact={true}>
            <BusinessPage />
          </Route>
          <Route path='/search/:searchTerm'>
            <SearchResults />
          </Route>
          <ProtectedRoute path='/business/:businessId/:userId/new-review' exact={true}>
            <AddReview />
          </ProtectedRoute>
          <ProtectedRoute path='/business/:businessId/reviews/:userId/edit' exact={true}>
            <EditReview />
          </ProtectedRoute>
          <ProtectedRoute path='/business/:businessId/:userId/edit-business' exact={true}>
            <EditBusiness />
          </ProtectedRoute>
          <ProtectedRoute path='/new-business' exact={true}>
            <AddBusiness />
          </ProtectedRoute>
          <ProtectedRoute path="/users" exact={true}>
            <UsersList />
          </ProtectedRoute>
          <ProtectedRoute path="/users/:userId" exact={true}>
            <User />
          </ProtectedRoute>
          <Route path="/" exact={true} >
            <Splash />
          </Route>
        </Switch>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
