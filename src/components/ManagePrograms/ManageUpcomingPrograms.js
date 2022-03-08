import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Sidebar from "./Sidebar";
import axios from "axios"
const ManageUpcomingPrograms = () => {
  const [upcomingPrograms, setUpcomingPrograms] = useState([]);
  const PF = "http://localhost:5000/images/";
  useEffect(() => {
    const fetchUpcomingPrograms = async () => {
      const res = await axios.get("http://localhost:5000/api/upcomingPrograms");
      setUpcomingPrograms(res.data);
    }
    fetchUpcomingPrograms();
  }, [])
  const handleDelete = (e, id) => {
    fetch(`http://localhost:5000/api/upcomingPrograms/${id}`, {
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
    <div>
      <div className="row">
        <div className="col-md-3">
          <Sidebar></Sidebar>
        </div>
        <div className="col-md-9">
          <h1>Manage Upcoming Programs</h1>
          {upcomingPrograms.length > 0 &&
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Image</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  upcomingPrograms.map(upcomingProgram => (
                    <tr>
                      <td>{upcomingProgram.title}</td>
                      <td className="text-center">
                        <img height="50px" width="70px" src={PF + upcomingProgram.photo} alt="" />
                      </td>
                      <td>
                        <Link className="manageButton" to={`/updateUpcomingPrograms/${upcomingProgram._id}`}>
                          Update
                        </Link>{" "}
                        | <Link onClick={(e) => handleDelete(e, upcomingProgram._id)} className="manageButton">Delete</Link>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          }
        </div>
      </div>
    </div>
  );
};

export default ManageUpcomingPrograms;
