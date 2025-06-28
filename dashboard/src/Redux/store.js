import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userListReducer, userLoginReducer } from "./Reducers/userReducers";
import {
  registerDetailsReducer,
  registerLoginReducer,
  registerRegisterReducer,
  registerUpdateProfileReducer,
} from "./Reducers/RegisterReducers";
import {
  productCreateReducer,
  productDeleteReducer,
  productEditReducer,
  productListReducer,
  productUpdateReducer,
} from "./Reducers/ProductReducers";
import {
  orderCreateReducer,
  orderDeleteReducer,
  orderEditReducer,
  orderListReducer,
  orderUpdateReducer,
} from "./Reducers/OrderReducers";
import {
  ticketCreateReducer,
  ticketDeleteReducer,
  ticketEditReducer,
  ticketListReducer,
  ticketUpdateReducer,
} from "./Reducers/TicketReducers";

const reducer = combineReducers({
  registerLogin: registerLoginReducer,
  registerRegister: registerRegisterReducer,
  registerDetails: registerDetailsReducer,
  registerUpdateProfile: registerUpdateProfileReducer,

  userLogin: userLoginReducer,
  userList: userListReducer,
  productList: productListReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productEdit: productEditReducer,
  productUpdate: productUpdateReducer,
  
  orderList: orderListReducer,
  orderDelete: orderDeleteReducer,
  orderCreate: orderCreateReducer,
  orderEdit: orderEditReducer,
  orderUpdate: orderUpdateReducer,

  ticketList: ticketListReducer,
  ticketDelete: ticketDeleteReducer,
  ticketCreate: ticketCreateReducer,
  ticketEdit: ticketEditReducer,
  ticketUpdate: ticketUpdateReducer,
});


// login
const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromLocalStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;