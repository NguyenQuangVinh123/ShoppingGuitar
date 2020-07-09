import React from 'react';
import UserLayout from '../../../hoc/Client/user';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faFrown from '@fortawesome/fontawesome-free-solid/faFrown';
const Cart = () => {
    return (
       
            <UserLayout>
                <div>
                    cart
                </div>
            </UserLayout>
        
    );
};

export default Cart;