import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Link, useHistory } from "react-router-dom";
import axios from "axios"
const ManageKidsNews = () => {
  const history = useHistory();
  const PF = "http://localhost:5000/images/"
  const [kidsNews, setKidsNews] = useState([]);
  useEffect(() => {
    const fetchKidsNews = async () => {
      const res = await axios.get("http://localhost:5000/api/kidsNews");
      setKidsNews(res.data);
    }
    fetchKidsNews();
  }, [])
  const handleDelete = (e, id) => {
    fetch(`http://localhost:5000/api/kidsNews/${id}`, {
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
          <h1>Manage Kids News</h1>
          {kidsNews.length > 0 &&
            <table>
              <thead>
                <tr>
                  <th>Banner Image</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  kidsNews.map(singleNews => (
                    <tr>
                      <td className="text-center">
                        <img height="50px" width="70px" src={PF + singleNews.photo} alt="" />
                      </td>
                      <td>{singleNews.title}</td>
                      <td>{singleNews.desc}</td>
                      <td>
                        <Link className="manageButton" to={`updateKidsNews/${singleNews._id}`}>
                          Update
                        </Link>{" "}
                        | <Link onClick={(e) => handleDelete(e, singleNews._id)} className="manageButton">Delete</Link>
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

export default ManageKidsNews;
