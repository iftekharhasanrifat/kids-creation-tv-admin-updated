import React, { useState } from 'react';
import './AddPrograms.css'
const AddPrograms = () => {
    const [category, setCategory] = useState("");
    const [link, setLink] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const handleSubmit = (e) => {
        if (category === "Select Category" || category === "" || link === "" || link.includes(" ")) {
            setErrorMessage("All fields are required");
            setSuccessMessage("");
        }
        else {
            const newProgram = {
                category,
                link
            }
            const url = "http://localhost:5000/api/programs/";
            fetch(url,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newProgram)
            })
            .then(res => res.json())
            .then(data=>{
                console.log(data);
                setErrorMessage("");
                setSuccessMessage("Program Saved Successfully");
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
                        <option value="Little Genius">Little Genius</option>
                        <option value="Country Songs">Country Songs</option>
                    </select>
                    {/* <input type="text" placeholder="Category" className="writeInput" autoFocus={true} /> */}
                </div>
                <div className="writeFormGroup">
                    <textarea onChange={(e) => { setLink(e.target.value) }} placeholder="Link" type="text" className="writeInput linkText"></textarea>
                </div>
                <button className='programSubmit' type='submit'>Publish</button>
            </form>
            <h4 className="m-1 text-center text-danger">{errorMessage}</h4>
            <h4 className="m-1 text-center text-success">{successMessage}</h4>
        </div>
    );
};

export default AddPrograms;