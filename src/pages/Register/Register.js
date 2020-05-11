import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./Register.css";

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

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

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      login: "",
      email: "",
      password: "",
      formErrors: {
        login: "",
        email: "",
        password: "",
      },
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if (formValid(this.state)) {
      var SERVER = "backend.cleverapps.io";
      var PROTOCOL = window.location.protocol;

      let loginInput = this.state.login;
      let passwordInput = this.state.password;
      let emailInput = this.state.email;

      async function sendRegister(login, password, email) {
        const response = await fetch(`${PROTOCOL}//${SERVER}/subscribe`, {
          method: "POST",
          body: JSON.stringify({
            username: login,
            password: password,
            email: email,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const registerResponseValue = await response.text();
        if (registerResponseValue !== "OK") {
          console.log("erreur", registerResponseValue);
          alert(registerResponseValue);
        } else {
          console.log("Le compte a été créé !");
          window.location.replace("/login");
        }
      }
      sendRegister(loginInput, passwordInput, emailInput);
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
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
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
          <h1>Create Account</h1>
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
            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                className={formErrors.email.length > 0 ? "error" : null}
                placeholder="Email"
                type="email"
                name="email"
                noValidate
                value={this.state.email}
                onChange={this.handleChange}
              />
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
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
              <button type="submit">Create Account</button>
              <small>
                <NavLink to="/Login">
                  Already Have an Account ? click here !
                </NavLink>
              </small>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
