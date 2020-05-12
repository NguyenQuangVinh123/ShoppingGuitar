import React,{useEffect} from "react";
import HomeSlider from "./HomeSlider";
import HomePromotion from "./HomePromotion";
import {connect} from 'react-redux';
import CardBlock from '../utils/card_block';
import {getProductsByArrival,getProductsBySell} from '../../actions/products_actions'
const Home = (props) => {
  useEffect(()=>{
    props.dispatch(getProductsBySell());
    props.dispatch(getProductsByArrival());

  },[])
  return <div>
    <HomeSlider />
    <CardBlock list={props.products.bySell} title ="Best Selling guitars" />
    <HomePromotion />
    <CardBlock list={props.products.byArrival} title ="New Arrivals" />

  </div>;
};
const mapStateToProps = (state) => {
    return {
      products : state.products
    }
}
export default connect(mapStateToProps)(Home);
