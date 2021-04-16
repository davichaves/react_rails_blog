import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/home";
import Posts from "../components/posts";
import EditPosts from "../components/editPosts";
import NewPost from "../components/newPost";

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Posts} />
      <Route path="/posts" exact component={EditPosts} />
      <Route path="/new_post" exact component={NewPost} />
    </Switch>
  </Router>
);
