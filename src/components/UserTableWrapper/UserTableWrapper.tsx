import React, { useEffect, useState } from "react";
import SwitchButton from "../Buttons/SwitchButton";
import UserTable from "../UserTable/UserTable";
import {
  Col,
  Container,
  Row,
  Spinner,
  Form,
  Toast,
  ToastContainer,
  Card,
} from "react-bootstrap";
import { User } from "../../data/data";

export default function UserTableWrapper(props: {
  users: User[];
  blogs: any[];
}) {
  const [isNotPerformant, setIsVisible] = useState(false);
  const [allUsers, setAllUsers] = useState(props.users);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleDivVisibility = () => {
    setIsVisible(!isNotPerformant);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filterUsersByEmail = (email: string) => {
    if (email === "") {
      return props.users;
    }
    return props.users.filter((user) =>
      user.email.toLowerCase().includes(email.toLowerCase()),
    );
  };

  useEffect(() => {
    if (props.users && props.users.length > 0) {
      setAllUsers(props.users);
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [props.users]);

  useEffect(() => {
    setAllUsers(filterUsersByEmail(searchTerm));
  }, [searchTerm]);

  return (
    <Container className="mt-3">

      <h1>Welcome to my first react app</h1>

      <Card body className="shadow rounded mb-5">
        <Row>
          <Col>
            <SwitchButton
              func={toggleDivVisibility}
              message={"Load table in a not so performant way"}
            />
            <Row>
              <Col xs={12} md={5}>
                <Form.Control
                  className="my-3"
                  type="text"
                  placeholder="Search by email..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </Col>
            </Row>

            {loading ? (
              <div className="text-center">
                <Spinner animation="border" variant="primary" />
                <p>Loading users...</p>
              </div>
            ) : (
              <UserTable
                users={allUsers}
                blogs={props.blogs}
                isNotPerformant={isNotPerformant}
                setAllUsers={setAllUsers}
              />
            )}
          </Col>
        </Row>
      </Card>
    </Container>
  );
}
