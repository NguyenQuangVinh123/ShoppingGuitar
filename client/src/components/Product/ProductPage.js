import React, { useState, useEffect } from "react";
import PageTop from "../utils/page_top";
import { connect } from "react-redux";
import {
  getProductDetail,
  clearProductDetail,
} from "../../actions/products_actions";
import ProductInfo from "./ProductInfo";
import ProductImage from "./ProductImage";

const ProductPage = (props) => {
  useEffect(() => {
    const id = props.match.params.id;
    console.log(id);
    props.dispatch(getProductDetail(id)).then(res =>{
        if(!props.products.productDetail){
            props.history.push('/')
        }
    });
    return () => {
      props.dispatch(clearProductDetail());
    };
  }, []);
  const addToCart = () => {};
  return (
    <div>
      <PageTop title="Product Detail" />
      <div className="container">
        {props.products.productDetail ? (
          <div className="product_detail_wrapper">
            <div className="left" style={{width:'500px'}}><ProductImage detail={props.products.productDetail} /></div>
            <div className="right">
              <ProductInfo
                addToCart={(id) => addToCart(id)}
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
