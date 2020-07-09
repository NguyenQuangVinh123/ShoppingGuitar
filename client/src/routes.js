import React from "react";
import { Switch, Route } from "react-router-dom";
import Layout from './hoc/Client/layout';
import Auth from './hoc/auth';

const RegisterLogin = React.lazy(() => import("./components/ClientComponents/Register_login/index")) ;
const Home =  React.lazy(() => import('./components/ClientComponents/Home/index')) ;
const Register =  React.lazy(() => import('./components/ClientComponents/Register_login/Register'));
const  UserDashboard = React.lazy(() => import('./components/ClientComponents/User/UserDashboard')) ;
const Shop = React.lazy(() => import("./components/ClientComponents/Shop")) ;
const ProductPage = React.lazy(() => import("./components/ClientComponents/Product/ProductPage")) ;
const Cart = React.lazy(() => import("./components/ClientComponents/User/cart")) ;
const loading = () => <div className="animated fadeIn pt-3 text-center"></div>;

const Routes = () => {
  return (
      <Layout>
        <React.Suspense fallback={loading()}>
          <Switch>
              <Route path='/' exact component= { Auth(Home,null) } />
              <Route path='/shop' exact component= { Auth(Shop,null) } />
              <Route path='/login' exact component={ Auth(RegisterLogin,false)} />
              <Route path='/register' exact component={ Auth(Register,false)} />
              <Route path='/user/cart' exact component={ Auth(Cart,null)} />
              <Route path='/product_details/:id' exact component={ Auth(ProductPage,null)} />
              <Route path='/user/dashboard' exact component={ Auth(UserDashboard,true) } />
          </Switch>
        </React.Suspense>
        
      </Layout>
       
  );
};

export default Routes;
