import axios from 'axios';
import React, { useState } from 'react';

const UploadBanner = () => {
    const [file, setFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newBanner = {}
        if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName);
            data.append("file", file);
            newBanner.photo = fileName;
            try {
                await axios.post("http://localhost:5000/api/upload", data);
            } catch (err) {

            }
        }
        if (file == null) {
            // console.log("all fields are required");
            setErrorMessage("Please select file");
        }
        else {
            try {
                const res = await axios.post("http://localhost:5000/api/banners", newBanner);
                if (res) {
                    window.location.replace("/manageBanner");
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
            <h2 className='text-center mb-5'>Upload Banner</h2>
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
                    {file ?
                        <input type="text" placeholder="" disabled className="writeInput" autoFocus={true} />

                        :
                        <input type="text" placeholder="Please upload banner" disabled className="writeInput" autoFocus={true} />
                    }
                </div>
                <button className='writeSubmit'>Upload</button>
            </form>
            <h4 className="text-center text-danger">{errorMessage}</h4>
        </div>
    );

};

export default UploadBanner;