import React, { ChangeEvent, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";

export default function PaginationBar(props: {
  totalUsers: number;
  func: any;
  currentPage: number;
  changeDisplayUsers: any;
  usersPerPage: number;
}) {
  const usersPerPage = props.usersPerPage;
  const numberOfPages = Math.ceil(props.totalUsers / usersPerPage);

  const paginate = (pageNumber: number, e: any) => {
    e.preventDefault();
    props.func((pageNumber - 1) * usersPerPage, pageNumber * usersPerPage);
  };

  const handleSelectChange = (event: { target: { value: string } }) => {
    const newUsersPerPage = parseInt(event.target.value, 10);
    console.log(newUsersPerPage);
    props.changeDisplayUsers(newUsersPerPage); // Update users per page in parent
  };

  return (
    <div className="d-flex justify-content-between align-items-center flex-wrap">
      <Pagination className="m-sm-0">
        <Pagination.First
          onClick={(e) => paginate(1, e)}
          disabled={props.currentPage == 1 ? true : false}
        ></Pagination.First>
        <Pagination.Prev
          onClick={(e) => paginate(props.currentPage - 1, e)}
          disabled={props.currentPage <= 1 ? true : false}
        ></Pagination.Prev>
        <Pagination.Item
          onClick={(e) => paginate(props.currentPage - 1, e)}
          hidden={props.currentPage == 1 ? true : false}
        >
          {props.currentPage - 1}
        </Pagination.Item>
        <Pagination.Item active>{props.currentPage}</Pagination.Item>
        <Pagination.Item
          onClick={(e) => paginate(props.currentPage + 1, e)}
          hidden={props.currentPage + 1 > numberOfPages ? true : false}
        >
          {props.currentPage + 1}
        </Pagination.Item>
        <Pagination.Next
          onClick={(e) => paginate(props.currentPage + 1, e)}
          disabled={props.currentPage >= numberOfPages ? true : false}
        ></Pagination.Next>
        <Pagination.Last
          onClick={(e) => paginate(numberOfPages, e)}
          disabled={props.currentPage == numberOfPages}
        ></Pagination.Last>
      </Pagination>
      <div className="d-flex align-items-center">
      <div className="me-2">Choose users per page:</div>
        <Form.Group controlId="exampleForm.SelectCustom">
          <Form.Control
            as="select"
            value={props.usersPerPage}
            onChange={handleSelectChange}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </Form.Control>
        </Form.Group>
      </div>
    </div>
  );
}
