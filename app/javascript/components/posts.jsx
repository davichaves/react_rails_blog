import React from "react";
import { Link } from "react-router-dom";

class Posts extends React.Component {
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
  }

  componentDidMount() {
    const url = "/api/v1/posts/index";
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
      <div key={index} className="col-md-12 col-lg-12">
        <div className="card mb-4">
          <div className="row">
            <div className="col-md-6 card-body">
              <h5 className="card-title">{post.title}</h5>
              <p className="card-text">{post.content}</p>
            </div>
            <div className="col-md-6">
              <img
                src={post.image}
                className="card-img-top"
                alt={`${post.title} image`}
              />
            </div>
          </div>
        </div>
      </div>
    ));
    const noPost = (
      <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
        <h4>
          No posts yet. Why not <Link to="/new_post">create one</Link>
        </h4>
      </div>
    );

    return (
      <>
        <section className="jumbotron jumbotron-fluid text-center">
          <div className="container py-5">
            <h1 className="display-4">Simple Blog</h1>
            <p className="lead text-muted">
              This is a simple blog to show posts and news.
            </p>
            <Link
              to="/posts"
              className="btn btn-lg custom-button"
              role="button"
            >
              Edit Posts
            </Link>
          </div>
        </section>
        <div className="py-5">
          <main className="container">
            <div className="row">{posts.length > 0 ? allPosts : noPost}</div>
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
          </main>
        </div>
      </>
    );
  }
}
export default Posts;
