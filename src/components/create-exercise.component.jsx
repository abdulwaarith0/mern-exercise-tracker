import axios from "axios";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function CreateExercise() {
    const [username, setUsername] = useState("");
    const [description, setDescription] = useState("");
    const [duration, setDuration] = useState(0);
    const [date, setDate] = useState(new Date());
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await axios.get("http://localhost:8000/users/");
                if (response.data.length > 0) {
                    setUsers(response.data.map((user) => user.username));
                    setUsername(response.data[0].username);
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchUsers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const exercise = {
            username,
            description,
            duration,
            date,
        };

        try {
            const response = await axios.post(
                "http://localhost:8000/exercises/add",
                exercise
            );
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }

        window.location.replace("/");
    };

    return (
        <div className="container">
            <h3>Create New Exercise Log</h3>
            <form
                onSubmit={handleSubmit}
                onKeyPress={(event) => {
                    if (event.key === "Enter") {
                        event.preventDefault();
                    }
                }}
            >
                <div className="form-group">
                    <label>Username:</label>
                    <select
                        name=""
                        required
                        className="form-control"
                        value={username}
                        id="username"
                        onChange={(e) => setUsername(e.target.value)}
                    >
                        {users.map((user) => (
                            <option key={user} value={user}>
                                {user}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <input
                        type="text"
                        className="form-control"
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Duration (in minutes):</label>
                    <input
                        type="text"
                        className="form-control"
                        required
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Date:</label>
                    <div>
                        <DatePicker selected={date} onChange={(date) => setDate(date)} />
                    </div>
                </div>
                <br />
                <div className="form-group">
                    <input
                        type="submit"
                        value="Create Exercise Log"
                        className="btn btn-primary"
                    />
                </div>
            </form>
        </div>
    );
}