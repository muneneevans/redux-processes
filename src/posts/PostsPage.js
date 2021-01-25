import { connect } from "react-redux";
import React, { Component, Fragment } from "react";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import logo from "../logo.svg";


//import actions and selectors from the Store folder
import * as postActions from "./actions";
import * as postSelectors from "./selectors";

const Switcher = (props) => <Fragment>{props[props.value]}</Fragment>;
Switcher.propTypes = { value: PropTypes.isRequired };

class PostsPage extends Component {
  //when the component is mount, call the fetch post action
  componentDidMount() {
    this.props.postActions.fetchPosts();
  }

  //get alert from the
  showPost(post) {
    alert(post.body);
  }

  render() {
    return (
      <div>
        <h1>Posts</h1>
        <Switcher
          value={this.props.fetchPostProcess.status}
          IDLE={
            <div>
              <h1>Posts</h1>
            </div>
          }
          PROCESSING={
            <img src={logo} className="App-logo" alt="logo" />
          }
          SUCCESS={
            <div>
              {this.props.posts.map((post, index) => (
                <div key={index}>
                  <h2>{post.title}</h2>
                </div>
              ))}
            </div>
          }
          ERROR={
            <div>
              <h1>Error</h1>
              <p>{this.props.fetchPostProcess.message}</p>
            </div>
          }
          DISCONNECTED={
            <div>
              <h1>Unable to connect.</h1>
              <p>{this.props.fetchPostProcess.message}</p>
            </div>
          }
        />
      </div>
    );
  }
}

PostsPage.propTypes = {
  fetchPostProcess: PropTypes.object.isRequired,
  posts: PropTypes.array.isRequired,
  postActions: PropTypes.object.isRequired,
};

//get the posts and the fetch status from the post selector
const mapStateToProps = (state) => {
  return {
    fetchPostProcess: postSelectors.getFetchPostsProcess(state),
    posts: postSelectors.getPosts(state),
  };
};

// map all actions in the post store to prop: postActions
const mapDispatchToProps = (dispatch) => {
  return {
    postActions: bindActionCreators(postActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostsPage);
