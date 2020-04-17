import React from "react";
import { Switch, Route } from "react-router-dom";
import Layout from './hoc/layout';
import RegisterLogin from "./components/Register_login/index";
import Home from './components/Home/index';
import Register from './components/Register_login/Register'
const Routes = () => {
  return (
      <Layout>
        <Switch>
            <Route path='/' exact component= { Home } />
            <Route path='/login' exact component={ RegisterLogin} />
            <Route path='/register' exact component={ Register} />

        </Switch>
      </Layout>
       
  );
};

export default Routes;
