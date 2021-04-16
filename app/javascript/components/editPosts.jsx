import React from "react";
import { Link } from "react-router-dom";

class EditPosts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      currentPage: 1,
      postsPerPage: 10,
    };
    this.changePage = this.changePage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.deletePost = this.deletePost.bind(this);
  }

  componentDidMount() {
    const url = "/api/v1/posts/local";
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => this.setState({ posts: response }))
      .catch(() => this.props.history.push("/"));
  }

  changePage(event) {
    this.setState({
      currentPage: Number(event.target.id),
    });
  }

  previousPage() {
    if (this.state.currentPage > 1) {
      this.setState({
        currentPage: this.state.currentPage - 1,
      });
    }
  }

  nextPage() {
    if (this.state.currentPage < numberOfPages) {
      this.setState({
        currentPage: this.state.currentPage + 1,
      });
    }
  }

  deletePost(event) {
    const id = Number(event.target.id);
    console.log(id);
    const url = `/api/v1/destroy/${id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(() => this.props.history.push("/"))
      .catch((error) => console.log(error.message));
  }

  render() {
    const { posts, currentPage, postsPerPage } = this.state;
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(posts.length / postsPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map((number) => {
      return (
        <li
          className={"page-item " + (currentPage == number ? "active" : "")}
          key={number}
          id={number}
          onClick={this.changePage}
        >
          <a className="page-link" id={number}>
            {number}
          </a>
        </li>
      );
    });

    const allPosts = currentPosts.map((post, index) => (
      <tr>
        <th>{post.id}</th>
        <td>{post.title}</td>
        <td>{post.content}</td>
        <td>
          <button
            type="button"
            className="btn btn-danger"
            id={post.id}
            onClick={this.deletePost}
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    const noPost = (
      <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
        <h4>
          No posts yet. Why not <Link to="/new_post">create one</Link>
        </h4>
      </div>
    );

    const table = (
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Title</th>
            <th scope="col">Content</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>{allPosts}</tbody>
      </table>
    );

    const pagination = (
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className="page-item" onClick={this.previousPage}>
            <a className="page-link">Previous</a>
          </li>
          {renderPageNumbers}
          <li className="page-item" onClick={this.nextPage}>
            <a className="page-link">Next</a>
          </li>
        </ul>
      </nav>
    );
    const noPagination = <div></div>;

    return (
      <>
        <section className="jumbotron jumbotron-fluid text-center">
          <div className="container py-2">
            <h1 className="display-4">Edit Blog</h1>
          </div>
        </section>
        <div className="py-3">
          <main className="container">
            <div className="text-right mb-3">
              <Link to="/new_post" className="btn custom-button">
                Create New Post
              </Link>
            </div>
            <div className="row">{posts.length > 0 ? table : noPost}</div>
            <div>{posts.length > 10 ? pagination : noPagination}</div>
          </main>
        </div>
      </>
    );
  }
}
export default EditPosts;
