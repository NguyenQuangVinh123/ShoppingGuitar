import React from 'react';
import UserLayout from '../../../hoc/user';
import ManageWoods from './manage_woods';
import ManageBrands from './manage_brands';

import {update,generateData,ifFormValid,populateOptionFileds,resetFields} from '../../utils/Form/FormAction'
import FormField from '../../utils/Form/FormField'
import {connect} from 'react-redux';

const ManageCategories = () => {
    return (
        <UserLayout>
             <ManageBrands />
             <ManageWoods />
        </UserLayout>
    );
};

export default ManageCategories;