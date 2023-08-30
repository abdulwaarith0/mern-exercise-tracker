import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Exercise = ({ exercise, deleteExercise }) => (
    <tr>
        <td>{exercise.username}</td>
        <td>{exercise.description}</td>
        <td>{exercise.duration}</td>
        <td>{exercise.date.substring(0, 10)}</td>
        <td>
            <Link to={`/edit/${exercise._id}`} className="btn btn-secondary">
                Edit
            </Link>
            <button
                className="btn btn-danger"
                onClick={() => deleteExercise(exercise._id)}
            >
                Delete
            </button>
        </td>
    </tr>
);

const ExercisesList = () => {
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        const fetchExercises = async () => {
            const result = await axios.get("http://localhost:8000/exercises/");
            setExercises(result.data);
        };

        fetchExercises();
    }, []);

    const deleteExercise = async (id) => {
        await axios.delete(`http://localhost:8000/exercises/${id}`);

        setExercises(exercises.filter((exercise) => exercise._id !== id));
    };

    return (
        <div className="container">
            <h3>Logged Exercises</h3>
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th>Username</th>
                        <th>Description</th>
                        <th>Duration</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {exercises.map((exercise) => (
                        <Exercise
                            key={exercise._id}
                            exercise={exercise}
                            deleteExercise={deleteExercise}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ExercisesList;