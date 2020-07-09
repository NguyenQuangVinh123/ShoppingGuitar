import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PageTop from '../../../utils/page_top';
import { getBrands, getWoods,getProductToShop } from '../../../actions/products_actions';
import CollapseCheckbox from '../../../utils/collapseCheckbox';
import {frets,price} from '../../../utils/Form/Fixed_categories';
import CollapseRadio from '../../../utils/collapseRadio';
import LoadMoreCard from './loadMoreCard';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import faTh from '@fortawesome/fontawesome-free-solid/faTh';
import faBars from '@fortawesome/fontawesome-free-solid/faBars';

const Shop = (props) => {
    const [layout,setLayout]  = useState({grid : '',limit : 6,skip : 0,filters : {
        brand : [],
        frets: [],
        wood : [],
        price : []
    } })
    useEffect(() => {
        props.dispatch(getBrands());
        props.dispatch(getWoods());
        props.dispatch(getProductToShop(
            layout.skip,
            layout.limit,
            layout.filters,

        ))
    },[])
    const handlePrice = (value) =>{ 
        const data = price;
        let array = [];

        for(let key in data){
            if(data[key]._id === parseInt(value,10)){
                array = data[key].array
            }
        }
        return array;
    }
    const handleFilters = (filters,cate) =>{
       const newFilter = {...layout.filters}
       newFilter[cate] = filters;

       if(cate === "price"){
           let priceValues = handlePrice(filters);
           newFilter[cate] = priceValues
       }
       showFilteredResults(newFilter);
       setLayout((preState) => ({
        ...preState,
        filters : newFilter
       }))
      
    }
    const showFilteredResults = (filter) => {
        props.dispatch(getProductToShop(
            0,
            layout.limit,
            filter,
        )).then(() => {
            setLayout((preState) => ({
                ...preState,
                skip : 0
               }))
        })
    }
    const loadMore = () => {
        let skip = layout.skip + layout.limit;
        props.dispatch(getProductToShop(
            skip,
            layout.limit,
            layout.filters,
            props.products.toShop
        )).then(() => {
            setLayout((preState) => ({
                ...preState,
                skip : skip
               }))
        })
    }
    const handleGrid  = () => {
        setLayout((preState) => ({
            ...preState,
            grid : !layout.grid ? 'grid_bars' : ''
        }))
    }
    return (
        <div>
            <PageTop title="Browse Products" />
            
            <div className="container">
                <div className="shop_wrapper">
                    <div className="left">
                        <CollapseCheckbox initState = {true} title='Brands' 
                        list={props.products.brands} handleFilters={((filters) =>handleFilters(filters,'brand')  )}  />
                        <CollapseCheckbox initState = {false} title='Frets' 
                        list={frets} handleFilters={((filters) =>handleFilters(filters,'frets')  )}  />
                        <CollapseCheckbox initState = {false} title='Wood' 
                        list={props.products.woods} handleFilters={((filters) =>handleFilters(filters,'wood')  )}  />
                         <CollapseRadio initState = {false} title='Price' 
                        list={price} handleFilters={((filters) =>handleFilters(filters,'price')  )}  />
                    </div>
                    <div className="right">
                        <div className='shop_options'>
                            <div className='shop_grids clear'>
                               <div className={`grid_btn ${layout.grid ? '' : 'active'}`} 
                                onClick= {() => handleGrid()}
                               >
                                   <FontAwesomeIcon icon={faTh} />
                               </div>
                               <div className={`grid_btn ${!layout.grid ? '' : 'active'}`} 
                                onClick= {() => handleGrid()}
                               >
                                   <FontAwesomeIcon icon={faBars} />
                               </div>
                            </div>
                        </div>
                        <div>
                            <LoadMoreCard 
                                grid = {layout.grid}
                                limit = {layout.limit}
                                size = {props.products.toShopSize}
                                products = {props.products.toShop} 
                                loadMore = {() => loadMore()}                    
                            />
                        </div>   
                    </div>
                </div>
            </div>
        </div>
    );
};
const mapStateToProps = (state) => {
    return {
        products : state.products
    }
}
export default connect(mapStateToProps)(Shop);