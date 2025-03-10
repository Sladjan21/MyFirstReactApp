import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Collapse from "react-bootstrap/Collapse";
import { BlogPost } from "../../data/data";
import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router";
import { deleteBlog } from "../../redux/blog/blogSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";

export default function BlogPostRow(props: {
  identifier: number;
  expandedRow: number;
  blogData: BlogPost[];
  func: any;
  userId: number;
}) {
  const [currentBlogIndex, setCurrentBlogIndex] = useState(0);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (props.blogData && props.blogData.length > 0) {
      setCurrentBlogIndex(0);
    }
  }, [props.blogData]);

  function removePost(id: string) {
    const currentiIndex = props.blogData.findIndex((el) => el.id === id);

    const remainingBlogs = props.blogData.filter((el) => el.id !== id);
    console.log(remainingBlogs);
    console.log(props.blogData);
    props.func(remainingBlogs);

    dispatch(deleteBlog(id));

    if (remainingBlogs.length > 0) {
      const nextIndex =
        currentiIndex === remainingBlogs.length ? 0 : currentiIndex;
      setCurrentBlogIndex(nextIndex);
    }
  }

  function displayNextBlog() {
    const nextIndex =
      currentBlogIndex + 1 >= props.blogData.length ? 0 : currentBlogIndex + 1;
    setCurrentBlogIndex(nextIndex);
  }

  const currentBlog = props.blogData[currentBlogIndex];

  return (
    <tr key={props.identifier}>
      <td className="p-0" colSpan={6}>
        <Collapse in={props.expandedRow === props.identifier}>
          <div id={"collapse-" + props.identifier}>
            <Card body className="p-2">
              {currentBlog ? (
                <>
                  <Link
                    to={{ pathname: "/blog/" + currentBlog.userId + "/0" }}
                    state={{ currentBlog }}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <h4>Title: {currentBlog.title}</h4>
                    <h4>DatePosted: {currentBlog.datePosted}</h4>
                    <h4>Body: {currentBlog.body}</h4>
                    <hr />
                  </Link>
                  <Row className="text-center">
                    <Col>
                      <Button
                        onClick={displayNextBlog}
                        disabled={props.blogData.length == 1 ? true : false}
                        aria-label="Next"
                      >
                        Next blog post
                      </Button>
                    </Col>

                    <Col>
                      <Button
                        className="btn btn-danger"
                        onClick={() => removePost(currentBlog.id)}
                      >
                        Delete this post
                      </Button>
                    </Col>

                    <Col className="mt-2 mt-sm-0">
                      <Link
                        to={{ pathname: "/blog/" + currentBlog.userId + "/1" }}
                        className="btn btn-success"
                      >
                        Add new blog post
                      </Link>
                    </Col>
                  </Row>
                </>
              ) : (
                <>
                  <h3 className="text-warning">User has no posts</h3>
                  <Link
                    to={{ pathname: "/blog/" + props.userId + "/1" }}
                    className="btn btn-success"
                  >
                    Add new blog post
                  </Link>
                </>
              )}
            </Card>
          </div>
        </Collapse>
      </td>
    </tr>
  );
}
