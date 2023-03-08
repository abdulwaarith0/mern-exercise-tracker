import React, { Component } from "react";
import { Link } from "react-router-dom"
import axios from "axios";

const Exercise = props => {
    return (
        <tr>
            <td>{props.exercise.username}</td>
            <td>{props.exercise.description}</td>
            <td>{props.exercise.duration}</td>
            <td>{props.exercise.date.substring(0, 10)}</td>
            <td>
                <Link to={"/edit/update" + props.exercise._id} className="btn btn-secondary"> Edit </Link>
                <span>&nbsp;&nbsp;</span>
                <button className="btn btn-danger" href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}> Delete </button>
            </td>
        </tr>
    )
}
export default class ExercisesList extends Component {
    constructor(props) {
        super(props)

        this.deleteExercise = this.deleteExercise.bind(this);

        this.state = { exercises: [] };
    }

    // Get all exercise list
    async componentDidMount() {
        try {
            const response = await axios.get("http://localhost:8000/exercises/");
            this.setState({ exercises: response.data });
        } catch (err) {
            console.log(err);
        }
    }

    // delete an exercise
    async deleteExercise(id) {
        try {
            const response = await axios.delete(`http://localhost:8000/exercises/${id}`)
            console.log(response.data);
            this.setState({
                exercises: this.state.exercises.filter(el => el._id !== id)
            })
        } catch (error) {
            console.log(error);
        }
    }

    exerciseList() {
        return this.state.exercises.map(currentExercise => {
            return <Exercise exercise={currentExercise} deleteExercise={
                this.deleteExercise} key={currentExercise._id} />;
        })
    }


    render() {
        return (
            <div className="container">
                <h3>Logged Exercises</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th> Username: </th>
                            <th> Description: </th>
                            <th> Duration: </th>
                            <th> Date: </th>
                            <th> Actions: </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.exerciseList()}
                    </tbody>
                </table>
            </div>
        )
    }
}