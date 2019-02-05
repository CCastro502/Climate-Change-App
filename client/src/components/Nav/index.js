import React, { Component } from "react";
import "./style.css";
import { Modal } from 'react-materialize';
import Axios from 'axios';

class Nav extends Component {
  state = {
    email: "",
    password: "",
    passwordRepeat: "",
    loginEmail: "",
    loginPassword: "",
    isModalOpen: false
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  logIn = () => {

    const newUser = {
      email: this.state.loginEmail,
      password: this.state.loginPassword
    }

    Axios.get('/api/users/' + this.state.loginEmail + "/" + this.state.loginPassword + "/")
      .then(res => {
        if (res.data.length >= 1) {
          alert("Log-in successful")
          this.setState({ loginEmail: "", loginPassword: "" });
        } else {
          alert("You're log-in credentials are not correct.")
          this.setState({ loginPassword: "" })
        }
        console.log("respo: ", res);
        return res;
      })
      .catch(err => console.log(err))
  }

  checkEmail = () => {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(this.state.email);
  }

  closeModal = () => {
    this.setState({ isModalOpen: false });
  }

  registerUser = () => {

    if (this.checkEmail()) {

      if (this.state.password === this.state.passwordRepeat && this.state.password.length > 7) {

        const newUser = {
          email: this.state.email,
          password: this.state.password
        }

        Axios.post('/api/users', newUser)
          .then(res => {
            console.log("Successful: ", res);
            alert("You have successfully registered");
            this.closeModal();
            return res;
          })
          .catch(err => console.log(err));

      } else {

        return alert("Password did not match or was not long enough (must be 8 characters)");

      }

    } else {

      return alert("Incorrect email address");

    }

  };
  render() {
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light">
          <a className="navbar-brand" href="/">
            Climate Change App
          </a>
          <div id="user-field">

            <Modal
              header='User Info'
              trigger={<a className="nav-link" id="register-link" onClick={this.registerUser}>register</a>}
            >
              <label htmlFor="search-field">Email: </label>
              <input className="form-control mr-sm-6" name="email" id="email" placeholder="abc@123.com" value={this.state.email} onChange={this.handleInputChange} />
              <label htmlFor="search-field">Password: </label>
              <input className="form-control mr-sm-6" name="password" id="password" placeholder="Password" value={this.state.password} onChange={this.handleInputChange} type="password" />
              <label htmlFor="search-field">Repeat Password: </label>
              <input className="form-control mr-sm-6" name="passwordRepeat" id="password-repeat" placeholder="Repeat Password..." type="password" value={this.state.passwordRepeat} onChange={this.handleInputChange} />
              <button onClick={this.registerUser}>Register</button>
            </Modal>

            <input className="form-control mr-sm-2" type="search" placeholder="abc@123.com" name="loginEmail" id="email" value={this.state.loginEmail} onChange={this.handleInputChange} />
            <input className="form-control mr-sm-2" type="search" placeholder="Password" name="loginPassword" id="password" value={this.state.loginPassword} onChange={this.handleInputChange} />
            <button className="btn btn-outline-success my-2 my-sm-0" onClick={this.logIn}>Log In</button>

          </div>
        </nav>

      </>
    );
  }


}

export default Nav;