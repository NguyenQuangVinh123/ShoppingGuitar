import {
  GET_PRODUCT_BY_ARRIVAL,
  GET_PRODUCT_BY_SELL,
  GET_WOODS,
  GET_BRANDS,
  GET_PRODUCT_TO_SHOP,
  ADD_PRODUCT,CLEAR_PRODUCT,
  ADD_BRANDS,ADD_WOODS
} from "../actions/types";

export default function (state = {}, action) {
  switch (action.type) {
    case GET_PRODUCT_BY_ARRIVAL:
      return { ...state, bySell: action.payload };
    case GET_PRODUCT_BY_SELL:
      return { ...state, byArrival: action.payload };
    case GET_BRANDS:
      return { ...state, brands: action.payload };
    case GET_WOODS:
      return { ...state, woods: action.payload };
      case ADD_BRANDS:
      return { ...state, addBrand: action.payload.success,brands : action.payload.brands };
      case ADD_WOODS:
        return { ...state, addWood: action.payload.success,woods : action.payload.woods };
      case GET_PRODUCT_TO_SHOP:
      return { 
        ...state,
        toShop : action.payload.articles,
        toShopSize : action.payload.size
      };
      case ADD_PRODUCT:
      return { ...state, addProduct: action.payload };
      case CLEAR_PRODUCT:
      return { ...state, addProduct: action.payload };
    default:
      return state;
  }
}
