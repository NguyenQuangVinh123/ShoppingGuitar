import React from 'react';
import UserLayout from '../../hoc/user';
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