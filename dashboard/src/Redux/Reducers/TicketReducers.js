import {
  TICKET_CREATE_FAIL,
  TICKET_CREATE_REQUEST,
  TICKET_CREATE_RESET,
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
  TICKET_UPDATE_RESET,
  TICKET_UPDATE_SUCCESS,
} from "../Constants/TicketConstants";

// ALL TICKETS
export const ticketListReducer = (state = { tickets: [] }, action) => {
  switch (action.type) {
    case TICKET_LIST_REQUEST:
      return { loading: true, tickets: [] };
    case TICKET_LIST_SUCCESS:
      return { loading: false, tickets: action.payload };
    case TICKET_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// DELETE TICKET
export const ticketDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case TICKET_DELETE_REQUEST:
      return { loading: true };
    case TICKET_DELETE_SUCCESS:
      return { loading: false, success: true };
    case TICKET_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// DELETE TICKET
export const ticketCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case TICKET_CREATE_REQUEST:
      return { loading: true };
    case TICKET_CREATE_SUCCESS:
      return { loading: false, success: true, ticket: action.payload };
    case TICKET_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case TICKET_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

// EDIT TICKET
export const ticketEditReducer = (
  state = { ticket: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case TICKET_EDIT_REQUEST:
      return { ...state, loading: true };
    case TICKET_EDIT_SUCCESS:
      return { loading: false, ticket: action.payload };
    case TICKET_EDIT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// UPDATE TICKET
export const ticketUpdateReducer = (state = { ticket: {} }, action) => {
  switch (action.type) {
    case TICKET_UPDATE_REQUEST:
      return { loading: true };
    case TICKET_UPDATE_SUCCESS:
      return { loading: false, success: true, ticket: action.payload };
    case TICKET_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case TICKET_UPDATE_RESET:
      return { ticket: {} };
    default:
      return state;
  }
};
