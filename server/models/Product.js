const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const productSchema = mongoose.Schema({
    name :{ 
        type : String,
        required : true,
        unique : 1,
        maxlength : 100
    },
    description : {
        required : true,
        type : String,
        maxlength : 1000
    },
    price : {
        required : true,
        type : Number,
        maxlength : 255
    },
    brand : {
        type : Schema.Types.ObjectId,
        ref : 'Brand',
        required : true
    },
    discount :{
        type : Number,
        maxlength : 255,
        default : 0,
    },
    shipping: {
        required : true,
        type : Boolean
    },
    available : {
        type : Boolean,
        required : true
    },
    wood : {
        type : Schema.Types.ObjectId,
        ref : 'Wood',
        required : true
    },
    frets : {
        required : true,
        type : Number
    },
    sold :{
        type : Number,
        maxlength : 100,
        default : 0
    },
    publish : {
        required : true,
        type : Boolean
    },
    images : {
        type : Array,
        default : []
    },
    bestselling : {
        required : true,
        type : Boolean
    },
},{timestamps : true})

const Product = mongoose.model('Product',productSchema);

module.exports = {
    Product
}