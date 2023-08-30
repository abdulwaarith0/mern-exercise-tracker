import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function EditExercise() {
    const { id } = useParams();
    const [username, setUsername] = useState("");
    const [description, setDescription] = useState("");
    const [duration, setDuration] = useState(0);
    const [date, setDate] = useState(new Date());
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const exerciseResponse = await axios.get(
                    `http://localhost:8000/exercises/${id}`
                );
                setUsername(exerciseResponse.data.username);
                setDescription(exerciseResponse.data.description);
                setDuration(exerciseResponse.data.duration);
                setDate(new Date(exerciseResponse.data.date));

                const usersResponse = await axios.get("http://localhost:8000/users/");
                if (usersResponse.data.length > 0) {
                    setUsers(usersResponse.data.map((user) => user.username));
                    setUsername(usersResponse.data[0].username);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [id]);

    const onChangeUsername = (e) => {
        setUsername(e.target.value);
    };

    const onChangeDescription = (e) => {
        setDescription(e.target.value);
    };

    const onChangeDuration = (e) => {
        setDuration(e.target.value);
    };

    const onChangeDate = (date) => {
        setDate(date);
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        const exercise = {
            username,
            description,
            duration,
            date
        };

        try {
            await axios.put(
                `http://localhost:8000/exercises/update/${id}`,
                exercise
            );
            console.log("Exercise updated");
        } catch (error) {
            console.error(error);
        }

        window.location.replace("/");
    };

    return (
        <div className="container">
            <h3>Edit Exercise Log</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Username:</label>
                    <select
                        className="form-control"
                        value={username}
                        onChange={onChangeUsername}
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
                        value={description}
                        onChange={onChangeDescription}
                    />
                </div>
                <div className="form-group">
                    <label>
                        Duration (in minutes):
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        value={duration}
                        onChange={onChangeDuration}
                    />
                </div>
                <div className="form-group">
                    <label>Date:</label>
                    <div>
                        <DatePicker selected={date} onChange={onChangeDate} />
                    </div>
                </div>

                <div className="form-group">
                    <input
                        type="submit"
                        value="Edit Exercise Log"
                        className="btn btn-primary"
                    />
                </div>
            </form>
        </div>
    );
};

export default EditExercise;