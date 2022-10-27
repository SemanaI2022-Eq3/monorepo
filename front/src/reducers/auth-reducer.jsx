import axios from "axios";
import { AUTH_ENDPOINT } from "../constants";

const FETCH_USER = "FETCH_USER";
const INVALIDATE_USER = "INVALIDATE_USER";

const fetchUserResponse = (data) => ({ type: FETCH_USER, payload: data });
export const invalidateUser = () => ({ type: INVALIDATE_USER });

export const reducer = (state, action) => {
  switch (action.type) {
    case FETCH_USER: {
      return {
        ...state,
        user: action.payload.user,
        authenticated: action.payload.authenticated,
      };
    }
    case INVALIDATE_USER: {
      return { ...state, user: undefined, authenticated: false };
    }
    default:
      throw new Error();
  }
};

export const fetchUser = (dispatch) => {
  axios
    .get(`${AUTH_ENDPOINT}/api/user/info`)
    .then((res) => {
      dispatch(
        fetchUserResponse({
          user: res.data.user,
          authenticated: res.data.user !== undefined,
        })
      );
    })
    .catch(() => {
      dispatch(
        fetchUserResponse({
          authenticated: false,
        })
      );
    });
};
