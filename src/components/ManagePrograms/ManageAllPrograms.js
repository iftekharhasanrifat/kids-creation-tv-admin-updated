import React from "react";
import { Link, useHistory } from "react-router-dom";
import "./ManageAllPrograms.css";
const ManageAllPrograms = ({ programs }) => {
  const history = useHistory();
  const handleDelete = (e, id) => {
    fetch(`http://localhost:5000/api/programs/${id}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then((result) => {
        if (result) {
          e.target.parentNode.parentNode.style.display = "none";
        }
      })
  };
  return (
    <div className="manage-all-program">
      {programs.length > 0 &&
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Link</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              programs.map(program => (
                <tr>
                  <td>{program.category}</td>
                  <td>{program.link}</td>
                  <td>
                    <Link className="manageButton" to={`/updatePrograms/${program._id}`}>
                      Update
                    </Link>{" "}
                    | <Link onClick={(e) => handleDelete(e, program._id)} className="manageButton">Delete</Link>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      }
    </div>
  );
};

export default ManageAllPrograms;
