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
import axios from "axios";

// LOGIN
export const login = (role, email, password) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `/api/registers/login`,
      { role, email, password },
      config
    );
    dispatch({ type: REGISTER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("registerInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: REGISTER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// LOGOUT
export const logout = () => (dispatch) => {
  localStorage.removeItem("registerInfo");
  dispatch({ type: REGISTER_LOGOUT });
  dispatch({ type: REGISTER_DETAILS_RESET });
};

// REGISTER
export const register = (role, name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REGISTER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `/api/registers`,
      { role, name, email, password },
      config
    );
    dispatch({ type: REGISTER_REGISTER_SUCCESS, payload: data });
    dispatch({ type: REGISTER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("registerInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: REGISTER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// REGISTER DETAILS
export const getRegisterDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: REGISTER_DETAILS_REQUEST });
    const {
      registerLogin: { registerInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${registerInfo.token}`,
      },
    };

    const { data } = await axios.get(`/${id}`, config);
    dispatch({ type: REGISTER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: REGISTER_DETAILS_FAIL,
      payload: message,
    });
  }
};

// UPDATE PROFILE
export const updateRegisterProfile = (register) => async (dispatch, getState) => {
  try {
    dispatch({ type: REGISTER_UPDATE_PROFILE_REQUEST });

    const {
      registerLogin: { registerInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${registerInfo.token}`,
      },
    };

    const { data } = await axios.put(`/`, register, config);
    dispatch({ type: REGISTER_UPDATE_PROFILE_SUCCESS, payload: data });
    dispatch({ type: REGISTER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("registerInfo", JSON.stringify(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: REGISTER_UPDATE_PROFILE_FAIL,
      payload: message,
    });
  }
};