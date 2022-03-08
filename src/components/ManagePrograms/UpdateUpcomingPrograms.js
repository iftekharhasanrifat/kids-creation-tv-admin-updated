import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"
const UpdateUpcomingPrograms = () => {
  let upcomingProgramId = useParams();
  const [upcomingProgram, setUpcomingProgram] = useState({});
  const PF = "http://localhost:5000/images/";
  const [title, setTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  useEffect(() => {
    const fetchProgram = async () => {
      const res = await axios.get(`http://localhost:5000/api/upcomingPrograms/${upcomingProgramId.id}`);
      setUpcomingProgram(res.data);
      setTitle(res.data.title);
    }
    fetchProgram();
  }, [upcomingProgramId.id])
  const handleSubmit = (e) => {
    if (title === "") {
      setErrorMessage("Title is required");
      setSuccessMessage("");
    }
    else {
      const updatedUpcomingProgram = {
        title
      }
      fetch(`http://localhost:5000/api/upcomingPrograms/${upcomingProgramId.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedUpcomingProgram)
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          setErrorMessage("");
          setSuccessMessage("Upcoming Program Updated Successfully");
        })
    }
    e.preventDefault();
  }
  return (
    <div className="write">
      <h2 className="text-center mb-5">Update Upcoming Program Banner</h2>
      <div className="imgContainer">
        <img
          className="writeImg"
          src={PF + upcomingProgram.photo}
          alt=""
        />
      </div>
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <input
            type="text"
            className="writeInput"
            autoFocus={true}
            value={title}
            onChange={e =>setTitle(e.target.value)}
          />
        </div>
        <button className="writeSubmit" type="submit">Update</button>
      </form>
      <h4 className="m-1 text-center text-danger">{errorMessage}</h4>
      <h4 className="m-1 text-center text-success">{successMessage}</h4>
    </div>
  );
};

export default UpdateUpcomingPrograms;
