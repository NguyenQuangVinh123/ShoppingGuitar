import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {auth } from '../actions/user_actions';
import CircularProgress from '@material-ui/core/CircularProgress';
export default function(ComposedClass,reload,adminRoute = null){
    const [loading,setLoading] = useState(true)

   
    const Auth = (props) => {
        useEffect(()=>{
            props.dispatch(auth())
            .then(res => {
                let user = props.user.userData;
                if(user !== undefined){
                    if(!user.isAuth){
                        if(reload){
                            props.history.push('/register');
                        }
                    }else{
                        if(adminRoute && !user.isAdmin){
                            props.history.push('/user/dashboard');
                        }else{
                            if(reload === false){
                                props.history.push('/user/dashboard');
                            }
                        }
                        
                    }
                }
                setLoading(false);
               
               
            }) 
        },[]);
        return (
            <div>
                {
                   loading ?
                    <div className="main_loader">
                        <CircularProgress style={{color : "#2196F3"}} thickness = {7} />
                    </div>
                   : <ComposedClass {...props} user= {props.user}/>
                }
            </div>
           
        );
    };
    function mapStateToProps(state){
        return {
            user : state.user
        }
    }
    
    return connect(mapStateToProps)(Auth);
}
