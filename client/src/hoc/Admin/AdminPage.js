import React from 'react';
import AddProduct from "../../components/AdminComponents/Admin/add_product";
import ManageCategories from "../../components/AdminComponents/Admin/manage_categories";
import { Switch, Route, BrowserRouter, HashRouter } from "react-router-dom";
// import Auth from '../../hoc/auth';
import Layout from "../Client/layout";
import SignInAdmin from "../../components/AdminComponents/Login/SignInAdmin"
const AdminPage = () => {
    return (
    // <div>
    //     sss
    // </div>
    <div>
            <BrowserRouter basename="/webadmin">
                <Switch>
                    <Route exact path='/adminlogin' component={SignInAdmin} ></Route>
                    {/* <Route path='/webadmin/manage_categories' exact component={ ManageCategories } /> */}
                </Switch>
            </BrowserRouter>
           
    </div>
    )
}

export default AdminPage;