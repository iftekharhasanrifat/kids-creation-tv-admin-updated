import axios from 'axios';
import React, { useState } from 'react';

const UpciomingPrograms = () => {
    const [title, setTitle] = useState("");
    const [file, setFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newUpcomingProgram = {
            title
        }
        if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName);
            data.append("file", file);
            newUpcomingProgram.photo = fileName;
            try {
                await axios.post("http://localhost:5000/api/upload", data);
            } catch (err) {

            }
        }
        if (title == "" || file == null) {
            // console.log("all fields are required");
            setErrorMessage("All fields are required")
        }
        else {
            try {
                const res = await axios.post("http://localhost:5000/api/upcomingPrograms", newUpcomingProgram);
                if (res) {
                    window.location.replace("/manageUpcomingProgram");
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
            <h2 className='text-center mb-5'>Publish Upcoming Program Banner</h2>
            <div className='imgContainer'>
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
                    <label htmlFor="upcomingFileInput">
                        <i className="writeIcon fas fa-plus"></i>
                    </label>
                    <input type="file" id="upcomingFileInput" style={{ display: 'none' }} onChange={e => setFile(e.target.files[0])} />
                    <input type="text" placeholder="Title" onChange={e => setTitle(e.target.value)} className="writeInput" autoFocus={true} />
                </div>
                <button className='writeSubmit'>Publish</button>
            </form>
            <h4 className="text-center text-danger">{errorMessage}</h4>
        </div>
    );
};

export default UpciomingPrograms;