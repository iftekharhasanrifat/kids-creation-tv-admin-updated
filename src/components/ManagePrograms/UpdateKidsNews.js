import React, { useEffect, useState } from "react";
import axios from "axios"
import { useParams } from "react-router-dom";
const UpdateKidsNews = () => {
  let newsId = useParams();
  const [singleKidNews, setSingleKidNews] = useState({});
  const PF = "http://localhost:5000/images/";
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  useEffect(() => {
    const fetchProgram = async () => {
      const res = await axios.get(`http://localhost:5000/api/kidsNews/${newsId.id}`);
      setSingleKidNews(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    }
    fetchProgram();
  }, [newsId.id])
  const handleSubmit = (e) => {
    if (title === "" || desc === "") {
      setErrorMessage("All fields are required");
      setSuccessMessage("");
    }
    else {
      const updatedKidsNews = {
        title,
        desc
      }
      fetch(`http://localhost:5000/api/kidsNews/${newsId.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedKidsNews)
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          setErrorMessage("");
          setSuccessMessage("Kids News Updated Successfully");
        })
    }
    e.preventDefault();
  }
  return (
    <div className="write">
      <h2 className="text-center mb-5">Update Kids News</h2>
      <div className="imgContainer">
        <img
          className="writeImg"
          src={PF + singleKidNews.photo}
          alt=""
        />
      </div>
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <input
            type="text"
            className="writeInput"
            value={title}
            autoFocus={true}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            type="text"
            className="writeInput writeText"
            value={desc}
            onChange={e => setDesc(e.target.value)}
          ></textarea>
        </div>
        <button className="writeSubmit" type='submit'>Update</button>
      </form>
      <h4 className="m-1 text-center text-danger">{errorMessage}</h4>
      <h4 className="m-1 text-center text-success">{successMessage}</h4>
    </div>
  );
};

export default UpdateKidsNews;
