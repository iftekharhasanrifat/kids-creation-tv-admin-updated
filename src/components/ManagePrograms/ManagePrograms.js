import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import ManageAllPrograms from "./ManageAllPrograms";
import axios from "axios"
const ManagePrograms = () => {
  const [programs, setPrograms] = useState([]);
  useEffect(() => {
    const fetchPosts = async ()=> {
      const res = await axios.get("http://localhost:5000/api/programs");
      // console.log(res);
      setPrograms(res.data);
    }
    fetchPosts();
  },[])
  return (
    <div>
      <div className="row">
        <div className="col-md-3">
          <Sidebar></Sidebar>
        </div>
        <div className="col-md-9">
          <h1>ManagePrograms</h1>
          {/* {programs.map((program) => (
            <ManageAllPrograms program={program}></ManageAllPrograms>
          ))} */}
          <ManageAllPrograms programs={programs}></ManageAllPrograms>
        </div>
      </div>
    </div>
  );
};

export default ManagePrograms;
