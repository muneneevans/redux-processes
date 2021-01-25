// reducer.js
import * as processTypes from "./processTypes";
import * as actionTypes from "./actionTypes";

const initialState = {
  fetchPostsProcess: { status: processTypes.IDLE, message: "" },
  posts: [],
};

export default function postsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.FETCH_POSTS_REQUESTED:
      // update the process to show processing
      return {
        ...state,
        fetchPostsProcess: { status: processTypes.PROCESSING, message: "" },
      };

    case actionTypes.FETCH_POSTS_SUCCEEDED:
      // update the process to show success and add the data fetched to store
      return {
        ...state,
        fetchPostsProcess: { status: processTypes.SUCCESS, message: "" },
        posts: action.payload.posts,
      };

    case actionTypes.FETCH_POSTS_FAILED:
      // update the process to show an error with the error message from the action
      return {
        ...state,
        fetchPostsProcess: {
          status: processTypes.ERROR,
          message: action.payload.message,
        },
      };
    case actionTypes.FETCH_POSTS_DISCONNECTED:
      // update the process to disconnected
      return {
        ...state,
        fetchPostsProcess: {
          status: processTypes.DISCONNECTED,
          message: action.payload.message,
        },
      };
    case actionTypes.FETCH_POSTS_RESET:
      // return our process and data to initial
      return {
        ...state,
        fetchPostsProcess: initialState.fetchPostsProcess,
        posts: initialState.posts,
      };
    default:
      return state;
  }
}
