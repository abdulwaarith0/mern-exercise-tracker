import React, { Component } from "react";
import axios from "axios";

export default class CreateUser extends Component {

    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: " ",
        }
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onSubmit(event) {
        console.log("onSubmit called");
        event.preventDefault();

        const user = {
            username: this.state.username,
        }

        console.log(user);

        async function addUser(user) {
            try {
                const response = await axios.post("http://localhost:8000/users/add", user);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        }

        addUser(user);


        this.setState({
            username: ""
        })
    }


    render() {
        return (
            <div className="container">
                <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label> Username: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        />
                    </div>
                    <br />
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}