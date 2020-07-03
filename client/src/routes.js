import React from "react";
import { Switch, Route } from "react-router-dom";
import Layout from './hoc/layout';
import RegisterLogin from "./components/Register_login/index";
import Home from './components/Home/index';
import Auth from './hoc/auth';
import Register from './components/Register_login/Register';
import UserDashboard from './components/User/UserDashboard';
import Shop from "./components/Shop";
import AddProduct from "./components/User/Admin/add_product";
import ManageCategories from "./components/User/Admin/manage_categories";
import ProductPage from "./components/Product/ProductPage";
import Cart from "./components/User/cart";
const Routes = () => {
  return (
      <Layout>
        <Switch>
            <Route path='/' exact component= { Auth(Home,null) } />
            <Route path='/shop' exact component= { Auth(Shop,null) } />
            <Route path='/login' exact component={ Auth(RegisterLogin,false)} />
            <Route path='/register' exact component={ Auth(Register,false)} />
            <Route path='/user/cart' exact component={ Auth(Cart,null)} />
            <Route path='/product_details/:id' exact component={ Auth(ProductPage,null)} />
            <Route path='/user/dashboard' exact component={ Auth(UserDashboard,true) } />
            <Route path='/admin/add_product' exact component={ Auth(AddProduct,true) } />
            <Route path='/admin/manage_categories' exact component={ Auth(ManageCategories,true) } />

        </Switch>
      </Layout>
       
  );
};

export default Routes;
