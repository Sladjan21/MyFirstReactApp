import Table from "react-bootstrap/Table";
import React, { useEffect, useState } from "react";
import PaginationBar from "../Pagination/PaginationBar";
import BlogPostRow from "../BlogPostRow/BlogPostRow";
import { BlogPost, User } from "../../data/data";
import { Button } from "react-bootstrap";

export default function UserTable(props: {
  users: User[];
  isNotPerformant: boolean;
  blogs: BlogPost[];
  setAllUsers: (users: User[]) => void;
}) {
  const [currentUsers, setCurrentUsers] = useState<User[]>([]);
  const [expandedRow, setExpandedRow] = useState<number>(0);
  const [userBlog, setUserBlog] = useState<BlogPost[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsers] = useState(5);

  const changeDisplayUsers = (newUsersPerPage: number) => {
    setUsers(newUsersPerPage);
  };

  useEffect(() => {
    const firstIndex = (currentPage - 1) * usersPerPage;
    console.log(props.users);
    if (currentPage > Math.ceil(props.users.length / usersPerPage)) {
      if (props.users.length == 0) setCurrentUsers(props.users);
      setCurrentPage(1);
    } else if (!props.isNotPerformant) {
      setCurrentUsers(props.users.slice(firstIndex, firstIndex + usersPerPage));
    } else {
      setCurrentUsers(props.users);
    }
  }, [props.users, currentPage, props.isNotPerformant, usersPerPage]);

  function displayPaginatedUsers(firstIndex: number, lastIndex: number) {
    const page = Math.floor(firstIndex / usersPerPage) + 1;
    setCurrentPage(page);
  }

  function removeUser(id: number, e: React.MouseEvent) {
    e.stopPropagation();
    const remainingUsers = currentUsers.filter((user) => user.id !== id);

    if (remainingUsers.length === 0 && currentPage > 1 && !props.isNotPerformant) {
      setCurrentPage(currentPage - 1);
    }

    props.setAllUsers(props.users.filter((user) => user.id !== id));
  }

  function showBlogPostsForUser(id: number) {
    setExpandedRow(id === expandedRow ? -1 : id);
    const blog = props.blogs.filter((element) => element.userId === id);
    setUserBlog(blog);
  }

  return (
    <div>
      <Table borderless hover>
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Last Name</th>
            <th>Gender</th>
            <th>Ip Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center">
                No users available
              </td>
            </tr>
          ) : (
            currentUsers.map((user) => (
              <React.Fragment key={user.id}>
                <tr onClick={() => showBlogPostsForUser(user.id)}>
                  <td data-title="Email">{user.email}</td>
                  <td data-title="First name">{user.first_name}</td>
                  <td data-title="Last name">{user.last_name}</td>
                  <td data-title="Gender">{user.gender}</td>
                  <td data-title="Ip address">{user.ip_address}</td>
                  <td data-title="Action">
                    <Button
                      className="btn btn-danger"
                      onClick={(e) => removeUser(user.id, e)}
                    >
                      Delete user
                    </Button>
                  </td>
                </tr>
                <BlogPostRow
                  expandedRow={expandedRow}
                  blogData={userBlog}
                  identifier={user.id}
                  func={setUserBlog}
                  userId={user.id}
                />
              </React.Fragment>
            ))
          )}
        </tbody>
      </Table>
      {!props.isNotPerformant && (
        <PaginationBar
          func={displayPaginatedUsers}
          totalUsers={props.users.length}
          currentPage={currentPage}
          changeDisplayUsers={changeDisplayUsers}
          usersPerPage={usersPerPage}
        />
      )}
    </div>
  );
}
