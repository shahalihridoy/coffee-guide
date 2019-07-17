import React from "react";
import "../styles/app.scss";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import BrandList from "./views/BrandList";
import BrewMethodList from "./views/BrewMethodList";
import MethodDetails from "./views/MethodDetails";
import { ThemeProvider } from "@material-ui/styles";
import materialTheme from "./MaterialTheme";

const App = () => {
  return (
    <div className="app-holder position-relative x-center">
      <ThemeProvider theme={materialTheme}>
        <Router>
          <Switch>
            <Route path="/method-details/:id" component={MethodDetails} />
            <Route path="/brands" component={BrandList} />
            <Route path="/methods/:id" component={BrewMethodList} />
            <Route path="/" render={props => <Redirect to="/brands" />} />
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
};

export default App;
