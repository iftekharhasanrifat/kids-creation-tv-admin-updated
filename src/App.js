import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AddPrograms from "./components/AddPrograms/AddPrograms";
import UpciomingPrograms from "./components/UpciomingPrograms/UpciomingPrograms";
import AddKidsNews from "./components/AddKidsNews/AddKidsNews";
import SignIn from "./components/SignIn/SignIn";
import ManagePrograms from "./components/ManagePrograms/ManagePrograms";
import UpdatePrograms from "./components/ManagePrograms/UpdatePrograms";
import ManageUpcomingPrograms from "./components/ManagePrograms/ManageUpcomingPrograms";
import ManageKidsNews from "./components/ManagePrograms/ManageKidsNews";
import UpdateUpcomingPrograms from "./components/ManagePrograms/UpdateUpcomingPrograms";
import UpdateKidsNews from "./components/ManagePrograms/UpdateKidsNews";
import { createContext, useState } from "react";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import NotFound from "./components/NotFound/NotFound";
import UploadBanner from "./components/UploadBanner/UploadBanner";
import ManagerBanners from "./components/ManagePrograms/ManagerBanners";

export const UserContext = createContext();
export const ErrorContext = createContext();
function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <ErrorContext.Provider value={[errorMessage, setErrorMessage]}>
        <Router>
          <Navbar></Navbar>
          <Switch>
            <PrivateRoute path="/addprogram">
              <AddPrograms></AddPrograms>
            </PrivateRoute>
            <PrivateRoute path="/addupcomingprograms">
              <UpciomingPrograms></UpciomingPrograms>
            </PrivateRoute>
            <PrivateRoute path="/addkidsnews">
              <AddKidsNews></AddKidsNews>
            </PrivateRoute>
            <PrivateRoute path="/uploadBanner">
              <UploadBanner></UploadBanner>
            </PrivateRoute>
            <Route path="/signin">
              <SignIn></SignIn>
            </Route>
            <PrivateRoute path="/manageprogram">
              <ManagePrograms></ManagePrograms>
            </PrivateRoute>
            <PrivateRoute path="/manageBanner">
              <ManagerBanners></ManagerBanners>
            </PrivateRoute>
            <PrivateRoute path="/updatePrograms/:id">
              <UpdatePrograms></UpdatePrograms>
            </PrivateRoute>
            <PrivateRoute path="/manageUpcomingProgram">
              <ManageUpcomingPrograms></ManageUpcomingPrograms>
            </PrivateRoute>
            <PrivateRoute path="/updateUpcomingPrograms/:id">
              <UpdateUpcomingPrograms></UpdateUpcomingPrograms>
            </PrivateRoute>
            <PrivateRoute path="/manageKidsNews">
              <ManageKidsNews></ManageKidsNews>
            </PrivateRoute>
            <PrivateRoute path="/updateKidsNews/:id">
              <UpdateKidsNews></UpdateKidsNews>
            </PrivateRoute>
            <PrivateRoute exact path="/">
              <AddPrograms></AddPrograms>
            </PrivateRoute>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </ErrorContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
