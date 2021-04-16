import React from "react";
import { Link } from "react-router-dom";

class NewPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.stripHtmlEntities = this.stripHtmlEntities.bind(this);
  }

  stripHtmlEntities(str) {
    return String(str).replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const url = "/api/v1/posts/create";
    const { title, content } = this.state;

    if (title.length == 0 || content.length == 0) return;

    const body = {
      title,
      content: content.replace(/\n/g, "<br> <br>"),
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => this.props.history.push("/"))
      .catch((error) => console.log(error.message));
  }

  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-12 col-lg-6 offset-lg-3">
            <h1 className="font-weight-normal mb-5">Add a new post</h1>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="title">Post Title</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="form-control"
                  required
                  onChange={this.onChange}
                />
              </div>
              <label htmlFor="instruction">Content</label>
              <textarea
                className="form-control"
                id="content"
                name="content"
                rows="5"
                required
                onChange={this.onChange}
              />
              <button type="submit" className="btn custom-button mt-3">
                Create Post
              </button>
              <Link to="/posts" className="btn btn-link mt-3">
                Back to posts
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default NewPost;
