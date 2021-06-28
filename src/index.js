import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Main from "./components/Main";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AddUserName from "./components/AddUserName";
import Login from "./components/Login";
import UserProfile from "./components/UserProfile";
import FeedbackForm from "./components/FeedbackForm";

ReactDOM.render(
 
    <Router>
            <Switch>
                <Route path='/feedback/:userName'>
                    <FeedbackForm />
                </Route>
                <Route path='/profile/:userName'>
                    <UserProfile />
                </Route>
        <Route path="/add-user-name">
          <AddUserName />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <Main />
        </Route>
      </Switch>
    </Router>
,
  document.getElementById("root")
);
