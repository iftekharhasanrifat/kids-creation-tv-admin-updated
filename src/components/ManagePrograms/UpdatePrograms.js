import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const UpdatePrograms = () => {
  const [category, setCategory] = useState("");
  const [link, setLink] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  let programId = useParams();
  const [program, setProgram] = useState({});
  useEffect(() => {
    const url = `http://localhost:5000/api/programs/${programId.id}`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setProgram(data);
        setLink(data.link)
      })
  }, [programId.id])
  const handleSubmit = (e) => {
    if (category === "Select Category" || category === "" || link === "" || link.includes(" ")) {
      setErrorMessage("All fields are required");
      setSuccessMessage("");
    }
    else {
      const updatedProgram = {
        category,
        link
      }
      fetch(`http://localhost:5000/api/programs/${programId.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedProgram)
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          setErrorMessage("");
          setSuccessMessage("Program Updated Successfully");
        })
    }
    e.preventDefault();
  }
  return (
    <div className='write'>
      <h2 className='text-center mb-5'>Publish Programs</h2>
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <select onChange={(e) => { setCategory(e.target.value) }} className="categoryDropdown" name="category" id="categories">
            <option value="Select Category">--Select Category--</option>
            <option value="Know Your Country">Know Your Country</option>
            <option value="Cartoon Songs">Cartoon Songs</option>
            <option value="Poems">Poems</option>
            <option value="Little Genious">Little Genious</option>
            <option value="Country Songs">Country Songs</option>
          </select>
          {/* <input type="text" placeholder="Category" className="writeInput" autoFocus={true} /> */}
        </div>
        <div className="writeFormGroup">
          <textarea onChange={(e) => { setLink(e.target.value) }} value={link} type="text" className="writeInput linkText"></textarea>
        </div>
        <button className='programSubmit' type='submit'>Update</button>
      </form>
      <h4 className="m-1 text-center text-danger">{errorMessage}</h4>
      <h4 className="m-1 text-center text-success">{successMessage}</h4>
    </div>
  );
};

export default UpdatePrograms;
