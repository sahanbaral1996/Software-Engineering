import * as React from "react";
import { Router as BrowserRouter, Switch } from "react-router-dom";

import { Route, Redirect, RouteComponentProps } from "react-router";

import history from "../utils/history";

import Wrapper from "./Chat/wrapper";
import ChatWrapper from "./Chat/ChatWrapper";
import VideoChat from "./VideoChat/VideoChat";
import Login from "./Login/Login";
import Calendar from "./Calendar/calendar";

// Top level application router.
const Router: React.FC = () => {
  return (
    <BrowserRouter history={history}>
      <Switch>
        <Route
          exact
          path="/"
          render={(routeProps: RouteComponentProps) => <Calendar />}
        />
        <Route
          exact
          path="/chat"
          render={(routeProps: RouteComponentProps) => <ChatWrapper />}
        />
        <Route
          exact
          path="/video"
          render={(routeProps: RouteComponentProps) => <VideoChat />}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
