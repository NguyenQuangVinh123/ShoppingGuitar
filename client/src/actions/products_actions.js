import axios from 'axios';
import {PRODUCT_SERVER} from '../components/utils/misc'
import { GET_PRODUCT_BY_ARRIVAL,GET_PRODUCT_BY_SELL,GET_BRANDS,GET_WOODS } from './types';


export function getProductsBySell(){
    const request = axios.get(`${PRODUCT_SERVER}/articles?sortBy=sold&order=desc&limit=4`)
                    .then(res => res.data)
    return {
        type : GET_PRODUCT_BY_SELL,
        payload : request
    }
}
export function getProductsByArrival(){
    const request = axios.get(`${PRODUCT_SERVER}/articles?sortBy=createdAt&order=desc&limit=4`)
                    .then(res => res.data)
    return {
        type : GET_PRODUCT_BY_ARRIVAL,
        payload : request
    }
}

export function getBrands(){
    const request = axios.get(`${PRODUCT_SERVER}/brands`)
                            .then(res => res.data)
    return {
        type : GET_BRANDS,
        payload : request
    }
} 
export function getWoods(){
    const request = axios.get(`${PRODUCT_SERVER}/woods`)
    .then(res => res.data)
    return {
        type : GET_WOODS,
        payload : request
    }
} 