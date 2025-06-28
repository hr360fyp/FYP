import {
    REGISTER_DETAILS_FAIL,
    REGISTER_DETAILS_REQUEST,
    REGISTER_DETAILS_RESET,
    REGISTER_DETAILS_SUCCESS,
    REGISTER_LOGIN_FAIL,
    REGISTER_LOGIN_REQUEST,
    REGISTER_LOGIN_SUCCESS,
    REGISTER_LOGOUT,
    REGISTER_REGISTER_FAIL,
    REGISTER_REGISTER_REQUEST,
    REGISTER_REGISTER_SUCCESS,
    REGISTER_UPDATE_PROFILE_FAIL,
    REGISTER_UPDATE_PROFILE_REQUEST,
    REGISTER_UPDATE_PROFILE_SUCCESS,
  } from "../Constants/RegisterContants";
  
  // LOGIN
  export const registerLoginReducer = (state = {}, action) => {
    switch (action.type) {
      case REGISTER_LOGIN_REQUEST:
        return { loading: true };
      case REGISTER_LOGIN_SUCCESS:
        return { loading: false, registerInfo: action.payload };
      case REGISTER_LOGIN_FAIL:
        return { loading: false, error: action.payload };
      case REGISTER_LOGOUT:
        return {};
      default:
        return state;
    }
  };
  
  //REGISTER
  export const registerRegisterReducer = (state = {}, action) => {
    switch (action.type) {
      case REGISTER_REGISTER_REQUEST:
        return { loading: true };
      case REGISTER_REGISTER_SUCCESS:
        return { loading: false, registerInfo: action.payload };
      case REGISTER_REGISTER_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  
  // REGISTER DETAILS
  export const registerDetailsReducer = (state = { register: {} }, action) => {
    switch (action.type) {
      case REGISTER_DETAILS_REQUEST:
        return { ...state, loading: true };
      case REGISTER_DETAILS_SUCCESS:
        return { loading: false, register: action.payload };
      case REGISTER_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      case REGISTER_DETAILS_RESET:
        return { register: {} };
      default:
        return state;
    }
  };
  
  // UPDATE PROFILE
  export const registerUpdateProfileReducer = (state = {}, action) => {
    switch (action.type) {
      case REGISTER_UPDATE_PROFILE_REQUEST:
        return { loading: true };
      case REGISTER_UPDATE_PROFILE_SUCCESS:
        return { loading: false, success: true, registerInfo: action.payload };
      case REGISTER_UPDATE_PROFILE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };