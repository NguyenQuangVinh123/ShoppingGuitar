import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'mongoose';

const Header = (props) => { 
    const state = {
        page : [
            {
                name : 'Home',
                linkTo : '/',
                public : true,
            },
            {
                name : 'Guitar',
                linkTo : '/shop',
                public : true,
            },
        ],
        user : [
            {
                name : 'My cart',
                linkTo : '/user/cart',
                public : false,
            },
            {
                name : 'My Account',
                linkTo : '/user/dashboard',
                public : false,
            },
            {
                name : 'Log In',
                linkTo : '/login',
                public : true,
            },
            {
                name : 'Log Out',
                linkTo : '/user/logout',
                public : false,
            },
        ]
    } 
    const showLinks = (type) => {
        let list = [];
        if(props.user.userData){
            type.forEach((item) => {
                if(!props.user.userData.isAuth){
                    if(item.public === true){
                        list.push(item)
                    }
                }else{
                    if(item.name !== 'Log In'){
                        list.push(item)
                    }
                }
            });
        }
        return list.map((item,index) => {
            if(item.name !== 'My cart'){
                return defaultLink(item,index)
            }else{
                return cartLink(item,index)

            }
        })
    };
    const logOutHanderler = async () =>{
        
    }
    const defaultLink = (item,index) => (
        item.name === 'Log Out' ? 
        <div className='log_out_link' key={index} onClick={()=>logOutHanderler()}>

        </div>
        :
        <Link to={item.linkTo} key={index}>
            {item.name}
        </Link>
    );
    const cartLink = (item,index) =>{
        const user = props.user.userData;
        return (
            <div className='cart_link' key={index}>
                <span>{user.cart ? user.cart.length : 0}</span>
                <Link to={item.linkTo}>
                    {item.name}
                </Link>
            </div>
        )
    }
    const [links,setLink]  = useState(state);
    return (
        <header className='bck_b_light'>
            <div className="container">
                <div className="left">
                    <div className="logo">
                        GUITAR
                    </div>
                </div>
                <div className="right">
                    <div className="top">
                        {showLinks(links.user)}
                    </div>
                    <div className="bottom"> 
                      
                        {showLinks(links.page)}
                    </div>
                </div>
            </div>
        </header>
    )
}
function mapStateToProps(state){
    return {
        user : state.user
    }
}
export default connect()(Header);