import axios from "axios";
import React, { useContext, useState } from "react";
import { ErrorContext } from "../../App";
import "./AddKidsNews.css";
const AddKidsNews = () => {

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newKidsNews = {
      title,
      desc
    }
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newKidsNews.photo = fileName;
      try {
        await axios.post("http://localhost:5000/api/upload", data);
      } catch (err) {

      }
    }
    if (title == "" || desc == "" || file == null) {
      // console.log("all fields are required");
      setErrorMessage("All fields are required")
    }
    else {
      try {
        const res = await axios.post("http://localhost:5000/api/kidsNews", newKidsNews);
        if (res) {
          window.location.replace("/manageKidsNews");
        }
        else {
          console.log("something went wrong");
        }
      }
      catch (err) {
        console.log(err);
      }
    }

  }
  return (
    <div className="write">
      <h2 className="text-center mb-5">Publish Kids News</h2>
      <div className="imgContainer">
        {
          file && (
            <img
              className="writeImg"
              src={URL.createObjectURL(file)}
              alt=""
            />
          )
        }
      </div>
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input type="file" id="fileInput" style={{ display: "none" }} onChange={e => setFile(e.target.files[0])} />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Description..."
            type="text"
            className="writeInput writeText"
            onChange={e => setDesc(e.target.value)}
          ></textarea>
        </div>
        <button className="writeSubmit" type="submit">Publish</button>
      </form>
      <h4 className="text-center text-danger">{errorMessage}</h4>
    </div>
  );
};

export default AddKidsNews;
