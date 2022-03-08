import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';

const ManagerBanners = () => {
    const [banners, setBanners] = useState([]);
    const PF = "http://localhost:5000/images/";
    useEffect(() => {
        const fetchBanners = async () => {
            const res = await axios.get("http://localhost:5000/api/banners");
            setBanners(res.data);
        }
        fetchBanners();
    }, [])
    const handleDelete = (e, id) => {
        fetch(`http://localhost:5000/api/banners/${id}`, {
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
                    <h1>Manage Banners</h1>
                    {banners.length > 0 &&
                        <table>
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    banners.map(banner => (
                                        <tr>
                                            <td className="text-center">
                                                <img height="50px" width="70px" src={PF + banner.photo} alt="" />
                                            </td>
                                            <td>
                                                <Link onClick={(e) => handleDelete(e, banner._id)} className="manageButton">Delete</Link>
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

export default ManagerBanners;