import React, { ChangeEvent, useEffect, useId, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import { Link, useLocation, useNavigate, useParams } from "react-router";
import { BlogPost } from "../../data/data";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { deleteBlog, saveBlog, updateBlog } from "../../redux/blog/blogSlice";

export default function BlogPostForm() {
  const location = useLocation();
  const blog = location.state?.currentBlog as BlogPost | undefined;
  const { idUser, isAdd } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const randomId = useId();
  const [show, setShow] = useState(false);

  const [post, setPost] = useState(
    blog || {
      title: "",
      datePosted: new Date().toLocaleString(),
      body: "",
      id: randomId,
      userId: idUser ? parseInt(idUser) : -1,
    },
  );
  const localDate = new Date(post.datePosted);
  const formattedDate = localDate.toISOString().slice(0, 16);

  const handelInput = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  function handleDelete(e: React.MouseEvent) {
    e.preventDefault();
    dispatch(deleteBlog(post.id));
    navigate("/");
  }

  function hanldeUpdate(e: React.MouseEvent) {
    e.preventDefault();
    console.log(post);
    dispatch(updateBlog(post));
    setPost(post);
    navigate(-1);
  }

  function handleSave(e: React.MouseEvent) {
    e.preventDefault();
    dispatch(saveBlog(post))
      .unwrap()
      .then(() => {
        navigate(-1);
      })
      .catch((error) => {
        setShow(true);
      });
  }

  return (
    <Container className="mt-3">
      <h2 className="text-center">Blog post page !!!</h2>
      <Card body>
        <Row>
          <Col>
            <Form>
              <Link
                type="button"
                className="btn btn-primary mb-3"
                to={{ pathname: "/" }}
              >
                {" "}
                Back
              </Link>

              <Form.Group className="mb-3" controlId="formTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  onChange={handelInput}
                  defaultValue={post.title}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formDate">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="datetime-local"
                  name="datePosted"
                  onChange={handelInput}
                  defaultValue={formattedDate}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Body</Form.Label>
                <Form.Control
                  as="textarea"
                  name="body"
                  onChange={handelInput}
                  defaultValue={post.body}
                  rows={3}
                  style={{ height: "300px" }}
                />
              </Form.Group>

              <Button
                type="button"
                hidden={parseInt(isAdd!) != 0 ? false : true}
                className="btn btn-success"
                onClick={(e) => handleSave(e)}
              >
                Save blog
              </Button>
              <Button
                type="button"
                hidden={parseInt(isAdd!) == 0 ? false : true}
                className="btn btn-primary"
                onClick={(e) => hanldeUpdate(e)}
              >
                Save changes
              </Button>
              <Button
                type="button"
                hidden={parseInt(isAdd!) == 0 ? false : true}
                className="btn btn-danger ms-4"
                onClick={(e) => handleDelete(e)}
              >
                Delete post
              </Button>
            </Form>
          </Col>
        </Row>
      </Card>

      <ToastContainer position={"bottom-end"}>
        <Toast
          onClose={() => setShow(false)}
          show={show}
          delay={5000}
          autohide
          className="d-inline-block m-5"
          bg={"danger"}
        >
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Error</strong>
          </Toast.Header>
          <Toast.Body className={"text-white"}>
            Something went wrong with saving the blog, please try again!!!
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
}
