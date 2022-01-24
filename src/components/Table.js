import React from "react";
import "./Table.css";

const Table = ({ countries }) => {
  return (
    <>
      <div className="table">
        {countries?.map((data) => {
          return (
            <tr>
              <td>{data.country}</td>
              <td>{data.cases}</td>
            </tr>
          );
        })}
      </div>
    </>
  );
};

export default Table;
