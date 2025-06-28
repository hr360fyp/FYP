import {
  TICKET_CREATE_FAIL,
  TICKET_CREATE_REQUEST,
  TICKET_CREATE_SUCCESS,
  TICKET_DELETE_FAIL,
  TICKET_DELETE_REQUEST,
  TICKET_DELETE_SUCCESS,
  TICKET_EDIT_FAIL,
  TICKET_EDIT_REQUEST,
  TICKET_EDIT_SUCCESS,
  TICKET_LIST_FAIL,
  TICKET_LIST_REQUEST,
  TICKET_LIST_SUCCESS,
  TICKET_UPDATE_FAIL,
  TICKET_UPDATE_REQUEST,
  TICKET_UPDATE_SUCCESS,
} from "../Constants/TicketConstants";
import axios from "axios";
import { logout } from "./userActions";

export const listTickets = () => async (dispatch, getState) => {
  try {
    dispatch({ type: TICKET_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/tickets/all`, config);

    dispatch({ type: TICKET_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: TICKET_LIST_FAIL,
      payload: message,
    });
  }
};

// DELETE TICKET
export const deleteTicket = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: TICKET_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/tickets/${id}`, config);

    dispatch({ type: TICKET_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: TICKET_DELETE_FAIL,
      payload: message,
    });
  }
};

// CREATE TICKET
export const createTicket =
  (description, priority, crtby, asgnto, deadline, status) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: TICKET_CREATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/tickets/`,
        { description, priority, crtby, asgnto, deadline, status },
        config
      );

      dispatch({ type: TICKET_CREATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: TICKET_CREATE_FAIL,
        payload: message,
      });
    }
  };

// EDIT TICKET
export const editTicket = (id) => async (dispatch) => {
  try {
    dispatch({ type: TICKET_EDIT_REQUEST });
    const { data } = await axios.get(`/api/tickets/${id}`);
    dispatch({ type: TICKET_EDIT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: TICKET_EDIT_FAIL,
      payload: message,
    });
  }
};

// UPDATE TICKET
export const updateTicket = (ticket) => async (dispatch, getState) => {
  try {
    dispatch({ type: TICKET_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/tickets/${ticket._id}`,
      ticket,
      config
    );

    dispatch({ type: TICKET_UPDATE_SUCCESS, payload: data });
    dispatch({ type: TICKET_EDIT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: TICKET_UPDATE_FAIL,
      payload: message,
    });
  }
};
