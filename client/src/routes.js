import React from "react";
import { Switch, Route } from "react-router-dom";
import Layout from './hoc/layout';
import RegisterLogin from "./components/Register_login/Register";
import Home from './components/Home/index';
const Routes = () => {
  return (
      <Layout>
        <Switch>
            <Route path='/' exact component= { Home } />
            <Route path='/register' exact component={ RegisterLogin} />
        </Switch>
      </Layout>
       
  );
};

export default Routes;
