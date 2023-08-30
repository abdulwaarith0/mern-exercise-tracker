import React, { useState } from "react";
import axios from "axios";

const CreateUser = () => {
    const [username, setUsername] = useState("");

    const onChangeUsername = (e) => {
        setUsername(e.target.value);
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        const user = {
            username
        };

        try {
            await axios.post("http://localhost:8000/users/add", user);
            setUsername("");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container">
            <h3>Create New User</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Username:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={username}
                        onChange={onChangeUsername}
                    />
                </div>
                <br />
                <div className="form-group">
                    <input
                        type="submit"
                        value="Create User"
                        className="btn btn-primary"
                    />
                </div>
            </form>
        </div>
    );
};

export default CreateUser;