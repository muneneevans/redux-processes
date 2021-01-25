import React from "react";
import { Provider } from "react-redux";
import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logo from "./logo.svg";
import "./App.css";

//import the post screen
import PostsPage from "./posts/PostsPage";

//import all your reducers from the store
import postsReducer from "./posts/reducers";

//
const rootReducer = combineReducers({
  posts: postsReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

const App = () => (
  <Provider store={store}>
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Redux processes
      </p>
    </header>
    <PostsPage />
  </Provider>
);
export default App;
