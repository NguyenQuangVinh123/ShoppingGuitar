import React, { useState, useEffect } from "react";
import PageTop from "../utils/page_top";
import { connect } from "react-redux";
import {
  getProductDetail,
  clearProductDetail,
} from "../../actions/products_actions";
import ProductInfo from "./ProductInfo";
import ProductImage from "./ProductImage";
import {addToCart } from "../../actions/user_actions"
const ProductPage = (props) => {
  useEffect(() => {
    const id = props.match.params.id;
    props.dispatch(getProductDetail(id)).then(res =>{
        if(res.payload === undefined){
            props.history.push('/')
        }
    })
    return () => {
      props.dispatch(clearProductDetail());
    };
  },[]);
 
  const addToCartHandler = (id,quantity=1) => {
    const castQuanTity = parseInt(quantity);
    props.dispatch(addToCart(id,castQuanTity))
  };
  return (
    <div>
      <PageTop title="Product Detail" />
      <div className="container">
        {
            props.products.productDetail ? (
          <div className="product_detail_wrapper">
            <div className="left" style={{width:'500px'}}><ProductImage detail={props.products.productDetail} /></div>
            <div className="right">
              <ProductInfo
                addToCart={(id,quantity) => addToCartHandler(id,quantity)}
                detail={props.products.productDetail}
              />
            </div>
          </div>
        ) : (
          "Loading"
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};
export default connect(mapStateToProps)(ProductPage);
