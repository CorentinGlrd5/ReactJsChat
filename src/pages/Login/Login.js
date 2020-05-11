import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./Login.css";

var SERVER = "backend.cleverapps.io";
var PROTOCOL = window.location.protocol;

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach((val) => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach((val) => {
    val === "" && (valid = false);
  });

  return valid;
};

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      login: "",
      password: "",
      formErrors: {
        login: "",
        password: "",
      },
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if (formValid(this.state)) {
      let login = this.state.login;
      let password = this.state.password;

      async function sendLogging(login, password) {
        const loginResponse = await fetch(`${PROTOCOL}//${SERVER}/login`, {
          method: "POST",
          body: JSON.stringify({
            username: login,
            password: password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const loginResponseValue = await loginResponse.text();
        if (loginResponseValue !== "OK") {
          console.log("error", loginResponseValue);
          alert(loginResponseValue);
        } else {
          console.log("Vous êtes connecté !", loginResponseValue);
          window.location.replace("/chat");
        }
      }
      sendLogging(login, password);
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "login":
        formErrors.login =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? "minimum 6 characaters required" : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value });
  };

  render() {
    const { formErrors } = this.state;

    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Login</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="login">
              <label htmlFor="login">Login</label>
              <input
                className={formErrors.login.length > 0 ? "error" : null}
                placeholder="Login"
                type="text"
                name="login"
                noValidate
                value={this.state.login}
                onChange={this.handleChange}
              />
              {formErrors.login.length > 0 && (
                <span className="errorMessage">{formErrors.login}</span>
              )}
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input
                className={formErrors.password.length > 0 ? "error" : null}
                placeholder="Password"
                type="password"
                name="password"
                noValidate
                value={this.state.password}
                onChange={this.handleChange}
              />
              {formErrors.password.length > 0 && (
                <span className="errorMessage">{formErrors.password}</span>
              )}
            </div>
            <div className="createAccount">
              <button type="submit">Connection</button>
              <small>
                <NavLink to="/">
                  You do not have an account ? click here !
                </NavLink>
              </small>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
