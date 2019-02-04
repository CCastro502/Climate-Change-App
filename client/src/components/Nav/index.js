import React, { Component } from "react";
import "./style.css";
import { Modal } from 'react-materialize';
import Axios from 'axios';

class Nav extends Component {
  state = {
    email: "",
    password: "",
    passwordRepeat: "",
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  login = () => {
    Axios.get('/api/users/')
      .then(res => {
        console.log(res)
        return res;
      })
      .catch(err => console.log(err))
  }

  checkEmail = () => {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(this.state.email);
  }

  registerUser = () => {

    if (this.checkEmail()) {

      if (this.state.password === this.state.passwordRepeat && this.state.password.length > 7) {

        const newUser = {
          email: this.state.email,
          password: this.state.password
        }
        Axios.get('/api/users')
          .then(res => {
            console.log(res);
            return res;
          })
        Axios.post('/api/users', newUser)
          .then(res => {
            console.log("Successful: ", res);
            return res;
          })
          .catch(err => console.log(err));

      } else {

        return alert("Password did not match or was not long enough (must be 8 characters)");

      }

    } else {

      return alert("Incorrect email address");

    }

  }

  render() {
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light">
          <a className="navbar-brand" href="/">
            Climate Change App
          </a>
          <div id="user-field">

            <Modal
              header='Modal Header'
              trigger={<a className="nav-link" id="register-link" onClick={this.registerUser}>register</a>}>
              <label htmlFor="search-field">Email: </label>
              <input className="form-control mr-sm-6" name="email" id="email" placeholder="abc@123.com" value={this.state.email} onChange={this.handleInputChange} />
              <label htmlFor="search-field">Password: </label>
              <input className="form-control mr-sm-6" name="password" id="password" placeholder="Password" value={this.state.password} onChange={this.handleInputChange} type="password" />
              <label htmlFor="search-field">Repeat Password: </label>
              <input className="form-control mr-sm-6" name="passwordRepeat" id="password-repeat" placeholder="Repeat Password..." type="password" value={this.state.passwordRepeat} onChange={this.handleInputChange} />
              <button onClick={this.registerUser}>Register</button>
            </Modal>

            <input className="form-control mr-sm-2" type="search" placeholder="abc@123.com" name="username" id="username" value={this.state.username} onChange={this.handleInputChange} />
            <input className="form-control mr-sm-2" type="search" placeholder="Password" name="password" id="password" value={this.state.password} onChange={this.handleInputChange} />
            <button className="btn btn-outline-success my-2 my-sm-0" onClick={this.logIn}>Log In</button>

          </div>
        </nav>

      </>
    );
  }


}

export default Nav;