/* eslint-disable no-undef */
import axios from "axios";
import React, { Component } from "react";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";

export default class CreateExercise extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: " ",
            description: " ",
            duration: 0,
            date: new Date(),
            users: []
        }
    }

    async componentDidMount() {
        try {
            const response = await axios.get("http://localhost:8000/users/");
            if (response.data.length > 0) {
                this.setState({
                    users: response.data.map(user => user.username),
                    username: response.data[0].username,
                });
            }
        } catch (error) {
            console.error(error);
        }
    }


    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        });
    }

    onChangeDate(date) {
        this.setState({
            date: date
        });
    }

    onSubmit = async (e) => {
        console.log("onSubmit called");
        e.preventDefault();

        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date,
        }

        console.log(exercise);

        async function addExercise(exercise) {
            try {
                const response = await
                    axios.post("http://localhost:8000/exercises/add", exercise);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        }

        addExercise(exercise);

        window.location.replace('/');
    }

    render() {
        return (
            <div className="container">
                <h3>Create New Exercise Log</h3>
                <form onSubmit={this.onSubmit} onKeyPress={(event) => {
                    if (event.key === 'Enter') {
                        event.preventDefault();
                    }
                }}>
                    <div className="form-group">
                        <label> Username: </label>
                        <select name="" required className="form-control"
                            value={this.state.username} id="username"
                            onChange={this.onChangeUsername} >
                            {
                                this.state.users.map(function (user) {
                                    return <option
                                        key={user}
                                        value={user}>{user}
                                    </option>
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label> Description: </label>
                        <input type="text"
                            className="form-control"
                            required
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor=""> Duration <strong>(in minutes)</strong>:
                        </label>
                        <input type="text"
                            className="form-control"
                            required
                            value={this.state.duration}
                            onChange={this.onChangeDuration}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor=""> Date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                            />
                        </div>
                    </div>
                    <br />
                    <div className="form-group">
                        <input type="submit" value="Create Exercise Log"
                            className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}