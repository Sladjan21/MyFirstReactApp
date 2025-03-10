import React from "react";
import { createGlobalStyle, css } from "styled-components";
import "bootstrap/dist/css/bootstrap.css";

export const GlobalStyles = React.memo(
  createGlobalStyle`${css`
    * {
      margin: 0;
      box-sizing: border-box;
      padding: 0;
      border: 0;
      font-family: "Montserrat", sans-serif;
    }

    table {
      border-collapse: collapse;
      border-spacing: 0;
      margin-top: 10px;
    }

    th,
    td {
      text-align: left;
      padding: 8px;
    }

  table tbody tr:nth-child(odd) {
    border-top:1px solid #000;
  }

    .cardDiv {
      max-height: 50vh;
      overflow-y: auto;
    }

    @media (max-width: 1000px) {
      .table thead {
        display: none;
      }
      .table tbody,
      .table tr,
      .table th,
      .table td {
        display: block;
      }

      .table td:before {
        content: attr(data-title);
        display: block;
        font-weight: 700;
      }
    }
  `}`,
);
