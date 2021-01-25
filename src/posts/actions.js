// actions.js
import * as actionTypes from "./actionTypes";

export const fetchPosts = () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.FETCH_POSTS_REQUESTED,
    });

    fetch("https://jsonplaceholder.typicode.com/posts", { method: "GET" })
      .then((response) => {
        if (response.status === 200) {
          response.json().then((posts) => {
            dispatch({
              type: actionTypes.FETCH_POSTS_SUCCEEDED,
              payload: { posts },
            });
          });
        } else {
          dispatch({
            type: actionTypes.FETCH_POSTS_FAILED,
            payload: {
              message: "An error occurred while fetching posts. please retry",
            },
          });
        }
      })
      .catch(() => {
        dispatch({
          type: actionTypes.FETCH_POSTS_DISCONNECTED,
          payload: {
            message:
              "Unable to conenect to internet. Please check your internet",
          },
        });
      });
  };
};
