const LocalStrategy = require('passport-local');
const mongoose = require('mongoose');
const bcrypt =  require('bcrypt')

const User = require('../models/User');

module.exports = function(passport){ 
    passport.use(
        new LocalStrategy({ usernameField : 'email' },(email,password,done) =>{
            //Match USer
            User.findOne({email : email})
                .then(user =>{
                    if(!user){
                        return done(null,false,{message: 'Tha email is not registered'})
                    }
                })
                .catch(err => console.log(err))
        })
    )
}