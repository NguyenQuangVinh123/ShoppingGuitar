import React from "react";
import { Switch, Route } from "react-router-dom";
import Layout from './hoc/layout';
import RegisterLogin from "./components/Register_login/index";
import Home from './components/Home/index';
import Auth from './hoc/auth';
import Register from './components/Register_login/Register';
import UserDashboard from './components/User/UserDashboard';
import Shop from "./components/Shop";

const Routes = () => {
  return (
      <Layout>
        <Switch>
            <Route path='/' exact component= { Auth(Home,null) } />
            <Route path='/shop' exact component= { Auth(Shop,null) } />
            <Route path='/login' exact component={ Auth(RegisterLogin,false)} />
            <Route path='/register' exact component={ Auth(Register,false)} />
            <Route path='/user/dashboard' exact component={ Auth(UserDashboard,true) } />
        </Switch>
      </Layout>
       
  );
};

export default Routes;
