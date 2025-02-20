import React, { Component } from "react";
import { login } from "../services/auth";
import { Navigate } from "react-router-dom";
import "./Signup";
import * as PATHS from "../utils/paths";
import * as USER_HELPERS from "../utils/userToken";

export default class Login extends Component {
  state = {
    username: "",
    password: "",
    error: null,
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleFormSubmission = (event) => {
    event.preventDefault();

    const credentials = {
      username: this.state.username,
      password: this.state.password,
    };
    login(credentials).then((res) => {
      if (!res.status) {
        // handle not great request
      }
      USER_HELPERS.setUserToken(res.data.accessToken);
      this.props.authenticate(res.data.user);
      <Navigate to={PATHS.HOMEPAGE} />;
    });
  };

  render() {
    return (
      <div>
        <h1>Log In</h1>
        <form onSubmit={this.handleFormSubmission} className="signup__form">
          <label htmlFor="input-username">Username</label>
          <input
            id="input-username"
            type="text"
            name="username"
            placeholder="username"
            value={this.state.username}
            onChange={this.handleInputChange}
            required
          />

          <label htmlFor="input-password">Password</label>
          <input
            id="input-password"
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleInputChange}
            required
            minLength="8"
          />

          {this.state.error && (
            <div className="error-block">
              <p>There was an error submiting the form:</p>
              <p>{this.state.error.message}</p>
            </div>
          )}

          <button className="button__submit" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
