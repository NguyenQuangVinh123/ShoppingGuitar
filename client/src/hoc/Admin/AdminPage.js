import React from 'react';
import AddProduct from "../../components/AdminComponents/Admin/add_product";
import ManageCategories from "../../components/AdminComponents/Admin/manage_categories";
import { Switch, Route } from "react-router-dom";
// import Auth from '../../hoc/auth';
import Layout from "../Client/layout";
import SignInAdmin from "../../components/AdminComponents/Login/SignInAdmin"
const AdminPage = () => {
    return (
       <>
            <Switch>
                <Route exact path='/adminlogin'  render={(props) => <SignInAdmin {...props}/>} ></Route>
                {/* <Route path='/webadmin/manage_categories' exact component={ ManageCategories } /> */}
            </Switch>
        </>
    )
}

export default AdminPage;